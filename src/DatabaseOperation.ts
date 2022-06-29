import { Connection } from "mysql";
import CreateTable from "./utils/createTable";
import Delete from "./utils/delete";
import Insert from "./utils/insert";
import Select from "./utils/select";
import Update from "./utils/update";

class DatabaseOperation {
    public conn: Connection;

    constructor(conn?: Connection){
        this.conn = conn;
    }

    // SELECT: 
    public select<T>(columns: string | string[]): Select<T> {
        return new Select<T>(undefined, columns, undefined, this.conn);
    }

    // INSERT
    public insert(columns: {[key: string] : number | boolean | string} | {[key: string] : number | boolean | string}[]): Insert {
        let insertLine: {[key: string] : number | boolean | string}[] = Array.isArray(columns) ? columns : [columns];
        return new Insert(undefined, insertLine, this.conn);
    }

    // CREATE
    public createTable(tableName: string, columns: object): CreateTable {
        return new CreateTable(tableName, columns, this.conn);
    }

    // UPDATE
    public update(tableName: string, columns: {[key: string ] : number | boolean | string}) : Update {
        return new Update(tableName, columns, this.conn); 
    }

    // DELETE
    public delete(tableName: string | string[]): Delete {
        return new Delete(tableName, this.conn);
    }

    // RAW: brut sql command to execute.
    public async raw(command: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.conn.query(command, (err, result) => {
                if (err) return reject(err);
                
                resolve(result);
            });
        })
    }
}

export default DatabaseOperation;