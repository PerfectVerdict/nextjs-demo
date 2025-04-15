import { prisma } from "@/lib/db";
import Link from "next/link";
import { unstable_cache as cache } from "next/cache";
interface PostPageProps {
  params: {
    slug: string;
  };
}

const getCashedPost = cache((slug) => {
  return prisma.post.findUnique({
    where: {
      slug,
    },
    cacheStrategy: { ttl: 60 },
  });
});

export default async function PostPage({ params }: PostPageProps) {
  // const post = await prisma.User.findUnique({
  const posts = await prisma.post.findMany({
    // options for reading specific data.
    // Including:
    // fetching by slug, and by email. If by email, you NEED to have incude {posts: true}
    where: {
      slug: params.slug,
      //   email: "john@gmail.com",
      // },
      // include: {
      //   posts: true,
      // },
    },
  });
  // if (!posts || posts.length === 0) {
  //   return <div className="pt-24 text-center">No posts found.</div>;
  // }

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      {posts.map((post) => (
        <article key={post.id} className="border-b pb-4 w-full max-w-xl">
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          <p>{post.content}</p>
        </article>
      ))}
    </main>
  );
}
