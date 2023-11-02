import {NoBalanceProvided} from "../../domain/exceptions/no.balance.provided";
import {NoEmailProvided} from "../../domain/exceptions/no.email.provided";
import {NoPasswordProvided} from "../../domain/exceptions/no.password.provided";
import {UsersService} from "../../infrastructure/users/users.service";
import {Response} from 'express'
export class UsersUsecases
{
    constructor(private usersService: UsersService) {}
    noBalance(email: string)
    {
        console.log("There is no balance provided")
        throw new NoBalanceProvided("No balance provided");
    }

    noEmail(email:string)
    {
        console.log("There is no email provided")
        throw new NoEmailProvided("No email provided");
    }

    noPassword(email: string)
    {
        console.log("No password provided")
        throw new NoPasswordProvided("No password provided");
    }

    async signUp(email:string, password: string, balance: number, res: Response){
        return await this.usersService.signUp(email, password, balance, res);
    }
}