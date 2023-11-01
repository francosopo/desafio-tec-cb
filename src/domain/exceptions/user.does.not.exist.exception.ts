import {BaseException} from "./base.exception";

export class UserDoesNotExistException extends BaseException
{
    constructor(msg: string) {
        super(msg, 404);
        Object.setPrototypeOf(this, UserDoesNotExistException.prototype);
    }
}