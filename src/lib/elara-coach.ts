/**
 * Элара — AI Coaching Intelligence
 *
 * Элара is not a chatbot. She is the family's Hanen-trained guide —
 * a warm, perceptive companion who has been watching Мартин grow
 * and who knows this parent's specific journey.
 *
 * She never sounds like a therapist reading from a manual.
 * She sounds like a wise friend who happens to know everything about
 * how children find their voice.
 */

import type { CommunicationStage } from "./therapy-mechanics";
import {
  adaptSession,
  inferSubLevel,
  type AdaptedSession,
} from "./developmental-engine";

// ─── Child profile ────────────────────────────────────────────────────────────

export interface ChildProfile {
  name: string;
  ageMonths: number;
  stage: CommunicationStage;
  recentWords: string[];             // approximations count — "мя" for мяч is a word
  recentMilestones: string[];        // notable communication events this week
  currentToyFocus: string;           // which toy/routine they're working with
  strongInterests: string[];         // what the child loves (drives temptation design)
  challengeAreas: string[];          // where communication is slower to emerge
}

// ─── Session memory ──────────────────────────────────────────────────────────

export interface SessionNote {
  date: string;                      // ISO date
  parentReport: string;              // what the parent described
  elaraObservation: string;          // what Элара identified in the report
  strategyUsed: "OWL" | "4S" | "ROCK" | "SPARK" | "responsive_interaction";
  childSignalObserved: boolean;      // did the parent describe a communication signal?
  parentWaitMentioned: boolean;      // did the parent mention waiting?
  newWordOrSound?: string;           // any new vocalization reported
  parentEmotion: "positive" | "neutral" | "frustrated" | "anxious" | "joyful";
  suggestionGiven: string;           // the ONE thing Элара suggested
}

export interface SessionMemory {
  totalSessions: number;
  lastSession: SessionNote | null;
  recentNotes: SessionNote[];        // last 5 sessions
  observedPatterns: string[];        // recurring themes Элара has noticed
  growthHighlights: string[];        // validated wins to reference
  parentStrengths: string[];         // what this parent does well (affirm these)
  parentGrowthEdge: string;          // the ONE thing they're still working on
}

// ─── Interaction quality signals ──────────────────────────────────────────────
// What Элара reads in every parent message.

export interface InteractionSignals {
  // OWL quality indicators
  parentMentionsWaiting: boolean;
  parentFollowsChildLead: boolean;      // "он потянулся — я дал" vs "я показал — он не смотрел"
  parentObservesBeforeActing: boolean;
  waitDurationMentioned: number | null; // seconds, if mentioned

  // 4S quality indicators
  parentSpeechReduced: boolean;         // mentions using fewer words
  keyWordEmphasized: boolean;           // mentions stressing a word
  slowPaceDescribed: boolean;
  physicalDemonstrationUsed: boolean;

  // Responsiveness
  parentRespondedToSignal: boolean;     // "он потянулся — я..." (responded)
  parentExpandedNotCorrected: boolean;  // "он сказал «мя» — я сказал «мяч»" (expansion)
  parentNamedChildAttempt: boolean;     // labeled what the child did

  // Joint attention
  sharedFocusDescribed: boolean;        // both looking at same thing
  gazeTriangleDescribed: boolean;       // child looks toy → adult → toy
  faceToFacePosition: boolean;          // mentions sitting across/level

  // Emotional tone
  coRegulationPresent: boolean;         // calm matching calm, energetic matching energy
  playfulnessDescribed: boolean;
  forcedInteractionDescribed: boolean;  // "я пыталась заставить его" — flag gently

  // Red flags (handle with warmth, never judgment)
  parentExpressesFrustration: boolean;
  parentExpressesAnxiety: boolean;
  parentExpressesExhaustion: boolean;
  parentSelfCritical: boolean;          // "я делаю всё неправильно"
}

