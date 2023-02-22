import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, InputType, ObjectType } from "type-graphql";
import { Website } from "./website";

@InputType()
@ObjectType()
@Entity()
export class Tags {

    @Field()
    @PrimaryKey()
    id: number;

    @Field()
    @Property()
    name!: string

    @Field()
    @Property()
    color!: string


    @Field(() => String)
    @Property()
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @ManyToMany(() => Website, website => website.tagsList)
    websitesList = new Collection<Website>(this);
}