"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
    toggleLike: (userId: string, tweetId: string) => Promise<{
        success: boolean;
        message: string;
    }>
    
}

export const TweetLike = ({ user, tweet,toggleLike }: TweetProps) => {
    const [likes, setLikes] = useState(tweet.likes);
    const [liked, setLiked] = useState(tweet.likedByYou);

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


    return (
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
    );
};
