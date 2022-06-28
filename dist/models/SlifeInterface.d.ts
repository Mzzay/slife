export declare type Where = {
    columns: string;
    operator: string;
    value: string;
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
