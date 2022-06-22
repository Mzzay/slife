import { OrderByClause, Where } from "../models/SlifeInterface";
declare class QueryBuilder {
    static Where: (config: Where[]) => string;
    static Set: (config: object) => string;
    static LimitAndOffset: (limit: number | undefined, offset: number | undefined) => string;
    static OrderBy: (config: OrderByClause[]) => string;
}
export default QueryBuilder;
