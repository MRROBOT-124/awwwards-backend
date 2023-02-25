import { User } from "../../entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserDetails } from "../models/userDetails";
import { MyContext } from "src/types";
import argon2 from 'argon2';
import { UserResponse } from "../models/userResponse";

declare module 'express-session' {
    export interface SessionData {
      user: { [key: string]: any };
    }
}


@Resolver()
export class UserResolvers {
    

    @Query(() => [User])
    getAllUsers(
        @Ctx() {em}: MyContext) : Promise<User[]> {
        return em.fork().find(User, {});
    }

    @Query(() => User)
    async getUser(
        @Ctx() {em, req} : MyContext){
            
        
            if(!req.session.user!.email) {
                console.log("Cookie is not set");
                return null;
            }

            const user = await em.fork().findOne(User, {email: req.session.user!.email});
            return user;


    }


    @Mutation(() => UserResponse)
    async registerUser(
        @Arg("websiteInput", () => UserDetails) userDetails: User,
        @Ctx() {em} : MyContext
    ) {
        const passwordRegEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(!passwordRegEX.test(userDetails.password)) {
            return {
                errors: [
                    {
                        field: "Password",
                        message: "Password must gave special characeters, number and length should also be greater than 8"
                    }
                ]
            } 
        }
        const hashedPassword = await argon2.hash(userDetails.password);
        userDetails.password = hashedPassword
        const user = em.fork().create(User, userDetails);
        try {
            await em.fork().persistAndFlush(user);
        }catch(err) {
            if(err.code==='23505' || err.detail.contains("already exists.")) {
                return {
                    errors: [
                        {
                            field: "Username/Email",
                            message: "User Already exists"
                        }
                    ]
                }
            }
            console.log("Error message: ", err.message);
        }
        return {user: user};
    }

    @Mutation(() => UserResponse)
    async loginUser(
        @Arg("websiteInput", () => UserDetails) userDetails: User,
        @Ctx() {em, req} : MyContext
    ) {
        const findUser = await em.fork().findOne(User, {username: userDetails.username});
        if(!findUser) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "User does not exists"
                    }
                ]
            }
        }
        const validate = await argon2.verify(findUser.password,userDetails.password);
        if(!validate) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "Invalid Username/Password"
                    }
                ]
            }
        }

        req.session.user = {
            email: findUser.email
        }
        return {user: findUser};
    }

}