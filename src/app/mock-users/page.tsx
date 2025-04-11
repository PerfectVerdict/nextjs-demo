// this file contains a server actions that securely adds a new user to our api and we're using it within our components
// Next js ill handle the form submission, run our server-side code, and update the page automatically.
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
type MockUser = {
  id: number;
  name: string;
};

export default async function UsersServer() {
  const authObj = await auth();
  const userObj = await currentUser();
  console.log(authObj, userObj);
  // await new Promise(resolve => setTimeout(resolve, 2000))
  const res = await fetch("https://67f801292466325443eb86e0.mockapi.io/users");
  const users = await res.json();

  async function addUser(formData: FormData) {
    "use server";
    const posts = await prisma.post.findMany();
    const name = formData.get("name");
    const res = await fetch(
      "https://67f801292466325443eb86e0.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer YOUR_PRIVATE_KEY"
        },
        body: JSON.stringify({ name }),
      },
    );
    const newUser = await res.json();
    revalidatePath("/mock-users");
    console.log(newUser);
  }
  return (
    <div className="py-10">
      <form action={addUser} className="mb-4">
        <input type="text" name="name" required className="border p-2 mr-2" />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add user
        </button>
      </form>
      <ul className="flex flex-wrap gap-4 p-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            {user.id} {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
