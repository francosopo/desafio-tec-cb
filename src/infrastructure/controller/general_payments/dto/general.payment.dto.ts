import {IsNumber, IsString} from "class-validator";

export class GeneralPaymentBodyDTO
{
    @IsString()
    transferCode:string;

    @IsNumber()
    amount: number;
}

export class GeneralPaymentHeaders
{
    @IsString()
    x_general_payment: string;

    @IsString()
    content_type:string;
}