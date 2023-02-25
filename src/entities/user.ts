import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryKey()
    _id!: number;

    @Field(() => String)
    @Property()
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field()
    @Property({nullable: false, unique: true})
    username!: string;

    @Field()
    @Property({nullable: false, unique: true})
    email!: string;

    @Field()
    @Property({nullable: false})
    password!: string
}