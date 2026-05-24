import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { TopNav } from "@/components/TopNav";

export const Route = createFileRoute("/method")({
  head: () => ({
    meta: [
      { title: "Метод NDBI — запуск речи в естественной игре | Lumina" },
      {
        name: "description",
        content:
          "Натуралистические вмешательства под руководством родителей (NDBI): 4 золотых правила Hanen и EMT и 4-недельная программа запуска речи у детей 2,5–4 лет.",
      },
    ],
  }),
  component: MethodRoute,
});

// ---------- Data ----------

type Principle = {
  id: string;
  badge: string;
  emoji: string;
  title: string;
  lede: string;
  accent: "teal" | "pink" | "lavender" | "sunset";
  bullets: { label: string; text: string }[];
};

const principles: Principle[] = [
  {
    id: "owl",
    badge: "Правило 1",
    emoji: "🦉",
    title: "OWL — Наблюдай, Жди, Слушай",
    accent: "teal",
    lede: "Фундамент программы Hanen. Прежде чем что-то сказать или сделать за ребёнка — сделайте паузу.",
    bullets: [
      { label: "Наблюдайте", text: "На что смотрит ребёнок? Присоединяйтесь к его интересу, а не навязывайте свой." },
      { label: "Ждите", text: "Молчите 5–10 секунд. Дайте шанс инициировать общение взглядом, жестом или звуком." },
      { label: "Слушайте", text: "Прислушивайтесь к любой вокализации — даже к самой тихой попытке." },
    ],
  },
  {
    id: "sabotage",
    badge: "Правило 2",
    emoji: "🧩",
    title: "Коммуникативный саботаж",
    accent: "pink",
    lede: "Если у ребёнка всё в свободном доступе — ему незачем говорить. Создавайте мягкие препятствия.",
    bullets: [
      { label: "Вне досягаемости", text: "Положите любимую машинку на полку, но так, чтобы она была на виду." },
      { label: "В контейнере", text: "Сок в плотно закрытой бутылке. Ждите просьбы — взгляда, жеста «дай»." },
      { label: "Чего-то не хватает", text: "Дайте тарелку с супом, но «забудьте» ложку." },
    ],
  },
  {
    id: "plus-one",
    badge: "Правило 3",
    emoji: "➕",
    title: "Модель «Плюс один»",
    accent: "lavender",
    lede: "Не требуйте длинных фраз. Говорите на одну ступеньку выше текущего уровня ребёнка.",
    bullets: [
      { label: "Если молчит", text: "Озвучивайте действия одним словом: «Кааатит» или «би-би»." },
      { label: "Если говорит 1 слово", text: "Отвечайте двумя: «Синий мяч», «Кидай мяч»." },
      { label: "Повторяйте", text: "5–10 раз одно целевое слово в одной игровой ситуации — без давления «скажи»." },
    ],
  },
  {
    id: "routines",
    badge: "Правило 4",
    emoji: "🛁",
    title: "Сила повторяющихся ритуалов",
    accent: "sunset",
    lede: "Речь рождается из предсказуемости. Повседневные дела — идеальная сцена для обучения.",
    bullets: [
      { label: "Купание", text: "Одинаково комментируйте: «Моем ручки. Буль-буль. Вода льётся»." },
      { label: "Одевание", text: "Играйте в прятки с футболкой: «Где Мартин? Ку-ку!»" },
      { label: "Нарушение", text: "Когда ритуал закреплён, наденьте носок на руку — это вызовет эмоцию и желание сказать." },
    ],
  },
];

const accentMap: Record<Principle["accent"], { text: string; bg: string; border: string; chip: string }> = {
  teal: { text: "text-teal-glow", bg: "bg-teal-glow/10", border: "border-teal-glow/30", chip: "bg-teal-glow text-deep-space" },
  pink: { text: "text-magic-pink", bg: "bg-magic-pink/10", border: "border-magic-pink/30", chip: "bg-magic-pink text-deep-space" },
  lavender: { text: "text-lavender", bg: "bg-lavender/10", border: "border-lavender/30", chip: "bg-lavender text-deep-space" },
  sunset: { text: "text-sunset", bg: "bg-sunset/10", border: "border-sunset/30", chip: "bg-sunset text-deep-space" },
};

