"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'production';
const schemaName = (() => {
    switch (env) {
        case 'development':
            return process.env.DEV_SCHEMA_NAME;
        case 'test':
            return process.env.PROD_SCHEMA_NAME;
        default:
            return process.env.PROD_SCHEMA_NAME;
    }
})();
exports.default = schemaName;
//# sourceMappingURL=config.js.map