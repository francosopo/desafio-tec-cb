import {ExceptionInterface} from "./interfaces/exception.interface";
import {HttpException} from "@nestjs/common";

export class BaseException extends HttpException implements ExceptionInterface
{
    constructor(msg: string, statusCode: number) {
        super(msg, statusCode);
    }

    getMessage(): string
    {
        return this.message
    }

    getStatus(): number {
        return super.getStatus();
    }
}