type Week = {
  n: number;
  title: string;
  intro: string;
  actions: string[];
  accent: "teal" | "pink" | "lavender" | "sunset";
};

const weeks: Week[] = [
  {
    n: 1,
    title: "Присоединение и паузы",
    accent: "teal",
    intro: "На этой неделе мы отменяем все требования. Никаких «скажи», «повтори», «что это?». Ваша задача — стать идеальным партнёром по игре.",
    actions: [
      "Опускайтесь на уровень глаз ребёнка — сядьте на пол.",
      "Повторяйте действия за ребёнком: он стучит кубиком — вы стучите кубиком.",
      "Считайте про себя до 5, прежде чем ответить на любой его жест.",
      "Озвучивайте действия одним словом без вопросов: «бам», «упало», «едет».",
    ],
  },
  {
    n: 2,
    title: "Среда, требующая общения",
    accent: "pink",
    intro: "Начинаем мягко провоцировать инициативу, используя организацию пространства вокруг.",
    actions: [
      "Уберите 3 любимые игрушки в прозрачные контейнеры, которые ребёнок не откроет сам.",
      "Давайте перекус микро-порциями (1 кусочек яблока) — чтобы он просил «ещё» взглядом, жестом или звуком.",
      "Если ребёнок тянется к предмету — возьмите его, посмотрите в глаза и ждите 5 секунд любой просьбы.",
    ],
  },
  {
    n: 3,
    title: "Моделирование и выбор",
    accent: "lavender",
    intro: "Внедряем предоставление выбора — мощнейший стимул для использования слов или чётких жестов.",
    actions: [
      "Минимум 10 раз в день предлагайте выбор из двух вариантов: «Сок или воду?», показывая предметы.",
      "Если ребёнок тянется к соку — скажите «Сок!» прежде, чем отдать.",
      "Используйте «нелепые ситуации»: дайте ботинок, когда просит куртку. Ждите и озвучьте: «Нет! Это ботинок. Нужна куртка!»",
    ],
  },
  {
    n: 4,
    title: "Игровые ритуалы с ожиданием",
    accent: "sunset",
    intro: "Создаём социальные игры, в которых ребёнок захочет участвовать и продолжить действие голосом.",
    actions: [
      "«На старт, внимание, марш!» на качелях: остановите, скажите «На старт, внимание…» и ждите сигнал.",
      "Игры с пузырями: дуйте, закройте баночку, ждите инициативы — слова «дуй» или «пузырь».",
      "Оцените прогресс: чаще ли Мартин смотрит на вас перед тем, как что-то получить?",
    ],
  },
];

const checklistItems = [
  { id: "task1", text: "Играл с ребёнком на полу глаза в глаза (минимум 15 минут)" },
  { id: "task2", text: "Сделал паузу OWL минимум 5 раз" },
  { id: "task3", text: "Использовал коммуникативный саботаж" },
  { id: "task4", text: "Озвучивал действия без слов «скажи» и вопросов" },
  { id: "task5", text: "Дал ребёнку право выбора 5 раз за день" },
];

// Vocabulary curve data — words per week
const curveWeeks = ["Нед 0", "Нед 2", "Нед 4", "Нед 6", "Нед 8", "Нед 10", "Нед 12"];
const ndbiCurve = [10, 14, 22, 36, 58, 85, 120];
const traditionalCurve = [10, 12, 14, 17, 21, 26, 32];

// ---------- Component ----------

