import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { WebsiteResolver } from './graphql/resolvers/WebsiteResolver';
import { UserResolvers } from './graphql/resolvers/UserResolvers';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from './types';
import { createClient } from '@redis/client';
import cors from 'cors';

const main =async () => {
    const orm = await MikroORM.init(mikroOrmConfig);

    await orm.getMigrator().up();
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient : any = createClient({legacyMode: true});
    redisClient.connect().catch(console.error);

    app.use(cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true
    }))

    app.use(
        session({
           name: "email",
          store: new RedisStore({
            client: redisClient,
            disableTouch: true
          }),
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: 'lax',
            secure: __prod__
          },
          saveUninitialized: false,
          secret: "adqwieqkpasldkaodkadkrerwasdada",
          resave: false,
        })
      )
    
    const apolloServer = new ApolloServer({
    
        schema: await buildSchema({
            resolvers: [WebsiteResolver, UserResolvers],
            validate: false
        }),
        context: ({req, res}) : MyContext => ({em: orm.em, req, res}),
        
        
    });
    app.listen(4000, () => {
        console.log("Server started on port 4000");
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app, cors: false});

   

    
}

main().catch(err => console.log(err));