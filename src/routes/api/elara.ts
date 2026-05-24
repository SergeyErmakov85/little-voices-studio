import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  buildAPIRequest,
  buildSystemPrompt,
  martinProfile,
  defaultSessionMemory,
  type CoachingContext,
} from "@/lib/elara-coach";

const MessageSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .max(20)
    .default([]),
  currentActivity: z.string().optional(),
});

export const sendToElara = createServerFn({ method: "POST" })
  .validator(MessageSchema)
  .handler(async ({ data }) => {
    const apiKey = (process.env.OPENAI_API_KEY ?? "").trim();
    if (!apiKey) {
      return {
        reply: "Элара временно недоступна. Попробуйте ещё раз чуть позже.",
        error: "missing_api_key",
      };
    }

    const ctx: CoachingContext = {
      child: martinProfile,
      sessionMemory: defaultSessionMemory,
      currentActivity: data.currentActivity,
      conversationHistory: data.history,
    };

    const req = buildAPIRequest(data.message, ctx);

    const body = JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: req.systemPrompt },
        ...(req.contextNote
          ? [{ role: "system" as const, content: req.contextNote }]
          : []),
        ...req.messages,
      ],
      temperature: req.temperature,
      max_tokens: req.maxTokens,
    });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });

    if (!response.ok) {
      const err = await response.text().catch(() => "unknown");
      console.error("OpenAI error", response.status, err);
      return {
        reply: "Элара сейчас задумалась. Попробуйте снова через момент.",
        error: "api_error",
      };
    }

    const json = await response.json() as {
      choices: { message: { content: string } }[];
    };

    const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { reply, error: null };
  });

// Re-export system prompt for debugging/testing
export { buildSystemPrompt, martinProfile, defaultSessionMemory };
