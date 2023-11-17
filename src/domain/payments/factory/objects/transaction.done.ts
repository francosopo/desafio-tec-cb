import {AbstractPaymentDatabaseStatus} from "./abstract.payment.database.status";
import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {SuccessfulResponseState} from "../../states/successful.response.state";
import {EntityTarget} from "typeorm";
import {TransactionDoneState} from "../../states/transaction.done.state";

export class Done extends AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor() {
        super("Done");
    }
    process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface> {
        status.setMessageForSendingToUser("This transaction is already done")
        status.setResponseStatusForSendingToUser(204);
        status.getContext().setState(new TransactionDoneState(
            status.getAssertPayment(),
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
            status.getBaseUrl(),
        ))
        return status.getContext().getState().run(status.getTransferCode(), status.getAmount(), token);
    }
}