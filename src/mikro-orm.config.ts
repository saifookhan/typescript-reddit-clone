import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core"
import { User } from "./entities/User";

export default {
    dbName: "foo-reddit",
    debug: process.env.NODE_ENV !== "production" ? true : false,
    type: "mongo",
    entities: [Post, User]
} as Parameters<typeof MikroORM.init>[0];