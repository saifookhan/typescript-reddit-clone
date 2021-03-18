import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core"

export default {
    dbName: "foo-reddit",
    debug: process.env.NODE_ENV !== "production" ? true : false,
    type: "mongo",
    entities: [Post]
} as Parameters<typeof MikroORM.init>[0];