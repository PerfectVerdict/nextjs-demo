"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = ({ postsCount }: { postsCount: number }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-between">
      <SignedOut>
        <p className="text-sm text-gray-500 items-center">
          Sign in to view life changing wisdom and create a post yourself!✍️
        </p>
      </SignedOut>
      {/* <span className="justify-center items-center p-4 font-sm"> */}
      {/*   Posts: {postsCount} */}
      {/* </span> */}
      <h1 className="flex-1 text-center font-bold text-xl">Hub of Wisdom</h1>

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
