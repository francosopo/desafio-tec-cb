import {Module} from "@nestjs/common";
import {DataSource} from "typeorm";
import {BalanceRepository} from "./balance.repository";
import {PaymentsToGeneralPaymentsRepository} from "./payments.to.general.payments.repository";

@Module({
    providers: [DataSource, BalanceRepository, PaymentsToGeneralPaymentsRepository],
    exports: [PaymentsToGeneralPaymentsRepository]
})
export class RepositoryModule {}