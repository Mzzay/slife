import { Connection } from "mysql";
import { InsertRes } from "../models/SlifeInterface";
declare class Insert {
    private table;
    private conn;
    private insertValue;
    constructor(table: string | string[], insertValue: {
        [key: string]: number | boolean | string;
    }[], conn: Connection);
    into(table: string): Insert;
    then(resolve: any, reject: any): Promise<InsertRes>;
    run: (resolve?: any, reject?: any) => Promise<InsertRes>;
}
export default Insert;
