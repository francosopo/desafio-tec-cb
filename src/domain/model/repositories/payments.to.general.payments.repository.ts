import {AbstractRepository} from "./abstract.repository";
import {RepositoryInterface} from "./interfaces/repository.interface";
import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";

@Injectable()
export class PaymentsToGeneralPaymentsRepository extends AbstractRepository implements RepositoryInterface
{
    constructor(dataSource: DataSource) {
        super(dataSource);
    }
}