export interface PaymentResponseInterface
{
    transferCode: string;
    status: number;
    message: string;
    details: string | string[]
}