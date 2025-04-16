import { createPost } from "@/actions/actions";
import { AvatarFromUrl } from "./AvatarFromUrl"; // ✅ import this instead of UserAvatar

// import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import Link from "next/link";
// const user = await currentUser();
export default async function PostsPage({ userImage }: { userImage: string }) {
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
      <h1 className="text-3xl font-semibold">All Posts: {postsCount}</h1>

      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex item-center justify-center justify-between px-5"
          >
            {/* <img */}
            {/*   src={post.postImageFromUser?.imageUrl} */}
            {/*   alt={post.author?.firstName || ""} */}
            {/*   className="w-10 h-10 rounded-full" */}
            {/* /> */}
            <Link href={`/posts/${post.slug}`}>
              <AvatarFromUrl src={post.author?.imageUrl} />{" "}
              {/* ✅ this runs client-side */}
              {post.content}
            </Link>
          </li>
        ))}
      </ul>
      {posts.map((post) => {
        console.log("AUTHOR IMAGE", post.author?.imageUrl);
        return <li key={post.id}>...</li>;
      })}
      {/* Form */}
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
    </main>
  );
}
