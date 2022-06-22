export interface Where {
    columns: string;
    operator: string;
    value: string;
}
export interface ConnParameters {
    host: string;
    user: string;
    password: string;
    database: string;
    port?: number;
}
export interface OrderByClause {
    columns: string;
    order?: string;
}
