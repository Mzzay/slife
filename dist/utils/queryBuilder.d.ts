import { OrderByClause, SelectSQL, Where } from "../models/SlifeInterface";
declare class QueryBuilder {
    static Where: (config: Where[]) => string;
    static Set: (config: object) => string;
    static LimitAndOffset: (limit: number | undefined, offset: number | undefined) => string;
    static OrderBy: (config: OrderByClause[]) => string;
    static ToSQL: (base: string, config: SelectSQL) => string;
    static Clean: (query: string) => string;
    static ParserList: (listOfValues: any[]) => string;
    static ParserString: (key: string) => number | string | boolean;
}
export default QueryBuilder;
