import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Tags } from "./entities/tags";
import { User } from "./entities/user";
import { Website } from "./entities/website";
import envConfig from "./envConfig";


console.log(envConfig);

export default {
    entities: [User, Website, Tags],
    host: process.env.POSTGRES_HOST,
    dbName: 'awwwards',
    user: 'postgres',
    password: 'A!m@12ith',
    type: 'postgresql',
    debug: !__prod__,
    migrations: {
        path: path.join(__dirname,'./migrations'),
        pathTs: path.join(__dirname,'../src/migrations'),

    }

} as Parameters<typeof MikroORM.init>[0];