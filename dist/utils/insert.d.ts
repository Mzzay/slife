import { Connection } from "mysql";
declare class Insert {
    private table;
    private conn;
    private insertValue;
    constructor(table: string | string[], insertValue: object[], conn: Connection);
    into(table: string): Insert;
    then(resolve: any, reject: any): Promise<any>;
    run: (resolve?: any, reject?: any) => Promise<any>;
}
export default Insert;
