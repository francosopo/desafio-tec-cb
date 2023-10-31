import {PaymentInterface} from "../interfaces/payment.interface";
import {ErrorResponseState} from "./error.response.state";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {PaymentUsecasesInterface} from "../../../usecases/interfaces/payment.usecases.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {Users} from "../../model/entities/user.model";
import {RequestStatusService} from "../helpers/request.status.service";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import {RepositoryInterface} from "../../model/repositories/interfaces/repository.interface";
import {EntityTarget, Repository} from "typeorm";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";

export abstract class AbstractPaymentState implements PaymentInterface
{
    protected constructor(
        private assertPayment: AssertPaymentService,
        private requestStatusService: RequestStatusService,
        private httpService: HttpService,
        private transactionRepository: Repository<any>,
        private responseStatusFromGeneralPayment: number,
    private responseStatusForSendingToUser: number,
    private messageForSendingToUser: string,
    private context: PaymentStateServiceInterface,
        private amount: number,
    private transferCode: string,
        private baseUrl: string)
    {}

    getHttpService(): HttpService {
        return this.httpService;
    }

    getTransferCode(): string {
        return this.transferCode;
    }

    getAssertPayment(): AssertPaymentService
    {
        return this.assertPayment
    }

    getContext():PaymentStateServiceInterface
    {
        return this.context;
    }

    getAmount(): number
    {
        return this.amount
    }
    getResponseStatusForSendingToUser(): number
    {
        return this.responseStatusForSendingToUser;
    }
    getMessageForSendingToUser(): string {
        return this.messageForSendingToUser
    }

    getBaseUrl(): string
    {
        return this.baseUrl;
    }

    getTransactionRepository(): Repository<any>
    {
        return this.transactionRepository;
    }

    setMessageForSendingToUser(message: string): void {
        this.messageForSendingToUser = message;
    }

    setResponseStatusForSendingToUser(code: number): void {
        this.responseStatusForSendingToUser = code;
    }

    goToErrorResponse(): PaymentInterface {
        return new ErrorResponseState(this.assertPayment,
            this.requestStatusService,
            this.httpService,
            this.transactionRepository,
            this.responseStatusFromGeneralPayment,
            this.responseStatusForSendingToUser,
            this.messageForSendingToUser,
            this.context,
            this.amount,
            this.transferCode,
            this.baseUrl);
    }

    goToInsufficientFundsResponse(): PaymentInterface {
        return this.goToErrorResponse();
    }

    goToPreparingRequest(): PaymentInterface {
        return this.goToErrorResponse();
    }

    goToProcessResponse(): PaymentInterface {
        return this.goToErrorResponse();
    }

    goToSendRequest(): PaymentInterface {
        return this.goToErrorResponse();
    }

    goToUseAffirmativeResponse(): PaymentInterface {
        return this.goToErrorResponse();
    }

    abstract run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface>;

    getResponseStatusFromGeneralPayments(): any {
        return this.responseStatusFromGeneralPayment;
    }

    goToWaitResponse(): PaymentInterface {
        return this.goToErrorResponse();
    }

    getRequestStatusService(): RequestStatusService {
        return this.requestStatusService;
    }
}