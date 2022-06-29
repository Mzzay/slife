export type Where = {
    columns: string;
    operator: string;
    value: string | number;
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

export interface SelectSQL {
    whereValue: Where[];
    limitNumber: number;
    offsetNumber: number;
    orderByList: OrderByClause[];
}

export type InsertRes = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}