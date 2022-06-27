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
    public where(columns: string, operator: string, value: string): Select<T> {
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

    // Execute the query
    public then(resolve, reject): Promise<T[]> {
        let query = `SELECT ${this.columns} FROM ${this.table} `;

        let methodList: string[] = [
            QueryBuilder.Where(this.whereValue),
            QueryBuilder.LimitAndOffset(this.limitNumber, this.offsetNumber),
            QueryBuilder.OrderBy(this.orderByList),
        ];

        query = query.concat(methodList.map(e => e).join(" "));
        
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