import DatabaseOperation from "./DatabaseOperation.js";
interface ConnParameters {
    host: string;
    user: string;
    password: string;
    database: string;
}
export default class SlifeConstructor extends DatabaseOperation {
    constructor(connection: ConnParameters | string);
    end(): void;
}
export {};
