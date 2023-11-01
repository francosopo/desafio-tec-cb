import {BaseException} from "./base.exception";

export class UserDoesNotHaveBalanceException extends BaseException
{
    constructor(msg: string) {
        super(msg, 400);
    }
}