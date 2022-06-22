import { Connection, ConnectionConfig } from "mysql";
import { Where } from "../models/SlifeInterface";
import QueryBuilder from "./queryBuilder";

class Update {
    private table: string | string[];
    private columns: object;
    private conn: Connection;
    private whereValue: Where[] = [];

    constructor(table: string | string[], columns: object, conn: Connection) {
        this.table = table;
        this.columns = columns;
        this.conn = conn;
    }

    // WHERE: condition
    public where(columns: string, operator: string, value: string): Update {
        this.whereValue.push({
            columns,
            operator,
            value
        });
        return this;
    }
    
    // Execute the query
    public then(resolve, reject): Promise<any> {
        if (this.columns == undefined)
            reject("Error: columns is undefined.");
        
        let promiseList: Promise<any>[] = [];
        
        if (!Array.isArray(this.table))
            this.table = [this.table];

        this.table.forEach(table => {
            let query = `UPDATE ${table} SET ${QueryBuilder.Set(this.columns)} ${QueryBuilder.Where(this.whereValue)}`
    
            promiseList.push(new Promise((res, rej) => {
                this.conn.query(query, (err, result) => {
                    if (err) return rej(err);
                    
                    res(result);
                });
            }));
        })

        return promiseList.length == 1 ? promiseList.pop().then(resolve).catch(reject) : Promise.all(promiseList).then(resolve).catch(reject);
    }


    // for TypeScript usage
    public run = async(resolve = undefined, reject = undefined) : Promise<any> => this.then(resolve, reject);
}

export default Update;