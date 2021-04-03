import {MikroORM} from "@mikro-orm/core"
import mikroConfig from "./mikro-orm.config"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import "reflect-metadata";

import {buildSchema} from "type-graphql"
import { HelloResolver } from "./resolver/hello"
import { PostResolver } from "./resolver/post";
import { UserResolver } from "./resolver/user";

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from "./types";

let RedisStore = connectRedis(session)
let redisClient = redis.createClient()



const main = async () =>{
    const orm = await MikroORM.init(mikroConfig)

    const app = express()

    app.use(
        session({
          name: "qid",
          store: new RedisStore({ client: redisClient }),
          secret: 'keyboard cats',
          resave: false,
          cookie:{
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true,
          },
          saveUninitialized: false
        })
      )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({req, res}): MyContext => ({em: orm.em, req, res})
    })

    apolloServer.applyMiddleware({app})

    app.get('/', (_, res) =>{
        res.send("Hello from the server")
    })
    app.listen(4000, ()=>{
        console.log("started at 4000")
    })
}

main()

console.log("hi22")