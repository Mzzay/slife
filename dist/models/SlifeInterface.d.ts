export declare type Where = {
    columns: string;
    operator: string;
    value: string | number;
};
export declare type ConnParameters = {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number;
};
export declare type OrderByClause = {
    columns: string;
    order?: string;
};
export interface SelectSQL {
    whereValue: Where[];
    limitNumber: number;
    offsetNumber: number;
    orderByList: OrderByClause[];
}
export declare type InsertRes = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
};
