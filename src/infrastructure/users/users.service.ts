import {Repository} from "typeorm";
import {Users} from "../../domain/model/entities/user.model";
import {InjectRepository} from "@nestjs/typeorm";
import {HttpStatus, Injectable} from "@nestjs/common";
import {Response} from 'express'
import {Balance} from "../../domain/model/entities/balance.model";
import * as bcrypt from 'bcrypt';
import {Charges} from "../../domain/model/entities/charges.model";
import {Payments} from "../../domain/model/entities/addition.balance.model";
@Injectable()
export class UsersService
{
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        @InjectRepository(Balance)
        private balanceRespository: Repository<Balance>,
        @InjectRepository(Charges)
        private chargesRepository: Repository<Charges>,
        @InjectRepository(Payments)
        private paymentsRepository: Repository<Payments>
    ) {}

    async signUp(email: string, password: string, balance: number, res: Response)
    {
        let user = await this.userRepository.findOneBy({
            email: email
        });
        if (user)
        {
            res.status(HttpStatus.OK).json({
                status: 200,
                message: "Already exist",
                details: `This user ${email} already exist in database`
            })
            return res;
        }
        await this.userRepository.manager.transaction(async(transEntityManager) =>{
            let newUser: Users = new Users();
            let newBalance: Balance = new Balance();
            newBalance.user = newUser;
            newBalance.balance = balance;
            newBalance.updatedAt = new Date().toISOString();
            let newCharges: Charges = new Charges();
            newCharges.user = newUser;
            newCharges.amount = 0;
            newCharges.timestamp= new Date().toISOString();
            let newPayment: Payments = new Payments();
            newPayment.user = newUser;
            newPayment.amount = 0;
            newUser.email = email;
            newUser.balance = [newBalance];
            newUser.charges = [newCharges];
            newUser.payments = [newPayment];
            newUser.encryptedPassword = await bcrypt.hash(password, parseInt(process.env.HASHING_SALT))
            await transEntityManager.save<Users>(newUser);
            await transEntityManager.save<Balance>(newBalance);
            await transEntityManager.save<Charges>(newCharges);
            await transEntityManager.save<Payments>(newPayment);
        })
        res.status(HttpStatus.CREATED).json(
            {
                status: 201,
                message: "Created",
                details: "User created successfully"
            }
        )
        return res;
    }
}