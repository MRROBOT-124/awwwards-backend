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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const website_1 = require("./website");
let Tags = class Tags {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.websitesList = new core_1.Collection(this);
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Tags.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Tags.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Tags.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Tags.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Tags.prototype, "updatedAt", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => website_1.Website, website => website.tagsList),
    __metadata("design:type", Object)
], Tags.prototype, "websitesList", void 0);
Tags = __decorate([
    (0, type_graphql_1.InputType)(),
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Tags);
exports.Tags = Tags;
//# sourceMappingURL=tags.js.map