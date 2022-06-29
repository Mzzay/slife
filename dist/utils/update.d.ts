import { Connection } from "mysql";
declare class Update {
    private table;
    private columns;
    private conn;
    private whereValue;
    constructor(table: string | string[], columns: {
        [key: string]: number | boolean | string;
    }, conn: Connection);
    where(columns: string, operator: string, value: string): Update;
    then(resolve: any, reject: any): Promise<any>;
    run: (resolve?: any, reject?: any) => Promise<any>;
}
export default Update;
