import { string } from "mathjs";

export type Where = {
    columns: string;
    operator: string;
    value: string;
}

export type ConnParameters = {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number
}

export type OrderByClause = {
    columns: string;
    order?: string;
}
