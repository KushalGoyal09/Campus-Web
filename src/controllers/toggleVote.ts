import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const toggleVote = async (userId: string, optionId: string) => {
    const vote = await db.vote.findUnique({
        where: {
            userId_optionId: {
                userId: userId,
                optionId: optionId
            }
        }
    });
    if (vote) {
        await db.vote.delete({
            where: {
                userId_optionId: {
                    userId: userId,
                    optionId: optionId
                }
            }
        });
        return {
            success: true,
            message: "Vote removed"
        }
    } else {
        const poll = await db.option.findUnique({
            where: {
                id: optionId,
            },
            select: {
                Poll: {
                    select: {
                        multipleOptions : true,
                        id: true
                    }
                }
            }
        });
        if (!poll) {
            return {
                success: false,
                message: "Post not found"
            }
        }
        if (poll.Poll.multipleOptions) {
            await db.vote.create({
                data: {
                    userId: userId,
                    optionId: optionId
                }
            })
            return {
                success: false,
                message: "Vote added"
            }
        } else {
            await db.vote.deleteMany({
                where: {
                    Option: {
                        pollId: poll.Poll.id
                    },
                    userId: userId
                }
            })
            await db.vote.create({
                data: {
                    userId: userId,
                    optionId: optionId
                }
            })
        }
    }
}

export default toggleVote;