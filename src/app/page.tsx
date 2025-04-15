import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { createPost } from "@/actions/actions";
import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

import Link from "next/link";

export default async function PostsPage() {
  const user = await currentUser();

  console.log("👉 Clerk user:", user);

  const posts = await prisma.post.findMany({
    // Be sure not to select sensitive info
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const postsCount = await prisma.post.count();
  return (
    <main className="flex flex-col items-center gap-y-5 pt-14 text-center">
      {/* <h1 className="text-5xl font-semibold">All Posts: {postsCount}</h1> */}

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
          rows={2}
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
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex item-center justify-center justify-between px-5"
          >
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
