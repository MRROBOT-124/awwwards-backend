"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const constants_1 = require("./constants");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const WebsiteResolver_1 = require("./graphql/resolvers/WebsiteResolver");
const UserResolvers_1 = require("./graphql/resolvers/UserResolvers");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const client_1 = require("@redis/client");
const cors_1 = __importDefault(require("cors"));
const envConfig_1 = __importDefault(require("./envConfig"));
const main = async () => {
    console.log(envConfig_1.default);
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = (0, client_1.createClient)({
        legacyMode: true,
        socket: {
            host: process.env.REDIS_HOST,
            port: 6379
        }
    });
    redisClient.connect().catch(console.error);
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true
    }));
    app.use((0, express_session_1.default)({
        name: "email",
        store: new RedisStore({
            client: redisClient,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: 'lax',
            secure: constants_1.__prod__
        },
        saveUninitialized: false,
        secret: "adqwieqkpasldkaodkadkrerwasdada",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [WebsiteResolver_1.WebsiteResolver, UserResolvers_1.UserResolvers],
            validate: false
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res }),
    });
    app.listen(4000, () => {
        console.log("Server started on port 4000");
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
};
main().catch(err => console.log(err));
//# sourceMappingURL=index.js.map