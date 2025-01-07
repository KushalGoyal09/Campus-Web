import { Post } from "@/components/Post";

const samplePost = {
    id: "1",
    username: "johndoe",
    userAvatar: "/placeholder.svg?height=40&width=40",
    comments: 5,
    likes: 42,
    likedByYou: false,
    createdAt: new Date("2023-06-01T12:00:00Z"),
    text: "Just finished a great coding session! #webdevelopment #javascript",
    image: "/image.png",
};

export default function Home() {
    return (
        <div>
            <Post post={samplePost} />
            <Post post={samplePost} />
            <Post post={samplePost} />
            <Post post={samplePost} />
            <Post post={samplePost} />
            <Post post={samplePost} />
        </div>
    );
}
