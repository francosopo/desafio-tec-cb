import {Injectable, Scope} from "@nestjs/common";
import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {PaymentUsecasesInterface} from "../../../usecases/interfaces/payment.usecases.interface";
import {Users} from "../../model/entities/user.model";
import {RequestStatusService} from "../helpers/request.status.service";
import {Axios, AxiosResponse} from "axios";
import {HttpService} from "@nestjs/axios";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {ErrorResponseState} from "./error.response.state";
import {SuccessfulResponseState} from "./successful.response.state";
import {PaymentsToGeneralPaymentsRepository} from "../../model/repositories/payments.to.general.payments.repository";
import {RepositoryInterface} from "../../model/repositories/interfaces/repository.interface";
import {EntityTarget, Repository} from "typeorm";

@Injectable({
    scope: Scope.REQUEST
})
export class SendRequestState extends AbstractPaymentState implements PaymentInterface
{
    constructor(assertPayment: AssertPaymentService,
                requestStatus: RequestStatusService,
                httpService: HttpService,
                transactionObject: Repository<any>,
                responseFromGeneralPayments: number,
                responseStatusForSendingToUser: number,
                messageToSendToUser: string,
                context: PaymentStateServiceInterface,
                amount: number,
                transferCode: string,
                baseUrl: string) {
        super(assertPayment,
            requestStatus,
            httpService,
            transactionObject,
            responseFromGeneralPayments,
            responseStatusForSendingToUser,
            messageToSendToUser,
            context,
            amount,
            transferCode,
            baseUrl);
    }
    async run<T, E extends EntityTarget<any>>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface> {

            const queryRunner = this.getTransactionRepository().queryRunner
            await queryRunner.connect();
            await queryRunner.startTransaction();
        try{
            let response = await this.getHttpService().axiosRef.post<T>(this.getBaseUrl(),{
                transferCode: transferCode,
                amount: amount
            },{
                headers: {
                    Authorization: token
                }
            })
            if (response.status != 200)
            {
                await queryRunner.rollbackTransaction();
                console.log(`Internal server error: Cannot make transaction, transferCode${transferCode}, amount: ${amount}`)
                this.setMessageForSendingToUser("Internal server error: Cannot make transaction")
                this.setResponseStatusForSendingToUser(500)
                this.getContext().setState(new ErrorResponseState(this.getAssertPayment(),
                    this.getRequestStatusService(),
                    this.getHttpService(),
                    this.getTransactionRepository(),
                    this.getResponseStatusFromGeneralPayments(),
                    this.getResponseStatusForSendingToUser(),
                    this.getMessageForSendingToUser(),
                    this.getContext(),
                    this.getAmount(),
                    this.getTransferCode(),
                    this.getBaseUrl()))
                return this.getContext().getState().run<T>(transferCode, amount, token);
            }
            let paymentFromDatabase: any = await this.getTransactionRepository().findOneBy({
                id: transferCode,
                amount: amount
            })
            paymentFromDatabase.status = "Done"
            await queryRunner.manager.save(paymentFromDatabase);
            await queryRunner.commitTransaction();
            this.getContext().setState(new SuccessfulResponseState(
                this.getAssertPayment(),
                this.getRequestStatusService(),
                this.getHttpService(),
                this.getTransactionRepository(),
                this.getResponseStatusFromGeneralPayments(),
                this.getResponseStatusForSendingToUser(),
                this.getMessageForSendingToUser(),
                this.getContext(),
                this.getAmount(),
                this.getTransferCode(),
                this.getBaseUrl()
            ))
            return this.getContext().getState().run<T>(transferCode, amount, token);
        }catch (error) {
            await queryRunner.rollbackTransaction();
            console.log("Error while doing the payment");
            let state: PaymentInterface = this.getContext().getState().goToErrorResponse()
            this.getContext().setState(state);
            return this.getContext().getState().run<T>(transferCode, amount,token);
        }
    }
}