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
class CreateTable {
    constructor(table, columns, conn) {
        // for TypeScript usage
        this.run = (resolve = undefined, reject = undefined) => __awaiter(this, void 0, void 0, function* () { return this.then(resolve, reject); });
        this.table = table;
        this.columns = columns;
        this.conn = conn;
    }
    then(resolve, reject) {
        let columnsKeysList = Object.keys(this.columns);
        let columnsValuesList = Object.values(this.columns);
        let query = `CREATE TABLE ${this.table} (${columnsKeysList.map((e, i) => `${e} ${columnsValuesList[i]}`).join(",")})`;
        return new Promise((res, rej) => {
            this.conn.query(query, (err, result) => {
                if (err)
                    return rej(err);
                res(result);
            });
        }).then(resolve).catch(reject);
    }
}
exports.default = CreateTable;
