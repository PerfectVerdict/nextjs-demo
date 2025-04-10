export const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" }
];
export async function GET() {
    return new Response(JSON.stringify(users), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: Request) {
    try {
        const user = await request.json();
        console.log("Received user:", user); // Log the received user object
        const newUser = {
            id: users.length + 1,
            name: user.name
        };

        users.push(newUser);
        console.log("Added new user:", newUser); // Log the new user added

        return new Response(JSON.stringify(newUser), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 201, // Ensure this status code is sent correctly
        });
    } catch (error) {
        console.error("Error processing POST request:", error); // Log any errors
        return new Response(JSON.stringify({ error: "Failed to process request" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

