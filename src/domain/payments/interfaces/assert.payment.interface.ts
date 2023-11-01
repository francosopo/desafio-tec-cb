
export interface AssertPaymentInterface
{
    canSendPayment(amount: number, transferCode: string): Promise<boolean| string>;
}