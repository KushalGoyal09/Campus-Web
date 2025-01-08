import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatePostForm } from "./CreatePostForm";
const db = new PrismaClient();

const getUserInfo = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            avatar: true,
            name: true,
            username: true,
        },
    });
    return user;
};

export default async function CreatePostPage() {
    const userId = (await headers()).get("x-user-id");
    if (!userId) {
        redirect("/login");
    }
    const user = await getUserInfo(userId);
    if (!user) {
        redirect("/login");
    }
    return (
        <div className="container max-w-2xl mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreatePostForm user={user} userId={userId} />
                </CardContent>
            </Card>
        </div>
    );
}