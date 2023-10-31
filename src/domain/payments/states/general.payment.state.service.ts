import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {PaymentInterface} from "../interfaces/payment.interface";
import {AssertPaymentService} from "../helpers/assert.payment.service";
import {RequestStatusService} from "../helpers/request.status.service";
import {InitialPaymentState} from "./initial.state";
import {PaymentStateServiceInterface} from "../interfaces/payment.state.service.interface";
import {Configuration} from "../../config/configuration";
import {GeneralPaymentResponseInterface} from "../interfaces/general.payment.response.interface";
import {PaymentsToGeneralPaymentsRepository} from "../../model/repositories/payments.to.general.payments.repository";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GeneralPaymentStateService implements PaymentStateServiceInterface
{
    private state: PaymentInterface
    private entity: PaymentsToGeneralPayment;
    constructor(private httpService: HttpService,
                private assertPaymentService: AssertPaymentService,
                private requestStatusService: RequestStatusService,
                private config: Configuration,
                @InjectRepository(PaymentsToGeneralPayment)
                private transactionTable: Repository<PaymentsToGeneralPayment>) {
    }

    setState(state: PaymentInterface): void {
        this.state = state;
    }
    getState(): PaymentInterface {
        return this.state;
    }

    runTransaction(transferCode: string, amount: number)
    {
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


        return this.state.run<GeneralPaymentResponseInterface>(transferCode, amount, this.transactionTable,process.env.GENERAL_PAYMENT_TOKEN);
    }
}