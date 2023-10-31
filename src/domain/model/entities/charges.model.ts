import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./user.model";

@Entity()
export class Charges
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users, (user) => user.charges)
    user: Users;

    @Column()
    amount: number;
}