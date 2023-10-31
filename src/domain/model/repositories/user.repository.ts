import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {AbstractRepository} from "./abstract.repository";

@Injectable()
export class UserRepository extends AbstractRepository
{
    constructor(dataSource: DataSource) {
        super(dataSource)
    }

}