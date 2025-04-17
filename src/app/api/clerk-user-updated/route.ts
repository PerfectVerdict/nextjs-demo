// app/api/clerk-user-updated/route.ts
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = await req.json();

  // Optionally: validate the webhook secret from Clerk here
  // Example: check req.headers.get("clerk-signature") or use a secret

  console.log("Received Clerk user update webhook:", body);

  // Revalidate the posts page — adjust the path as needed
  revalidatePath("/posts");

  return new Response("OK");
}
