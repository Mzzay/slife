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
class Select {
    constructor(table, columns, whereValue = [], conn) {
        this.whereValue = [];
        this.orderByList = [];
        // for TypeScript usage
        this.run = (resolve = undefined, reject = undefined) => __awaiter(this, void 0, void 0, function* () { return this.then(resolve, reject); });
        this.table = table;
        this.whereValue = whereValue;
        this.conn = conn;
        // check columns
        if (Array.isArray(columns))
            columns = Array.from(columns).join(",");
        this.columns = columns;
    }
    // FROM: select table
    from(tableName) {
        this.table = tableName;
        return this;
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
    // LIMIT
    limit(n) {
        this.limitNumber = n;
        return this;
    }
    // OFFSET
    offset(n) {
        this.offsetNumber = n;
        return this;
    }
    // ORDER BY
    orderBy(config) {
        this.orderByList = config.map(e => this.initOrder(e));
        return this;
    }
    initOrder(options) {
        const defaults = {
            columns: '',
            order: 'ASC',
        };
        return Object.assign(Object.assign({}, defaults), options);
    }
    ;
    // Execute the query
    then(resolve, reject) {
        if (!this.table)
            throw "Error: Table name is undefined.";
        if (!this.columns)
            throw "Error: Columns are not provided.";
        let query = `SELECT ${this.columns} FROM ${this.table} `;
        let methodList = [
            queryBuilder_1.default.Where(this.whereValue),
            queryBuilder_1.default.LimitAndOffset(this.limitNumber, this.offsetNumber),
            queryBuilder_1.default.OrderBy(this.orderByList),
        ];
        query = query.concat(methodList.map(e => e).join(" "));
        return new Promise((res, rej) => {
            this.conn.query(query, (err, result) => {
                if (err)
                    return rej(err);
                res(result);
            });
        }).then(resolve).catch(reject);
    }
}
exports.default = Select;
