// app/posts/UserAvatar.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
      <img
        src={user.imageUrl}
        alt={user.firstName ?? "User"}
        className="h-full w-full object-cover"
      />
    </div>
  );
};
