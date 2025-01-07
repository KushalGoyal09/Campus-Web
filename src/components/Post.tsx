"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface PostProps {
    post: {
        id: string;
        username: string;
        userAvatar: string | null;
        comments: number;
        likes: number;
        likedByYou: boolean;
        createdAt: Date;
        text: string;
        image?: string;
    };
}

export function Post({ post }: PostProps) {
    const [liked, setLiked] = useState(post.likedByYou);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount((prev) => prev - 1);
        } else {
            setLikeCount((prev) => prev + 1);
        }
        setLiked((prev) => !prev);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage
                        src={post.userAvatar || undefined}
                        alt={post.username}
                    />
                    <AvatarFallback>
                        {post.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="font-semibold">{post.username}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(post.createdAt, {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>{post.text}</p>
                {post.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt="Post image"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={handleLike}
                    >
                        <Heart
                            className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : ""}`}
                        />
                        <span>{likeCount}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.comments}</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
