import prisma from "@/lib/db";
type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UsersServer() {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const res = await fetch("https://jsonplaceholder.typicode.com/users12");
  const users = await res.json();
  const posts = await prisma.post.findMany();
  return (
    <ul className="space-y-4 p-4">
      {posts.map((posts) => (
        <li
          key={posts.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          {posts.content}
        </li>
      ))}
    </ul>
  );
}
