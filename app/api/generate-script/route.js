import { generateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT = `write two different scripts for a 30-second video on the Topic: {topic}.
Do not add scene descriptions.
Do not add anything in braces.
Just return plain story text.
Give the response in JSON format:
{
  "scripts": [
    { "content": "..." },
    { "content": "..." }
  ]
}`;

export async function POST(req) {
  try {
    const { topic } = await req.json();
    const PROMPT = SCRIPT_PROMPT.replace("{topic}", topic);

    const result = await generateScript(PROMPT);

    const rawText = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("✅ Gemini response text:", rawText);

    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleaned);

    return NextResponse.json(json);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
