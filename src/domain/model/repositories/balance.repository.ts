import {Injectable} from "@nestjs/common";
import {Users} from "../entities/user.model";
import {Balance} from "../entities/balance.model";
import {DataSource} from "typeorm";
import {AbstractRepository} from "./abstract.repository";
import {UserDoesNotExistException} from "../../exceptions/user.does.not.exist.exception";
import {
    UserDoesNotHaveBalanceRegisteredException
} from "../../exceptions/user.does.not.have.balance.registered.exception";

@Injectable()
export class BalanceRepository extends AbstractRepository
{
    constructor(dataSource: DataSource) {
        super(dataSource)
    }

    async getBalance(user: Users): Promise<number>
    {
        let userExist: Users = (await this.getDataSource().getRepository(Users).findOneBy({
            id: user.id
        }))
        if (userExist == null)
        {
            throw new UserDoesNotExistException("User does not exist");
        }
        let balance: Balance | null = (await this.getDataSource().getRepository(Balance).findOneBy({
            user: user
        }))

        if (balance == null)
        {
            throw new UserDoesNotHaveBalanceRegisteredException("User does not have balance registered");
        }
        return balance.balance;
    }
}