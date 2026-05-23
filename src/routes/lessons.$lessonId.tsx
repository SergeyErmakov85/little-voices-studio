import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import { lessons, strategies, type Lesson, type Strategy } from "@/lib/lumina-data";
import playHands from "@/assets/play-hands.jpg";

const colorChip = {
  teal: "bg-teal-glow/20 text-teal-glow",
  sunset: "bg-sunset/20 text-sunset",
  pink: "bg-magic-pink/20 text-magic-pink",
  lavender: "bg-lavender/20 text-lavender",
} as const;

export const Route = createFileRoute("/lessons/$lessonId")({
  loader: ({ params }): { lesson: Lesson; strategy: Strategy } => {
    const lesson = lessons.find((l) => l.id === params.lessonId);
    if (!lesson) throw notFound();
    const strategy = strategies.find((s) => s.id === lesson.strategyId)!;
    return { lesson, strategy };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.lesson.title} — Lumina` },
            { name: "description", content: loaderData.lesson.summary },
            { property: "og:title", content: loaderData.lesson.title },
            { property: "og:description", content: loaderData.lesson.summary },
            { property: "og:image", content: playHands },
          ],
        }
      : {},
  component: LessonDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-deep-space text-warm-mist">
      <div className="text-center">
        <p className="text-display text-2xl italic">This lesson hasn't been written yet.</p>
        <Link to="/lessons" className="mt-4 inline-block text-magic-pink underline">
          Back to the library
        </Link>
      </div>
    </div>
  ),
});

function LessonDetail() {
  const { lesson, strategy } = Route.useLoaderData();
  const palette = colorChip[strategy.color];

  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 md:px-12">
        <Link
          to="/lessons"
          className="text-xs font-bold uppercase tracking-[0.25em] text-warm-mist/50 hover:text-warm-mist"
        >
          ← Lesson library
        </Link>

        <header className="lumina-fade-up mt-6">
          <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${palette}`}>
            {strategy.short} · {lesson.module}
          </span>
          <h1 className="text-display mt-4 text-4xl leading-tight md:text-6xl">
            {lesson.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-warm-mist/70">{lesson.summary}</p>
        </header>

        <div className="lumina-fade-up [animation-delay:80ms] mt-10 overflow-hidden rounded-[2rem] border border-warm-mist/10 md:rounded-[2.5rem]">
          <div className="relative aspect-video w-full">
            <img
              src={playHands}
              alt="A parent and child playing together with glowing wooden blocks"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
              width={1200}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 via-transparent" />
            <button className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-warm-mist text-deep-space shadow-2xl transition-transform hover:scale-105">
              <span className="ml-1 size-0 border-y-8 border-l-[14px] border-y-transparent border-l-deep-space" />
            </button>
            <span className="absolute bottom-5 left-6 text-[11px] font-bold uppercase tracking-[0.25em] text-warm-mist/80">
              {lesson.duration}
            </span>
          </div>
        </div>

        <div className="lumina-fade-up [animation-delay:160ms] mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className="md:col-span-2 lumina-card p-8">
            <h2 className="text-display text-2xl text-warm-mist">What this lesson is really about</h2>
            <p className="mt-4 text-base leading-relaxed text-warm-mist/75">{lesson.body}</p>

            <h3 className="text-display mt-8 text-xl text-warm-mist">The strategy, step by step</h3>
            <ol className="mt-4 space-y-3">
              {strategy.steps.map((step, i) => (
                <li key={i} className="flex gap-4 rounded-2xl border border-warm-mist/10 bg-warm-mist/5 p-4">
                  <span className={`text-display grid size-9 shrink-0 place-items-center rounded-full ${palette}`}>
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-warm-mist/80">{step}</p>
                </li>
              ))}
            </ol>
          </article>

          <aside className="lumina-card border-magic-pink/30 bg-magic-pink/5 p-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-magic-pink">
              Try this in real play
            </span>
            <p className="text-display mt-3 text-xl italic leading-snug text-warm-mist">
              {lesson.tryThis}
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-full border border-teal-glow/30 bg-teal-glow/10 px-4 py-2">
              <span className="size-2 animate-pulse rounded-full bg-teal-glow" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-glow">
                Toy sync ready
              </span>
            </div>
            <Link
              to="/world"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-warm-mist px-5 py-3 text-sm font-bold text-deep-space transition-transform hover:scale-[1.02]"
            >
              Start a play session
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}