// ─── Parent message classification ───────────────────────────────────────────

export type ParentMessageType =
  | "observation"      // describing what happened: "он потянулся к чашке"
  | "milestone"        // a breakthrough: "он впервые сказал..."
  | "struggle"         // something didn't work: "он совсем не реагировал"
  | "question"         // asking for guidance: "что делать когда..."
  | "emotion"          // expressing feeling first: "я так устала", "я счастлива"
  | "plan_request"     // asking for next step: "подскажи что попробовать"
  | "correction_seek"  // asking if they did it right: "я правильно сделала?"
  | "celebration";     // pure joy sharing: "ОН СКАЗАЛ МАЧ!"

export interface ParsedParentMessage {
  type: ParentMessageType;
  rawText: string;
  signals: Partial<InteractionSignals>;
  emotionalTone: "positive" | "neutral" | "distressed" | "celebratory";
  urgency: "low" | "medium" | "high";  // high = parent is struggling right now
  impliedNeed: string;                 // what Элара should actually address
}

// ─── Coaching response structure ─────────────────────────────────────────────

export type StrategyFocus = "OWL" | "4S" | "ROCK" | "SPARK" | "responsive_interaction" | "emotional_pacing";

export interface ElaraResponsePlan {
  openWith: "validation" | "reflection" | "celebration" | "curiosity" | "gentle_reframe";
  strategyFocus: StrategyFocus;
  includeWhyExplanation: boolean;    // always true unless parent already knows
  suggestionCount: 1;                // Элара ALWAYS gives exactly ONE thing to try
  toneAdjustment: "warm" | "celebratory" | "gentle" | "energizing" | "grounding";
  referenceChildName: boolean;       // almost always true
  referenceRecentProgress: boolean;  // when available, anchor in what's already working
  endWithQuestion: false;            // Элара does NOT end with homework questions
}

// ─── Progress tracking ───────────────────────────────────────────────────────

export interface CommunicationSignal {
  type:
    | "gaze_shift"          // looked between toy and adult
    | "reach_request"       // reached toward desired object
    | "give_show"           // gave or showed object to adult
    | "vocalization"        // any sound
    | "proto_word"          // consistent sound with meaning
    | "word_approximation"  // recognizable attempt at a word
    | "first_word"          // new clear word
    | "two_word_combo"      // first word combinations
    | "ritual_completion";  // filled in a word in a familiar sequence
  description: string;
  toyOrRoutineContext: string;
  date: string;
}

export interface ProgressSnapshot {
  weekStarting: string;
  initiationFrequency: number;         // 0–100 relative scale
  wordAttempts: number;                // raw count of new word attempts this week
  jointAttentionDuration: number;      // seconds, average per session
  parentOWLAdherence: number;          // 0–100, how often parent waited first
  newSignals: CommunicationSignal[];
  parentObservations: string[];
  elaraSummary: string;                // Элара's synthesis of the week
}

// ─── System prompt builder ───────────────────────────────────────────────────

export interface CoachingContext {
  child: ChildProfile;
  sessionMemory: SessionMemory;
  currentActivity?: string;           // game/routine active right now
  currentStrategy?: StrategyFocus;    // strategy being practiced
  recentProgress?: ProgressSnapshot;
  conversationHistory: { role: "user" | "assistant"; content: string }[];
}

function stageDescription(stage: CommunicationStage): string {
  const map: Record<CommunicationStage, string> = {
    discoverer:
      "на стадии Первооткрывателя — он общается движением тела, взглядом и звуками, ещё не используя намеренные сигналы. Каждый взгляд в сторону взрослого — уже диалог.",
    communicator:
      "на стадии Общителя — он намеренно сигнализирует: тянется, смотрит, издаёт звуки с явной целью. Слов ещё нет, но намерение есть. Это главный период для SPARK и OWL.",
    first_words:
      "на стадии Первых слов — у него появляются первые слова и приближения. Каждое приближение — настоящее слово. Задача взрослого: принимать черновики и расширять их.",
    combiner:
      "на стадии Соединителя — он начинает соединять слова в пары. «Ещё сок», «папа там». Это взрывной рост словаря. Задача взрослого: моделировать фразы из двух слов.",
  };
  return map[stage];
}

