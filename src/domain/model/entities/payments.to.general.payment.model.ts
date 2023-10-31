import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Users} from "./user.model";

@Entity()
export class PaymentsToGeneralPayment
{
    @PrimaryColumn()
    id: string

    @Column()
    amount: number;

    @Column()
    status: string;
}