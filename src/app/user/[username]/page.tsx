import NotFound from "@/components/NotFound";
import { getUserInfo, getUserInfoFromUsername } from "@/lib/getUserInfo";

export default async function UserPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const user = await getUserInfoFromUsername(username);
    if (!user) {
        return <NotFound />;
    }
    return (
        <>
            <h1>User profile</h1>
            {/* user avatar username if user -- me edit profile else only show
                and button for direct message all tweets of user */}
            <h1>{user.username}</h1>
        </>
    );
}
