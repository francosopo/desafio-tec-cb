import {BaseException} from "./base.exception";
import {ExceptionInterface} from "./interfaces/exception.interface";

export class CannotProcessYourRequest extends BaseException implements ExceptionInterface
{
    constructor(message: string, status: number) {
        super(message,status);
    }

}