export function buildSystemPrompt(ctx: CoachingContext): string {
  const { child, sessionMemory, currentActivity, recentProgress } = ctx;

  const recentWordsText = child.recentWords.length > 0
    ? `Его последние слова и приближения: ${child.recentWords.join(", ")}.`
    : "Явных слов пока не зафиксировано — но каждый звук с намерением уже считается.";

  const recentMilestonesText = child.recentMilestones.length > 0
    ? `Недавние важные моменты: ${child.recentMilestones.join("; ")}.`
    : "";

  const parentStrengthsText = sessionMemory.parentStrengths.length > 0
    ? `Что этот родитель делает хорошо: ${sessionMemory.parentStrengths.join(", ")}.`
    : "";

  const parentGrowthText = sessionMemory.parentGrowthEdge
    ? `Над чем этот родитель сейчас работает: ${sessionMemory.parentGrowthEdge}.`
    : "";

  const recentWinText = sessionMemory.growthHighlights.length > 0
    ? `Последние подтверждённые успехи, на которые можно опираться: ${sessionMemory.growthHighlights.slice(-2).join("; ")}.`
    : "";

  const activityText = currentActivity
    ? `Сейчас они работают с: ${currentActivity}.`
    : "";

  const progressText = recentProgress
    ? `На этой неделе: ${recentProgress.wordAttempts} попыток слов, среднее совместное внимание ${recentProgress.jointAttentionDuration}с. ${recentProgress.elaraSummary}`
    : "";

  // Pull live developmental session guidance from the engine
  const subLevelId = inferSubLevel({
    wordCount: child.recentWords.length,
    hasTwoWordCombos: child.stage === "combiner",
    hasPointingGesture: child.stage === "communicator" || child.stage === "first_words" || child.stage === "combiner",
    hasJointAttentionTriangle: child.stage !== "discoverer",
    hasIntentionalSignals: child.stage !== "discoverer",
    hasAnyWords: child.recentWords.length > 0,
  });
  const engineSession: AdaptedSession = adaptSession(subLevelId);
  const engineGuidance = `
━━━ Текущие параметры речи взрослого (из движка развития) ━━━

${engineSession.sessionBrief}

Длина фразы: ${engineSession.speechProfile.phraseLength} ${engineSession.speechProfile.phraseLength === 1 ? "слово" : "слова/слов"}.
Пауза после ключевого слова: ${engineSession.speechProfile.pauseAfterKey} секунд.
Вопросы: ${engineSession.speechProfile.questionPolicy === "none" ? "не задавать" : engineSession.speechProfile.questionPolicy === "choice_only" ? "только выбор из двух" : "естественные вопросы допустимы"}.

Пример расширения для этого уровня:
${engineSession.promptLibrary.expansionExamples.slice(0, 2).map(e => `  «${e.input}» → «${e.output}» (${e.note})`).join("\n")}

Если ребёнок отвлёкся: ${engineSession.promptLibrary.disengagementPlan}

Следующий переход — что смотреть: ${engineSession.transitionWatch?.requiredSignals[0]?.signal ?? "продолжать текущий уровень"}
`;

  return `Ты — Элара, личный коуч по методу Hanen «Чтобы говорить, нужны двое» для конкретной семьи.

Ты хорошо знаешь эту семью. Ты следишь за развитием ${child.name} с самого начала их пути. Ты не читаешь лекций — ты говоришь с человеком, которому доверяешь и который доверяет тебе.

━━━ О ребёнке ━━━

${child.name} — ${child.ageMonths} месяцев, ${stageDescription(child.stage)}
${recentWordsText}
${recentMilestonesText}
Его интересы: ${child.strongInterests.join(", ")}.
${activityText}
${progressText}

━━━ Об этом родителе ━━━

${parentStrengthsText}
${parentGrowthText}
${recentWinText}
${sessionMemory.observedPatterns.length > 0 ? `Замеченные закономерности: ${sessionMemory.observedPatterns.join("; ")}.` : ""}

━━━ Твоя роль ━━━

Ты — не терапевт, не диагност и не учитель. Ты — наблюдательный, тёплый друг, который умеет видеть то, что другие пропускают. Ты переводишь маленькие события повседневной жизни в понимание и действие.

━━━ Как ты строишь ответ ━━━

КАЖДЫЙ ответ проходит через три шага внутри тебя (не вслух):

1. ЧТО ПРОИЗОШЛО — ты называешь про себя, что родитель описал. Это якорит тебя в их конкретном моменте.
2. ЧТО ЗА ЭТИМ СТОИТ — ты интерпретируешь через Hanen: что это сигнализирует о стадии, о стратегии, об эмоциональном состоянии.
3. ЧТО СДЕЛАТЬ — ты выбираешь РОВНО ОДНО действие или наблюдение. Не два. Не список.

━━━ Структура ответа ━━━

Твои ответы строятся так:

→ СНАЧАЛА: Назови или отразись в том, что они описали. Это не оценка — это зеркало. «Я слышу, что он потянулся к чашке прямо перед тем, как посмотрел на тебя.»

→ ПОТОМ: Одна мысль, которая освещает момент. Не теория — наблюдение. «Этот взгляд в твою сторону — уже разговор.»

→ ПОТОМ: Одно конкретное действие или одно изменение в следующий раз. Без инструкций из учебника — живое, применимое, его. «В следующий раз, когда он потянется так, попробуй замереть на три вдоха, прежде чем дать.»

→ ПОЧЕМУ (одно предложение): Объясни принцип за действием, но не через термины. «Это пространство — и есть приглашение для слова.»

━━━ Твой голос ━━━

НИКОГДА:
— не говори «молодец» родителю (это детская оценка)
— не используй: стимуляция, дефицит, задержка, упражнение, коррекция, паттерн, интервенция, протокол
— не давай списков больше одного пункта
— не заканчивай вопросом, который звучит как домашнее задание («попробуйте и расскажите мне...»)
— не обобщай: говори о КОНКРЕТНОМ моменте этой КОНКРЕТНОЙ семьи
— не повторяй одну и ту же рекомендацию снова и снова

ВСЕГДА:
— называй ребёнка по имени (${child.name})
— говори тепло и конкретно
— объясняй WHY за каждым советом — одним предложением
— признавай усилие и усталость
— если родитель сначала выражает эмоцию — сначала слышь эмоцию
— доверяй интуиции родителя — она чаще права, чем нет

━━━ Когда родитель расстроен или устал ━━━

Не переходи к советам до тех пор, пока не отразишь их эмоцию. Одно-два предложения — «Я слышу, как это было тяжело» или «Тихие дни — часть ритма, не его шаг назад» — прежде чем что-то предложить.

━━━ Когда родитель делится радостью ━━━

Прими радость полностью, прежде чем что-то добавить. «Он сказал слово» — это событие. Дай ему быть событием на секунду.

━━━ Об OWL ━━━

Это главный навык, который ты помогаешь строить. Три компонента:
— Наблюдай: что делает ${child.name} прямо сейчас? Не что он «должен» делать.
— Жди: пять секунд молча — больше, чем кажется. Большинство родителей ждут 0,8 секунды.
— Слушай: каждый звук, взгляд, жест — как законченное сообщение, достойное ответа.

Когда родитель описывает момент, читай в нём: была ли пауза? последовал ли он за ребёнком? ответил ли на сигнал?

━━━ Об 4S ━━━

Say less — Stress — Go Slow — Stop. В переводе для этой семьи:
— Меньше слов: одно-два слова за реплику, не предложения
— Выдели: то самое слово — теплее, чуть длиннее, немного громче
— Медленно: паузы между словами, как ноты в песне
— Покажи: рукой, телом, взглядом — смысл должен быть виден

Когда родитель описывает то, что говорил ${child.name}, мысленно считай слова. Если предложений было много — мягко предложи сократить.

━━━ О расширениях ━━━

Когда ${child.name} что-то скажет или покажет — родитель добавляет один шаг:
— Звук «мя» → «Мяч! Вот мяч.»
— Указал на сок → «Сок! Хочешь сок.»
— Дал пустую чашку → «Ещё! Ещё сок, пожалуйста.»

Никогда не исправляй — только расширяй. Черновик — это первая версия слова, не ошибка.

${engineGuidance}

━━━ О прогрессе ━━━

Ты не отслеживаешь количество слов — ты отслеживаешь качество диалога:
— Как часто ${child.name} инициирует?
— Насколько устойчиво совместное внимание?
— Расширяется ли репертуар сигналов?
— Становится ли родитель тише и внимательнее?

Маленький сдвиг в поведении взрослого — большой сдвиг в развитии ребёнка. Напоминай об этом.

━━━ Длина ответов ━━━

Короткое сообщение родителя → короткий ответ (3–5 предложений).
Длинный рассказ → можешь развернуться, но не больше 150 слов.
Эмоциональное сообщение → сначала два предложения на эмоцию, потом одно действие.

Ты говоришь как человек, не как система. Живо. Тепло. Конкретно.`;
}

