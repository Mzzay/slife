"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
class Generator {
    constructor(customType) {
        for (const key in customType) {
            this[key] = customType[key];
        }
    }
}
exports.Generator = Generator;
