import { User } from "../../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserDetails } from "../models/userDetails";
import { MyContext } from "src/types";
import argon2 from 'argon2';

@Resolver()
export class UserResolvers {

    @Query(() => [User])
    getAllUsers(
        @Ctx() {em}: MyContext) : Promise<User[]> {
        return em.fork().find(User, {});
    }


    @Mutation(() => User)
    async registerUser(
        @Arg("websiteInput", () => UserDetails) userDetails: User,
        @Ctx() {em} : MyContext
    ) {
        const hashedPassword = await argon2.hash(userDetails.password);
        userDetails.password = hashedPassword
        const user = em.fork().create(User, userDetails);
        await em.fork().persistAndFlush(user);
        return user;
    }

}