import {Body, Controller, Post, Res, Headers} from "@nestjs/common";
import {SignupDTO} from "./dto/signup.dto";
import {UsersUsecases} from "../../../usecases/users/users.usecases";
import {UsersService} from "../../users/users.service";
import {Response} from 'express'
import {SignupHeadersDto} from "./dto/signup.headers.dto";
import {BaseException} from "../../../domain/exceptions/base.exception";
import {CannotProcessYourRequest} from "../../../domain/exceptions/cannot.process.your.request";
@Controller('users')
export class UsersController
{
    private usersUsecases: UsersUsecases;
    constructor(private usersService: UsersService) {
        this.usersUsecases = new UsersUsecases(this.usersService)
    }
    @Post('sign_up')
    async signUp(@Headers() headers: SignupHeadersDto, @Body() params: SignupDTO, @Res() res: Response)
    {
        try{
            if (!headers.x_the_sign_up_headder || headers.x_the_sign_up_headder != process.env.SIGNUP_HEADER)
            {
                console.log("The header is not correct")
                throw new CannotProcessYourRequest("Cannot process your request", 400);
            }
            if(!params.balance)
            {
                return this.usersUsecases.noBalance(params.email);
            }

            if (!params.email)
            {
                console.log()
                return this.usersUsecases.noEmail(params.email)
            }

            if (!params.password)
            {
                return this.usersUsecases.noPassword(params.email)
            }

            return await this.usersUsecases.signUp(params.email, params.password, params.balance, res);
        }catch (e)
        {
            if (e instanceof BaseException)
            {
                res.status(e.getStatus()).json(
                    {
                        status: e.getStatus(),
                        message: e.getMessage(),
                        details: "Cannot process your request"
                    }
                )
                return res;
            }
            else
            {
                res.status(500).json( {
                    status: 500,
                    message: "Internal server error",
                    details: "Internal server error",
                });
                return res;
            }
        }

    }
}