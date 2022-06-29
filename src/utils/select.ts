import { Connection } from "mysql";
import { OrderByClause, Where } from "../models/SlifeInterface";
import QueryBuilder from "./queryBuilder";

class Select<T> {
    public conn: Connection;
    private table: string | string[];
    private columns: string;
    private whereValue: Where[] = [];
    
    private limitNumber: number;
    private offsetNumber: number;

    private orderByList: OrderByClause[] = [];

    private unionList: Select<any>[] = [];

    constructor(table: string | string[], columns: string | string[], whereValue: Where[] = [], conn: Connection) {
        this.table = table;
        this.whereValue = whereValue;
        this.conn = conn;

        // check columns
        if (Array.isArray(columns))
            columns = Array.from(columns).join(",")

        this.columns = columns;
    }

    // FROM: select table
    public from(tableName: string): Select<T> {
        this.table = tableName;
        return this;
    }

    // WHERE: condition
    public where(columns: string, operator: string, value: string | number): Select<T> {
        this.whereValue.push({
            columns,
            operator,
            value
        });
        return this;
    }

    // LIMIT
    public limit(n: number): Select<T> {
        this.limitNumber = n;
        return this;
    }

    // OFFSET
    public offset(n: number): Select<T> {
        this.offsetNumber = n;
        return this;
    }

    // ORDER BY
    public orderBy(config: OrderByClause[]): Select<T>{
        this.orderByList = config.map(e => this.initOrder(e));
        return this;
    }

    private initOrder(options?: Partial<OrderByClause>): OrderByClause {
        const defaults = {
            columns: '',
            order: 'ASC',
        };

        return {
            ...defaults, 
            ...options
        };
    };

    // UNION
    public union(instances: Select<any>[]): Select<T> {
        this.unionList = instances;
        return this;
    }

    public ToSQL(): string {
        if (!this.table)
            throw "Error: Table name is undefined."
        
        if (!this.columns)
            throw "Error: Columns are not provided."

        let query = `SELECT ${this.columns} FROM ${this.table} `;

        query = QueryBuilder.ToSQL(query, {
            whereValue: this.whereValue,
            limitNumber: this.limitNumber,
            offsetNumber: this.offsetNumber,
            orderByList: this.orderByList
        });

        return QueryBuilder.Clean(query);
    }

    // Execute the query
    public then(resolve, reject): Promise<T[]> {
        let query: string = this.ToSQL();
        
        this.unionList.forEach((instance: Select<any>) => {
            let instanceQuery: string = instance.ToSQL();
            query = query.concat(" UNION " + instanceQuery);
        })
        
        return new Promise<T[]>((res, rej) => {
            this.conn.query(query, (err, result) => {
                if (err) return rej(err);
                
                res(result);
            });
        }).then(resolve).catch(reject);
    }

    // for TypeScript usage
    public run = async(resolve = undefined, reject = undefined) : Promise<T[]> => this.then(resolve, reject);
}

export default Select;