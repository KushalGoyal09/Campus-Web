import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { toggleLike, addComment } from "./action";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { getTimeAgo } from "@/lib/timeAgo";

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
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(tweet.likedByYou);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(tweet.comments);
    const router = useRouter();

    const handleLike = async () => {
        const result = await toggleLike(user.id, tweet.id);
        if (result.success) {
            setLikes(liked ? likes - 1 : likes + 1);
            setLiked(!liked);
        } else {
            toast({
                title: "Error",
                description: result.message,
            });
        }
    };

    const handleComment = () => {
        setShowCommentBox(!showCommentBox);
    };

    const submitComment = async () => {
        const result = await addComment(user.id, tweet.id, comment);
        if (result.success) {
            setComment("");
            setShowCommentBox(false);
            setComments((prev) => prev + 1);
        } else {
            toast({
                title: "Error",
                description: result.message,
            });
        }
    };
    return (
        <Card
            className="w-full max-w-2xl mx-auto my-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => router.push(`/post/${tweet.id}`)}
        >
            <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar onClick={() => router.push("/user/")} >
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
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleComment();
                    }}
                >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {comments}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike();
                    }}
                >
                    <Heart
                        className={`w-5 h-5 mr-2 ${liked ? "fill-red-500 text-red-500" : ""}`}
                    />
                    {likes}
                </Button>
            </CardFooter>
            {showCommentBox && (
                <div
                    className="p-4 border-t"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage
                                src={user.avatar || undefined}
                                alt={user.name}
                            />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-gray-500">
                                @{user.username}
                            </p>
                        </div>
                    </div>
                    <Textarea
                        placeholder="Write your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full mb-2"
                    />
                    <Button onClick={submitComment}>Submit Comment</Button>
                </div>
            )}
        </Card>
    );
}
