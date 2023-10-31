import {PaymentStatusInterface} from "./interfaces/payment.status.interface";
import {DatabasePaymentStatusInterface} from "./interfaces/database.payment.status.interface";
import {NullObjectPaymentStatus} from "./null_object/null.object.payment.status";
import {Injectable} from "@nestjs/common";
import {RepositoryInterface} from "../../model/repositories/interfaces/repository.interface";

@Injectable()
export class FactoryDatabasePaymentStatus implements DatabasePaymentStatusInterface
{
    private constructors: {[key: string]: new (status: string) => PaymentStatusInterface} = {};

    registerObject(type: string, constructor: new (status: string) => PaymentStatusInterface): void
    {
        this.constructors[type] = constructor;
    }

    createObject(type: string, status: string)
    {
        const constructor = this.constructors[type];
        if (constructor)
        {
            return new constructor(status);
        }
        return NullObjectPaymentStatus.getNullPaymentStatus();
    }

    existObject(type: string): boolean
    {
       return !!this.constructors[type];
    }
}
