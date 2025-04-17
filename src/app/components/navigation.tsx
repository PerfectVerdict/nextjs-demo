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
        Posts: {postsCount}
      </span>
      <nav className="flex justify-center items-center p-4">
        <Link
          href="/"
          className={pathname === "/" ? "font-bold mr-4" : "text-blue-500 mr-4"}
        >
          home
        </Link>

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
