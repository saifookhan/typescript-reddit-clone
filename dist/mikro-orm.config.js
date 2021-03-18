"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
exports.default = {
    dbName: "foo-reddit",
    debug: process.env.NODE_ENV !== "production" ? true : false,
    type: "mongo",
    entities: [Post_1.Post]
};
//# sourceMappingURL=mikro-orm.config.js.map