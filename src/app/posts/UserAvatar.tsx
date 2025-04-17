// Fetches the currently signed in users data and displays their profile pic. Use in client comps.

"use client";
import { useUser } from "@clerk/nextjs";

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
