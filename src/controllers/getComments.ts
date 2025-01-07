import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const getComments = async (tweetId: string) => {
    try {
        const comments = await db.comment.findMany({
            where: {
                tweetId,
            },
            select: {
                User: {
                    select: {
                        name: true,
                        username: true,
                        avatar: true,
                    },
                },
                text: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return {
            success: true,
            message: "Comments retrieved",
            comments,
        };
    } catch (error) {
        return {
            success: false,
            message: "Could not get comments",
            comments: [],
        };
    }
};

export default getComments;
