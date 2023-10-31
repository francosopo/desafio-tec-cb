import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentUsecasesInterface} from "../../../usecases/interfaces/payment.usecases.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {Injectable, Scope} from "@nestjs/common";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import {RepositoryInterface} from "../../model/repositories/interfaces/repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {Repository} from "typeorm";

@Injectable({
    scope: Scope.REQUEST
})
export class ErrorResponseState extends AbstractPaymentState implements PaymentInterface {
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

    async run(transferCode: string, amount :number): Promise<PaymentResponseInterface> {
        return {
            status: this.getResponseStatusForSendingToUser(),
            message: "Cannot process your request",
            details: this.getMessageForSendingToUser()
        }
    }
}