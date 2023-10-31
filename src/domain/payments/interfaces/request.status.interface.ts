import {PaymentStatusInterface} from "../factory/interfaces/payment.status.interface";

export interface RequestStatusInterface
{
    getStatusService(transferCode: string, amount: number):Promise<PaymentStatusInterface>;
    setStatusService(transferCode: string, amount: number, state: string): void;
}