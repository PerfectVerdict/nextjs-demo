"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = ({ postsCount }: { postsCount: number }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="items-center font-bold text-1xl absolute left-1/2 transform -translate-x-1/2 ">
        Hub of Wisdom
      </h1>

      <span className="justify-center items-center p-4 font-sm">
        Posts: {postsCount}
      </span>

      <nav className="flex justify-center items-center p-4">
        <SignedOut>
          <p className="text-sm text-gray-500">
            Sign in to view life changing wisdom and create a post yourself!✍️
          </p>
        </SignedOut>
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
