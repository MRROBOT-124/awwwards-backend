import { Collection, Entity } from "@mikro-orm/core";
import { Tags } from "../../entities/tags";
import { Field, InputType } from "type-graphql";

@InputType()
@Entity()
export class WebsiteDetails {

    @Field()
    _id: number;

    @Field()
    imageUrl!: string

    @Field()
    name!: string

    @Field()
    company!: string

    @Field()
    authorName!: string

    @Field()
    link!: string

    @Field(() => String)
    createdAt: Date

    @Field(() => String)
    updatedAt: Date

    @Field(() => [Tags])
    tagsList = new Collection<Tags>(this);

}
