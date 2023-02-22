import { Entity } from "@mikro-orm/core";
import { Field, InputType } from "type-graphql";

@InputType()
@Entity()
export class UserDetails {

    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    password!: string
}