import { NextRequest, NextResponse } from "next/server";
import { ai, GEMINI_MODEL } from "@/lib/gemini";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompt";

export async function POST(req: NextRequest) {
  try {
    const { question, imageBase64, mimeType } = await req.json();

    if (!question || !imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: "Missing question or image." },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          inlineData: {
            mimeType,
            data: imageBase64,
          },
        },
        {
          text: `${TUTOR_SYSTEM_PROMPT}

Student question: ${question}`,
        },
      ],
    });

    return NextResponse.json({
      answer: response.text || "No response returned.",
    });
  } catch (error: any) {
    console.error("Tutor API error:", error);

    return NextResponse.json(
      {
        error:
          error?.message || "Failed to generate tutor response.",
      },
      { status: error?.status || 500 }
    );
  }
}