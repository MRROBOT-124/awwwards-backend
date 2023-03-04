"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const constants_1 = require("./constants");
exports.default = dotenv_1.default.config({
    path: constants_1.__ENV__,
    debug: true
});
//# sourceMappingURL=envConfig.js.map