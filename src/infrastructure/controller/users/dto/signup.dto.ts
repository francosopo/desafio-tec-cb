import {IsEmail, IsNumber, IsString} from "class-validator";

export class SignupDTO
{
    @IsEmail()
    email: string;
    @IsString()
    password: string;

    @IsNumber()
    balance: number;
}