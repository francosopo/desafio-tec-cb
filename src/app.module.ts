import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostgresDatabase} from "./domain/db/postgres.db";
import {ConfigService} from "@nestjs/config";
import {PaymentsModule} from "./domain/payments/payments.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username:process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize:false,
  })],
  controllers: [AppController],
  providers: [AppService, ConfigService, PostgresDatabase, PaymentsModule],
})
export class AppModule {}
