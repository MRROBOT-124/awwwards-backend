"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolvers = void 0;
const user_1 = require("../../entities/user");
const type_graphql_1 = require("type-graphql");
const userDetails_1 = require("../models/userDetails");
const argon2_1 = __importDefault(require("argon2"));
let UserResolvers = class UserResolvers {
    getAllUsers({ em }) {
        return em.fork().find(user_1.User, {});
    }
    async registerUser(userDetails, { em }) {
        const hashedPassword = await argon2_1.default.hash(userDetails.password);
        userDetails.password = hashedPassword;
        const user = em.fork().create(user_1.User, userDetails);
        await em.fork().persistAndFlush(user);
        return user;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "getAllUsers", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("websiteInput", () => userDetails_1.UserDetails)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "registerUser", null);
UserResolvers = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolvers);
exports.UserResolvers = UserResolvers;
//# sourceMappingURL=UserResolvers.js.map