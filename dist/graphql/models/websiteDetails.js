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
exports.WebsiteDetails = void 0;
const core_1 = require("@mikro-orm/core");
const tags_1 = require("../../entities/tags");
const type_graphql_1 = require("type-graphql");
let WebsiteDetails = class WebsiteDetails {
    constructor() {
        this.tagsList = new core_1.Collection(this);
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], WebsiteDetails.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WebsiteDetails.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WebsiteDetails.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WebsiteDetails.prototype, "company", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WebsiteDetails.prototype, "authorName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WebsiteDetails.prototype, "link", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], WebsiteDetails.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], WebsiteDetails.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [tags_1.Tags]),
    __metadata("design:type", Object)
], WebsiteDetails.prototype, "tagsList", void 0);
WebsiteDetails = __decorate([
    (0, type_graphql_1.InputType)(),
    (0, core_1.Entity)()
], WebsiteDetails);
exports.WebsiteDetails = WebsiteDetails;
//# sourceMappingURL=websiteDetails.js.map