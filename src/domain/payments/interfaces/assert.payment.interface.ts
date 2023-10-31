
export interface AssertPaymentInterface
{
    canSendPayment(amount: number): Promise<boolean| string>;
}