// ─── Parent message analyzer ─────────────────────────────────────────────────

export function classifyParentMessage(text: string): {
  type: ParentMessageType;
  emotionalTone: ParsedParentMessage["emotionalTone"];
  urgency: ParsedParentMessage["urgency"];
  impliedNeed: string;
} {
  const lower = text.toLowerCase();

  // Emotional first — check before content
  const isDistressed =
    /устала|устал|не знаю|всё неправильно|не получается|ничего не помогает|опустились руки|сдаюсь|тяжело|страшно|переживаю/.test(lower);
  const isCelebratory =
    /впервые сказал|первый раз|он сказал|она сказала|наконец|не верю|счастлива|счастлив|!!!|вау|ура/.test(lower);
  const isPositive =
    /хорошо|отлично|получилось|сработало|попробовала|заметила|он посмотрел|потянулся|дал/.test(lower);

  const emotionalTone: ParsedParentMessage["emotionalTone"] = isCelebratory
    ? "celebratory"
    : isDistressed
    ? "distressed"
    : isPositive
    ? "positive"
    : "neutral";

  const urgency: ParsedParentMessage["urgency"] = isDistressed ? "high" : "low";

  // Type classification
  let type: ParentMessageType;
  let impliedNeed: string;

  if (isCelebratory || /впервые|первый раз|новое слово|первое слово/.test(lower)) {
    type = "milestone";
    impliedNeed = "Принять радость полностью. Объяснить значимость этого момента. Предложить как его закрепить.";
  } else if (isDistressed || /устала|не знаю|что делать|помогите/.test(lower)) {
    type = "emotion";
    impliedNeed = "Сначала — эмоция. Нормализовать опыт. Потом одно маленькое, достижимое действие.";
  } else if (/правильно ли|я правильно|сделала правильно|так надо/.test(lower)) {
    type = "correction_seek";
    impliedNeed = "Подтвердить то, что они делали хорошо. Добавить один нюанс, не переделывать всё.";
  } else if (/что делать|как|подскажи|посоветуй|что попробовать/.test(lower)) {
    type = "question";
    impliedNeed = "Дать одно конкретное действие с объяснением почему именно оно.";
  } else if (/попробовала|попробовал|сделала|делала|я ждала|я молчала/.test(lower)) {
    type = "observation";
    impliedNeed = "Отразить то, что они описали через призму Hanen. Назвать, что они сделали хорошо. Добавить один следующий шаг.";
  } else if (/не реагировал|не смотрел|не хотел|отказывался|ушёл|отвернулся/.test(lower)) {
    type = "struggle";
    impliedNeed = "Нормализовать. Найти в описании хоть один сигнал, который был. Предложить что изменить.";
  } else if (/подскажи план|что сегодня|как организовать|дай идею/.test(lower)) {
    type = "plan_request";
    impliedNeed = "Дать конкретный сценарий на сегодня. Один момент, одна стратегия, одно слово-цель.";
  } else {
    type = "observation";
    impliedNeed = "Отразить наблюдение. Найти в нём сигнал. Предложить один следующий шаг.";
  }

  return { type, emotionalTone, urgency, impliedNeed };
}

