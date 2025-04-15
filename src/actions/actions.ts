"use server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
export async function createPost(formData: FormData) {
  console.log("✅ createPost called");

  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .replace(/\s+/g, "-")
          .toLowerCase(),
        content: formData.get("content") as string,
        // author: {
        //   connect: {
        //     email: "john@gmail.com",
        //   },
        // },
      },
    });
    revalidatePath("/posts"); // 👈 👈 this is the fix
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unqie constraint violation, a new user cannot be created with this email"
        );
      }
    }
  }
}
export async function editPost(formData: FormData) {
  await prisma.post.update({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
}

export async function deletePost(id: number) {
  await prisma.post.delete({ where: { id } });
}
