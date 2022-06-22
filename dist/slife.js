"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const DatabaseOperation_js_1 = require("./DatabaseOperation.js");
class SlifeConstructor extends DatabaseOperation_js_1.default {
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
exports.default = SlifeConstructor;
function instanceOfConnParameters(object) {
    try {
        return 'host' in object;
    }
    catch (_a) {
        return false;
    }
    ;
}
// async function test() {
//     let r1 = new SlifeConstructor({
//         host: "localhost",
//         database: "ORM",
//         password: "password",
//         user: "anisc"
//     });
//     r1.end();
// }
// test()
