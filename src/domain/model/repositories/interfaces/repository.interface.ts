import {DataSource} from "typeorm";

export interface RepositoryInterface
{
    getDataSource(): DataSource;
}