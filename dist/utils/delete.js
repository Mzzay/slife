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
const queryBuilder_1 = require("./queryBuilder");
class Delete {
    constructor(table, conn) {
        this.whereValue = [];
        // for TypeScript usage
        this.run = (resolve = undefined, reject = undefined) => __awaiter(this, void 0, void 0, function* () { return this.then(resolve, reject); });
        this.table = table;
        this.conn = conn;
    }
    // WHERE: condition
    where(columns, operator, value) {
        this.whereValue.push({
            columns,
            operator,
            value
        });
        return this;
    }
    then(resolve, reject) {
        if (!this.table)
            throw "Error: Table name is undefined.";
        if (!Array.isArray(this.table))
            this.table = [this.table];
        let promiseList = [];
        let query = ``;
        this.table.forEach(table => {
            query = `DELETE FROM ${table} ${queryBuilder_1.default.Where(this.whereValue)}`;
            promiseList.push(new Promise((res, rej) => {
                this.conn.query(query, (err, result) => {
                    if (err)
                        return rej(err);
                    res(result);
                });
            }));
        });
        return promiseList.length == 1 ? promiseList.pop().then(resolve).catch(reject) : Promise.all(promiseList).then(resolve).catch(reject);
    }
}
exports.default = Delete;
