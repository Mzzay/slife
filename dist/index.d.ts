import DatabaseOperation from "./DatabaseOperation.js";
import { ConnParameters } from "./models/SlifeInterface";
declare class Slife extends DatabaseOperation {
    constructor(connection: ConnParameters | string);
    end(): void;
}
export = Slife;
