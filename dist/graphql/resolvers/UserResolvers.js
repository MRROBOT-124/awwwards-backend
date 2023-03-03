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
const userResponse_1 = require("../models/userResponse");
let UserResolvers = class UserResolvers {
    getAllUsers({ em }) {
        return em.fork().find(user_1.User, {});
    }
    async getUser({ em, req }) {
        if (!req.session.user.email) {
            console.log("Cookie is not set");
            return null;
        }
        const user = await em.fork().findOne(user_1.User, { email: req.session.user.email });
        return user;
    }
    async registerUser(userDetails, { em }) {
        const passwordRegEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let errors = [];
        if (!passwordRegEX.test(userDetails.password)) {
            errors.push({
                field: "password",
                message: "Password must gave special characeters, number and length should also be greater than 8"
            });
        }
        const hashedPassword = await argon2_1.default.hash(userDetails.password);
        userDetails.password = hashedPassword;
        const user = em.fork().create(user_1.User, userDetails);
        try {
            await em.fork().persistAndFlush(user);
        }
        catch (err) {
            if (err.detail.includes("username") && err.detail.includes("already exists.")) {
                errors.push({
                    field: "username",
                    message: "Username Already exists"
                });
            }
            if (err.detail.includes("email") && err.detail.includes("already exists.")) {
                errors.push({
                    field: "email",
                    message: "Email Already exists"
                });
            }
        }
        return { user: user, errors: errors };
    }
    async loginUser(userDetails, { em, req }) {
        let findUser = await em.fork().findOne(user_1.User, { username: userDetails.username });
        if (!findUser) {
            findUser = await em.fork().findOne(user_1.User, { email: userDetails.email });
            if (!findUser) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "User does not exists"
                        }
                    ]
                };
            }
        }
        const validate = await argon2_1.default.verify(findUser.password, userDetails.password);
        if (!validate) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Invalid Username/Password"
                    }
                ]
            };
        }
        req.session.user = {
            email: findUser.email
        };
        return { user: findUser };
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
    (0, type_graphql_1.Query)(() => user_1.User),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userResponse_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("userDetails", () => userDetails_1.UserDetails)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "registerUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userResponse_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("userDetails", () => userDetails_1.UserDetails)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolvers.prototype, "loginUser", null);
UserResolvers = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolvers);
exports.UserResolvers = UserResolvers;
//# sourceMappingURL=UserResolvers.js.map