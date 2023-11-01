import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {PaymentInterface} from "../interfaces/payment.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {InitialPaymentState} from "./initial.state";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {Configuration} from "../../config/configuration";
import {GeneralPaymentResponseInterface} from "../interfaces/general.payment.response.interface";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {PaymentResponseInterface} from "../interfaces/payment.response.interface";
import {ErrorWithExternalPayment} from "../../exceptions/error.with.external.payment";

@Injectable()
export class GeneralPaymentStateService implements PaymentStateServiceInterface
{
    private state: PaymentInterface
    constructor(private httpService: HttpService,
                private assertPaymentService: AssertPaymentService,
                private requestStatusService: RequestStatusService,
                @InjectRepository(PaymentsToGeneralPayment)
                private transactionTable: Repository<PaymentsToGeneralPayment>) {
    }

    setState(state: PaymentInterface): void {
        this.state = state;
    }
    getState(): PaymentInterface {
        return this.state;
    }

    async runTransaction(transferCode: string, amount: number): Promise<PaymentResponseInterface>
    {
        const url = 'https://dev.developers-test.currencybird.cl/token?email=franco.seguel@ug.uchile.cl';
        let response =(await this.httpService.axiosRef.get(url))
        if (response.status != 200){
            throw new ErrorWithExternalPayment(`Cannot get token from external payment: ${url}`)
        }
        const token = response.data;
        this.state = new InitialPaymentState(
            this.assertPaymentService,
            this.requestStatusService,
            this.httpService,
            this.transactionTable,
            0,
            0,
            '',
            this,
            process.env.GENERAL_PAYMENT_BASE_URL,
        )
        return this.state.run<GeneralPaymentResponseInterface>(transferCode, amount, token);
    }
}