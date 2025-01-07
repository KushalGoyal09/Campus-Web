import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const addComment = async (userId : string,tweetId: string, text: string ) => {
    if (!userId) {
        return {
            success: false,
            message: "Invalid user",
        };
    }
    try {
        await db.comment.create({
            data: {
                text,
                userId,
                tweetId,
            },
        });
        return {
            success: true,
            message: "Comment added",
        };
    } catch (error) {
        return {
            success: false,
            message: "Could not add comment",
        };
    }
};

export default addComment;
