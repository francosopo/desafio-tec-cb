import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {EntityTarget} from "typeorm";

export abstract class AbstractPaymentDatabaseStatus implements PaymentStatusInterface
{
    constructor(private status: string) {}

    getStatus(): string {
        return this.status;
    }

    abstract process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface>
}