import { Connection } from "mysql";
import { InsertRes } from "../models/SlifeInterface";
import QueryBuilder from "./queryBuilder";

class Insert {
    private table: string | string[];
    private conn: Connection;
    private insertValue: object[];

    constructor(table: string | string[], insertValue: {[key: string ] : number | boolean | string}[], conn: Connection) {
        this.table = table;
        this.conn = conn;
        this.insertValue = insertValue;
    }

    // INTO: specify targetted table
    public into(table: string) : Insert {
        this.table = table;
        return this;
    }

    // Execute insert command
    public then(resolve, reject): Promise<InsertRes> {
        let promiseList: Promise<any>[] = []

        if (!this.table)
            throw "Error: Table name is undefined."

        if (this.insertValue.length == 0 )
            throw "Error: Insert value is undefined."

        this.insertValue.forEach(obj => {
            let listOfKeys: any[] = Object.keys(obj);
            let listOfValues: any[] = Object.values(obj);
            let query = `INSERT INTO ${this.table} (${listOfKeys.join(",")}) VALUES(${QueryBuilder.ParserList(listOfValues)})`;
            
            promiseList.push(new Promise((res, rej) => {
                this.conn.query(query, (err, result) => {
                    if (err) return rej(err);
                    
                    res(result);
                });
            }))
        })

        return promiseList.length == 1 ? promiseList.pop().then(resolve).catch(reject) : Promise.all(promiseList).then(resolve).catch(reject);
    }


    // for TypeScript usage
    public run = async(resolve = undefined, reject = undefined) : Promise<InsertRes> => this.then(resolve, reject);
}

export default Insert;