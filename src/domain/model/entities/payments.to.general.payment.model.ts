import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./user.model";

@Entity()
export class PaymentsToGeneralPayment
{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type:"varchar",
        length:255
    })
    from: string

    @Column({
        type:"float"
    })
    amount: number;

    @Column({
        type:"varchar",
        length:255
    })
    status: string;
}