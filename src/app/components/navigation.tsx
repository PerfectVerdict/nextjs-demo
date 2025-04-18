"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = ({ postsCount }: { postsCount: number }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row items-center justify-evenly px-6 py-4">
      {/* Left side (could be logo or blank spacer if needed) */}

      {/* Centered title */}

      <Link href="/" className="text-2xl font-bold text-center ml-[-15px]">
        Hub of Wisdom
      </Link>

      {/* Right side - nav buttons */}
      <nav className="flex justify-end items-center space-x-4">
        <SignedIn>
          <Link
            href="/posts"
            className={pathname === "/posts" ? "font-bold mr-2" : "mr-2"}
          >
            posts
          </Link>
          <Link
            href="/"
            className={pathname === "/" ? "font-bold mr-2" : "mr-2"}
          >
            home
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton redirectUrl="/posts" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
};
