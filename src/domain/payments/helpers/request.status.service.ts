import {Injectable, OnModuleInit} from "@nestjs/common";;
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {RequestStatusInterface} from "../interfaces/request.status.interface";
import {PaymentStatusInterface} from "../factory/interfaces/payment.status.interface";
import * as console from "console";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {FactoryDatabasePaymentStatusService} from "../factory/factory.database.payment.status.service";
import {Done} from "../factory/objects/transaction.done";
import {MakingPayment} from "../factory/objects/making.payment";

@Injectable()
export class RequestStatusService implements RequestStatusInterface, OnModuleInit
{
    constructor( private factoryService: FactoryDatabasePaymentStatusService,
        @InjectRepository(PaymentsToGeneralPayment)
        private paymentsToGeneralPaymentRepository: Repository<PaymentsToGeneralPayment>){}
    onModuleInit(): any {
        this.factoryService.registerObject("Done", Done);
        this.factoryService.registerObject("MakingPayment",  MakingPayment);
    }
    async getStatusService(transferCode: string, amount: number): Promise<PaymentStatusInterface>
    {
        try{
            let response = await this.paymentsToGeneralPaymentRepository.findOneBy({
                from: transferCode,
                amount: amount
            })
            if (response == null)
            {
                if (!this.factoryService.existObject('MakingPayment'))
                {
                    return this.factoryService.createObject('MakingPayment', 'MakingPayment');
                }
                return this.factoryService.createObject('MakingPayment', 'MakingPayment');
            }
            if (!this.factoryService.existObject(response.status))
            {
                return this.factoryService.createObject(response.status, response.status);
            }
            return this.factoryService.createObject(response.status, response.status);
        }catch (e) {
            console.log(`Error from database while getting state for payment code: ${transferCode}, amount ${amount}`)
            return this.factoryService.createObject('InternalError', 'Internal Error')
        }
    }

    async setStatusService(transferCode: string, amount: number, state: string) {
        let res = await this.paymentsToGeneralPaymentRepository.findOneBy({
            from: transferCode,
            amount: amount,
        })
        res.status = state;
        await this.paymentsToGeneralPaymentRepository.save(res);
    }
}