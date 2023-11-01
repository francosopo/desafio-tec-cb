import {Module} from "@nestjs/common";
import {AssertPaymentService} from "./assert.payment.service";
import {FactoryModuleDatabase} from "../factory/factory.module";
import {Balance} from "../../model/entities/balance.model";
import {Users} from "../../model/entities/user.model";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestStatusService} from "./request.status.service";
import {PaymentsToGeneralPayment} from "../../model/entities/payments.to.general.payment.model";

@Module(
    {
        imports: [FactoryModuleDatabase,TypeOrmModule.forFeature([Balance, Users, PaymentsToGeneralPayment])],
        providers:[AssertPaymentService, RequestStatusService],
        exports: [AssertPaymentService, RequestStatusService]
    }
)
export class HelpersModule {}