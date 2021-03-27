import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {

  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId;

  @Field( () => String)
  @Property({type: "text", unique: true})
  username!:  string;

  @Property({type: "text"})
  password!:  string;

  @Field(() => String)
  @Property({type: "date"})
  createdAt = new Date();

  @Field(() => String)
  @Property({type: "date", onUpdate: () => new Date()})
  updatedAt = new Date();
}