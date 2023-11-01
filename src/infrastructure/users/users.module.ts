import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaymentsToGeneralPayment} from "../../domain/model/entities/payments.to.general.payment.model";
import {Users} from "../../domain/model/entities/user.model";
import {Charges} from "../../domain/model/entities/charges.model";
import {Balance} from "../../domain/model/entities/balance.model";
import {Payments} from "../../domain/model/entities/addition.balance.model";

@Module(
    {
        providers:[UsersService],
        exports: [UsersService],
        imports:[TypeOrmModule.forFeature([
            Users,
            Balance,
            Charges,
            Payments,
        ])]
    }
)
export class UsersModule {}