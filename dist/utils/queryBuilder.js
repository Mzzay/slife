"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Build partition of query
class QueryBuilder {
}
_a = QueryBuilder;
// building WHERE query for SELECT, UPDATE, DELETE
QueryBuilder.Where = (config) => {
    if (!(config.length > 0))
        return "";
    let partition = `WHERE ${config.map(obj => {
        return Object.values(obj).map((e, i) => i == 2 ? `'${e}'` : e).join(" ");
    }).join(" AND ")}`;
    return partition;
};
// building SET query for UPDATE
QueryBuilder.Set = (config) => {
    let listOfKeys = Object.keys(config);
    let listOfValues = Object.values(config);
    if (listOfKeys.length == 0)
        throw "Error: Update request needs setter.";
    return listOfKeys.map((e, i) => `${e} = ${_a.ParserString(listOfValues[i])}`).join(', ');
};
// building LIMIT / OFFSET query for SELECT
QueryBuilder.LimitAndOffset = (limit, offset) => {
    let formattedLimit = limit != undefined ? `LIMIT ${limit}` : '';
    let formattedOffset = offset != undefined ? `OFFSET ${offset}` : '';
    return `${formattedLimit} ${formattedOffset}`;
};
// building ORDERBY query for SELECT
QueryBuilder.OrderBy = (config) => {
    if (!(config.length > 0))
        return "";
    let partition = `ORDER BY ${config.map(e => {
        return `${e.columns} ${e.order}`;
    }).join(", ")}`;
    return partition;
};
// build full SQL query
QueryBuilder.ToSQL = (base, config) => {
    let query = base;
    let methodList = [
        _a.Where(config.whereValue),
        _a.LimitAndOffset(config.limitNumber, config.offsetNumber),
        _a.OrderBy(config.orderByList),
    ];
    query = query.concat(methodList.map(e => e).join(" "));
    return query;
};
// clean space from the query
QueryBuilder.Clean = (query) => query.split(' ').filter(e => e.length > 0).join(" ");
QueryBuilder.ParserList = (listOfValues) => {
    return listOfValues.map(e => {
        return _a.ParserString(e);
    }).join(",");
};
QueryBuilder.ParserString = (key) => {
    if (typeof key == "boolean" || typeof key == "number")
        return key;
    key = key.split("").map(e => e == '\'' ? '\\\'' : e).join("");
    return `'${key}'`;
};
exports.default = QueryBuilder;
