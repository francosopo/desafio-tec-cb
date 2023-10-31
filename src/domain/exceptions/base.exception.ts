import {ExceptionInterface} from "./interfaces/exception.interface";

export class BaseException extends Error implements ExceptionInterface
{
    constructor(msg: string) {
        super(msg);
    }
}