import { Website } from "../../entities/website";
import { MyContext } from "src/types";
import {  Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { WebsiteDetails } from "../models/websiteDetails";



@Resolver()
export class WebsiteResolver {

    @Query(() => [Website])
    getAllWebsites(
        @Ctx() {em}: MyContext) : Promise<Website[]> {
        return em.fork().find(Website, {});
    }

    @Mutation(() => Website)
    async submitWebsite(
        @Arg("websiteInput", () => WebsiteDetails) websiteInput: Website,
        @Ctx() {em} : MyContext
    ) {
        const website = em.fork().create(Website, websiteInput);
        await em.fork().persistAndFlush(website);
        return website;
    }
}