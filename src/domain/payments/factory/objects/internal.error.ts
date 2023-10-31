import {AbstractPaymentDatabaseStatus} from "./abstract.payment.database.status";
import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {ErrorResponseState} from "../../states/error.response.state";
import {EntityTarget} from "typeorm";

export class InternalError extends AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor() {
        super('Internal Error');
    }
    process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface> {
        status.setResponseStatusForSendingToUser(400);
        status.setMessageForSendingToUser('Could not process your request');
        status.getContext().setState(new ErrorResponseState(
            status.getAssertPayment(),
            status.getRequestStatusService(),
            status.getHttpService(),
            status.getTransactionRepository(),
            status.getResponseStatusFromGeneralPayments(),
            status.getResponseStatusForSendingToUser(),
            status.getMessageForSendingToUser(),
            status.getContext(),
            status.getAmount(),
            status.getTransferCode(),
            status.getBaseUrl()
        ));
        return status.getContext().getState().run(status.getTransferCode(), status.getAmount(), token);
    }

}