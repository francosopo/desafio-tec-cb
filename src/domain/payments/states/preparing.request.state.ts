import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";

import {Injectable, Scope} from "@nestjs/common";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {SendRequestState} from "./send.request.state";
import {WaitResponseState} from "./wait.response.state";
import {RequestStatusService} from "../helpers/request.status.service";
import {PaymentStatusInterface} from "../factory/interfaces/payment.status.interface";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import { Repository} from "typeorm";

@Injectable({scope:Scope.REQUEST})
export class PreparingRequestState extends AbstractPaymentState implements PaymentInterface
{
    constructor(assertPayment: AssertPaymentService,
                requestStatus: RequestStatusService,
                httpService: HttpService,
                transactionRepository: Repository<any>,
                responseFromExternalPayments: number,
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
            responseFromExternalPayments,
            responseStatusForSendingToUser,
            messageToSendToUser,
            context,
            amount,
            transferCode,
            baseUrl);
    }
    async run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface> {
        const canDoPayment: boolean = await this.getAssertPayment().canSendPayment(this.getAmount(), transferCode)
        if (canDoPayment == false)
        {
            this.getContext().setState(this.goToErrorResponse("Cannot do payment", 400))
            return this.getContext().getState().run(transferCode, amount, token)
        }

        const requestState: PaymentStatusInterface = await this.getPaymentStatus(this.getTransferCode(), this.getAmount())

        return requestState.process(this, token);
    }

    goToSendRequest(): PaymentInterface {
        return new SendRequestState(this.getAssertPayment(),
            this.getRequestStatusService(),
            this.getHttpService(),
            this.getTransactionRepository(),
            this.getResponseStatusFromGeneralPayments(),
            this.getResponseStatusForSendingToUser(),
            this.getMessageForSendingToUser(),
            this.getContext(),
            this.getAmount(),
            this.getTransferCode(),
            this.getBaseUrl());
    }

    goToWaitResponse(): PaymentInterface {
        return new WaitResponseState(this.getAssertPayment(),
            this.getRequestStatusService(),
            this.getHttpService(),
            this.getTransactionRepository(),
            this.getResponseStatusFromGeneralPayments(),
            this.getResponseStatusForSendingToUser(),
            this.getMessageForSendingToUser(),
            this.getContext(),
            this.getAmount(),
            this.getTransferCode(),
            this.getBaseUrl());
    }
    async getPaymentStatus(transferCode: string, amount: number):  Promise<PaymentStatusInterface>
    {
        return await this.getRequestStatusService().getStatusService(transferCode, amount);
    }
}