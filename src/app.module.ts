import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostgresDatabase} from "./domain/db/postgres.db";
import {ConfigService} from "@nestjs/config";
import {PaymentsModule} from "./domain/payments/payments.module";
import {GeneralPaymentController} from "./infrastructure/controller/general_payments/general.payment.controller";
import {Payments} from "./domain/model/entities/addition.balance.model";
import {Balance} from "./domain/model/entities/balance.model";
import {Charges} from "./domain/model/entities/charges.model";
import {PaymentsToGeneralPayment} from "./domain/model/entities/payments.to.general.payment.model";
import {Users} from "./domain/model/entities/user.model";
import {UsersController} from "./infrastructure/controller/users/users.controller";
import {UsersModule} from "./infrastructure/users/users.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username:process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize:true,
    entities:[
        Payments,
        Balance,
        Charges,
        PaymentsToGeneralPayment,
        Users
    ],
      autoLoadEntities: true,
      migrations:['./migrations/*.ts']
  }),PaymentsModule,
      UsersModule],
  controllers: [AppController, GeneralPaymentController, UsersController],
  providers: [AppService, ConfigService, PostgresDatabase],
})
export class AppModule {}
