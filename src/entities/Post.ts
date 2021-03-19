import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {

  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field( () => String)
  @Property({type: "text"})
  title!:  string;

  @Field(() => String)
  @Property({type: "date"})
  createdAt = new Date();

  @Field(() => String)
  @Property({type: "date", onUpdate: () => new Date()})
  updatedAt = new Date();
}