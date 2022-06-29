import { Connection } from "mysql";
import CreateTable from "./utils/createTable";
import Delete from "./utils/delete";
import Insert from "./utils/insert";
import Select from "./utils/select";
import Update from "./utils/update";
declare class DatabaseOperation {
    conn: Connection;
    constructor(conn?: Connection);
    select<T>(columns: string | string[]): Select<T>;
    insert(columns: {
        [key: string]: number | boolean | string;
    } | {
        [key: string]: number | boolean | string;
    }[]): Insert;
    createTable(tableName: string, columns: object): CreateTable;
    update(tableName: string, columns: {
        [key: string]: number | boolean | string;
    }): Update;
    delete(tableName: string | string[]): Delete;
    raw(command: string): Promise<any>;
}
export default DatabaseOperation;
