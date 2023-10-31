import {BaseException} from "./base.exception";

export class UserDoesNotHaveBalanceRegisteredException extends BaseException
{
    constructor(msg: string) {
        super(msg);
    }
}