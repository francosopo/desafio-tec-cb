import {Module} from "@nestjs/common";
import {AssertPaymentService} from "./assert.payment.service";
import {BalanceRepository} from "../../model/repositories/balance.repository";
import {FactoryModuleDatabase} from "../factory/factory.module";

@Module(
    {
        providers:[AssertPaymentService, BalanceRepository, FactoryModuleDatabase],
        exports: [AssertPaymentService, BalanceRepository, FactoryModuleDatabase]
    }
)
export class HelpersModule {}
