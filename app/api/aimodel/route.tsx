import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import arcjet from "@arcjet/next";
import { aj } from "../arcjet/route";
import { currentUser } from "@clerk/nextjs/server";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order, and wait for the user’s answer before asking the next:

Starting location (source)
Destination city or country
Group size (Solo, Couple, Family, Friends)
Budget (Low, Medium, High)
Trip duration (number of days)
Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

Along with the response, also send which UI component to display for generative UI (for example: 'budget/groupSize/TripDuration/final'), where final means AI generating complete trip suggestions.

Once all required information is collected, generate and return a strict JSON response only (no explanations or extra text) with the following JSON schema:
{
  "resp": "Text Resp",
  "ui": "budget/groupSize/TripDuration/final"
}`;

const FINAL_PROMPT = `
Generate a travel plan with the given details.  
Provide a list of hotel options including:  
Hotel name, hotel address, price per night, hotel image URL, geo-coordinates (latitude, longitude), rating, and description.  

Also, suggest an itinerary including:  
- Place name  
- Place details  
- Place image URL  
- Geo-coordinates (latitude, longitude)  
- Place address  
- Ticket pricing  
- Time to travel to each location  
- Best time to visit each location  

For each day in the itinerary, include:  
- Day number  
- Day plan  
- Best time to visit that day  

Output should follow this schema:

{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();
  const user=await currentUser();
  const decision = await aj.protect(req, { userId:user?.primaryEmailAddress?.emailAddress??'', requested: isFinal?5:0 }); // Deduct 5 tokens from the bucket
  console.log(decision);
  //@ts-ignore
  if(decision?.reason?.remaining==0){
    return NextResponse.json({
      resp:'No free Credit Remaining',
      ui:'limit'
    })
  }
  try {
    // Merge all user/assistant messages into a single conversation string
    const history = messages
      .map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
      .join("\n");

    // Choose prompt based on isFinal
    const activePrompt = isFinal
      ? `${FINAL_PROMPT}\n\nUser provided details:\n${history}`
      : `${PROMPT}\n\nConversation so far:\n${history}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: activePrompt }],
        },
      ],
      generationConfig: { responseMimeType: "application/json" },
    });

    let parsedContent = {};
    try {
      parsedContent = result.response?.text()
        ? JSON.parse(result.response.text())
        : {};
    } catch (err) {
      console.error("Invalid JSON from AI:", result.response?.text());
      return NextResponse.json(
        { error: "Invalid JSON from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedContent);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
