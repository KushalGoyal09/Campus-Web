import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const getUserInfo = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            avatar: true,
            name: true,
            username: true,
        },
    });
    return user;
};