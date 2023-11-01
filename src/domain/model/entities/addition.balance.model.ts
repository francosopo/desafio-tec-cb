import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./user.model";

@Entity()
export class Payments
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users, (user) =>user.payments)
    user: Users;

    @Column({
        type:"float",
        default:0
    })
    amount: number;
}