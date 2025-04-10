
type MockUser = {
    id: number;
    name: string;
};

export default async function UsersServer() {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    const res = await fetch("https://67f801292466325443eb86e0.mockapi.io/users")
    const users = await res.json()


    async function addUser(formData: FormData) {
        "use server"
        const name = formData.get("name")
        const res = await fetch("https://67f801292466325443eb86e0.mockapi.io/users",
           {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // Authorization: "Bearer YOUR_PRIVATE_KEY"
            },
        body: JSON.stringify({name}),
    }
    )
    const newUser = await res.json()
    console.log(newUser)
    }
    return (
        <div className="py-10">
            <form action={addUser} className="mb-4">
                <input type="text" name="name" required className="border p-2 mr-2"/>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add user</button>
            </form>
            <ul className="space-y-4 p-4">
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
    )
}
