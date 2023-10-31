import {PaymentStatusInterface} from "../interfaces/payment.status.interface";
import {PaymentInterface} from "../../interfaces/payment.interface";
import {EntityTarget} from "typeorm";
import {PaymentResponseInterface} from "../../interfaces/payment.response.interface";

export class NullObjectPaymentStatus implements PaymentStatusInterface
{
    private status: string = "NULL"
    private static obj: PaymentStatusInterface;

    private constructor() {}

    getStatus(): string
    {
        return this.status;
    }

    static getNullPaymentStatus(): PaymentStatusInterface
    {
        if (!this.obj)
        {
            this.obj = new NullObjectPaymentStatus();
            return this.obj;
        }
        return this.obj;
    }

    process(status: PaymentInterface, e: EntityTarget<any>, token: string): Promise<PaymentResponseInterface> {
        return Promise.resolve({status:0,
        message:"",
        details:""});
    }
}