import { Resolver, Ctx, Arg, Mutation, Field, InputType, ObjectType } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entities/User";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput{
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError{
    @Field()
    field: string    
    @Field()
    message: string
}

@ObjectType()
class UserResponse{
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[]    
    @Field(() => User, {nullable: true})
    user?: User;
}


@Resolver()
export class UserResolver{
    @Mutation(()=> User)    
        async register(
            @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
            @Ctx() ctx: MyContext
        ): Promise<UserResponse>{

            if (options.username.length <= 2) {
                return {
                  errors: [
                    {
                      field: "username",
                      message: "length must be greater than 2",
                    },
                  ],
                };
              }
          
              if (options.password.length <= 2) {
                return {
                  errors: [
                    {
                      field: "password",
                      message: "length must be greater than 2",
                    },
                  ],
                };
              }

            const hashedPw = await argon2.hash(options.password)

            const user = ctx.em.create(User, {
                username: options.username, 
                password: hashedPw
            })
            try {
                await ctx.em.persistAndFlush(user);
              } catch (err) {
                //|| err.detail.includes("already exists")) {
                // duplicate username error
                if (err.code === "23505") {
                  return {
                    errors: [
                      {
                        field: "username",
                        message: "username already taken",
                      },
                    ],
                  };
                }
              }

              ctx.req.session.userId = user._id
              console.log("ctx.req.session")
              console.log(ctx.req.session)
              return { user };
        }
    
    @Mutation(()=> UserResponse)    
        async login(
            @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
            @Ctx() ctx: MyContext
        ): Promise<UserResponse>{

            const user = await ctx.em.findOne(User, {
                username: options.username            
            })
            if(!user){
                return{
                    errors: [{
                        field: "username",
                        message: "User does not exist"
                    }]
                }
            }
            console.log(user)
            const valid = await argon2.verify(user.password, options.password)
            if(!valid){
                return{
                    errors: [{
                        field: "password",
                        message: "User password incorrect"
                    }]
                }
            }

            ctx.req.session.userId = user._id
            console.log("ctx.req.session")
            console.log(ctx.req.session)

            return {user}
        }    
    
    // @Query(()=> [Post])
    //     posts(
    //         @Ctx() ctx: MyContext
    //     ){
    //         return ctx.em.find(Post, {})
    //     } 
        
    // @Query(()=> Post, { nullable: true })    
    //     post(
    //         @Arg('_id', () => String) _id: string,
    //         @Ctx() ctx: MyContext
    //     ): Promise<Post | null>{
    //         return ctx.em.findOne(Post, {_id: new ObjectId(_id)})
    //     }
    
    // @Mutation(()=> Post)    
    //     async createPost(
    //         @Arg('title') title: string,
    //         @Ctx() ctx: MyContext
    //     ): Promise<Post>{
    //         const post = ctx.em.create(Post, {title})
    //         await ctx.em.persistAndFlush(post)
    //         return post
    //     }
    
    // @Mutation(()=> Post, {nullable: true})    
    //     async updatePost(
    //         @Arg('_id', () => String) _id: string,
    //         @Arg('title') title: string,
    //         @Ctx() ctx: MyContext
    //     ): Promise<Post | null>{
    //         const post = await ctx.em.findOne(Post, {_id: new ObjectId(_id)})
    //         if(!post){
    //             return null
    //         }
    //         post.title = title
    //         await ctx.em.persistAndFlush(post)
    //         return post
    //     }

    // @Mutation(()=> Boolean, {nullable: true})    
    //     async deletePost(
    //         @Arg('_id', () => String) _id: string,
    //         @Ctx() ctx: MyContext
    //     ): Promise<boolean>{
    //         const post = await ctx.em.findOne(Post, {_id: new ObjectId(_id)})
    //         if(!post){
    //             return false
    //         }
    //         await ctx.em.nativeDelete(Post, {_id: new ObjectId(_id)})
    //         return true
    //     }
}