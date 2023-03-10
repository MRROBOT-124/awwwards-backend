import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Tags } from "./tags";

@ObjectType()
@Entity()
export class Website {

    @Field()
    @PrimaryKey()
    id: number;

    @Field()
    @Property({type: 'text', nullable: false})
    imageUrl!: string

    @Field()
    @Property()
    name!: string

    @Field()
    @Property()
    company!: string

    @Field()
    @Property()
    authorName!: string

    @Field()
    @Property()
    link!: string

    @Field(() => String)
    @Property()
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    // @Field(() => [Tags])
    @ManyToMany(() => Tags, tags => tags.websitesList, {owner: true})
    tagsList = new Collection<Tags>(this);

}