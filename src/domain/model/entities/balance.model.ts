import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Users} from "./user.model";

@Entity()
export class Balance
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Users)
    @JoinColumn()
    user: Users;

    @Column()
    balance: number;
}