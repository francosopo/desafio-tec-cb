import {IsString} from "class-validator";

export class SignupHeadersDto
{
    @IsString()
    x_the_sign_up_headder: string;
}