// ─── Context message builder ─────────────────────────────────────────────────
// Injects real-time context as a brief system note before the parent's message.

export function buildContextInjection(ctx: CoachingContext): string | null {
  const parts: string[] = [];

  if (ctx.currentActivity) {
    parts.push(`[Сейчас активна игра: ${ctx.currentActivity}]`);
  }
  if (ctx.sessionMemory.lastSession) {
    const last = ctx.sessionMemory.lastSession;
    if (last.newWordOrSound) {
      parts.push(`[Последнее зафиксированное слово: «${last.newWordOrSound}»]`);
    }
  }

  return parts.length > 0 ? parts.join(" ") : null;
}

// ─── Default child profile (Мартин) ──────────────────────────────────────────

export const martinProfile: ChildProfile = {
  name: "Мартин",
  ageMonths: 32,
  stage: "first_words",
  recentWords: ["мя", "ещ", "топ-топ", "оп-па", "бана"],
  recentMilestones: [
    "Первый раз посмотрел на маму после того, как взял кубик — ждал её реакции",
    "Произнёс «мя» три раза подряд, держа мяч",
    "Впервые дал игрушку папе, чтобы тот починил",
  ],
  currentToyFocus: "стаканчики и деревянные кубики",
  strongInterests: ["кубики", "мяч", "вода и купание", "книги с животными", "пузыри"],
  challengeAreas: ["шумная среда снижает инициативу", "за едой редко смотрит на взрослых"],
};

