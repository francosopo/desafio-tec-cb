import {PaymentStatusInterface} from "./interfaces/payment.status.interface";
import {DatabasePaymentStatusInterface} from "./interfaces/database.payment.status.interface";
import {NullObjectPaymentStatus} from "./null_object/null.object.payment.status";
import {Injectable, OnModuleInit} from "@nestjs/common";
import {Repository} from "typeorm";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {InjectRepository} from "@nestjs/typeorm";
import {Done} from "./objects/transaction.done";
import {MakingPayment} from "./objects/making.payment";

@Injectable()
export class FactoryDatabasePaymentStatusService implements DatabasePaymentStatusInterface
{
    private constructors: {[key: string]: new (status: string, repository: Repository<any>) => PaymentStatusInterface} = {
        /*"Done": Done,
        "MakingPayment": MakingPayment*/
    };

    constructor(@InjectRepository (PaymentsToGeneralPayment)
                private paymentsRepository: Repository<PaymentsToGeneralPayment>) {
    }

    registerObject(type: string, constructor: new (status: string, repository: Repository<any>) => PaymentStatusInterface): void
    {
        if (!this.constructors[type]){
            this.constructors[type] = constructor;
        }
    }

    createObject(type: string, status: string)
    {
        const constructor = this.constructors[type];
        if (constructor)
        {
            return new constructor(status, this.paymentsRepository);
        }
        return NullObjectPaymentStatus.getNullPaymentStatus();
    }

    existObject(type: string): boolean
    {
       return !!this.constructors[type];
    }
}
