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
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .replace(/\s+/g, "-")
          .toLowerCase(),
        content: formData.get("content") as string,
        authorClerkId: userId,
      },
    });

    revalidatePath("/posts"); // optional: for static site revalidation
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
// export async function createPost(formData: FormData) {
//   console.log("✅ createPost called");
//
//       let user = await prisma.user.findUnique({ where: { clerkId: userId } });
// if (!user) {
//   user = await prisma.user.create({
//     data: { clerkId: userId, email: clerkUser.emailAddresses[0]?.emailAddress },
//   });
//   try {
//     await prisma.post.create({
// }
//       data: {
//         title: formData.get("title") as string,
//         slug: (formData.get("title") as string)
//           .replace(/\s+/g, "-")
//           .toLowerCase(),
//         content: formData.get("content") as string,
//         // author: {
//         //   connect: {
//         //     email: "john@gmail.com",
//         //   },
//         // },
//       },
//     });
//     revalidatePath("/posts"); // 👈 👈 this is the fix
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2002") {
//         console.log(
//           "There is a unqie constraint violation, a new user cannot be created with this email"
//         );
//       }
//     }
//   }
// }
// export async function editPost(formData: FormData) {
//   await prisma.post.update({
//     data: {
//       title: formData.get("title") as string,
//       slug: (formData.get("title") as string)
//         .replace(/\s+/g, "-")
//         .toLowerCase(),
//       content: formData.get("content") as string,
//     },
//   });
// }
//
// export async function deletePost(id: number) {
//   await prisma.post.delete({ where: { id } });
// }
