import {DatabaseInterface} from "./db.interface";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Module} from "@nestjs/common";


@Module({
    imports:[ConfigModule.forRoot({
        envFilePath:['.env.prod','.env.local'],
        isGlobal:true
    })]
})
export class PostgresDatabase implements DatabaseInterface
{
    constructor(private configService: ConfigService) {
    }
    getDatabaseHost(): string {
        return this.configService.get<string>('POSTGRES_HOST');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('POSTGRES_DB');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('POSTGRES_PASSWORD');
    }

    getDatabasePort(): string {
        return this.configService.get<string>('POSTGRES_PORT');
    }

    getDatabaseUser(): string {
        return this.configService.get<string>('POSTGRES_USER');
    }

}