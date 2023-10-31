import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports:[ConfigModule.forRoot({
        envFilePath:['.env.prod','.env.local'],
        isGlobal:true
    })]
})
export class Configuration
{
    constructor(private configService: ConfigService) {
    }
    getGeneralPaymentBaseUrl(): string
    {
        return this.configService.get<string>("GENERAL_PAYMENT_BASE_URL")
    }

    getGeneralPaymentToken(): string
    {
        return this.configService.get<string>('GENERAL_PAYMENT_TOKEN')
    }
}