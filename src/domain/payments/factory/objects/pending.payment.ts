import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {AbstractPaymentDatabaseStatus} from "./abstract.payment.database.status";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {EntityTarget} from "typeorm";

export class PendingPayment extends AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor() {
        super("Pending payment");
    }
    process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface> {
        status.setResponseStatusForSendingToUser(102)
        status.setMessageForSendingToUser("Wait until your transaction to be completed, please");

        status.goToWaitResponse();
        return status.getContext().getState().run(status.getTransferCode(), status.getAmount(), token);
    }
}