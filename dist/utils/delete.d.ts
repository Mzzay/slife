import { Connection } from "mysql";
declare class Delete {
    private table;
    private whereValue;
    private conn;
    constructor(table: string | string[], conn: Connection);
    where(columns: string, operator: string, value: string): Delete;
    then(resolve: any, reject: any): Promise<any>;
    run: (resolve?: any, reject?: any) => Promise<any>;
}
export default Delete;
