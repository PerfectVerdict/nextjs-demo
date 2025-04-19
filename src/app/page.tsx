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
    <>
      <main className="flex flex-col h-auto max-h-screen justify-center items-center">
        <section className="flex h-1/2 flex-col text-xl text-center w-full lg:w-3/4 px-6 py-12 justify-center items-center text-xl text-center mt-[-30px]"></section>

        <div className="flex justify-center text-2xl">
          What is&nbsp; <span className="text-purple-400"> Hub of Wisdom?</span>
          &nbsp; 🤔
        </div>
        <aside className="relative text-center w-3/4 px-6 py-2 border-l border-gray-300 text-sm">
          <div className="text-lg">
            The vision for Hub of Wisdom is that it will become a compilation of
            the wisest proverbs. 🕊️ 📜 🪔 🪨 <br />
          </div>
        </aside>

        <span className="flex-col text-sm text-gray-300 gap-10 absolute bottom-10 left-20">
          <span className="text-white">Features to come!</span>
          <ul className="text-sm text-gray-300">
            <li>Quote of the day</li>
            <li>View particuler users posts</li>
            <li>Save your favorite posts into your own treasury</li>
          </ul>
        </span>
        <SignedOut>
          <span className="absolute text-sm text-gray-300 bottom-10 right-20">
            Sign in to view and share life changing quotes
          </span>
        </SignedOut>
      </main>
    </>
  );
}
