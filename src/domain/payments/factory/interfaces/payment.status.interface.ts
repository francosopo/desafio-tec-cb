import {PaymentInterface} from "../../interfaces/payment.interface";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";
import {EntityTarget} from "typeorm";

export interface PaymentStatusInterface
{
    getStatus(): string;
    process(status: PaymentInterface, token: string): Promise<PaymentResponseInterface>;
}