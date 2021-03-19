import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg } from "type-graphql";
import { MyContext } from "src/types";
import {ObjectId} from "@mikro-orm/mongodb"
@Resolver()
export class PostResolver{
    @Query(()=> [Post])
        posts(
            @Ctx() ctx: MyContext
        ){
            return ctx.em.find(Post, {})
        } 
        
    @Query(()=> Post, { nullable: true })    
        post(
            @Arg('_id', () => String) _id: string,
            @Ctx() ctx: MyContext
        ): Promise<Post | null>{
            return ctx.em.findOne(Post, {_id: new ObjectId("6052a618d9cf5117c14d206a")})
        }
    
}