import { createPost } from "@/actions/actions";
import PostCounter from "./components/PostCounter";
import { currentUser } from "@clerk/nextjs/server";
import { AvatarFromUrl } from "./posts/AvatarFromUrl"; // ✅ import this instead of UserAvatar
import { prisma } from "@/lib/db";
import Link from "next/link";
export default async function LandingPage() {
  return (
    <section className="flex h-vh justify-center align-center text-2xl">
      <h1>
        Share your inspiring quotes with the rest of the world on Hub of Wisdom
      </h1>
    </section>
  );
}
