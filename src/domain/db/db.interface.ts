export interface DatabaseInterface
{
    getDatabaseHost(): string;
    getDatabasePort(): string;
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
}