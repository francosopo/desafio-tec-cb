import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {PaymentsToGeneralPayment} from "./payments.to.general.payment.model";
import {Charges} from "./charges.model";
import {Payments} from "./addition.balance.model";

@Entity()
export class Users
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    @Column()
    encryptedPassword: string

    @OneToMany(() => Charges,
        (charge) => charge.amount)
    charges: Charges[]

    @OneToMany(() => Payments,
        (payment) =>payment.amount)
    payments: Payments[]
}