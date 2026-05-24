import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { initialCoachThread, strategies, type ChatMessage } from "@/lib/lumina-data";
import {
  generateContextualPrompts,
  martinProfile,
  defaultSessionMemory,
  classifyParentMessage,
} from "@/lib/elara-coach";
import { sendToElara } from "./api/elara";
import elaraImg from "@/assets/elara.jpg";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Поговорить с Эларой — ваш ИИ-коуч по методу Hanen" },
      {
        name: "description",
        content:
          "Тёплое, личное пространство, где можно спросить ИИ-коуча о том, что только что произошло в игре, и что попробовать дальше.",
      },
    ],
  }),
  component: CoachRoute,
});

const strategyColor: Record<string, string> = {
  OWL: "text-teal-glow",
  "4S": "text-sunset",
  ROCK: "text-magic-pink",
  SPARK: "text-lavender",
};

// Warm filler text shown while Элара "thinks" — never generic
const thinkingPhrases = [
  "Элара слушает…",
  "Обдумывает…",
  "Ищет нужные слова…",
  "Один момент…",
];

function CoachRoute() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialCoachThread);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState(thinkingPhrases[0]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Build contextual prompts from real child profile
  const contextualPrompts = generateContextualPrompts({
    child: martinProfile,
    sessionMemory: defaultSessionMemory,
    conversationHistory: [],
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Cycle thinking phrase
  useEffect(() => {
    if (!isThinking) return;
    let i = 1;
    const id = setInterval(() => {
      setThinkingText(thinkingPhrases[i % thinkingPhrases.length]);
      i++;
    }, 1800);
    return () => clearInterval(id);
  }, [isThinking]);

  const send = async () => {
    const text = draft.trim();
    if (!text || isThinking) return;

    // Classify message for meta tag
    const { type, emotionalTone } = classifyParentMessage(text);

    const userMsg: ChatMessage = {
      id: `p-${Date.now()}`,
      role: "parent",
      text,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setDraft("");
    setErrorMessage(null);
    setIsThinking(true);

    // Build conversation history for context (last 10 turns)
    const history = nextMessages
      .slice(-10)
      .map((m) => ({
        role: (m.role === "parent" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      }));

    try {
      const result = await sendToElara({
        data: {
          message: text,
          history: history.slice(0, -1), // exclude the message itself
          currentActivity: martinProfile.currentToyFocus,
        },
      });

      const strategyLabel = detectStrategyLabel(result.reply);

      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "elara",
          text: result.reply,
          meta: strategyLabel,
        },
      ]);

      if (result.error === "missing_api_key") {
        setErrorMessage("Добавьте OPENAI_API_KEY в переменные окружения, чтобы Элара ожила.");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-err-${Date.now()}`,
          role: "elara",
          text: "Что-то пошло не так. Попробуйте ещё раз — я здесь.",
          meta: undefined,
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-24 md:px-12 lg:grid-cols-[1fr_320px] lg:gap-10">

        {/* ── Chat panel ─────────────────────────────────────────────────── */}
        <section className="lumina-card lumina-fade-up flex h-[calc(100vh-220px)] min-h-[520px] flex-col overflow-hidden border-lavender/20 bg-lavender/5">

          {/* Header */}
          <header className="flex items-center gap-4 border-b border-warm-mist/10 px-6 py-5">
            <img
              src={elaraImg}
              alt="Элара"
              className="size-12 rounded-full object-cover ring-2 ring-lavender/40"
              width={96}
              height={96}
              loading="lazy"
            />
            <div className="flex-1">
              <h1 className="text-display text-xl text-lavender">Элара</h1>
              <p className="text-[11px] uppercase tracking-widest text-warm-mist/50">
                Обучена методу Hanen · следит за Мартином
              </p>
            </div>
            <span className="lumina-glass flex items-center gap-2 rounded-full px-3 py-1.5">
              <span
                className={`size-2 rounded-full ${isThinking ? "animate-pulse bg-sunset" : "bg-teal-glow"}`}
              />
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${isThinking ? "text-sunset" : "text-teal-glow"}`}
              >
                {isThinking ? "Думает" : "Слушает"}
              </span>
            </span>
          </header>

          {/* Messages */}
          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}

            {/* Thinking indicator */}
            {isThinking && (
              <div className="flex justify-start">
                <div className="max-w-[78%] rounded-3xl border border-lavender/30 bg-lavender/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex gap-1">
                      <Dot delay={0} />
                      <Dot delay={200} />
                      <Dot delay={400} />
                    </span>
                    <span className="text-[13px] italic text-warm-mist/50">{thinkingText}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error banner */}
            {errorMessage && (
              <div className="rounded-2xl border border-sunset/30 bg-sunset/10 px-4 py-3 text-sm text-sunset">
                {errorMessage}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-warm-mist/10 p-4">
            <div className="lumina-glass flex items-end gap-3 rounded-3xl p-3">
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={2}
                placeholder="Расскажите Эларе, что только что было в игре…"
                className="min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-warm-mist placeholder:text-warm-mist/40 focus:outline-none"
                disabled={isThinking}
              />
              <button
                onClick={send}
                disabled={isThinking || !draft.trim()}
                className="rounded-full bg-lavender px-5 py-2.5 text-sm font-bold text-deep-space transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Отправить
              </button>
            </div>
          </div>
        </section>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className="space-y-5">

          {/* Contextual prompts — generated from real child profile */}
          <div className="lumina-card p-6">
            <h2 className="text-display text-lg text-warm-mist">Быстрые подсказки</h2>
            <div className="mt-4 space-y-2">
              {contextualPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setDraft(p);
                    textareaRef.current?.focus();
                  }}
                  className="w-full rounded-2xl border border-warm-mist/10 bg-warm-mist/5 p-3 text-left text-sm text-warm-mist/80 transition-colors hover:bg-warm-mist/10"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Active strategy focus */}
          <div className="lumina-card border-magic-pink/20 bg-magic-pink/5 p-6">
            <h3 className="text-display text-lg text-warm-mist">Стратегии Эларой</h3>
            <p className="mt-1 text-xs text-warm-mist/50">
              Элара использует все четыре — в зависимости от вашего момента.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-warm-mist/70">
              {strategies.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${strategyColor[s.short] ?? "text-warm-mist/40"}`}
                  >
                    {s.short}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Child context card */}
          <div className="lumina-card border-teal-glow/20 bg-teal-glow/5 p-6">
            <h3 className="text-display text-base text-warm-mist">Мартин сейчас</h3>
            <p className="mt-1 text-xs text-warm-mist/50 uppercase tracking-widest">
              {stageLabel(martinProfile.stage)}
            </p>
            <div className="mt-4 space-y-2">
              {martinProfile.recentWords.slice(-3).map((w) => (
                <span
                  key={w}
                  className="mr-2 inline-block rounded-full bg-teal-glow/15 px-3 py-1 text-[12px] font-bold italic text-teal-glow"
                >
                  «{w}»
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-warm-mist/50">
              {martinProfile.recentMilestones[0]}
            </p>
          </div>

        </aside>
      </main>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function MessageBubble({ message: m }: { message: ChatMessage }) {
  const isParent = m.role === "parent";
  return (
    <div className={`flex ${isParent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-3xl px-5 py-4 ${
          isParent
            ? "bg-warm-mist text-deep-space"
            : "border border-lavender/30 bg-lavender/10 text-warm-mist"
        }`}
      >
        <p className="text-[15px] leading-relaxed">{m.text}</p>
        {m.meta && (
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
            {m.meta}
          </p>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="size-1.5 rounded-full bg-lavender/60 animate-bounce"
      style={{ animationDelay: `${delay}ms`, animationDuration: "1.2s" }}
    />
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function stageLabel(stage: string): string {
  const map: Record<string, string> = {
    discoverer: "Стадия · Первооткрыватель",
    communicator: "Стадия · Общитель",
    first_words: "Стадия · Первые слова",
    combiner: "Стадия · Соединитель",
  };
  return map[stage] ?? stage;
}

// Detect which Hanen strategy the response primarily references
function detectStrategyLabel(text: string): string | undefined {
  const lower = text.toLowerCase();
  if (/\bowl\b|наблюдай|жди|слушай|пятисекунд/.test(lower)) return "OWL · наблюдай, жди, слушай";
  if (/\b4s\b|меньше слов|выдели|медленн|покажи/.test(lower)) return "4S · меньше и точнее";
  if (/\bspark\b|провокац|приглашен|соблазн|не откроет/.test(lower)) return "SPARK · создай повод";
  if (/\brock\b|ритуал|повтор|каждый день/.test(lower)) return "ROCK · ритуал рождает речь";
  if (/расширь|расширяй|черновик|он сказал.*ответь/.test(lower)) return "Расширение · принимай и добавляй";
  return undefined;
}
