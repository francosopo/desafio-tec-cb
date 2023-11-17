import {AbstractPaymentState} from "./abstract.payment.state";
import {PaymentInterface} from "../interfaces/payment.interface";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {PreparingRequestState} from "./preparing.request.state";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {HttpService} from "@nestjs/axios";
import {Injectable, Scope} from "@nestjs/common";
import {Repository} from "typeorm";
import {Users} from "../../model/entities/user.model";
import {run} from "jest";
import {Charges} from "../../model/entities/charges.model";
import {Balance} from "../../model/entities/balance.model";

@Injectable({
    scope: Scope.REQUEST
})
export class InitialPaymentState extends AbstractPaymentState implements PaymentInterface
{
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
    run<T>(transferCode: string, amount: number, token: string): Promise<PaymentResponseInterface> {
        this.getContext().setState(new PreparingRequestState(
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
            amount,
            transferCode,
            this.getBaseUrl()
        ))
        return this.getContext().getState().run(transferCode, amount, token)
    }

}