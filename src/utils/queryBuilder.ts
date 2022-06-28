import { OrderByClause, Where } from "../models/SlifeInterface";

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
        let listOfKeys: string[] = Object.keys(config);
        let listOfValues: string[] = Object.values(config);

        if (listOfKeys.length == 0)
            throw "Error: Update request needs setter."

        return listOfKeys.map((e,i) => `${e} = '${listOfValues[i]}'`).join(', ');
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
}

export default QueryBuilder;