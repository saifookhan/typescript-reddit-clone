import {MikroORM} from "@mikro-orm/core"
import { Post } from "./entities/Post"

const main = async () =>{
    const orm = await MikroORM.init({
        dbName: "foo-reddit",
        debug: process.env.NODE_ENV !== "production" ? true : false,
        type: "mongo",
        entities: [Post]
    })

    const post = orm.em.create(Post, {title: "my first post"})
    orm.em.persistAndFlush(post)
}

main()

console.log("hi22")