"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SchemaType {
    constructor(config) {
        if (config != undefined)
            return;
        for (let key in config) {
            this[key] = config[key];
        }
    }
}
exports.default = SchemaType;
