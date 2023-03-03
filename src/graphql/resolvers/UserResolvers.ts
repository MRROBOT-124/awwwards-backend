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
        @Arg("userDetails", () => UserDetails) userDetails: User,
        @Ctx() {em} : MyContext
    ) {
        const passwordRegEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let errors = [];
        if(!passwordRegEX.test(userDetails.password)) {
            errors.push({
                field: "password",
                message: "Password must gave special characeters, number and length should also be greater than 8"
            })
        }
        const hashedPassword = await argon2.hash(userDetails.password);
        userDetails.password = hashedPassword
        const user = em.fork().create(User, userDetails);
        try {
            await em.fork().persistAndFlush(user);
        }catch(err) {
            if(err.detail.includes("username") && err.detail.includes("already exists.")) {
                errors.push({
                    field: "username",
                    message: "Username Already exists"
                });
            }
            if(err.detail.includes("email") && err.detail.includes("already exists.")) {
                errors.push({
                    field: "email",
                    message: "Email Already exists"
                })
            }
            
        }
        return {user: user, errors: errors};
    }

    @Mutation(() => UserResponse)
    async loginUser(
        @Arg("userDetails", () => UserDetails) userDetails: User,
        @Ctx() {em, req} : MyContext
    ) {
        let findUser = await em.fork().findOne(User, {username: userDetails.username});
        if(!findUser) {
            findUser = await em.fork().findOne(User, {email: userDetails.email});
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