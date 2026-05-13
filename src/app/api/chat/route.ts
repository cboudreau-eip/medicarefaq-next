import { NextRequest } from "next/server";

/**
 * POST /api/chat
 *
 * Accepts a JSON payload with a messages array and streams back an AI response
 * using the Forge LLM API (OpenAI-compatible with SSE streaming).
 *
 * The AI is configured as a Medicare Assistant that answers Medicare-related
 * questions using 2026 data and directs users to call (800) 845-2484 for
 * personalized plan advice.
 */

const MEDICARE_SYSTEM_PROMPT = `You are the Medicare Assistant for MedicareFAQ.com. You help visitors understand Medicare plans, enrollment, eligibility, and coverage.

RULES:
- Only answer Medicare-related questions. If someone asks about something unrelated, politely redirect them.
- Use 2026 Medicare data (provided below) when citing costs, premiums, or thresholds.
- Keep answers concise (2-4 paragraphs max). Use plain language that a 65-year-old would understand.
- Never recommend a specific insurance company or plan by name.
- Never provide medical advice. For health questions, suggest they speak with their doctor.
- For personalized plan recommendations, always direct them to call (800) 845-2484 to speak with a licensed Medicare specialist.
- Do not use em dashes. Use commas, periods, or semicolons instead.
- Format responses with markdown when helpful (bold for emphasis, bullet lists for comparisons).

2026 MEDICARE REFERENCE DATA:
- Part A Premium (most people): $0 (with 40+ work credits)
- Part A Premium (without credits): $565/month
- Part A Deductible: $1,736 per benefit period
- Part A Coinsurance Days 61-90: $434/day
- Part A Lifetime Reserve Days: $868/day
- Part B Standard Premium: $202.90/month
- Part B Deductible: $283/year
- Part B covers 80% of approved services after deductible
- Part D Average Premium: $34.50/month
- Part D Maximum Deductible: $615
- Part D Catastrophic Threshold: $2,100
- Medicare Advantage Maximum Out-of-Pocket: $9,250
- Medigap High-Deductible Plan G Deductible: $2,950
- Initial Enrollment Period: 7 months around 65th birthday (3 before, birth month, 3 after)
- General Enrollment Period: January 1 - March 31 each year (coverage starts July 1)
- Open Enrollment (Medicare Advantage/Part D): October 15 - December 7
- Medigap Open Enrollment: 6 months starting when you turn 65 AND are enrolled in Part B

ABOUT MEDICAREFAQ:
- MedicareFAQ specializes in supplemental Medicare insurance
- Licensed in all 50 states
- BBB A+ rated since 2015
- Trusted by over 60,000 clients
- Phone: (800) 845-2484`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Limit conversation history to last 10 messages to control token usage
    const recentMessages = messages.slice(-10);

    // Validate message format
    for (const msg of recentMessages) {
      if (!msg.role || !msg.content || typeof msg.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (msg.content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "Message too long (max 2000 characters)" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    const apiUrl = process.env.BUILT_IN_FORGE_API_URL;
    const apiKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!apiUrl || !apiKey) {
      return new Response(
        JSON.stringify({ error: "Chat service is not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Call the Forge LLM API with streaming enabled
    const llmResponse = await fetch(`${apiUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        stream: true,
        messages: [
          { role: "system", content: MEDICARE_SYSTEM_PROMPT },
          ...recentMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
      }),
    });

    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      console.error(`LLM API error (${llmResponse.status}): ${errorText}`);
      return new Response(
        JSON.stringify({ error: "Failed to generate response" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response back to the client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = llmResponse.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ content })}\n\n`
                    )
                  );
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
