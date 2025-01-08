"use client";

import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { toggleLike, addComment } from "./action";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface TweetProps {
    user: {
        id: string;
        avatar: string | null;
        name: string;
        username: string;
    };
    tweet: {
        id: string;
        comments: number;
        likes: number;
        likedByYou: boolean;
    };
}

export const TweetFooter = ({ user, tweet }: TweetProps) => {
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(tweet.likedByYou);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");

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
        } else {
            toast({
                title: "Error",
                description: result.message,
            });
        }
    };

    return (
        <>
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
                    {tweet.comments}
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
        </>
    );
};
