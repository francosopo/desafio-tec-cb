import {AbstractPaymentDatabaseStatus} from "./abstract.payment.database.status";
import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {SendRequestState} from "../../states/send.request.state";
import {PaymentsToGeneralPaymentsRepository} from "../../../model/repositories/payments.to.general.payments.repository";
import {RepositoryInterface} from "../../../model/repositories/interfaces/repository.interface";
import {EntityTarget} from "typeorm";

export class MakingPayment extends AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor(status: string) {
        super("Pending payment");
    }
    async process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface> {
        status.getContext().setState(new SendRequestState(
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
            status.getBaseUrl(),
        ));
        await status.getRequestStatusService().setStatusService(status.getTransferCode(), status.getAmount(), this.getStatus())
        return status.getContext().getState().run(status.getTransferCode(), status.getAmount(), token)
    }
}