"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = ({ postsCount }: { postsCount: number }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-between px-6 py-4">
      {/* Left side (could be logo or blank spacer if needed) */}
      <div className="flex-1"></div>

      {/* Centered title */}
      <h1 className="text-2xl font-bold text-center">Hub of Wisdom</h1>

      {/* Right side - nav buttons */}
      <nav className="flex-1 flex justify-end items-center space-x-4">
        <SignedIn>
          <Link
            href="/posts"
            className={pathname === "/posts" ? "font-bold mr-2" : "mr-2"}
          >
            posts
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal" redirectUrl="/posts" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
};
