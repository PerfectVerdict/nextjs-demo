// components/navigation-wrapper.tsx
import { Navigation } from "./navigation";
import { prisma } from "@/lib/db";

export async function NavigationWrapper() {
  const postsCount = await prisma.post.count(); // ✅ Safe here
  return <Navigation postsCount={postsCount} />;
}
