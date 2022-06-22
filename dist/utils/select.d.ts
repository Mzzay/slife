import { Connection } from "mysql";
import { OrderByClause, Where } from "../models/SlifeInterface";
declare class Select<T> {
    conn: Connection;
    private table;
    private columns;
    private whereValue;
    private limitNumber;
    private offsetNumber;
    private orderByList;
    constructor(table: string | string[], columns: string | string[], whereValue: Where[], conn: Connection);
    from(tableName: string): Select<T>;
    where(columns: string, operator: string, value: string): Select<T>;
    limit(n: number): Select<T>;
    offset(n: number): Select<T>;
    orderBy(config: OrderByClause[]): Select<T>;
    private initOrder;
    then(resolve: any, reject: any): Promise<T[]>;
    run: (resolve?: any, reject?: any) => Promise<T[]>;
}
export default Select;
