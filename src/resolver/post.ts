import { Post } from "../entities/Post";
import { Resolver, Query, Ctx } from "type-graphql";
import { MyContext } from "src/types";

@Resolver()
export class PostResolver{
    @Query(()=> [Post])
        posts(
            @Ctx() ctx: MyContext
        ){
            return ctx.em.find(Post, {})
        } 
    
}