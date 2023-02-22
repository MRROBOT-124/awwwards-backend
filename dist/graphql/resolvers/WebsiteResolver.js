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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteResolver = void 0;
const website_1 = require("../../entities/website");
const type_graphql_1 = require("type-graphql");
const websiteDetails_1 = require("../models/websiteDetails");
let WebsiteResolver = class WebsiteResolver {
    getAllWebsites({ em }) {
        return em.fork().find(website_1.Website, {});
    }
    async submitWebsite(websiteInput, { em }) {
        const website = em.fork().create(website_1.Website, websiteInput);
        await em.fork().persistAndFlush(website);
        return website;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [website_1.Website]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebsiteResolver.prototype, "getAllWebsites", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => website_1.Website),
    __param(0, (0, type_graphql_1.Arg)("websiteInput", () => websiteDetails_1.WebsiteDetails)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_1.Website, Object]),
    __metadata("design:returntype", Promise)
], WebsiteResolver.prototype, "submitWebsite", null);
WebsiteResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], WebsiteResolver);
exports.WebsiteResolver = WebsiteResolver;
//# sourceMappingURL=WebsiteResolver.js.map