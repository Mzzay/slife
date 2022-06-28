import { Connection } from "mysql";
import { Where } from "../models/SlifeInterface";
import QueryBuilder from "./queryBuilder";

class Delete {
    private table: string | string[];
    private whereValue: Where[] = [];
    private conn: Connection;

    constructor(table: string | string[], conn: Connection) {
        this.table = table;
        this.conn = conn;
    }

    // WHERE: condition
    public where(columns: string, operator: string, value: string): Delete {
        this.whereValue.push({
            columns,
            operator,
            value
        });
        return this;
    }

    public then(resolve, reject): Promise<any> {
        if (!this.table)
            throw "Error: Table name is undefined.";
            
        if (!Array.isArray(this.table))
            this.table = [this.table];

        let promiseList: Promise<any>[] = [];
        let query = ``;

        this.table.forEach(table => {
            query = `DELETE FROM ${table} ${QueryBuilder.Where(this.whereValue)}`;
            promiseList.push(new Promise((res, rej) => {
                this.conn.query(query, (err, result) => {
                    if (err) return rej(err);
                    
                    res(result);
                });
            }))
        });

        return promiseList.length == 1 ? promiseList.pop().then(resolve).catch(reject) : Promise.all(promiseList).then(resolve).catch(reject);
    }

    // for TypeScript usage
    public run = async(resolve = undefined, reject = undefined) : Promise<any> => this.then(resolve, reject);
}

export default Delete;