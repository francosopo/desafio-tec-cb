import {PaymentInterface} from "./payment.interface";
import {Users} from "../../model/entities/user.model";
import {PaymentResponseInterface} from "./payment.response.interface";

export interface RequestGeneralPaymentStateInterface
{
    process( state: PaymentInterface, transferCode: string, amount: number): Promise<PaymentResponseInterface>
}