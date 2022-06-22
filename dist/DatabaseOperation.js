"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTable_1 = require("./utils/createTable");
const delete_1 = require("./utils/delete");
const insert_1 = require("./utils/insert");
const select_1 = require("./utils/select");
const update_1 = require("./utils/update");
class DatabaseOperation {
    constructor(conn) {
        this.conn = conn;
    }
    // SELECT: 
    select(columns) {
        return new select_1.default(undefined, columns, undefined, this.conn);
    }
    // INSERT
    insert(columns) {
        let insertLine = Array.isArray(columns) ? columns : [columns];
        return new insert_1.default(undefined, insertLine, this.conn);
    }
    // CREATE
    createTable(tableName, columns) {
        return new createTable_1.default(tableName, columns, this.conn);
    }
    // UPDATE
    update(tableName, columns) {
        return new update_1.default(tableName, columns, this.conn);
    }
    // DELETE
    delete(tableName) {
        return new delete_1.default(tableName, this.conn);
    }
    // RAW: brut sql command to execute.
    raw(command) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.conn.query(command, (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result);
                });
            });
        });
    }
}
exports.default = DatabaseOperation;
