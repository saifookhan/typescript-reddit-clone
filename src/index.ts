import {MikroORM} from "@mikro-orm/core"
import mikroConfig from "./mikro-orm.config"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import "reflect-metadata";

import {buildSchema} from "type-graphql"
import { HelloResolver } from "./resolver/hello"
import { PostResolver } from "./resolver/post";
import { UserResolver } from "./resolver/user";

const main = async () =>{
    const orm = await MikroORM.init(mikroConfig)

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: () => ({em: orm.em})
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