import {BaseException} from "./base.exception";
import {ExceptionInterface} from "./interfaces/exception.interface";

export class NoEmailProvided extends BaseException implements ExceptionInterface
{
    constructor(msg: string) {
        super(msg, 400);
    }

}