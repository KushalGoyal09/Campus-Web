"use server";

import { getToken } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
const db = new PrismaClient();

interface SignupResponse {
    success: boolean;
    message: string;
}

const signup = async (
    name: string,
    email: string,
    username: string,
    password: string,
    collegeId: string,
): Promise<SignupResponse> => {
    try {
        const user = await db.user.create({
            data: {
                name,
                email,
                username,
                password,
                collegeId,
            },
            select: {
                id: true,
            },
        });
        const token = await getToken(user.id);
        const cookieStore = await cookies();
        cookieStore.set("token", token);
        return {
            success: true,
            message: "Signup successful",
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred during signup",
        };
    }
};

export default signup;
