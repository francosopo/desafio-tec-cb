import {Module} from "@nestjs/common";
import {FactoryDatabasePaymentStatusService} from "./factory.database.payment.status.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            PaymentsToGeneralPayment
        ])
    ],
    providers: [FactoryDatabasePaymentStatusService],
    exports: [FactoryDatabasePaymentStatusService]
})
export class FactoryModuleDatabase {}