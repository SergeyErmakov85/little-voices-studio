import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { initialCoachThread, strategies, type ChatMessage } from "@/lib/lumina-data";
import elaraImg from "@/assets/elara.jpg";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "Talk to Elara — your AI Hanen coach" },
      {
        name: "description",
        content:
          "A warm, private space to ask your AI parent coach about what just happened in play — and what to try next.",
      },
    ],
  }),
  component: CoachRoute,
});

const elaraReplies = [
  "That's a beautiful observation. Try giving Leo a five-second pause the very next time he reaches for a toy — count the pause silently. Then label the toy with just one stressed word.",
  "I'd treat that grunt as a sentence. Reply with two words that match what you think he meant: 'More juice?' Then wait again. Repetition is the magic here.",
  "Lovely instinct. Let's turn that moment into a small ROCK routine: same words, same actions, every day for a week. I'll set you a reminder for tomorrow.",
  "Don't worry — quiet days are part of the rhythm. Tonight, try the bath-time SPARK: hand him an empty cup so he has to ask for water. One word, warmly stressed.",
];

function CoachRoute() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialCoachThread);
  const [draft, setDraft] = useState("");

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const next: ChatMessage[] = [
      ...messages,
      { id: `p-${Date.now()}`, role: "parent", text },
    ];
    setMessages(next);
    setDraft("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: `e-${Date.now()}`,
          role: "elara",
          text: elaraReplies[m.length % elaraReplies.length],
          meta: "Hanen-trained · responding to your moment",
        },
      ]);
    }, 700);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-24 md:px-12 lg:grid-cols-[1fr_320px] lg:gap-10">
        <section className="lumina-card lumina-fade-up flex h-[calc(100vh-220px)] min-h-[520px] flex-col overflow-hidden border-lavender/20 bg-lavender/5">
          <header className="flex items-center gap-4 border-b border-warm-mist/10 px-6 py-5">
            <img
              src={elaraImg}
              alt="Elara"
              className="size-12 rounded-full object-cover ring-2 ring-lavender/40"
              width={96}
              height={96}
              loading="lazy"
            />
            <div className="flex-1">
              <h1 className="text-display text-xl text-lavender">Elara</h1>
              <p className="text-[11px] uppercase tracking-widest text-warm-mist/50">
                Hanen-trained · listens to your play sessions
              </p>
            </div>
            <span className="lumina-glass flex items-center gap-2 rounded-full px-3 py-1.5">
              <span className="size-2 animate-pulse rounded-full bg-teal-glow" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-glow">
                Listening
              </span>
            </span>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "parent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[78%] rounded-3xl px-5 py-4 ${
                    m.role === "parent"
                      ? "bg-warm-mist text-deep-space"
                      : "border border-lavender/30 bg-lavender/10 text-warm-mist"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{m.text}</p>
                  {m.meta && (
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-warm-mist/50">
                      {m.meta}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-warm-mist/10 p-4">
            <div className="lumina-glass flex items-end gap-3 rounded-3xl p-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={2}
                placeholder="Tell Elara what just happened in play…"
                className="min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-warm-mist placeholder:text-warm-mist/40 focus:outline-none"
              />
              <button
                onClick={send}
                className="rounded-full bg-lavender px-5 py-2.5 text-sm font-bold text-deep-space transition-transform hover:scale-[1.03]"
              >
                Send
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="lumina-card p-6">
            <h2 className="text-display text-lg text-warm-mist">Quick prompts</h2>
            <div className="mt-4 space-y-2">
              {[
                "He didn't make a sound at breakfast.",
                "He said 'baw' for the first time!",
                "Bath time felt loud — what should I change?",
                "Suggest tonight's SPARK moment.",
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => setDraft(p)}
                  className="w-full rounded-2xl border border-warm-mist/10 bg-warm-mist/5 p-3 text-left text-sm text-warm-mist/80 transition-colors hover:bg-warm-mist/10"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="lumina-card border-magic-pink/20 bg-magic-pink/5 p-6">
            <h3 className="text-display text-lg text-warm-mist">Strategies Elara may suggest</h3>
            <ul className="mt-3 space-y-2 text-sm text-warm-mist/70">
              {strategies.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-magic-pink">
                    {s.short}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}