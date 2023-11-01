import {BaseException} from "./base.exception";

export class ErrorWithExternalPayment extends BaseException
{
    constructor(msg: string) {
        super(msg, 500);
    }
}