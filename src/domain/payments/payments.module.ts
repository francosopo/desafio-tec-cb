import {Module} from "@nestjs/common";
import {PreparingRequestState} from "./states/preparing.request.state";
import {HelpersModule} from "./helpers/helpers.module";
import {HttpModule} from "@nestjs/axios";
import {GeneralPaymentStateService} from "./states/general.payment.state.service";
import {ConfigModule} from "@nestjs/config";
import {Configuration} from "../config/configuration";
import {RepositoryModule} from "../model/repositories/repository.module";

@Module({
    providers:[GeneralPaymentStateService],
    imports: [HttpModule, HelpersModule, RepositoryModule, Configuration],
    exports: [GeneralPaymentStateService]
})
export class PaymentsModule {}