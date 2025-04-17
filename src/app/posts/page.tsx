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
    // include: {
    //   author: {
    //     select: {
    //       imageUrl: true,
    //       // username: true,
    //     },
    //   },
    //   postImageFromUser: {
    //     select: {
    //       imageUrl: true,
    //     },
    //   },
    // },
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
  return (
    <main className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-1">
          {posts.map((post) => (
            <li key={post.id} className="border rounded-md text-left">
              <Link
                href={`/posts/${post.slug}`}
                className="flex flex-col gap-1 p-2"
              >
                <div className="flex flex-row p-4 items-center gap-4">
                  <img
                    src={user.imageUrl}
                    className="w-13 h-13 rounded-full object-cover"
                  />{" "}
                  <p className="text-md">{user.username}</p>
                </div>
                {post.content}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {user && (
        <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="px-2 py-1 rounded-sm"
          />
          <textarea
            name="content"
            rows={5}
            placeholder="Content"
            className="px-2 py-1 rounded-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 py-2 text-white rounded-sm"
          >
            Create Post
          </button>
        </form>
      )}
    </main>
  );
}
