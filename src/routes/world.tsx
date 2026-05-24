import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";
import worldForest from "@/assets/world-forest.jpg";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: "Волшебный мир Лёвы — Lumina" },
      {
        name: "description",
        content:
          "Спокойная кинематографичная игровая сцена, синхронизированная с настоящими игрушками Лёвы. Коснитесь светлячка, чтобы оживить одно тёплое, выделенное голосом слово.",
      },
      { property: "og:title", content: "Волшебный мир Лёвы" },
      { property: "og:image", content: worldForest },
    ],
  }),
  component: ChildWorld,
});

type Glow = {
  id: string;
  label: string;
  word: string;
  x: string;
  y: string;
  color: "pink" | "teal" | "lavender" | "sunset";
};

const glows: Glow[] = [
  { id: "mushroom", label: "Грибочек", word: "ГРИ-бок!", x: "12%", y: "62%", color: "pink" },
  { id: "firefly", label: "Светлячок", word: "Свет!", x: "40%", y: "30%", color: "sunset" },
  { id: "fox", label: "Лисёнок Луми", word: "Привет, лисёнок!", x: "62%", y: "55%", color: "lavender" },
  { id: "log", label: "Мшистое бревно", word: "Сядь!", x: "78%", y: "78%", color: "teal" },
];

const colorRing = {
  pink: "bg-magic-pink shadow-[0_0_30px_var(--magic-pink)]",
  teal: "bg-teal-glow shadow-[0_0_30px_var(--teal-glow)]",
  lavender: "bg-lavender shadow-[0_0_30px_var(--lavender)]",
  sunset: "bg-sunset shadow-[0_0_30px_var(--sunset)]",
} as const;

function ChildWorld() {
  const [active, setActive] = useState<Glow | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: string; y: string }[]>([]);

  const onTap = (g: Glow) => {
    setActive(g);
    const id = Date.now();
    setSparkles((s) => [...s, { id, x: g.x, y: g.y }]);
    setTimeout(() => setSparkles((s) => s.filter((sp) => sp.id !== id)), 1400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 px-6 pb-24 md:px-12">
        <div className="lumina-fade-up overflow-hidden rounded-[2.5rem] border border-warm-mist/10 shadow-2xl md:rounded-[3rem]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src={worldForest}
              alt="Шепчущий лес — кинематографичный волшебный лес с лисёнком Луми"
              className="absolute inset-0 size-full scale-105 object-cover"
              width={1600}
              height={1200}
            />

            {/* Title overlay */}
            <div className="absolute left-6 top-6 md:left-10 md:top-10">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-warm-mist/70">
                Глава 03
              </span>
              <h1 className="text-display mt-1 text-3xl italic text-warm-mist drop-shadow-lg md:text-5xl">
                Шепчущий лес
              </h1>
            </div>

            {/* Reward burst */}
            <div className="absolute right-6 top-6 lumina-glass flex flex-col items-end gap-1 rounded-2xl px-4 py-3 md:right-10 md:top-10">
              <div className="flex gap-1">
                <span className="size-2 rounded-full bg-magic-pink" />
                <span className="size-2 rounded-full bg-sunset" />
                <span className="size-2 rounded-full bg-teal-glow" />
                <span className="size-2 rounded-full bg-warm-mist/30" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-warm-mist/80">
                3 искры волшебства
              </span>
            </div>

            {/* Interactive glows */}
            {glows.map((g) => (
              <button
                key={g.id}
                onClick={() => onTap(g)}
                style={{ left: g.x, top: g.y }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={`Коснитесь: ${g.label}`}
              >
                <span className={`absolute inset-0 -z-10 size-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full blur-2xl opacity-70 lumina-breathe ${colorRing[g.color]}`} />
                <span className={`block size-10 rounded-full ring-4 ring-warm-mist/20 transition-transform group-hover:scale-110 group-active:scale-95 ${colorRing[g.color]}`} />
              </button>
            ))}

            {/* Sparkle bursts */}
            {sparkles.map((sp) => (
              <span
                key={sp.id}
                style={{ left: sp.x, top: sp.y }}
                className="pointer-events-none absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm-mist/60 lumina-sparkle blur-xl"
              />
            ))}

            {/* Toy sync orb */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lumina-glass flex items-center gap-3 rounded-full px-5 py-3">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-glow opacity-60" />
                <span className="relative inline-flex size-3 rounded-full bg-teal-glow shadow-[0_0_12px_var(--teal-glow)]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-warm-mist">
                Реальная игрушка найдена · Синий кубик
              </span>
            </div>

            {/* Word card */}
            {active && (
              <div className="lumina-fade-up absolute bottom-24 left-1/2 -translate-x-1/2 rounded-3xl bg-warm-mist px-8 py-5 text-center text-deep-space shadow-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-magic-pink">
                  Скажи это тепло
                </span>
                <p className="text-display mt-1 text-3xl font-semibold italic">
                  {active.word}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="lumina-card p-6">
            <h3 className="text-display mb-2 text-lg text-warm-mist">Для взрослого</h3>
            <p className="text-sm text-warm-mist/65 leading-relaxed">
              Сядь рядом с Лёвой, а не напротив планшета. Дай ему коснуться. Когда появится карточка со словом — произнеси его медленно, дважды, и посмотри на настоящую игрушку у него в руках.
            </p>
          </div>
          <div className="lumina-card p-6">
            <h3 className="text-display mb-2 text-lg text-warm-mist">Почему эта сцена</h3>
            <p className="text-sm text-warm-mist/65 leading-relaxed">
              «Шепчущий лес» использует короткие существительные с твёрдыми звуками — идеально для ранних приближений. Лисёнок Луми откликается только на тёплое внимание.
            </p>
          </div>
          <Link to="/coach" className="lumina-card group p-6 transition-colors hover:bg-warm-mist/5">
            <h3 className="text-display mb-2 text-lg text-warm-mist">Нужна подсказка?</h3>
            <p className="text-sm text-warm-mist/65 leading-relaxed">
              Попросите Элару предложить следующий ход по методу 4S, исходя из того, что только что сделал Мартин. →
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}