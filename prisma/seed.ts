import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "post 1",
    slug: "post-1",
    content: "Content of post 1",
    author: {
      connectOrCreate: {
        where: {
          email: "john@gmail.com", // ✅ Correct
        },
        create: {
          email: "john@gmail.com",
          hashedPassword: "eq22qq23q",
        },
      },
    },
  },
];
async function main() {
  console.log("seeding database");
  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${newPost.id}`);
  }
  console.log("seeding finished.");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
