import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from "typeorm";
import {PaymentsToGeneralPayment} from "./payments.to.general.payment.model";
import {Charges} from "./charges.model";
import {Payments} from "./addition.balance.model";
import {Balance} from "./balance.model";

@Entity()
export class Users
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type:"varchar",
        length:255
    })
    email: string;

    @Column({
        type: "varchar",
        length:255
    })
    encryptedPassword: string

    @OneToMany(() => Charges,
        (charge) => charge.amount)
    charges: Charges[]

    @OneToMany(() => Payments,
        (payment) =>payment.amount)
    payments: Payments[]

    @OneToOne(() => Balance)
    balance: Balance[];
}