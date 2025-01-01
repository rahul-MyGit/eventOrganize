"use server"

import { loginData, signupData } from "@/provider/zod"
import bcrypt from "bcrypt"
import prisma from "@repo/db/client"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"


export async function signupUserAction (data: signupData) {
    try {
        const { username, email, password } = data;
        const checkUser = await prisma.user.findUnique({
            where: {
                 email 
            }
        });
        if (checkUser) {
            return {
                success: false,
                message: "User already exists"
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password : hashedPassword,
                role: "VENUE_OWNER"
            }
        });

        return {
            success: true,
            message: "User created successfully",
            data: JSON.parse(JSON.stringify(user))
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: error.message
            }
        }
    }
}


export async function loginUserAction (data: loginData) {
    try {
        const {email, password} = data;
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!existingUser){
            return {
                success: false,
                message: "User not found, please signup"
            }
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return {
                success: false,
                message: "Invalid password"
            }
        }

        const createTokenData = {
            id: existingUser.id,
            role: existingUser.role
        }

        const token = jwt.sign(createTokenData, process.env.JWT_SECRET || "mysecretKey", {expiresIn: '1d'});
        const getCookies = cookies();
        (await getCookies).set('token', token)
        return {
            success: true,
            message: "User logged in successfully"
        }
    } catch (error) {
        if(error instanceof Error) {
            return {
                error: error.message
            }
        }
    }
}

export async function logoutUserAction(){
    const getCookies = cookies();
    (await getCookies).set("token", "");
}