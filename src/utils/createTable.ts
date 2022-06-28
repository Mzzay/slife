import { Connection } from "mysql";

class CreateTable {
    private table: string;
    private columns: object
    private conn: Connection;

    constructor(table: string, columns: object, conn: Connection ) {
        this.table = table;
        this.columns = columns;
        this.conn = conn;
    }

    
    public then(resolve, reject) {
        if (!this.table)
            throw "Error: Table name is undefined.";
        
        let columnsKeysList = Object.keys(this.columns);
        let columnsValuesList = Object.values(this.columns);

        if (columnsKeysList.length == 0)
            throw "Error: Columns to create are not provided.";


        let query = `CREATE TABLE ${this.table} (${columnsKeysList.map((e,i) => `${e} ${columnsValuesList[i]}`).join(",")})`;
        
        return new Promise((res, rej) => {
            this.conn.query(query, (err, result) => {
                if (err) return rej(err);
                
                res(result);
            });
        }).then(resolve).catch(reject);
    }

    // for TypeScript usage
    public run = async(resolve = undefined, reject = undefined) : Promise<any> => this.then(resolve, reject);
}

export default CreateTable;