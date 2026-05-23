import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { lessons, strategies } from "@/lib/lumina-data";
import playHands from "@/assets/play-hands.jpg";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "Библиотека уроков по методу Hanen — Lumina" },
      {
        name: "description",
        content:
          "Короткие уроки на основе метода Hanen «Чтобы говорить, нужны двое» — OWL, 4S, ROCK и SPARK — написанные для уставших родителей.",
      },
    ],
  }),
  component: LessonLibrary,
});

const colorChip = {
  teal: "bg-teal-glow/20 text-teal-glow",
  sunset: "bg-sunset/20 text-sunset",
  pink: "bg-magic-pink/20 text-magic-pink",
  lavender: "bg-lavender/20 text-lavender",
} as const;

function LessonLibrary() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 px-6 pb-24 md:px-12">
        <header className="lumina-fade-up mb-12 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-sunset">
            Библиотека Hanen
          </span>
          <h1 className="text-display mt-3 text-4xl leading-tight md:text-5xl">
            Маленькие уроки. <span className="italic">Большие сдвиги</span> в том, как вы говорите вместе.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-warm-mist/70">
            Каждый урок — меньше десяти минут и заканчивается одним конкретным шагом, который можно попробовать в реальной игре уже сегодня.
          </p>
        </header>

        <section className="lumina-fade-up mb-14 [animation-delay:80ms]">
          <h2 className="text-display mb-6 text-2xl text-warm-mist">Четыре стратегии, один метод</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {strategies.map((s) => (
              <div key={s.id} className="lumina-card p-6">
                <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${colorChip[s.color]}`}>
                  {s.short}
                </span>
                <h3 className="text-display mt-4 text-xl text-warm-mist">{s.name}</h3>
                <p className="mt-2 text-sm italic text-warm-mist/60">{s.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lumina-fade-up [animation-delay:160ms]">
          <h2 className="text-display mb-6 text-2xl text-warm-mist">Все уроки</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {lessons.map((l) => {
              const s = strategies.find((st) => st.id === l.strategyId)!;
              return (
                <Link
                  key={l.id}
                  to="/lessons/$lessonId"
                  params={{ lessonId: l.id }}
                  className="group lumina-card overflow-hidden p-0 transition-transform hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative aspect-video w-full overflow-hidden md:aspect-square md:w-48 md:shrink-0">
                      <img
                        src={playHands}
                        alt=""
                        className="absolute inset-0 size-full object-cover opacity-60 transition-transform group-hover:scale-105"
                        loading="lazy"
                        width={800}
                        height={800}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-deep-space/80 to-transparent" />
                      <span className={`absolute left-4 top-4 inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${colorChip[s.color]}`}>
                        {s.short}
                      </span>
                    </div>
                    <div className="flex-1 p-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
                        {l.module} · {l.duration}
                      </span>
                      <h3 className="text-display mt-2 text-xl text-warm-mist">{l.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-warm-mist/60">{l.summary}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}