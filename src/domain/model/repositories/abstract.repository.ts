import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {RepositoryInterface} from "./interfaces/repository.interface";

@Injectable()
export class AbstractRepository implements RepositoryInterface
{
    protected constructor(private dataSource: DataSource) {}

    getDataSource(): DataSource {
        return this.dataSource;
    }


}