import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";

export abstract class AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    protected constructor(private status: string) {}

    getStatus(): string {
        return this.status;
    }

    abstract process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface>
}