import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { todayRoutine, strategies } from "@/lib/lumina-data";

export const Route = createFileRoute("/routines")({
  head: () => ({
    meta: [
      { title: "Ежедневные ритуалы — Lumina" },
      {
        name: "description",
        content:
          "Недельная раскадровка игровых моментов по методу Hanen, встроенных в ритм семейной жизни.",
      },
    ],
  }),
  component: RoutinesRoute,
});

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const colorChip = {
  teal: "bg-teal-glow/20 text-teal-glow",
  sunset: "bg-sunset/20 text-sunset",
  pink: "bg-magic-pink/20 text-magic-pink",
  lavender: "bg-lavender/20 text-lavender",
} as const;

function RoutinesRoute() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-12">
        <header className="lumina-fade-up mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-lavender">
              Ритуалы как терапия
            </span>
            <h1 className="text-display mt-3 text-4xl leading-tight md:text-5xl">
              Те же тёплые моменты <span className="italic">снова и снова</span>.
            </h1>
            <p className="mt-4 text-lg text-warm-mist/70">
              Секрет — в повторении. Запланируйте пять маленьких моментов в день — и Мартин начнёт вставлять слова сам.
            </p>
          </div>
          <button className="rounded-full bg-warm-mist px-6 py-3 text-sm font-bold text-deep-space transition-transform hover:scale-[1.03]">
            + Добавить момент
          </button>
        </header>

        <section className="lumina-fade-up [animation-delay:80ms] lumina-card overflow-hidden p-0">
          <div className="grid grid-cols-[80px_1fr] border-b border-warm-mist/10">
            <div />
            <div className="grid grid-cols-7">
              {days.map((d, i) => (
                <div
                  key={d}
                  className={`px-3 py-4 text-center text-[11px] font-bold uppercase tracking-widest ${
                    i === 2 ? "text-magic-pink" : "text-warm-mist/40"
                  }`}
                >
                  {d}
                  {i === 2 && <span className="ml-1 text-warm-mist/40">· сегодня</span>}
                </div>
              ))}
            </div>
          </div>

          {todayRoutine.map((step) => {
            const strat = strategies.find((s) => s.id === step.strategyId)!;
            return (
              <div
                key={step.id}
                className="grid grid-cols-[80px_1fr] border-b border-warm-mist/5 last:border-b-0"
              >
                <div className="border-r border-warm-mist/5 p-4 text-display text-sm text-warm-mist/60">
                  {step.time}
                </div>
                <div className="grid grid-cols-7">
                  {days.map((_, i) => {
                    const isToday = i === 2;
                    const filled = i <= 2;
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-center border-l border-warm-mist/5 p-3 ${
                          isToday ? "bg-magic-pink/5" : ""
                        }`}
                      >
                        {filled ? (
                          <div
                            className={`w-full rounded-2xl p-3 text-left ${
                              isToday
                                ? "border border-magic-pink/40 bg-warm-mist/5"
                                : "border border-warm-mist/10 bg-warm-mist/[0.03] opacity-70"
                            }`}
                          >
                            <p className="truncate text-xs font-semibold text-warm-mist">
                              {step.title}
                            </p>
                            <span
                              className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${colorChip[strat.color]}`}
                            >
                              {strat.short}
                            </span>
                          </div>
                        ) : (
                          <div className="w-full rounded-2xl border border-dashed border-warm-mist/10 p-3 text-center text-[10px] text-warm-mist/30">
                            +
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="lumina-card p-7">
            <h3 className="text-display text-xl text-warm-mist">Почему это работает</h3>
            <p className="mt-3 text-sm leading-relaxed text-warm-mist/65">
              ROCK-ритуалы превращают обычные моменты в «спортзал» для речи. Повторяя одни и те же слова в одном и том же контексте каждый день, вы даёте Мартину десятки спокойных шансов потренировать один и тот же звук.
            </p>
          </div>
          <Link to="/lessons" className="lumina-card group p-7 transition-colors hover:bg-warm-mist/5">
            <h3 className="text-display text-xl text-warm-mist">Изучить метод ROCK →</h3>
            <p className="mt-3 text-sm leading-relaxed text-warm-mist/65">
              8-минутный урок о том, как выстроить ежедневный ритуал, эффект которого накапливается за неделю.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}