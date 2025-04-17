"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = ({ postsCount }: { postsCount: number }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="items-center font-bold text-2xl absolute left-1/2 transform -translate-x-1/2 ">
        Hub of Wisdom
      </h1>

      <span className="justify-center items-center p-4 font-semibold">
        {/* Posts: {postsCount} */}
        <SignedOut>
          <p className="text-sm text-gray-500">Sign in to create a post ✍️</p>
        </SignedOut>
      </span>
      <nav className="flex justify-center items-center p-4">
        <SignedIn>
          <Link
            href="/posts"
            className={pathname === "/posts" ? "font-bold mr-4" : "mr-4"}
          >
            posts
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
};
