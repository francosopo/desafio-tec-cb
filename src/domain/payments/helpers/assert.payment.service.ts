import {AssertPaymentInterface} from "../interfaces/assert.payment.interface";
import {Users} from "../../model/entities/user.model";
import {Injectable} from "@nestjs/common";
import {BalanceRepository} from "../../model/repositories/balance.repository";
import {BaseException} from "../../exceptions/base.exception";

@Injectable()
export class AssertPaymentService implements AssertPaymentInterface
{
    constructor(private balanceRepository: BalanceRepository,
                private user: Users) {
    }
    async canSendPayment(amount: number): Promise<boolean>{
        let balance: number;
        try{
            balance = await this.balanceRepository.getBalance(this.user);
            if (balance <= 0)
            {
                return false;
            }
            return balance - amount >= 0;
        }catch (e: any) {
            if (e instanceof BaseException)
            {
                console.log(`Error while processing payment from ${this.user}: ${e.message}`)
                return false;
            }
            else
            {
                console.log(`Error while valdiation of user ${this.user} payment, amount: ${amount}}, balance ${balance}`);
                return false;
            }
        }

    }

}