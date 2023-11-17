import {Module} from "@nestjs/common";
import {HelpersModule} from "./helpers/helpers.module";
import {HttpModule} from "@nestjs/axios";
import {GeneralPaymentStateService} from "./states/general.payment.state.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaymentsToGeneralPayment} from "../model/entities/payments.to.general.payment.model";
import {FactoryModuleDatabase} from "./factory/factory.module";
import {Charges} from "../model/entities/charges.model";
import {Balance} from "../model/entities/balance.model";
import {Users} from "../model/entities/user.model";

@Module({
    imports: [TypeOrmModule.forFeature([
        PaymentsToGeneralPayment,Users, Charges, Balance
    ]),HttpModule,FactoryModuleDatabase, HelpersModule],
    providers:[GeneralPaymentStateService],
    exports: [GeneralPaymentStateService]
})
export class PaymentsModule {}