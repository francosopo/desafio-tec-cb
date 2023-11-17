import {AbstractPaymentDatabaseStatus} from "./abstract.payment.database.status";
import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {SendRequestState} from "../../states/send.request.state";
import {Repository} from "typeorm";

export class MakingPayment extends AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor(status: string,
                private paymentRepository: Repository<any>) {
        super(status);
    }
    async process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface> {
        await this.paymentRepository.save({
            from: status.getTransferCode(),
            amount: status.getAmount(),
            status: this.getStatus(),
        })
        status.getContext().setState(new SendRequestState(
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
        ));
        await status.getRequestStatusService().setStatusService(status.getTransferCode(), status.getAmount(), this.getStatus())
        return status.getContext().getState().run(status.getTransferCode(), status.getAmount(), token)
    }
}