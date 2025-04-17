import { createPost } from "@/actions/actions";
import PostCounter from "./components/PostCounter";
import { currentUser } from "@clerk/nextjs/server";
import { AvatarFromUrl } from "./posts/AvatarFromUrl"; // ✅ import this instead of UserAvatar
import { prisma } from "@/lib/db";
import Link from "next/link";
// const user = await currentUser();
export default async function PostsPage({ userImage }: { userImage: string }) {
  const user = await currentUser(); // ✅ will be null if not signed in

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          imageUrl: true,
          // username: true,
        },
      },
      postImageFromUser: {
        select: {
          imageUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const postsCount = await prisma.post.count();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex item-center justify-center justify-between px-5"
          >
            <Link href={`/posts/${post.slug}`}>
              <AvatarFromUrl src={post.author?.imageUrl} /> {post.content}
            </Link>
          </li>
        ))}
      </ul>
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
      {!user && (
        <p className="mt-4 text-gray-500">Sign in to create a post ✍️</p>
      )}
    </main>
  );
}