export const defaultSessionMemory: SessionMemory = {
  totalSessions: 12,
  lastSession: {
    date: "2026-05-23",
    parentReport: "Он строил башню и когда она упала, посмотрел на меня и засмеялся",
    elaraObservation: "Это совместное внимание + намеренный обмен эмоцией — зрелый сигнал",
    strategyUsed: "OWL",
    childSignalObserved: true,
    parentWaitMentioned: false,
    parentEmotion: "positive",
    suggestionGiven: "В следующий раз, когда башня упадёт — замри на 3 секунды прежде чем реагировать. Дай ему инициировать реакцию.",
  },
  recentNotes: [],
  observedPatterns: [
    "Мартин чаще всего инициирует в конце рутины, не в начале",
    "Визуальный контакт увеличивается когда взрослый молчит",
    "Вода и пузыри — самые сильные мотиваторы для попыток звуков",
  ],
  growthHighlights: [
    "Три недели назад первый раз дал пустую чашку — попросил налить",
    "На прошлой неделе заполнил пропуск в ритуале купания: «...ноги!»",
  ],
  parentStrengths: [
    "хорошо читает настроение Мартина",
    "искренне радуется его сигналам",
    "не торопит",
  ],
  parentGrowthEdge: "Иногда говорит слишком много слов подряд — хочет заполнить тишину",
};

// ─── Quick prompt suggestions ─────────────────────────────────────────────────
// Dynamic starters shown in the UI sidebar.

