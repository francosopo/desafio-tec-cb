import {PaymentStatusInterface} from "./payment.status.interface";

export interface DatabasePaymentStatusInterface
{
    registerObject(type: string, constructor: new (status: string) => PaymentStatusInterface): void
    createObject(type: string, status: string): PaymentStatusInterface;
    existObject(type: string): boolean;
}