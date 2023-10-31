/*import {RequestGeneralPaymentStateInterface} from "../interfaces/request.general.payment.state.interface";
import {PaymentInterface} from "../interfaces/payment.interface";
import {Users} from "../../model/entities/user.model";

export class RequestGeneralPaymentState implements RequestGeneralPaymentStateInterface
{
    constructor(private status:string) {}
    async process(state: PaymentInterface, transferCode: string, amount: number) {
        if (this.status == "SENDING REQUEST")
        {
            state.goToWaitResponse()
            return state.getContext().getState().run(transferCode, amount)
        }
    }
}*/