import Slife = require("..");
import { OrderByClause, SelectSQL, Where } from "../models/SlifeInterface";
import Select from "./select";

// Build partition of query
class QueryBuilder {
    // building WHERE query for SELECT, UPDATE, DELETE
    static Where = (config: Where[]): string => {
        if (!(config.length > 0))
            return "";

        let partition: string = `WHERE ${
            config.map(obj => {
                return Object.values(obj).map((e,i) => i == 2 ? `'${e}'` : e).join(" ");
            }).join(" AND ")
        }`

        return partition;
    }

    // building SET query for UPDATE
    static Set = (config: object): string => {
        let listOfKeys: any[] = Object.keys(config);
        let listOfValues: any[] = Object.values(config);

        if (listOfKeys.length == 0)
            throw "Error: Update request needs setter."

        return listOfKeys.map((e,i) => `${e} = ${this.ParserString(listOfValues[i])}`).join(', ');
    }

    // building LIMIT / OFFSET query for SELECT
    static LimitAndOffset = (limit: number | undefined, offset: number | undefined): string => {
        let formattedLimit: string = limit != undefined ? `LIMIT ${limit}`: '';
        let formattedOffset: string = offset != undefined ? `OFFSET ${offset}`: '';

        return `${formattedLimit} ${formattedOffset}`;
    }

    // building ORDERBY query for SELECT
    static OrderBy = (config: OrderByClause[]): string => {
        if (!(config.length > 0))
            return "";
        
        let partition: string = `ORDER BY ${config.map(e => {
            return `${e.columns} ${e.order}`
        }).join(", ")}`
        return partition;
    }

    // build full SQL query
    static ToSQL = (base: string, config: SelectSQL): string => {
        let query = base;

        let methodList: string[] = [
            this.Where(config.whereValue),
            this.LimitAndOffset(config.limitNumber, config.offsetNumber),
            this.OrderBy(config.orderByList),
        ];

        query = query.concat(methodList.map(e => e).join(" "));

        return query;
    }

    // clean space from the query
    static Clean = (query: string): string => query.split(' ').filter(e => e.length > 0).join(" ");

    static ParserList = (listOfValues: any[]) => {
        return listOfValues.map(e => {
            return this.ParserString(e);
        }).join(",");
    }

    static ParserString = (key: string): number | string | boolean => {
        if (typeof key == "boolean" || typeof key == "number")
            return key;
        
        key = key.split("").map(e => e == '\'' ? '\\\'' : e).join("");
        return `'${key}'`;
    }
}

export default QueryBuilder;