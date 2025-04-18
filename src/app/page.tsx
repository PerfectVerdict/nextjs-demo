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
        <section className="flex h-1/2 flex-col text-xl text-center w-full lg:w-3/4 px-6 py-12 justify-center items-center text-xl text-center mt-[-30px]">
          <div className="flex flex-col max-w-xl w-full gap-4">
            <SignedOut>
              Sign in to create and discover life changing quotes ✍️
            </SignedOut>
          </div>
        </section>
        <aside className="border text-center w-3/4 px-6 py-2 border-r border-b border-t border-gray-300 text-sm">
          <div>🤔 What is Hub of Wisdom? 🤔</div>
          <div>
            We believe that with the right wisdom, anything is possible, that's
            why we made Hub of Wisdom
          </div>

          <p>
            The point of Hub of Wisdom is to be a one stop shop where you can
            find the greatest understanding that the the world has to offer.
            Learn with us, grow with us, Your life can change with the right
            wisdom! 🚀
          </p>
          <span className="block text-gray-600 text-sm mt-5">
            We are a newly created site, so expect new features to come!
          </span>
        </aside>
      </main>
    </>
  );
}
