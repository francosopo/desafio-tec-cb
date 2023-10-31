import {Injectable} from "@nestjs/common";
import {BalanceRepository} from "../../model/repositories/balance.repository";
import {Users} from "../../model/entities/user.model";
import {PaymentsToGeneralPaymentsRepository} from "../../model/repositories/payments.to.general.payments.repository";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {RequestStatusInterface} from "../interfaces/request.status.interface";
import {FactoryDatabasePaymentStatus} from "../factory/factory.database.payment.status";
import {PaymentStatusInterface} from "../factory/interfaces/payment.status.interface";
import {response} from "express";
import * as console from "console";

@Injectable()
export class RequestStatusService implements RequestStatusInterface
{
    constructor( private factoryService: FactoryDatabasePaymentStatus,
        private paymentsToGeneralPaymentRepository: PaymentsToGeneralPaymentsRepository){}

    async getStatusService(transferCode: string, amount: number): Promise<PaymentStatusInterface>
    {
        try{
            let response = await this.paymentsToGeneralPaymentRepository.getDataSource().getRepository(PaymentsToGeneralPayment).findOneBy({
                id: transferCode,
                amount: amount
            })
            if (response == null)
            {
                if (!this.factoryService.existObject('Making payment'))
                {
                    return this.factoryService.createObject('MakingPayment', 'Making payment');
                }
                return this.factoryService.createObject('MakingPayment', 'Making payment');
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
        let res = await this.paymentsToGeneralPaymentRepository.getDataSource().getRepository(PaymentsToGeneralPayment).findOneBy({
            id: transferCode,
            amount: amount,
        })
        res.status = state;
        await this.paymentsToGeneralPaymentRepository.getDataSource().getRepository(PaymentsToGeneralPayment).save(res);
    }
}