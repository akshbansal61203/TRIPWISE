import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE", // "LIVE" will block requests, "DRY_RUN" only logs
      characteristics: ["userId"], // track requests by custom user ID
      refillRate: 5, // refill 5 tokens per interval
      interval: 86400, // refill every 24 hours (in seconds)
      capacity: 50, // max 50 tokens
    }),
  ],
});

export async function GET(req: Request) {
  const userId = "user123"; // Replace with authenticated user's ID

  // Deduct 5 tokens from the bucket
  const decision = await aj.protect(req, { userId, requested: 5 });

  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { 
        error: "Free limit reached", 
        paymentRequired: true,
        redirectToPricing: "/pricing"
      },
      { status: 429 }
    );
  }

  // If allowed
  return NextResponse.json({ message: "Hello world" });
}
