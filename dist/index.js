"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const WebsiteResolver_1 = require("./graphql/resolvers/WebsiteResolver");
const UserResolvers_1 = require("./graphql/resolvers/UserResolvers");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [WebsiteResolver_1.WebsiteResolver, UserResolvers_1.UserResolvers],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });
    app.listen(4000, () => {
        console.log("Server started on port 4000");
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
};
main().catch(err => console.log(err));
//# sourceMappingURL=index.js.map