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
class Insert {
    constructor(table, insertValue, conn) {
        // for TypeScript usage
        this.run = (resolve = undefined, reject = undefined) => __awaiter(this, void 0, void 0, function* () { return this.then(resolve, reject); });
        this.table = table;
        this.conn = conn;
        this.insertValue = insertValue;
    }
    // INTO: specify targetted table
    into(table) {
        this.table = table;
        return this;
    }
    // Execute insert command
    then(resolve, reject) {
        let promiseList = [];
        this.insertValue.forEach(obj => {
            let listOfKeys = Object.keys(obj);
            let listOfValues = Object.values(obj);
            let query = `INSERT INTO ${this.table} (${listOfKeys.join(",")}) VALUES(${listOfValues.map(e => `'${e}'`).join(",")})`;
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
exports.default = Insert;
