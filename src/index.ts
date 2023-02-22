import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { WebsiteResolver } from './graphql/resolvers/WebsiteResolver';
import { UserResolvers } from './graphql/resolvers/UserResolvers';

const main =async () => {
    const orm = await MikroORM.init(mikroOrmConfig);

    await orm.getMigrator().up();
    const app = express();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [WebsiteResolver, UserResolvers],
            validate: false
        }),
        context: () => ({em: orm.em})
        
    });
    app.listen(4000, () => {
        console.log("Server started on port 4000");
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app});

   

    
}

main().catch(err => console.log(err));