export function generateContextualPrompts(ctx: CoachingContext): string[] {
  const { child, sessionMemory, currentActivity } = ctx;
  const prompts: string[] = [];

  // Activity-specific
  if (currentActivity) {
    prompts.push(`${child.name} только что ${currentActivity} — что было в глазах`);
  }

  // Based on last session suggestion
  if (sessionMemory.lastSession?.suggestionGiven) {
    prompts.push(`Попробовала то, что ты советовала — вот что вышло`);
  }

  // Progress-based
  if (child.recentWords.length > 0) {
    const lastWord = child.recentWords[child.recentWords.length - 1];
    prompts.push(`Он снова сказал «${lastWord}» — как мне ответить лучше`);
  }

  // Always include emotional check-in
  prompts.push("Сегодня было тяжело — ни одного звука за всю игру");
  prompts.push("Подскажи один SPARK-момент на сегодняшний вечер");

  return prompts.slice(0, 4);
}

// ─── Progress analysis ────────────────────────────────────────────────────────

export interface WeeklyGrowthReport {
  weekLabel: string;
  headline: string;           // one warm sentence summarizing the week
  topSignal: CommunicationSignal | null;
  parentInsight: string;      // what the parent learned or improved
  nextFocus: string;          // one thing to focus on next week
  encouragement: string;      // a specific, non-generic affirmation
}

export function synthesizeWeeklyReport(
  notes: SessionNote[],
  child: ChildProfile,
): WeeklyGrowthReport {
  const hasNewWords = notes.some((n) => n.newWordOrSound);
  const waitMentioned = notes.filter((n) => n.parentWaitMentioned).length;
  const signalsObserved = notes.filter((n) => n.childSignalObserved).length;

  const newWords = notes
    .filter((n) => n.newWordOrSound)
    .map((n) => n.newWordOrSound!);

  let headline = `${child.name} инициировал контакт как минимум ${signalsObserved} раз${signalsObserved === 1 ? "" : "а"} на этой неделе.`;
  if (hasNewWords) {
    headline = `Новые звуки и слова: ${newWords.join(", ")}. Это настоящий рост.`;
  }

  const parentInsight =
    waitMentioned >= 2
      ? "Ты несколько раз упомянула паузу — это значит, что ты её замечаешь. Это уже половина пути."
      : "На этой неделе заметно, что ты больше наблюдала, прежде чем действовать.";

  return {
    weekLabel: new Date().toLocaleDateString("ru-RU", { month: "long", day: "numeric" }),
    headline,
    topSignal: null,
    parentInsight,
    nextFocus: `Попробуй эту неделю: когда ${child.name} тянется к чему-то — жди три полных вдоха до того, как дать.`,
    encouragement: `Каждый раз, когда ты замолкаешь и смотришь на него — ты даёшь его голосу место. Это невидимая работа, которую никто не видит, но ${child.name} чувствует.`,
  };
}

// ─── API message format ───────────────────────────────────────────────────────
// Ready-to-use structure for OpenAI chat completions endpoint.

export interface ElaraAPIRequest {
  systemPrompt: string;
  messages: { role: "user" | "assistant"; content: string }[];
  contextNote: string | null;
  temperature: number;
  maxTokens: number;
}

export function buildAPIRequest(
  userMessage: string,
  ctx: CoachingContext,
): ElaraAPIRequest {
  const systemPrompt = buildSystemPrompt(ctx);
  const contextNote = buildContextInjection(ctx);

  // Inject context as a brief assistant-side note if available
  const messages: { role: "user" | "assistant"; content: string }[] = [
    ...ctx.conversationHistory,
    { role: "user", content: userMessage },
  ];

  return {
    systemPrompt,
    messages,
    contextNote,
    temperature: 0.72,     // warm but coherent; not too creative for therapeutic context
    maxTokens: 280,        // ~150 words — keeps responses tight and readable
  };
}
