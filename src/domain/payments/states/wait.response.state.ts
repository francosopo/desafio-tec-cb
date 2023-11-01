import {AssertPaymentService} from "../helpers/assert.payment.service";
import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {RequestStatusService} from "../helpers/request.status.service";
import {Injectable, Scope} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {Repository} from "typeorm";

@Injectable({
    scope: Scope.REQUEST
})
export class WaitResponseState extends AbstractPaymentState implements PaymentInterface
{
    constructor(assertPayment: AssertPaymentService,
                requestStatus: RequestStatusService,
                httpService: HttpService,
                transactionRepository: Repository<any>,
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
            transactionRepository,
            responseFromGeneralPayments,
            responseStatusForSendingToUser,
            messageToSendToUser,
            context,
            amount,
            transferCode,
            baseUrl);
    }

    async run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface> {
        this.setMessageForSendingToUser("Wait until our provider response")
        this.setResponseStatusForSendingToUser(102);
        return {
            transferCode: transferCode,
            status: this.getResponseStatusForSendingToUser(),
            message: this.getMessageForSendingToUser(),
            details: "Wait until our provider response",
        }
    }
}