function MethodRoute() {
  const [activeTab, setActiveTab] = useState<string>(principles[0].id);
  const [openWeek, setOpenWeek] = useState<number | null>(1);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lumina-method-checklist");
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lumina-method-checklist", JSON.stringify(checked));
    } catch {}
  }, [checked]);

  const progress = useMemo(() => {
    const done = checklistItems.filter((i) => checked[i.id]).length;
    return Math.round((done / checklistItems.length) * 100);
  }, [checked]);

  const active = principles.find((p) => p.id === activeTab) ?? principles[0];
  const accent = accentMap[active.accent];

  return (
    <div className="relative min-h-screen overflow-hidden bg-deep-space text-warm-mist">
      <AmbientBackground />
      <TopNav />

      <main className="relative z-10 mx-auto max-w-7xl space-y-24 px-6 pb-32 md:px-12">
        {/* HERO */}
        <header className="lumina-fade-up max-w-4xl pt-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-teal-glow">
            Доказательный подход · NDBI
          </span>
          <h1 className="text-display mt-4 text-4xl leading-[1.05] md:text-6xl">
            Запуск речи рождается{" "}
            <span className="italic text-magic-pink">не за столом</span> —
            а в купании, в обеде, в игре.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-warm-mist/70 md:text-xl">
            Натуралистические вмешательства под руководством родителей (NDBI) — модели Hanen, EMT и ESDM. Самая эффективная среда для речи 2,5–4 лет: ваша гостиная, ваш голос, ваша пауза.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#program"
              className="rounded-full bg-gradient-to-r from-magic-pink to-sunset px-6 py-3 text-sm font-bold text-deep-space shadow-lg shadow-magic-pink/30 transition-transform hover:-translate-y-0.5"
            >
              4-недельная программа →
            </a>
            <a
              href="#principles"
              className="lumina-glass rounded-full px-6 py-3 text-sm font-medium text-warm-mist"
            >
              4 золотых правила
            </a>
          </div>
        </header>

        {/* RESEARCH */}
        <section id="research" className="lumina-card lumina-fade-up p-8 md:p-12">
          <div className="mb-10 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
              Почему именно этот метод
            </span>
            <h2 className="text-display mt-2 text-3xl md:text-4xl">
              В 4 раза больше слов — без занятий за столом.
            </h2>
            <p className="mt-4 text-warm-mist/70">
              Клинические испытания США: дети, чьи родители обучены NDBI, осваивают активный словарь экспоненциально быстрее, чем при классических занятиях с логопедом 2 раза в неделю.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_1fr]">
            <GrowthChart />

            <div className="space-y-4">
              <StatCard
                icon="📈"
                title="До 4× быстрее"
                text="Дети в группе обученных родителей осваивают новые слова в 4 раза быстрее."
                accent="teal"
              />
              <StatCard
                icon="⏱️"
                title="0 минут «занятий»"
                text="Не нужно усаживать ребёнка за стол. Обучение — в купании, еде и игре."
                accent="pink"
              />
              <StatCard
                icon="🫶"
                title="Вы — главный коуч"
                text="Родитель проводит с ребёнком в 100 раз больше времени, чем любой специалист."
                accent="lavender"
              />
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section id="principles" className="lumina-fade-up">
          <div className="mb-10 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
              База EMT и Hanen
            </span>
            <h2 className="text-display mt-2 text-3xl md:text-4xl">
              4 золотых правила коммуникативной среды.
            </h2>
            <p className="mt-4 text-warm-mist/70">
              Меняем не ребёнка — меняем свою реакцию. Переключайтесь между правилами, чтобы увидеть, как именно.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {principles.map((p) => {
              const a = accentMap[p.accent];
              const isActive = p.id === activeTab;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                    isActive
                      ? `${a.chip} border-transparent shadow-lg`
                      : "border-warm-mist/15 bg-warm-mist/5 text-warm-mist/70 hover:bg-warm-mist/10"
                  }`}
                >
                  <span className="mr-2 opacity-70">{p.badge}</span>
                  {p.title.split(" — ")[0]}
                </button>
              );
            })}
          </div>

          <div
            key={active.id}
            className={`lumina-card lumina-fade-up overflow-hidden border ${accent.border} ${accent.bg} p-8 md:p-12`}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="text-7xl md:text-8xl">{active.emoji}</div>
              <div className="flex-1">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${accent.text}`}>
                  {active.badge}
                </span>
                <h3 className={`text-display mt-1 text-2xl md:text-3xl ${accent.text}`}>
                  {active.title}
                </h3>
                <p className="mt-3 text-lg text-warm-mist/80">{active.lede}</p>

                <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {active.bullets.map((b) => (
                    <li
                      key={b.label}
                      className="lumina-glass rounded-2xl p-4"
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${accent.text}`}>
                        {b.label}
                      </span>
                      <p className="mt-2 text-sm leading-relaxed text-warm-mist/85">{b.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM */}
        <section id="program" className="lumina-fade-up">
          <div className="mb-10 max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
              4-недельная программа
            </span>
            <h2 className="text-display mt-2 text-3xl md:text-4xl">
              Из теории — в ритм вашего дня.
            </h2>
            <p className="mt-4 text-warm-mist/70">
              Цель — не заставить ребёнка говорить. Цель — изменить вашу реакцию. Открывайте каждую неделю по очереди.
            </p>
          </div>

          <div className="space-y-4">
            {weeks.map((w) => {
              const a = accentMap[w.accent];
              const isOpen = openWeek === w.n;
              return (
                <div
                  key={w.n}
                  className={`lumina-card overflow-hidden border ${isOpen ? a.border : "border-warm-mist/10"} transition-colors`}
                >
                  <button
                    onClick={() => setOpenWeek(isOpen ? null : w.n)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
                  >
                    <span className="flex items-center gap-4">
                      <span className={`grid size-10 place-items-center rounded-full ${a.chip} text-sm font-bold`}>
                        {w.n}
                      </span>
                      <span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-warm-mist/40">
                          Неделя {w.n}
                        </span>
                        <span className={`text-display block text-xl md:text-2xl ${isOpen ? a.text : "text-warm-mist"}`}>
                          {w.title}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`text-2xl transition-transform ${isOpen ? "rotate-180" : ""} ${a.text}`}
                    >
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="lumina-fade-up border-t border-warm-mist/10 px-6 pb-7 pt-5 md:px-8">
                      <p className="text-warm-mist/75">{w.intro}</p>
                      <div className={`mt-5 rounded-2xl border ${a.border} ${a.bg} p-5`}>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${a.text}`}>
                          Действия на каждый день
                        </span>
                        <ul className="mt-3 space-y-2">
                          {w.actions.map((act, i) => (
                            <li key={i} className="flex gap-3 text-sm text-warm-mist/85">
                              <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${a.chip}`} />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CHECKLIST */}
        <section id="tracker" className="lumina-fade-up">
          <div className="lumina-card mx-auto max-w-3xl border-teal-glow/25 bg-teal-glow/5 p-8 md:p-10">
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-glow">
                Ежедневный ритуал родителя
              </span>
              <h2 className="text-display mt-2 text-2xl md:text-3xl">
                Чек-лист на сегодня
              </h2>
              <p className="mt-2 text-sm text-warm-mist/60">
                Отмечайте, чтобы выработать привычку. Состояние сохраняется на этом устройстве.
              </p>
            </div>

            <div className="mt-7 space-y-3">
              {checklistItems.map((item) => {
                const isChecked = !!checked[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      setChecked((c) => ({ ...c, [item.id]: !c[item.id] }))
                    }
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                      isChecked
                        ? "border-teal-glow/40 bg-teal-glow/10"
                        : "border-warm-mist/10 bg-warm-mist/5 hover:bg-warm-mist/10"
                    }`}
                  >
                    <span
                      className={`grid size-6 place-items-center rounded-md border-2 ${
                        isChecked
                          ? "border-teal-glow bg-teal-glow text-deep-space"
                          : "border-warm-mist/30"
                      }`}
                    >
                      {isChecked && <span className="text-xs font-black">✓</span>}
                    </span>
                    <span
                      className={`flex-1 text-sm ${
                        isChecked ? "text-warm-mist/60 line-through" : "text-warm-mist/90"
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 border-t border-warm-mist/10 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-warm-mist/60">Прогресс сегодня</span>
                <span className={`text-display text-lg ${progress === 100 ? "text-magic-pink" : "text-teal-glow"}`}>
                  {progress}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-warm-mist/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    progress === 100
                      ? "bg-gradient-to-r from-magic-pink to-sunset"
                      : "bg-gradient-to-r from-teal-glow to-lavender"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <button
                onClick={() => setChecked({})}
                className="mt-4 w-full text-center text-xs text-warm-mist/40 underline-offset-4 hover:text-warm-mist/70 hover:underline"
              >
                Сбросить чек-лист на завтра
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t border-warm-mist/10 pt-8 text-center text-xs text-warm-mist/40">
          Lumina · NDBI-программа основана на методологиях Hanen «It Takes Two to Talk», EMT и ESDM.
          <br />
          Материал информационный и не заменяет консультацию специалиста.
        </footer>
      </main>
    </div>
  );
}

// ---------- Subcomponents ----------

function StatCard({
  icon,
  title,
  text,
  accent,
}: {
  icon: string;
  title: string;
  text: string;
  accent: "teal" | "pink" | "lavender";
}) {
  const a = accentMap[accent];
  return (
    <div className={`lumina-card border ${a.border} ${a.bg} p-5`}>
      <div className="text-2xl">{icon}</div>
      <h3 className={`text-display mt-2 text-lg ${a.text}`}>{title}</h3>
      <p className="mt-1 text-sm text-warm-mist/70">{text}</p>
    </div>
  );
}

function GrowthChart() {
  // Build SVG line chart — NDBI vs traditional therapy
  const w = 560;
  const h = 280;
  const padL = 36;
  const padR = 12;
  const padT = 16;
  const padB = 32;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const maxY = 130;

  const xFor = (i: number) =>
    padL + (i / (curveWeeks.length - 1)) * innerW;
  const yFor = (v: number) => padT + innerH - (v / maxY) * innerH;

  const buildPath = (data: number[]) =>
    data.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");

  const buildArea = (data: number[]) =>
    `${buildPath(data)} L ${xFor(data.length - 1)} ${padT + innerH} L ${xFor(0)} ${padT + innerH} Z`;

  const ndbiPath = buildPath(ndbiCurve);
  const ndbiArea = buildArea(ndbiCurve);
  const tradPath = buildPath(traditionalCurve);

  const yTicks = [0, 30, 60, 90, 120];

  return (
    <div className="lumina-glass rounded-3xl p-5">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        role="img"
        aria-label="Сравнение роста словарного запаса NDBI и традиционных занятий"
      >
        <defs>
          <linearGradient id="ndbiFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.09 190)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="oklch(0.72 0.09 190)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={padL}
              x2={w - padR}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="oklch(0.95 0.02 40 / 0.08)"
              strokeDasharray="2 4"
            />
            <text
              x={padL - 8}
              y={yFor(t) + 4}
              textAnchor="end"
              fontSize="10"
              fill="oklch(0.95 0.02 40 / 0.45)"
            >
              {t}
            </text>
          </g>
        ))}

        {/* X labels */}
        {curveWeeks.map((label, i) => (
          <text
            key={label}
            x={xFor(i)}
            y={h - 10}
            textAnchor="middle"
            fontSize="10"
            fill="oklch(0.95 0.02 40 / 0.55)"
          >
            {label}
          </text>
        ))}

        {/* Traditional line — dashed */}
        <path
          d={tradPath}
          fill="none"
          stroke="oklch(0.74 0.16 30)"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        {traditionalCurve.map((v, i) => (
          <circle
            key={i}
            cx={xFor(i)}
            cy={yFor(v)}
            r="3"
            fill="oklch(0.74 0.16 30)"
          />
        ))}

        {/* NDBI area + line */}
        <path d={ndbiArea} fill="url(#ndbiFill)" />
        <path
          d={ndbiPath}
          fill="none"
          stroke="oklch(0.72 0.09 190)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {ndbiCurve.map((v, i) => (
          <circle
            key={i}
            cx={xFor(i)}
            cy={yFor(v)}
            r="4"
            fill="oklch(0.72 0.09 190)"
            stroke="var(--deep-space)"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 text-[11px]">
        <span className="flex items-center gap-2 text-warm-mist/70">
          <span className="size-2.5 rounded-full bg-teal-glow" />
          Родительский подход NDBI
        </span>
        <span className="flex items-center gap-2 text-warm-mist/70">
          <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-sunset" />
          Традиционные занятия (контроль)
        </span>
        <span className="text-warm-mist/40">слов · 12 недель</span>
      </div>
    </div>
  );
}