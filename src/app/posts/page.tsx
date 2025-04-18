import { createPost } from "@/actions/actions";
import { clerkClient } from "@clerk/nextjs/server";
import PostCounter from "../components/PostCounter";
import { currentUser } from "@clerk/nextjs/server";
// import { AvatarFromUrl } from "../posts/AvatarFromUrl"; // ✅ import this instead of UserAvatar
import { prisma } from "@/lib/db";
import Link from "next/link";
// const user = await currentUser();
export default async function PostsPage({ userImage }: { userImage: string }) {
  const user = await currentUser(); // ✅ will be null if not signed in
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(
    "Clerk frontend API:",
    process.env.NEXT_PUBLIC_CLERK_FRONTEND_API
  );
  const postsCount = await prisma.post.count();
  console.log(user);
  // TODO: handle dynamic usernames  and images from profiles.

  // TODO: the avatars in the posts (and uernames) are not positioned equally across each post.
  return (
    <main className="max-h-screen w-full flex flex-col items-center gap-2 p-4 text-center">
      <div className="max-w-6xl mx-auto w-full">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
          {user && (
            <form
              action={createPost}
              className="flex flex-col gap-y-2 border p-2 rounded shadow"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="px-2 py-1 rounded-sm border"
              />
              <textarea
                name="content"
                rows={2}
                placeholder="Content"
                className="px-2 py-1 rounded-sm border"
              />
              <button
                type="submit"
                className="bg-blue-500 py-2 text-white rounded-sm"
              >
                Create Post
              </button>
            </form>
          )}
          {posts.map((post) => (
            <li
              key={post.id}
              className="border rounded-md text-left relative text-center h-auto"
            >
              <Link
                href={`/posts/${post.slug}`}
                className="flex flex-col h-full relative"
              >
                <div className="pl-4 pt-4">{post.content}</div>
                <div className="flex items-center gap-2 mt-5 ">
                  <img
                    src={user?.imageUrl || ""}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-base text-gray-600">{user?.username}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm  bottom-4 right-2 absolute text-gray-600">
        {user?.username}
      </p>
    </main>
  );
}
