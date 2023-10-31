import {PaymentInterface} from "../../domain/payments/interfaces/payment.interface";

export interface PaymentUsecasesInterface
{
    setState(state: PaymentInterface): void;
    getState(): PaymentInterface;
}