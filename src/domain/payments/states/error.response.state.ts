import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {Injectable, Scope} from "@nestjs/common";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import {Repository} from "typeorm";
import {Users} from "../../model/entities/user.model";
import {Charges} from "../../model/entities/charges.model";
import {Balance} from "../../model/entities/balance.model";

@Injectable({
    scope: Scope.REQUEST
})
export class ErrorResponseState extends AbstractPaymentState implements PaymentInterface {
    constructor(assertPayment: AssertPaymentService,
                requestStatus: RequestStatusService,
                httpService: HttpService,
                transactionRepository: Repository<any>,
                userRepository: Repository<Users>,
                chargesRepository: Repository<Charges>,
                balanceRepository: Repository<Balance>,
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
            userRepository,
            chargesRepository,
            balanceRepository,
            responseFromExternalPayments,
            responseStatusForSendingToUser,
            messageToSendToUser,
            context,
            amount,
            transferCode,
            baseUrl);
    }

    async run(transferCode: string, amount :number): Promise<PaymentResponseInterface> {
        return {
            transferCode: transferCode,
            status: this.getResponseStatusForSendingToUser(),
            message: "Cannot process your request",
            details: this.getMessageForSendingToUser()
        }
    }
}