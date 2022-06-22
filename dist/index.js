"use strict";
// Slife package - Anis Chtourou (Mzzay)
const mysql_1 = require("mysql");
const DatabaseOperation_js_1 = require("./DatabaseOperation.js");
class Slife extends DatabaseOperation_js_1.default {
    constructor(connection) {
        super();
        try {
            let useConnString;
            if (instanceOfConnParameters(connection))
                useConnString = false;
            else if (typeof connection == "string")
                useConnString = true;
            else
                throw "Parameters provided were not correct.";
            let conn = (0, mysql_1.createConnection)(useConnString ? connection : {
                host: connection.host,
                user: connection.user,
                password: connection.password,
                database: connection.database,
                port: connection.port
            });
            this.conn = conn;
        }
        catch (err) {
            console.log("[Slife]: Error => ", err);
        }
    }
    end() {
        this.conn.destroy();
    }
}
function instanceOfConnParameters(object) {
    try {
        return 'host' in object;
    }
    catch (_a) {
        return false;
    }
    ;
}
module.exports = Slife;
