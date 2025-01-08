import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const getTweet = async (tweetId: string, userId: string) => {
    if (!tweetId) {
        return {
            success: false,
            message: "Invalid Tweet",
            tweet: null,
        };
    }
    //Todo: 
    try {
        const tweet = await db.tweet.findUnique({
            where: {
                id: tweetId,
            },
            select: {
                id: true,
                Author: {
                    select: {
                        name: true,
                        username: true,
                        avatar: true,
                    },
                },
                anonymous: true,
                createdAt: true,
                _count: {
                    select: {
                        Like: true,
                        Comment: true,
                    },
                },
                Like: {
                    where: {
                        userId,
                    },
                    select: {
                        userId: true,
                    },
                },
                Comment: {
                    select: {
                        id: true,
                        text: true,
                        createdAt: true,
                        User: {
                            select: {
                                name: true,
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                Post: {
                    select: {
                        text: true,
                        PostImage: {
                            select: {
                                imageUrl: true,
                                index: true,
                            },
                        },
                    },
                },
                Poll: {
                    select: {
                        text: true,
                        multipleOptions: true,
                        Option: {
                            select: {
                                text: true,
                                index: true,
                                _count: {
                                    select: {
                                        Vote: true,
                                    },
                                },
                                Vote: {
                                    where: {
                                        userId,
                                    },
                                    select: {
                                        userId: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return tweet;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getTweet;
