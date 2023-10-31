import {Module} from "@nestjs/common";
import {FactoryDatabasePaymentStatus} from "./factory.database.payment.status";
import {RepositoryModule} from "../../model/repositories/repository.module";

@Module({
    providers: [FactoryDatabasePaymentStatus],
    imports: [RepositoryModule],
    exports: [FactoryDatabasePaymentStatus]
})
export class FactoryModuleDatabase {}