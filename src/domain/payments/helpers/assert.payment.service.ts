import {AssertPaymentInterface} from "../interfaces/assert.payment.interface";
import {Users} from "../../model/entities/user.model";
import {Injectable} from "@nestjs/common";
import {BaseException} from "../../exceptions/base.exception";
import {Repository} from "typeorm";
import {Balance} from "../../model/entities/balance.model";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDoesNotExistException} from "../../exceptions/user.does.not.exist.exception";
import {UserDoesNotHaveBalanceException} from "../../exceptions/user.does.not.have.balance.registered.exception";

@Injectable()
export class AssertPaymentService implements AssertPaymentInterface
{
    constructor(
        @InjectRepository(Balance)
        private balanceRepository: Repository<Balance>,
                @InjectRepository(Users)
                private userRepository: Repository<Users>) {
    }
    async canSendPayment(amount: number, transferCode: string): Promise<boolean>{
        let balance: number;
        let user: Users;
        try{
            user = await this.userRepository.findOneBy({
                email:transferCode
            })
            if (user == null)
            {
                throw new UserDoesNotExistException("User does not exist");
            }
            balance = (await this.balanceRepository.findOneBy({
                user: user
            })).balance;
            if (balance <= 0)
            {
                throw new UserDoesNotHaveBalanceException("User does not have enough balance");
            }
            return balance - amount >= 0;
        }catch (e: any) {
            if (e instanceof BaseException)
            {
                console.log(`Error while processing payment from ${user}: ${e.message}`)
                return false;
            }
            else
            {
                console.log(e);
                console.log(`Error while validation of user ${user} payment, amount: ${amount}}, balance ${balance}`);
                return false;
            }
        }

    }

}