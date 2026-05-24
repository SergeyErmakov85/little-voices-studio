import { createFileRoute, Link } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { MagicBar } from "@/components/MagicBar";
import { strategies, todayRoutine, progressMilestones, initialCoachThread } from "@/lib/lumina-data";
import heroNursery from "@/assets/hero-nursery.jpg";
import elaraImg from "@/assets/elara.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Сегодня с Мартином — Lumina" },
      {
        name: "description",
        content:
          "Сегодняшний ритуал по методу Hanen, ваш ИИ-коуч Элара и живой «сад развития» Мартина — всё в одном спокойном пространстве.",
      },
    ],
  }),
  component: ParentHub,
});

const colorMap = {
  teal: { ring: "border-teal-glow/40", chip: "bg-teal-glow/20 text-teal-glow" },
  sunset: { ring: "border-sunset/40", chip: "bg-sunset/20 text-sunset" },
  pink: { ring: "border-magic-pink/40", chip: "bg-magic-pink/20 text-magic-pink" },
  lavender: { ring: "border-lavender/40", chip: "bg-lavender/20 text-lavender" },
} as const;

function ParentHub() {
  const activeStep = todayRoutine.find((s) => s.status === "active") ?? todayRoutine[0];
  const activeStrategy = strategies.find((s) => s.id === activeStep.strategyId)!;
  const elaraTip = initialCoachThread.find((m) => m.role === "elara")!;

  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist selection:bg-magic-pink/30">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 px-6 pb-32 md:px-12">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT — Active session + strategy */}
          <div className="col-span-12 space-y-6 lg:col-span-8 lg:space-y-8">
            {/* Hero session card */}
            <article className="lumina-fade-up relative flex aspect-[16/10] flex-col overflow-hidden rounded-[2.5rem] border border-warm-mist/10 bg-twilight/40 md:aspect-[16/9] md:rounded-[3rem]">
              <img
                src={heroNursery}
                alt="Малыш-дракончик Луми в волшебной детской"
                className="absolute inset-0 size-full object-cover opacity-70 mix-blend-screen"
                width={1600}
                height={896}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />

              <div className="relative mt-auto p-8 md:p-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-lg space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-magic-pink/40 bg-magic-pink/15 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-magic-pink">
                      <span className="size-1.5 rounded-full bg-magic-pink shadow-[0_0_8px_var(--magic-pink)]" />
                      Активный ритуал · {activeStep.time}
                    </span>
                    <h1 className="text-display text-4xl font-semibold italic leading-tight text-warm-mist md:text-5xl">
                      {activeStep.title}
                    </h1>
                    <p className="text-base text-warm-mist/75 md:text-lg">
                      {activeStep.cue}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="lumina-glass flex size-20 flex-col items-center justify-center rounded-full text-center">
                      <span className="text-[10px] font-bold uppercase tracking-tight text-teal-glow">
                        Игрушка
                      </span>
                      <span className="mt-1 size-2 animate-pulse rounded-full bg-teal-glow" />
                    </div>
                    <Link
                      to="/world"
                      className="rounded-full bg-warm-mist px-6 py-3 text-sm font-bold text-deep-space transition-transform hover:scale-[1.03]"
                    >
                      Начать вместе
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Strategy of the moment — OWL trio */}
            <section className="lumina-fade-up [animation-delay:120ms]">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-warm-mist/50">
                    Стратегия в игре
                  </span>
                  <h2 className="text-display mt-1 text-2xl text-warm-mist md:text-3xl">
                    {activeStrategy.name}
                  </h2>
                </div>
                <Link
                  to="/lessons"
                  className="hidden text-xs font-semibold uppercase tracking-widest text-warm-mist/60 hover:text-warm-mist sm:inline"
                >
                  Вся библиотека →
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                {activeStrategy.steps.slice(0, 3).map((step, i) => {
                  const palette = [colorMap.teal, colorMap.sunset, colorMap.pink][i];
                  const labels = ["Наблюдай", "Жди", "Слушай"];
                  return (
                    <div
                      key={i}
                      className={`lumina-card p-6 transition-colors md:p-8 hover:${palette.ring}`}
                    >
                      <div
                        className={`mb-5 grid size-10 place-items-center rounded-xl ${palette.chip}`}
                      >
                        <span className="text-sm font-bold">{i + 1}</span>
                      </div>
                      <h3 className="text-display mb-2 text-xl text-warm-mist">
                        {labels[i] ?? `Шаг ${i + 1}`}
                      </h3>
                      <p className="text-sm leading-relaxed text-warm-mist/60">{step}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Today's routine storyboard */}
            <section className="lumina-fade-up [animation-delay:200ms]">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-warm-mist/50">
                    Раскадровка дня
                  </span>
                  <h2 className="text-display mt-1 text-2xl text-warm-mist md:text-3xl">
                    Пять тёплых моментов
                  </h2>
                </div>
                <Link
                  to="/routines"
                  className="text-xs font-semibold uppercase tracking-widest text-warm-mist/60 hover:text-warm-mist"
                >
                  План на неделю →
                </Link>
              </div>
              <ol className="space-y-3">
                {todayRoutine.map((step) => {
                  const strat = strategies.find((s) => s.id === step.strategyId)!;
                  const palette = colorMap[strat.color];
                  const isActive = step.status === "active";
                  const isDone = step.status === "done";
                  return (
                    <li
                      key={step.id}
                      className={`lumina-card flex items-center gap-4 p-4 md:gap-6 md:p-5 ${
                        isActive ? "ring-1 ring-magic-pink/60 shadow-[0_0_40px_-10px_var(--magic-pink)]" : ""
                      } ${isDone ? "opacity-60" : ""}`}
                    >
                      <span className="text-display w-14 shrink-0 text-lg font-semibold text-warm-mist/70">
                        {step.time}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-warm-mist">
                            {step.title}
                          </h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${palette.chip}`}
                          >
                            {strat.short}
                          </span>
                        </div>
                        <p className="truncate text-sm text-warm-mist/60">{step.cue}</p>
                      </div>
                      <span className="hidden text-[10px] font-bold uppercase tracking-widest text-warm-mist/40 sm:inline">
                        {step.status}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          {/* RIGHT — Coach + progress */}
          <aside className="col-span-12 space-y-6 lg:col-span-4 lg:space-y-8">
            <div className="lumina-fade-up rounded-[2.5rem] border border-lavender/20 bg-lavender/5 p-7 backdrop-blur-sm md:rounded-[3rem] md:p-10 [animation-delay:80ms]">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative">
                  <img
                    src={elaraImg}
                      alt="Элара — ИИ-наставница для родителей"
                    className="size-12 rounded-full object-cover ring-2 ring-lavender/40"
                    loading="lazy"
                    width={96}
                    height={96}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-magic-pink ring-2 ring-deep-space" />
                </div>
                <div>
                    <h3 className="text-display text-xl text-lavender">Элара</h3>
                  <p className="text-[11px] uppercase tracking-widest text-warm-mist/40">
                      Ваш ИИ-коуч по методу Hanen
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border-l-4 border-magic-pink bg-warm-mist/5 p-5">
                <p className="mb-3 text-sm italic leading-relaxed text-warm-mist/90">
                  "{elaraTip.text}"
                </p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-magic-pink">
                  Совет коуча · {elaraTip.meta}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-warm-mist/40">
                  Попробуйте расширение
                </h4>
                <button className="w-full rounded-2xl border border-warm-mist/10 bg-warm-mist/5 p-4 text-left transition-colors hover:bg-warm-mist/10">
                  <p className="text-sm text-warm-mist">Если Мартин говорит «би-би»:</p>
                  <p className="font-semibold text-teal-glow">«Большая синяя машинка едет!»</p>
                </button>
                <button className="w-full rounded-2xl border border-warm-mist/10 bg-warm-mist/5 p-4 text-left transition-colors hover:bg-warm-mist/10">
                  <p className="text-sm text-warm-mist">Если Мартин показывает на коробку:</p>
                  <p className="font-semibold text-magic-pink">«Открой волшебную коробку!»</p>
                </button>
              </div>

              <Link
                to="/coach"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-lavender px-5 py-3 text-sm font-bold text-deep-space transition-transform hover:scale-[1.02]"
              >
                Открыть весь диалог
              </Link>
            </div>

            <div className="lumina-fade-up rounded-[2.5rem] border border-teal-glow/15 bg-gradient-to-br from-teal-glow/12 to-transparent p-7 md:rounded-[3rem] md:p-10 [animation-delay:160ms]">
              <div className="mb-6 flex items-end justify-between">
                <h3 className="text-display text-xl text-warm-mist">Сад развития</h3>
                <Link
                  to="/progress"
                  className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/50 hover:text-warm-mist"
                >
                  Полностью →
                </Link>
              </div>
              <div className="space-y-5">
                {progressMilestones.map((m) => (
                  <div key={m.label}>
                    <div className="mb-2 flex items-end justify-between">
                      <span className="text-xs text-warm-mist/60">{m.label}</span>
                      <span className="text-display text-sm font-bold text-teal-glow">
                        {m.delta}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-warm-mist/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-glow to-lavender"
                        style={{ width: `${m.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <MagicBar />
    </div>
  );
}
