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

    @Column({
        type:"float",
        default:0
    })
    balance: number;

    @Column({type: "timestamptz"})
    updatedAt: string
}