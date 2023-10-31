import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {HttpService} from "@nestjs/axios";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {ErrorResponseState} from "./error.response.state";
import {RepositoryInterface} from "../../model/repositories/interfaces/repository.interface";
import {EntityTarget, Repository} from "typeorm";

export class SuccessfulResponseState extends AbstractPaymentState implements PaymentInterface
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
            this.setResponseStatusForSendingToUser(202);
            this.setMessageForSendingToUser("Successfully executed")
            return {
                status: this.getResponseStatusForSendingToUser(),
                message:this.getMessageForSendingToUser(),
                details: "success"
            }
    }

}