import {PaymentResponseInterface} from "./payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {PaymentStateServiceInterface} from "./payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import {Repository} from "typeorm";


export interface PaymentInterface
{
    goToPreparingRequest():PaymentInterface;
    goToSendRequest(): PaymentInterface;
    goToProcessResponse(): PaymentInterface;
    goToUseAffirmativeResponse(): PaymentInterface;
    goToInsufficientFundsResponse(): PaymentInterface;
    goToErrorResponse(msg: string, code:number): PaymentInterface;
    goToWaitResponse(): PaymentInterface;

    getAssertPayment(): AssertPaymentService;
    getRequestStatusService(): RequestStatusService,
    getHttpService(): HttpService;
    getTransactionRepository(): Repository<any>;
    getResponseStatusFromGeneralPayments(): number;
    getResponseStatusForSendingToUser(): number;
    getMessageForSendingToUser(): string;
    getAmount(): number;
    getContext():PaymentStateServiceInterface;
    getTransferCode(): string;
    getBaseUrl(): string;


    setResponseStatusForSendingToUser(code: number): void;
    setMessageForSendingToUser(message: string): void;

    run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface>;
}