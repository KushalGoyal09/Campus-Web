"use server"

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const isUsernameUnique = async (username: string): Promise<boolean> => {
    try {
        const user = await db.user.findFirst({
            where: {
            username,
            },
        });
        return !user;
    } catch (error) {
        return true;
    }
}

export default isUsernameUnique;