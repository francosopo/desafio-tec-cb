import {GeneralPaymentStateService} from "../../domain/payments/states/general.payment.state.service";
import {PaymentResponseInterface} from "../../domain/payments/interfaces/payment.response.interface";

export class GeneralPaymentUsecases
{
    constructor(private generalPaymentService: GeneralPaymentStateService) {}

    async executePayment(transferCode: string, amount: number):Promise<PaymentResponseInterface>
    {
        return await this.generalPaymentService.runTransaction(transferCode, amount);
    }
}