// Slife package - Anis Chtourou (Mzzay)
import { createConnection, Connection } from "mysql";
import DatabaseOperation from "./DatabaseOperation.js";
import { ConnParameters } from "./models/SlifeInterface";

class Slife extends DatabaseOperation {
    public constructor(connection: ConnParameters | string) {
        super()
        try {
            let useConnString: boolean; 
            if (instanceOfConnParameters(connection))
                useConnString = false;
            else if (typeof connection == "string")
                useConnString = true;
            else
                throw "Parameters provided were not correct.";
            
            let conn: Connection = createConnection(useConnString ? connection : {
                host: (<ConnParameters>connection).host,
                user:  (<ConnParameters>connection).user,
                password: (<ConnParameters>connection).password,
                database: (<ConnParameters>connection).database,
                port: (<ConnParameters>connection).port 
            });
            
            this.conn = conn;
        }catch(err){
            console.log("[Slife]: Error => ", err);
        }
    }

    public end() {
        this.conn.destroy(); 
    }
}

function instanceOfConnParameters(object: any): object is ConnParameters {
    try {
        return 'host' in object;
    }catch { return false };
}

export = Slife;