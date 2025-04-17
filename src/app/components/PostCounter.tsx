import { prisma } from "@/lib/db";
export default async function PostCounter() {
  const postsCount = await prisma.post.count();
  return <h1 className="text-3xl font-semibold">All Posts: {postsCount}</h1>;
}
