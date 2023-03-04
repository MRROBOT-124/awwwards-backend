"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const tags_1 = require("./entities/tags");
const user_1 = require("./entities/user");
const website_1 = require("./entities/website");
const envConfig_1 = __importDefault(require("./envConfig"));
console.log(envConfig_1.default);
exports.default = {
    entities: [user_1.User, website_1.Website, tags_1.Tags],
    host: process.env.POSTGRES_HOST,
    dbName: 'awwwards',
    user: 'postgres',
    password: 'A!m@12ith',
    type: 'postgresql',
    debug: !constants_1.__prod__,
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pathTs: path_1.default.join(__dirname, '../src/migrations'),
    }
};
//# sourceMappingURL=mikro-orm.config.js.map