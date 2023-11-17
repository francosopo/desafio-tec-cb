import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import { Repository} from "typeorm";
import {BaseException} from "../../exceptions/base.exception";
import {Users} from "../../model/entities/user.model";
import {Charges} from "../../model/entities/charges.model";
import {Balance} from "../../model/entities/balance.model";

export abstract class AbstractPaymentState implements PaymentInterface
{
    protected constructor(
        private assertPayment: AssertPaymentService,
        private requestStatusService: RequestStatusService,
        private httpService: HttpService,
        private transactionRepository: Repository<any>,
        private userRepository: Repository<Users>,
        private chargesRepository: Repository<Charges>,
        private balanceRespository: Repository<Balance>,
        private responseStatusFromGeneralPayment: number,
    private responseStatusForSendingToUser: number,
    private messageForSendingToUser: string,
    private context: PaymentStateServiceInterface,
        private amount: number,
    private transferCode: string,
        private baseUrl: string)
    {}

    getChargesRespitory(): Repository<Charges> {
        return this.chargesRepository
    }
    getBalanceRepository(): Repository<Balance> {
        return this.balanceRespository
    }

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

    getUserRepository(): Repository<Users>
    {
        return this.userRepository;
    }
    setMessageForSendingToUser(message: string): void {
        this.messageForSendingToUser = message;
    }

    setResponseStatusForSendingToUser(code: number): void {
        this.responseStatusForSendingToUser = code;
    }

    goToErrorResponse(msg: string, code: number): PaymentInterface {
        throw new BaseException(msg, code);
    }

    goToInsufficientFundsResponse(): PaymentInterface {
        return this.goToErrorResponse("", 500);
    }

    goToPreparingRequest(): PaymentInterface {
        return this.goToErrorResponse("", 500);
    }

    goToProcessResponse(): PaymentInterface {
        return this.goToErrorResponse("", 500);
    }

    goToSendRequest(): PaymentInterface {
        return this.goToErrorResponse("", 500);
    }

    goToUseAffirmativeResponse(): PaymentInterface {
        return this.goToErrorResponse("", 500);
    }

    abstract run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface>;

    getResponseStatusFromGeneralPayments(): any {
        return this.responseStatusFromGeneralPayment;
    }

    goToWaitResponse(): PaymentInterface {
        return this.goToErrorResponse("", 500);
    }

    getRequestStatusService(): RequestStatusService {
        return this.requestStatusService;
    }
}