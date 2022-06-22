"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Build partition of query
class QueryBuilder {
}
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
        throw "[Slife]: Update request needs setter.";
    return listOfKeys.map((e, i) => `${e} = '${listOfValues[i]}'`).join(', ');
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
exports.default = QueryBuilder;
