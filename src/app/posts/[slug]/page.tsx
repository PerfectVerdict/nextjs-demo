import { prisma } from "@/lib/db";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_cache as cache } from "next/cache";
interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  // const post = await prisma.User.findUnique({
  const user = await currentUser(); // ✅ will be null if not signed in
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  return (
    <>
      <div className="max-h-screen w-full flex flex-col items-center gap-2 p-4 text-center">
        <div className="flex flex-row p-5 items-center gap-6">
          <p className="text-sm  bottom-4 right-2 absolute text-gray-600">
            {post.authorName}
          </p>
        </div>
        {post.content}
      </div>
    </>
  );
}
