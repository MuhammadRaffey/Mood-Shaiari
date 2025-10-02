import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.GROK_API_KEY;

if (!apiKey) {
  throw new Error("GROK_API_KEY is not defined in the environment variables");
}

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { mood, poetryStyle } = await request.json();

    if (!mood) {
      return NextResponse.json(
        { error: "Mood is required in the request body." },
        { status: 400 }
      );
    }

    if (!poetryStyle) {
      return NextResponse.json(
        { error: "Poetry style is required in the request body." },
        { status: 400 }
      );
    }

    // Define style-specific instructions
    const styleInstructions: Record<string, string> = {
      Ghazal:
        "Compose a beautiful Ghazal with 4 couplets (sher). Each couplet should have the same rhyme scheme and refrain. Write in Urdu script with deep emotional resonance.",
      Nazm: "Write a modern Nazm (free verse) poem with 8-10 lines. It should have a flowing narrative structure in Urdu script, expressing the mood with vivid imagery.",
      Haiku:
        "Create 3 Haiku-style poems in Urdu, each with 3 short lines capturing a moment related to the mood. Keep them brief and impactful.",
    };

    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      {
        role: "system",
        content:
          "You are an expert Urdu poet skilled in writing emotionally resonant poetry. " +
          "You should respond with authentic Urdu poetry in proper Urdu script. " +
          "Focus on the mood and style requested, using classical and modern techniques as appropriate.",
      },
      {
        role: "user",
        content: `My mood is ${mood}. ${
          styleInstructions[poetryStyle] || styleInstructions.Ghazal
        } Make it authentic and beautiful.`,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.2,
    });

    // Extract the content of the response
    const content =
      response.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ poem: content });
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while generating poetry.",
      },
      { status: 500 }
    );
  }
}
