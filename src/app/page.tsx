import { createPost } from "@/actions/actions";
import { SignedOut } from "@clerk/nextjs";
// import PostCounter from "./components/PostCounter";
import { currentUser } from "@clerk/nextjs/server";
import { AvatarFromUrl } from "./posts/AvatarFromUrl"; // ✅ import this instead of UserAvatar
import { prisma } from "@/lib/db";
import Link from "next/link";
export default async function LandingPage({
  postsCount,
}: {
  postsCount: number;
}) {
  return (
    <section className="flex h-vh justify-center align-center text-2xl">
      {" "}
      <SignedOut>
        <p className="text-sm text-gray-500">Sign in to create a post ✍️</p>
      </SignedOut>
    </section>
  );
}
