import {PaymentInterface} from "./payment.interface";

export interface PaymentStateServiceInterface
{
    runTransaction(transferCode:string, amount: number): void;
    setState(state: PaymentInterface): void;
    getState(): PaymentInterface;
}