import {Injectable, Scope} from "@nestjs/common";
import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {HttpService} from "@nestjs/axios";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {ErrorResponseState} from "./error.response.state";
import {SuccessfulResponseState} from "./successful.response.state";
import {EntityTarget, Repository} from "typeorm";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {Users} from "../../model/entities/user.model";
import {Charges} from "../../model/entities/charges.model";
import {Balance} from "../../model/entities/balance.model";

@Injectable({
    scope: Scope.REQUEST
})
export class SendRequestState extends AbstractPaymentState implements PaymentInterface
{
    constructor(assertPayment: AssertPaymentService,
                requestStatus: RequestStatusService,
                httpService: HttpService,
                transactionObject: Repository<any>,
                userRepository: Repository<Users>,
                chargesRepository: Repository<Charges>,
                balancesRespository: Repository<Balance>,
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
            userRepository,
            chargesRepository,
            balancesRespository,
            responseFromGeneralPayments,
            responseStatusForSendingToUser,
            messageToSendToUser,
            context,
            amount,
            transferCode,
            baseUrl);
    }
    async run<T, E extends EntityTarget<any>>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface> {
            let response_status = 0;
            await this.getTransactionRepository().manager.transaction(async (manager) => {
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
                    response_status = response.status;
                    return
                }
                let paymentFromDatabase: any = await this.getTransactionRepository().findOneBy({
                    from: transferCode,
                    amount: amount
                })
                paymentFromDatabase.status = "Done"
                await manager.getRepository(PaymentsToGeneralPayment).save(paymentFromDatabase);
                response_status = response.status;
                const user: Users= await this.getUserRepository().findOneBy({
                    email: transferCode
                })
                const userCharges:Charges = new Charges();
                const userBalance: Balance = await this.getBalanceRepository().findOneBy({
                    user:user
                })

                userCharges.amount = amount
                userCharges.timestamp = new Date().toISOString()
                await this.getChargesRespitory().save(userCharges)
                userBalance.balance = userBalance.balance - amount;
                await this.getBalanceRepository().save(userBalance);

            })
        if (response_status != 200)
        {
            console.log(`Internal server error: Cannot make transaction, transferCode${transferCode}, amount: ${amount}`)
            this.setMessageForSendingToUser("Internal server error: Cannot make transaction")
            this.setResponseStatusForSendingToUser(500)
            this.getContext().setState(new ErrorResponseState(this.getAssertPayment(),
                this.getRequestStatusService(),
                this.getHttpService(),
                this.getTransactionRepository(),
                this.getUserRepository(),
                this.getChargesRespitory(),
                this.getBalanceRepository(),
                this.getResponseStatusFromGeneralPayments(),
                this.getResponseStatusForSendingToUser(),
                this.getMessageForSendingToUser(),
                this.getContext(),
                this.getAmount(),
                this.getTransferCode(),
                this.getBaseUrl()))
            return this.getContext().getState().run<T>(transferCode, amount, token);
        }
        this.getContext().setState(new SuccessfulResponseState(
            this.getAssertPayment(),
            this.getRequestStatusService(),
            this.getHttpService(),
            this.getTransactionRepository(),
            this.getUserRepository(),
            this.getChargesRespitory(),
            this.getBalanceRepository(),
            this.getResponseStatusFromGeneralPayments(),
            this.getResponseStatusForSendingToUser(),
            this.getMessageForSendingToUser(),
            this.getContext(),
            this.getAmount(),
            this.getTransferCode(),
            this.getBaseUrl()
        ))
        return this.getContext().getState().run<T>(transferCode, amount, token);
    }
}