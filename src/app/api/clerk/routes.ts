// // src/app/api/clerk/webhook/route.ts
// // Verifies the webhook using Clerk’s signature
//
// // Extracts the user info when a new user signs up
// //
// // Syncs that user into your PostgreSQL database via Prisma
// //
// // Tells Clerk the webhook was handled successfully
//
// import { headers } from "next/headers"; // to read incoming headers from Clerk
// import { Webhook } from "svix"; // Clerk uses Svix to send webhooks
// import { prisma } from "@/lib/db"; // your Prisma client
// const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
//
// export async function POST(req: Request) {
//   // Read raw body (Svix requires raw body for verification)
//   const payload = await req.text();
//
//   // Grab necessary headers for verifying the webhook
//   const headersList = headers();
//   const svixHeaders = {
//     "svix-id": headersList.get("svix-id")!,
//     "svix-timestamp": headersList.get("svix-timestamp")!,
//     "svix-signature": headersList.get("svix-signature")!,
//   };
//
//   // Create new webhook instance using your Clerk secret
//   const svix = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
//
//   let evt: any;
//
//   try {
//     // Verify the incoming request
//     evt = svix.verify(payload, svixHeaders);
//   } catch (err) {
//     console.error("Webhook verification failed:", err);
//     return new Response("Webhook error", { status: 400 });
//   }
//
//   // Extract the event type and data from the verified payload
//   const { type, data } = evt;
//
//   if (type === "user.created") {
//     // Get the user's email address from Clerk data
//     const email = data.email_addresses[0]?.email_address;
//
//     if (!email) {
//       return new Response("Missing email", { status: 400 });
//     }
//
//     // Add the user to your DB if they don't already exist
//     await prisma.user.upsert({
//       where: { email },
//       update: {}, // No update for now
//       create: {
//         email,
//         hashedPassword: "", // Can be skipped or replaced with `null` if unused
//       },
//     });
//   }
//
//   return new Response("OK", { status: 200 });
// }
