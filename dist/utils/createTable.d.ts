import { Connection } from "mysql";
declare class CreateTable {
    private table;
    private columns;
    private conn;
    constructor(table: string, columns: object, conn: Connection);
    then(resolve: any, reject: any): Promise<unknown>;
    run: (resolve?: any, reject?: any) => Promise<any>;
}
export default CreateTable;
