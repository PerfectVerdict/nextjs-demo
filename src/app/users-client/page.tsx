"use client"
// Server side fetching is preffered. We have to handle error and loading state mangually with client-side
// With server side next handles it via file structure.
// Use client-side when you need real time updates or when you the data depends on client side interaction
//
// Server side are async functions that are executed on the server
// they allow us to define and execude server side login directly from our components
//  handling form submisions, updating our database, anything that requires server side execution
import { useState, useEffect } from "react";

type Users = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
};

export default function UsersClient() {
    const [users, setUsers] = useState<Users[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                if (!response.ok) throw new Error("Failed to fetch users")
                const data = await response.json();
            setUsers(data)
            } catch (err) {
                setError("failed to fetch users")
                if (err instanceof Error) {
                    setError(`Failed to fetch users: ${err.message}`)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    if (loading) return <div>Loading...</div>
        if (error) return <div>{error}</div>
    return (
        <ul className="space-y-4 p-4">
        {users.map((user) => (
            <li 
                key={user.id}
                className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                >
                {user.name} ({user.email})
                </li>
        ))}
        </ul>
    )
}
