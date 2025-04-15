export default async function PostPage({ params }: PostPageProps) {
  const posts = await prisma.post.findMany({
    where: {
      slug: params.slug, // Optional: use if filtering by slug
      // Or remove this line if you want *all* posts
    },
    include: {
      // For example, include author or comments if needed
      // author: true,
    },
  });

  if (!posts || posts.length === 0) {
    return <div className="pt-24 text-center">No posts found.</div>;
  }

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

export default async function Product({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <h1>Product: {id} (child param of layout)</h1>;
}
