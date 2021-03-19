import { Post } from "../entities/Post";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
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
            return ctx.em.findOne(Post, {_id: new ObjectId(_id)})
        }
    
    @Mutation(()=> Post)    
        async createPost(
            @Arg('title') title: string,
            @Ctx() ctx: MyContext
        ): Promise<Post>{
            const post = ctx.em.create(Post, {title})
            await ctx.em.persistAndFlush(post)
            return post
        }
    
    @Mutation(()=> Post, {nullable: true})    
        async updatePost(
            @Arg('_id', () => String) _id: string,
            @Arg('title') title: string,
            @Ctx() ctx: MyContext
        ): Promise<Post | null>{
            const post = await ctx.em.findOne(Post, {_id: new ObjectId(_id)})
            if(!post){
                return null
            }
            post.title = title
            await ctx.em.persistAndFlush(post)
            return post
        }

    @Mutation(()=> Boolean, {nullable: true})    
        async deletePost(
            @Arg('_id', () => String) _id: string,
            @Ctx() ctx: MyContext
        ): Promise<boolean>{
            const post = await ctx.em.findOne(Post, {_id: new ObjectId(_id)})
            if(!post){
                return false
            }
            await ctx.em.nativeDelete(Post, {_id: new ObjectId(_id)})
            return true
        }
}