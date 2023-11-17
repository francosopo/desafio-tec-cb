import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./user.model";

@Entity()
export class Charges
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:"timestamptz"})
    timestamp: string;

    @ManyToOne(() => Users, (user) => user.charges)
    user: Users;

    @Column({
        type:"float",
        default:0
    })
    amount: number;
}