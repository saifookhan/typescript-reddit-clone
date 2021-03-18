import {MikroORM} from "@mikro-orm/core"
import { Post } from "./entities/Post"
import mikroConfig from "./mikro-orm.config"

const main = async () =>{
    const orm = await MikroORM.init(mikroConfig)

    const post = orm.em.create(Post, {title: "my first post"})
    orm.em.persistAndFlush(post)
}

main()

console.log("hi22")