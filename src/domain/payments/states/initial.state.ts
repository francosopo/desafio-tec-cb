import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {PreparingRequestState} from "./preparing.request.state";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import {Injectable, Scope} from "@nestjs/common";
import {RepositoryInterface} from "../../model/repositories/interfaces/repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentsToGeneralPaymentsRepository} from "../../model/repositories/payments.to.general.payments.repository";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {Repository} from "typeorm";

@Injectable({
    scope: Scope.REQUEST
})
export class InitialPaymentState extends AbstractPaymentState implements PaymentInterface
{
    constructor(assertPayment: AssertPaymentService,
                requestStatus: RequestStatusService,
                httpService: HttpService,
                repositoryTable: Repository<any>,
                responseFromPayments: number,
                responseStatusForSendingToUser: number,
                messageToSendToUser: string,
                context: PaymentStateServiceInterface,
                baseUrl: string) {
        super(assertPayment,
            requestStatus,
            httpService,
            repositoryTable,
            responseFromPayments,
            responseStatusForSendingToUser,
            messageToSendToUser,
            context,
            0,
            '',
            baseUrl);
    }
    run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface> {
        this.getContext().setState(new PreparingRequestState(
            this.getAssertPayment(),
            this.getRequestStatusService(),
            this.getHttpService(),
            this.getTransactionRepository(),
            this.getResponseStatusFromGeneralPayments(),
            this.getResponseStatusForSendingToUser(),
            this.getMessageForSendingToUser(),
            this.getContext(),
            amount,
            transferCode,
            this.getBaseUrl()
        ))
        return this.getContext().getState().run(transferCode, amount, token)
    }

}