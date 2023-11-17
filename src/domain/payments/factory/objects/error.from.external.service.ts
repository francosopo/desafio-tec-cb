import {AbstractPaymentDatabaseStatus} from "./abstract.payment.database.status";
import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {ErrorResponseState} from "../../states/error.response.state";
import {EntityTarget} from "typeorm";

export class ErrorFromExternalService extends AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor(message: string) {
        super(`Error from external service: ${message}`);
    }

    async process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface> {
        status.setMessageForSendingToUser(this.getStatus())
        status.setResponseStatusForSendingToUser(400);

        status.getContext().setState(new ErrorResponseState(status.getAssertPayment(),
            status.getRequestStatusService(),
            status.getHttpService(),
            status.getTransactionRepository(),
            status.getUserRepository(),
            status.getChargesRespitory(),
            status.getBalanceRepository(),
            status.getResponseStatusFromGeneralPayments(),
            status.getResponseStatusForSendingToUser(),
            status.getMessageForSendingToUser(),
            status.getContext(),
            status.getAmount(),
            status.getTransferCode(),
            status.getBaseUrl()));
        return await status.getContext().getState().run(status.getTransferCode(), status.getAmount(), token);
    }
}