import { createFileRoute } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { progressMilestones, strategies } from "@/lib/lumina-data";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Leo's development garden — Lumina" },
      {
        name: "description",
        content:
          "A gentle, honest view of how Leo's communication is unfolding — initiation, word attempts, joint attention.",
      },
    ],
  }),
  component: ProgressRoute,
});

const weeks = [
  { w: "W1", a: 28, b: 12, c: 40 },
  { w: "W2", a: 34, b: 18, c: 48 },
  { w: "W3", a: 41, b: 22, c: 55 },
  { w: "W4", a: 47, b: 30, c: 63 },
  { w: "W5", a: 55, b: 38, c: 70 },
  { w: "W6", a: 62, b: 46, c: 78 },
  { w: "W7", a: 68, b: 52, c: 82 },
  { w: "W8", a: 72, b: 58, c: 84 },
];

const newWords = [
  { word: "baw", meaning: "ball", date: "Tue" },
  { word: "mo", meaning: "more", date: "Wed" },
  { word: "go-go", meaning: "let's go", date: "Thu" },
  { word: "uh-oh", meaning: "uh-oh", date: "Fri" },
  { word: "nana", meaning: "banana", date: "Sat" },
];

function ProgressRoute() {
  const max = 100;
  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <header className="lumina-fade-up mb-12 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal-glow">
            8 weeks of you & Leo
          </span>
          <h1 className="text-display mt-3 text-4xl leading-tight md:text-5xl">
            The garden is <span className="italic">blooming</span>.
          </h1>
          <p className="mt-5 text-lg text-warm-mist/70">
            This isn't a test. It's a quiet portrait of how often Leo reaches for connection — and how often you answer.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {progressMilestones.map((m, i) => (
            <div
              key={m.label}
              className="lumina-card lumina-fade-up p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
                {m.label}
              </span>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-display text-5xl text-warm-mist">{m.value}%</span>
                <span className="text-display text-sm font-bold text-teal-glow">{m.delta}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-warm-mist/60">{m.note}</p>
            </div>
          ))}
        </section>

        <section className="lumina-fade-up mt-10 lumina-card p-7 md:p-10 [animation-delay:240ms]">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
                Growth chart
              </span>
              <h2 className="text-display mt-1 text-2xl text-warm-mist">Last 8 weeks</h2>
            </div>
            <div className="hidden gap-4 text-[11px] uppercase tracking-widest text-warm-mist/60 md:flex">
              <Legend color="bg-teal-glow" label="Initiation" />
              <Legend color="bg-magic-pink" label="Word attempts" />
              <Legend color="bg-lavender" label="Joint attention" />
            </div>
          </div>

          <div className="relative grid grid-cols-8 items-end gap-3 md:gap-6" style={{ height: 240 }}>
            {weeks.map((w) => (
              <div key={w.w} className="flex h-full flex-col items-center justify-end gap-2">
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <Bar color="bg-teal-glow" value={w.a} max={max} />
                  <Bar color="bg-magic-pink" value={w.b} max={max} />
                  <Bar color="bg-lavender" value={w.c} max={max} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
                  {w.w}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lumina-card lumina-fade-up border-magic-pink/20 bg-magic-pink/5 p-7 md:p-10">
            <h3 className="text-display text-2xl text-warm-mist">New words this week</h3>
            <p className="mt-1 text-sm text-warm-mist/60">
              Approximations count. Every "baw" is a draft of "ball".
            </p>
            <ul className="mt-6 divide-y divide-warm-mist/10">
              {newWords.map((nw) => (
                <li key={nw.word} className="flex items-center justify-between py-3">
                  <div>
                    <span className="text-display text-xl italic text-warm-mist">
                      {nw.word}
                    </span>
                    <span className="ml-3 text-sm text-warm-mist/50">→ {nw.meaning}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-magic-pink">
                    {nw.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lumina-card lumina-fade-up p-7 md:p-10">
            <h3 className="text-display text-2xl text-warm-mist">Strategy use by you</h3>
            <p className="mt-1 text-sm text-warm-mist/60">
              Where you're spending your coaching minutes this week.
            </p>
            <div className="mt-6 space-y-4">
              {strategies.map((s, i) => {
                const pct = [38, 28, 22, 12][i] ?? 10;
                return (
                  <div key={s.id}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-warm-mist/80">{s.name}</span>
                      <span className="text-display text-warm-mist">{pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-warm-mist/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-magic-pink to-lavender"
                        style={{ width: `${pct * 2.5}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Bar({ color, value, max }: { color: string; value: number; max: number }) {
  const h = `${(value / max) * 100}%`;
  return (
    <div className="relative flex h-full w-full max-w-3 items-end">
      <div
        className={`w-full rounded-t-full ${color} opacity-90 transition-all`}
        style={{ height: h, boxShadow: "0 0 20px -4px currentColor" }}
      />
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`size-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}