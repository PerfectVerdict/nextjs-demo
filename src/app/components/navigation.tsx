"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export const Navigation = ({ postsCount }: { postsCount: number }) => {
  const pathname = usePathname();
  return (
    <div className=" flex-col sm:flex-row items-center justify-between px-6 py-4">
      {/* Left side (could be logo or blank spacer if needed) */}

      {/* Centered title */}

      <Link
        href="/"
        className="text-purple-400 sm:mb-0 text-2xl text-center ml-[-15px] "
      >
        🎉 Hub of Wisdom 🎉
      </Link>

      {/* Right side - nav buttons */}
      <nav className="flex justify-center items-center space-x-4">
        <SignedIn>
          <Link href="/posts" className={pathname === "/posts"}>
            posts
          </Link>
        </SignedIn>

        <SignedIn>
          <Link href="/posts" className={pathname === "/about"}>
            about
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="redirect" redirectUrl="/posts" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
};
