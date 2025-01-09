import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { getTimeAgo } from "@/lib/timeAgo";
import { Button } from "@/components/ui/button";
import { TweetLike } from "./TweetLike";
import { toggleLike } from "./action";

interface Post {
    text: string;
    postImage: Array<{
        index: number;
        imageUrl: string;
    }>;
}

interface Poll {
    text: string;
    multipleOptions: boolean;
    options: Array<Option>;
}

interface Option {
    text: string;
    index: number;
    votes: number;
    votedByYou: boolean;
}

interface Comment {
    id: string;
    text: string;
    createdAt: Date;
    username: string;
    name: string;
    userAvatar: string | null;
}

interface TweetProps {
    tweet: {
        id: string;
        name: string;
        username: string;
        userAvatar: string | null;
        comments: number;
        likes: number;
        likedByYou: boolean;
        createdAt: Date;
        anonymous: boolean;
        Comments: Array<Comment>;
        post?: Post;
        poll?: Poll;
    };
    user: {
        id: string;
        avatar: string | null;
        name: string;
        username: string;
    };
}

export function Tweet({ tweet, user }: TweetProps) {
    return (
        <Card className="w-full max-w-2xl mx-auto my-4 hover:bg-gray-50 transition-colors duration-200">
            <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src={
                            tweet.anonymous
                                ? "/anonymous.png"
                                : tweet.userAvatar || undefined
                        }
                    />
                    <AvatarFallback>
                        {tweet.anonymous ? "A" : tweet.name[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-semibold">
                        {tweet.anonymous ? "Anonymous User" : tweet.name}
                    </h2>
                    {!tweet.anonymous && (
                        <p className="text-sm text-gray-500">
                            @{tweet.username}
                        </p>
                    )}
                    <p className="text-xs text-gray-400">
                        {getTimeAgo(tweet.createdAt)}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                {tweet.post && (
                    <div>
                        <p className="text-lg mb-4">{tweet.post.text}</p>
                        {tweet.post.postImage.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                                {tweet.post.postImage.map((img) => (
                                    <Image
                                        key={img.index}
                                        src={img.imageUrl}
                                        alt="Post image"
                                        width={300}
                                        height={300}
                                        className="rounded-lg object-cover w-full h-48"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {tweet.poll && (
                    <div className="mt-4">
                        <p className="text-lg mb-2">{tweet.poll.text}</p>
                        {tweet.poll.options.map((option) => (
                            <div
                                key={option.index}
                                className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
                            >
                                <span>{option.text}</span>
                                <span className="text-sm text-gray-500">
                                    {option.votes} votes
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button variant="ghost" size="sm">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {tweet.comments}
                </Button>
                <TweetLike tweet={tweet} user={user} toggleLike={toggleLike} />
            </CardFooter>
        </Card>
    );
}
