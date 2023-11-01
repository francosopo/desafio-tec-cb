import {Body, Controller, Post, Res} from "@nestjs/common";
import {SignupDTO} from "./dto/signup.dto";
import {UsersUsecases} from "../../../usecases/users/users.usecases";
import {UsersService} from "../../users/users.service";
import {Response} from 'express'
@Controller('users')
export class UsersController
{
    private usersUsecases: UsersUsecases;
    constructor(private usersService: UsersService) {
        this.usersUsecases = new UsersUsecases(this.usersService)
    }
    @Post('sign_up')
    async signUp(@Body() params: SignupDTO, @Res() res: Response)
    {
        if(!params.balance)
        {
            return this.usersUsecases.noBalance(params.email);
        }

        if (!params.email)
        {
            return this.usersUsecases.noEmail(params.email)
        }

        if (!params.password)
        {
            return this.usersUsecases.noPassword(params.email)
        }

        return await this.usersUsecases.signUp(params.email, params.password, params.balance, res);
    }
}