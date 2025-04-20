"use server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export async function createPost(formData: FormData) {
  console.log("✅ createPost called");
  const user = await currentUser();
  const username = user?.username;
  const firstName = user?.firstName;
  const imageUrl = user.imageUrl;
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { id: userId, emailAddresses } = user;

  // Step 1: Check if user exists
  let dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  // Step 2: If not, create them using data from Clerk
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: emailAddresses[0]?.emailAddress || "", // optional fallback
        username: username || "", // 👈 this line adds the username
        imageUrl: user.imageUrl,
      },
    });
  }
  // Step 3: Create the post
  try {
    const title = (formData.get("title") as string) || "";
    const content = (formData.get("content") as string) || "";

    // If no title, fall back to content for slug (first 30 characters)
    const slugBase = title || content.slice(0, 30);
    const slug = slugBase
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "") // optional: remove weird chars
      .toLowerCase();

    await prisma.post.create({
      data: {
        title, // optional field now
        slug,
        content,
        authorClerkId: userId,
        authorName: username || "", // ✅ cache username in post
        authorImage: imageUrl || "", // ✅ cache image in post
      },
    });

    revalidatePath("/posts"); // ✅ revalidate static page cache
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log(
        "There is a unique constraint violation – user or post already exists"
      );
    } else {
      console.error("Failed to create post:", error);
    }
  }
}
