/**
 * Hybrid Therapy Mini-Games — Physical ↔ Digital Simultaneous Play
 *
 * Each game lives in two spaces at once:
 *   - Physical: a real toy in the child's hands
 *   - Digital: a living scene on screen that reacts to the physical world
 *
 * The screen never replaces the toy. It is the toy's shadow world.
 * Communication IS the game mechanic. Speech, gesture, gaze — all trigger magic.
 */

import type { CommunicationStage, SensoryChannel } from "./therapy-mechanics";

// ─── Primitive types ──────────────────────────────────────────────────────────

export type ToyCategory =
  | "pounding_toy"
  | "stacking_cups"
  | "magnetic_fishing"
  | "sorting_game"
  | "memory_game"
  | "threading_toy"
  | "lotto_game"
  | "lock_key_toy"
  | "matching_game";

export type ThemeColor = "pink" | "teal" | "lavender" | "sunset";

/** How the physical world signals the digital world */
export type SyncMethod =
  | "parent_tap"        // parent taps screen to register a physical event
  | "audio_detect"      // mic detects impact / vocalization threshold
  | "manual_confirm"    // parent presses a large confirm button per turn
  | "ambient_passive";  // screen runs on its own ambient timeline, no sync needed

/** What level of communication triggers this reward */
export type CommunicationTrigger =
  | "any_signal"          // any look, reach, body movement
  | "vocalization"        // any sound, babble, proto-word
  | "word_approximation"  // recognizable attempt at a target word
  | "clear_word"          // clear single word
  | "two_word_combo";     // two-word phrase or more

// ─── Sub-structures ───────────────────────────────────────────────────────────

export interface PhysicalLayer {
  /** How to arrange toy + screen before starting */
  setup: string;
  /** The core repeating physical action */
  coreLoop: string;
  /** What the adult physically does (not just watches) */
  adultRole: string;
  /** Where the screen sits relative to the toy action */
  screenPosition: string;
  /** Physical objects needed beyond the main toy */
  props: string[];
}

export interface DigitalScene {
  /** The world displayed at rest */
  idleDescription: string;
  /** Ambient animation that plays constantly — alive but calm */
  ambientAnimation: string;
  /** The color palette driving this scene */
  palette: ThemeColor[];
  /** What a single unit of progress looks like on screen */
  progressUnit: string;
  /** What the fully completed scene looks like */
  completionState: string;
  /** The companion creature living in this scene */
  companion: {
    name: string;         // Мартин's companion for this game
    idleBehavior: string; // what it does when nothing is happening
    reactionBehavior: string; // how it reacts to communication
  };
}

export interface SyncBridge {
  method: SyncMethod;
  /** What the parent physically does to sync digital with physical */
  parentAction: string;
  /** The child's perceived magical moment — screen reacts to their world */
  childMagicMoment: string;
  /** What to do when sync fails or parent misses a moment */
  fallback: string;
}

export interface TurnExchange {
  /** How the adult's turn is structured */
  adultTurn: string;
  /** The exact OWL pause moment — what adult does with body */
  owlPause: string;
  /** How the child knows it is their turn */
  childInvitation: string;
  /** What the adult does when child communicates */
  responseScript: string;
  /** How one round flows into the next */
  loopTransition: string;
}

export interface CommunicationTemptation {
  /** Hanen technique classification */
  type: "inadequate_portion" | "sabotage" | "anticipation_hold" | "silly_mistake" | "unexpected_disappearance";
  /** What the adult does physically */
  setup: string;
  /** The communication act this invites */
  targetSignal: string;
  /** How the adult responds the moment the signal comes */
  responseScript: string;
  /** What happens on screen if child communicates */
  digitalReaction: string;
}

export interface InteractionReward {
  trigger: CommunicationTrigger;
  /** What happens on screen */
  digitalEffect: string;
  /** What the adult says/does */
  adultScript: string;
  /** Emotional quality of the reward — never jarring */
  tone: "quiet_warmth" | "shared_delight" | "magical_surprise";
}

export interface CoachingLayer {
  /** Adult mindset before starting */
  before: string;
  /** The ONE Hanen strategy this game most exercises */
  primaryStrategy: "OWL" | "4S" | "ROCK" | "SPARK";
  /** In-game micro-reminders shown to parent on screen */
  duringPrompts: string[];
  /** Exact script for celebrating any communication attempt */
  celebrationScript: string;
  /** What to do if child disengages — never force, always invite */
  reEngagement: string;
  /** How to end the game well */
  closeScript: string;
}

export interface EmotionalArc {
  /** How to enter the game world — establish co-presence */
  opening: string;
  /** How engagement builds — rising action */
  build: string;
  /** The peak magical moment — payoff */
  climax: string;
  /** Gentle wind-down — satisfying closure */
  resolution: string;
}

// ─── Master game type ─────────────────────────────────────────────────────────

export interface HybridMiniGame {
  id: string;
  name: string;         // Russian display name
  nameEn: string;       // English internal name
  tagline: string;      // Russian emotional hook, one line
  toyCategory: ToyCategory;
  stages: CommunicationStage[];
  duration: string;
  themeColor: ThemeColor;

  physicalLayer: PhysicalLayer;
  digitalScene: DigitalScene;
  syncBridge: SyncBridge;
  turnExchange: TurnExchange;

  communicationTemptations: CommunicationTemptation[];
  interactionRewards: InteractionReward[];
  speechTargets: string[];
  sensoryTargets: SensoryChannel[];

  coachingLayer: CoachingLayer;
  emotionalArc: EmotionalArc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GAME 1 — POUNDING TOY: "Гром-гора"
// ─────────────────────────────────────────────────────────────────────────────

export const thunderMountain: HybridMiniGame = {
  id: "thunder-mountain",
  name: "Гром-гора",
  nameEn: "Thunder Mountain",
  tagline: "Каждый удар будит одного зверька.",
  toyCategory: "pounding_toy",
  stages: ["discoverer", "communicator", "first_words"],
  duration: "3–5 мин",
  themeColor: "sunset",

  physicalLayer: {
    setup:
      "Пудинг-стучалка или ксилофон на полу между взрослым и ребёнком. Планшет стоит вертикально за игрушкой — ребёнок видит экран, глядя поверх стучалки. Молоток держит взрослый.",
    coreLoop:
      "Взрослый делает один удар, передаёт молоток ребёнку. Ребёнок бьёт. Оба смотрят на экран — что проснулось. Молоток возвращается к взрослому. Круг повторяется.",
    adultRole:
      "Взрослый регулирует темп через молоток: держит его между ходами. Каждая передача — коммуникационное приглашение. Взрослый бьёт тихо — ребёнок видит пример и может захотеть сделать ГРОМЧЕ.",
    screenPosition:
      "Планшет стоит прямо за пудингом на расстоянии вытянутой руки. Ребёнок видит экран, не отрывая взгляда от игрушки.",
    props: ["небольшая мягкая подушка (для мягких ударов)", "второй молоток по желанию"],
  },

  digitalScene: {
    idleDescription:
      "Тёмная спящая гора с закрытыми пещерами. Вокруг — светлячки. Всё дышит медленно. Тишина.",
    ambientAnimation:
      "Светлячки медленно плывут. Раз в 8 секунд из пещеры доносится тихое сонное мычание — подсказка, что внутри кто-то есть.",
    palette: ["sunset", "lavender"],
    progressUnit:
      "Каждый удар открывает одну пещеру: зверёк выглядывает, моргает, оглядывается и садится снаружи. Пещера светится его цветом.",
    completionState:
      "Все 6 зверьков сидят снаружи горы. Гора превращается в светящийся золотой маяк. Звучит тихая тёплая мелодия. Зверьки машут.",
    companion: {
      name: "Громик",
      idleBehavior: "Дремлет у подножия горы, дёргает ушами.",
      reactionBehavior:
        "Вскакивает при ударе, смотрит на ребёнка с восхищением, показывает лапой на пещеру.",
    },
  },

  syncBridge: {
    method: "audio_detect",
    parentAction:
      "Микрофон улавливает звук удара (порог ~60 дБ). Взрослый ничего не нажимает — удар автоматически будит следующего зверька. Если удар слишком тихий, родитель нажимает большую кнопку-молоток внизу экрана.",
    childMagicMoment:
      "Ребёнок бьёт молотком — и сразу видит, как пещера открывается. Его рука управляет горой. Нет никакой задержки.",
    fallback:
      "Если микрофон не сработал: взрослый быстро и незаметно нажимает кнопку-молоток. Ребёнок не знает о технике — он знает только о магии.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый медленно, торжественно поднимает молоток. Пауза. Один удар — «Бум». Замирает. Смотрит на экран вместе с ребёнком. Передаёт молоток.",
    owlPause:
      "Молоток протянут к ребёнку. Взрослый замирает. Брови подняты. Тело наклонено вперёд. 5 секунд полной тишины.",
    childInvitation:
      "Молоток на уровне груди ребёнка. Взрослый не говорит ни слова. Тело говорит: «Теперь ты».",
    responseScript:
      "Любой сигнал → молоток немедленно отдаётся. «Бах! Ты разбудил! Смотри!»",
    loopTransition:
      "Зверёк садится → взрослый смотрит на следующую пещеру, поднимает молоток, снова пауза. Нет слов между раундами.",
  },

  communicationTemptations: [
    {
      type: "inadequate_portion",
      setup: "Взрослый кладёт молоток себе на колени после 2 ходов, смотрит на гору задумчиво.",
      targetSignal: "Ребёнок тянется к молотку или смотрит на взрослого.",
      responseScript: "«Тебе? На — бах!» Молоток отдаётся с радостью.",
      digitalReaction: "Громик прыгает, указывая лапой на следующую пещеру.",
    },
    {
      type: "anticipation_hold",
      setup: "Взрослый поднимает молоток в позицию удара и замирает на 8 секунд с широко открытыми глазами.",
      targetSignal: "Ребёнок вокализирует, хлопает, смотрит на взрослого — любой сигнал нетерпения.",
      responseScript: "«Да! Бум! Ты сказал — бьём!»",
      digitalReaction: "Пещера вздрагивает в предвкушении — до удара.",
    },
    {
      type: "silly_mistake",
      setup: "Взрослый бьёт не по стучалке, а рядом с ней — по полу. Смотрит растерянно.",
      targetSignal: "Ребёнок смеётся, показывает на игрушку или поправляет взрослого.",
      responseScript: "«Ой! Сюда? Точно! Бум!»",
      digitalReaction: "Громик смеётся и прикрывает глаза лапами.",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый прячет молоток за спину в середине игры. Невинное лицо.",
      targetSignal: "Ребёнок ищет молоток взглядом или жестом.",
      responseScript: "«Вот он! Нашёл!» — достать с преувеличенным удивлением.",
      digitalReaction: "Громик оглядывается в поисках молотка вместе с ребёнком.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Пещера слегка вздрагивает — кто-то шевелится внутри.",
      adultScript: "Немедленно отдать молоток. Сказать только: «Да!»",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Зверёк высовывает голову до плеч — почти вышел.",
      adultScript: "«Ты позвал! Он слышит!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Зверёк выходит полностью и садится — без удара.",
      adultScript: "«Бум! Ты сказал — он проснулся!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Зверёк выходит и делает маленький танец, прежде чем сесть.",
      adultScript: "«БУМ! Громко! Он тебя услышал с первого раза!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["бум", "ещё", "иди", "привет", "стоп", "мой", "дай", "смотри"],
  sensoryTargets: ["auditory", "tactile", "proprioceptive", "visual"],

  coachingLayer: {
    before:
      "Эта игра — про ритм и совместность. Не про то, чтобы научить стучать. Твоя тишина между ударами дороже любых слов.",
    primaryStrategy: "OWL",
    duringPrompts: [
      "Передай молоток — и замри на 5 секунд.",
      "Любой звук = удар заработан. Отдай немедленно.",
      "Не хвали «молодец» — скажи «Бум!» вместе с ним.",
      "Если он устал — удар по колену взрослого тоже считается.",
    ],
    celebrationScript:
      "Любой звук — зеркало: повтори его звук + добавь слово. «Ба! Бам! Ты позвал зверька!»",
    reEngagement:
      "Сделай что-то неожиданное: медленно постучи пальцем по пустой пещере. Шёпотом скажи «кто там?». Не требуй ответа.",
    closeScript:
      "«Все зверьки проснулись. Гора светится. Ты их разбудил.» Пауза. «До завтра, Громик.»",
  },

  emotionalArc: {
    opening:
      "Планшет включается — гора спит. Взрослый шёпотом: «Они все спят. Надо разбудить.» Первый удар — один. Пауза. Смотреть вместе.",
    build:
      "Каждый проснувшийся зверёк делает гору чуть ярче. Нарастающее предвкушение: кто следующий? Взрослый намеренно замедляется — темп усиливает желание ребёнка.",
    climax:
      "Последний зверёк. Взрослый делает особенно долгую паузу перед последним ударом. Ребёнок почти не выдерживает. Финальный удар — гора взрывается золотым светом.",
    resolution:
      "Зверьки рассаживаются вокруг горы. Тихая музыка. Взрослый и ребёнок просто смотрят вместе — ничего не делают. Это совместный покой.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 2 — STACKING CUPS: "Облачный замок"
// ─────────────────────────────────────────────────────────────────────────────

export const cloudCastle: HybridMiniGame = {
  id: "cloud-castle",
  name: "Облачный замок",
  nameEn: "Cloud Castle",
  tagline: "Каждый стаканчик — этаж для нашего замка в небе.",
  toyCategory: "stacking_cups",
  stages: ["discoverer", "communicator", "first_words"],
  duration: "3–5 мин",
  themeColor: "lavender",

  physicalLayer: {
    setup:
      "8 стаканчиков в мешочке у взрослого. Ровная поверхность перед ребёнком — пространство для башни. Планшет стоит рядом, экраном к ребёнку.",
    coreLoop:
      "Взрослый вытаскивает один стаканчик из мешочка — держит у груди. Ребёнок сигнализирует — стаканчик передаётся. Ребёнок ставит. Оба смотрят на экран. Повторить.",
    adultRole:
      "Контроль мешочка = контроль темпа. Взрослый достаёт стаканчики медленно, с предвкушением. Если башня падает — это событие, не провал: «Ух-ты!» и строим снова.",
    screenPosition:
      "Планшет сбоку от башни под 45°. Ребёнок видит и реальную башню, и экранный замок одновременно.",
    props: ["мешочек или непрозрачный пакет для стаканчиков"],
  },

  digitalScene: {
    idleDescription:
      "Розово-сиреневое небо с облаками. Пустой фундамент замка парит на главном облаке. Медведь-строитель сидит рядом с чертежом.",
    ambientAnimation:
      "Облака медленно плывут. Медведь листает чертёж, почёсывает голову — ждёт.",
    palette: ["lavender", "pink"],
    progressUnit:
      "Каждый поставленный стаканчик добавляет один этаж к экранному замку: окно загорается, флажок появляется, балкон вырастает. Цвет этажа соответствует цвету физического стаканчика.",
    completionState:
      "Замок полностью построен. Флаги развеваются. Медведь забегает внутрь и выглядывает из верхнего окна. Облако под замком светится золотым.",
    companion: {
      name: "Облачок",
      idleBehavior: "Медленно плывёт вокруг фундамента, позёвывая.",
      reactionBehavior: "Делает кувырок в воздухе каждый раз, когда появляется новый этаж.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "Как только стаканчик поставлен физически — взрослый одним касанием нажимает большую кнопку «+этаж» в нижней части экрана. Кнопка большая, чтобы нажимать краем руки, не отвлекая внимание.",
    childMagicMoment:
      "Ребёнок ставит стаканчик — и тут же видит, как замок вырастает на один этаж. Причинно-следственная связь мгновенная.",
    fallback:
      "Если взрослый не успел нажать — нажать через секунду. Ребёнок ещё смотрит на экран. Задержка ≤2 секунды не разрушает связь.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый медленно достаёт один стаканчик из мешочка. Держит на ладони. Ставит свой стаканчик на башню. Смотрит на экран. Говорит: «Вверх.» Пауза.",
    owlPause:
      "Рука в мешочке — замерла. Взрослый смотрит на ребёнка. Не двигается. 5 секунд. Брови подняты.",
    childInvitation:
      "Взрослый медленно достаёт стаканчик и кладёт его НА ВИДУ — на стол, не в руку ребёнку. Ждёт, когда ребёнок возьмёт сам.",
    responseScript:
      "Ребёнок берёт стаканчик → «Вверх! Строим!» Как только поставлен → нажать синхронизацию.",
    loopTransition:
      "После каждого этажа — пауза. Оба смотрят на замок на экране. Взрослый тихо: «Ещё?» — пауза. Рука в мешочке.",
  },

  communicationTemptations: [
    {
      type: "inadequate_portion",
      setup: "Взрослый достаёт стаканчик и держит его — не кладёт и не отдаёт. Смотрит куда-то вбок.",
      targetSignal: "Ребёнок тянется, смотрит на взрослого, вокализирует.",
      responseScript: "«Хочешь? Вот! Строй!»",
      digitalReaction: "Облачок нетерпеливо подпрыгивает на экране.",
    },
    {
      type: "sabotage",
      setup: "Взрослый специально ставит маленький стаканчик на большой — неустойчиво. Смотрит с сомнением.",
      targetSignal: "Ребёнок поправляет, указывает на правильный порядок, говорит «нет».",
      responseScript: "«Ты прав! Вот так! Умница!»",
      digitalReaction: "Замок сначала кривится, потом выравнивается со звуком «клик».",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый убирает мешочек за спину в середине игры, смотрит на башню задумчиво.",
      targetSignal: "Ребёнок ищет мешочек или стаканчик, жестикулирует.",
      responseScript: "«Вот мешочек! Нашёл! Ещё стаканчик?»",
      digitalReaction: "Медведь на экране тоже ищет — оглядывается по сторонам.",
    },
    {
      type: "anticipation_hold",
      setup: "Взрослый держит стаканчик над башней, не опуская — долгая пауза с улыбкой.",
      targetSignal: "Ребёнок смотрит на стаканчик, на взрослого, вокализирует нетерпение.",
      responseScript: "«Ставим! Вверх!» — опустить вместе с ребёнком.",
      digitalReaction: "Этаж появляется с особым сиянием.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Следующий этаж слегка светится, намекая, что он «ждёт».",
      adultScript: "Немедленно дать стаканчик.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Медведь выглядывает из будущего этажа и машет.",
      adultScript: "«Ты позвал! Он слышит! Строим!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Этаж появляется с цветным шлейфом — след от стаканчика.",
      adultScript: "«Вверх! Ты сказал вверх! Слышу!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Этаж «въезжает» снизу с особой анимацией. Флажок появляется сразу.",
      adultScript: "«Вверх! Громко! Замок тебя слышит!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["вверх", "ещё", "дай", "упал", "ой", "стоп", "мой", "большой"],
  sensoryTargets: ["visual", "tactile", "proprioceptive"],

  coachingLayer: {
    before:
      "Мешочек — твой главный инструмент. Пока он у тебя — ты задаёшь темп. Доставай медленно. Пауза после каждого этажа важнее любых слов.",
    primaryStrategy: "SPARK",
    duringPrompts: [
      "Держи мешочек — не клади на стол.",
      "После каждого этажа — смотреть вместе на экран, молча.",
      "Если башня упала — «Ух-ты!» и строить снова. Радость, не огорчение.",
      "Не помогай ставить стаканчик. Жди.",
    ],
    celebrationScript:
      "Любой звук во время постановки → «Вверх! Ты строишь!» Расширяй: «Вверх — ещё один!»",
    reEngagement:
      "Тихонько постучи пальцем по мешочку. Шёпотом: «Там ещё есть». Не предлагай — намекай.",
    closeScript:
      "«Замок готов. Смотри — флаги! Ты построил замок для Облачка.» Долгая пауза. «Пока, замок.»",
  },

  emotionalArc: {
    opening:
      "Планшет показывает пустой фундамент. «Смотри — замок не достроен. Медведь ждёт.» Первый стаканчик взрослый ставит медленно, торжественно.",
    build:
      "С каждым этажом замок выглядит убедительнее. Взрослый комментирует только экран, не ребёнка: «Окно появилось! Балкон!» — следит за взглядом ребёнка.",
    climax:
      "Последний стаканчик. Взрослый делает долгую паузу перед тем, как достать его из мешочка. Достаёт медленно. Ребёнок ставит последний стаканчик.",
    resolution:
      "Замок полный. Флаги. Медведь в окне. Взрослый и ребёнок просто сидят и смотрят на экран вместе — ничего не делают. Тихая совместная радость.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 3 — MAGNETIC FISHING: "Радужный пруд"
// ─────────────────────────────────────────────────────────────────────────────

export const rainbowPond: HybridMiniGame = {
  id: "rainbow-pond",
  name: "Радужный пруд",
  nameEn: "Rainbow Pond",
  tagline: "Каждая рыбка несёт в пруд свой цвет.",
  toyCategory: "magnetic_fishing",
  stages: ["communicator", "first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "teal",

  physicalLayer: {
    setup:
      "Магнитный рыболовный набор на полу. Взрослый и ребёнок сидят напротив друг друга — пруд посередине. У каждого удочка. Планшет стоит за прудом.",
    coreLoop:
      "Взрослый ловит рыбку — держит вверх, называет цвет, ждёт реакции ребёнка. Потом даёт ребёнку. Ребёнок ловит сам. Пойманная рыбка «плывёт» в цифровой пруд.",
    adultRole:
      "Взрослый активно рыбачит, но целенаправленно «промахивается» — давая ребёнку лучшую рыбку. Контролирует, сколько рыбок осталось в игре.",
    screenPosition:
      "Планшет за прудом, на уровне глаз сидящего ребёнка. Пруд и экран в одном взгляде.",
    props: ["маленькое ведёрко для «пойманных» рыбок", "2 удочки"],
  },

  digitalScene: {
    idleDescription:
      "Тёмный пруд с мягким свечением. Внизу видны силуэты рыбок. Вода тихо движется. Цапля сидит на камне и ждёт.",
    ambientAnimation:
      "Силуэты рыб плавно двигаются под водой. Пузыри поднимаются. Цапля изредка наклоняет голову к воде.",
    palette: ["teal", "lavender"],
    progressUnit:
      "Каждая пойманная рыбка анимированно всплывает на поверхность экранного пруда, кружится, показывает свой цвет во всей красе, потом ныряет и занимает «своё место» — пруд становится всё ярче.",
    completionState:
      "Пруд переполнен светом и движением. Все рыбки видны. Цапля поднимается в воздух и делает круг над прудом — прощальный полёт.",
    companion: {
      name: "Цапля Ляля",
      idleBehavior: "Стоит на одной ноге. Иногда чуть вытягивает шею к воде.",
      reactionBehavior:
        "Прыгает от радости и хлопает крыльями, когда рыбка поймана.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "После поимки рыбки — взрослый нажимает цвет рыбки на панели из 6 цветных кнопок внизу экрана. Кнопки крупные, различимые краем зрения.",
    childMagicMoment:
      "Ребёнок поднимает пойманную рыбку — и тут же видит её двойника на экране. Физическая рыбка = живое существо.",
    fallback:
      "Если взрослый занят своей удочкой — нажать кнопку через 3–4 секунды. Ребёнок, скорее всего, ещё рассматривает рыбку.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый ловит рыбку медленно, торжественно. Поднимает — смотрит на ребёнка. Называет: «Рыбка. Синяя.» Пауза 4 секунды.",
    owlPause:
      "Рыбка на крючке, поднята на уровень глаз ребёнка. Взрослый смотрит на ребёнка — не на рыбку. Ждёт взгляда, жеста, звука.",
    childInvitation:
      "Взрослый кладёт пойманную рыбку перед ребёнком — не отдаёт в руку. Ждёт, когда ребёнок возьмёт или укажет на пруд.",
    responseScript:
      "Ребёнок берёт рыбку или тянется к ней → «Твоя! Синяя рыбка — твоя!» Нажать кнопку синхронизации.",
    loopTransition:
      "Рыбка зарегистрирована → оба смотрят на пруд на экране. Пауза. Взрослый берёт удочку снова.",
  },

  communicationTemptations: [
    {
      type: "inadequate_portion",
      setup: "Взрослый держит пойманную рыбку над прудом, не опуская и не отдавая. Мечтательный вид.",
      targetSignal: "Ребёнок тянется, вокализирует, смотрит на взрослого.",
      responseScript: "«Хочешь? Держи! Лови!»",
      digitalReaction: "Двойник рыбки на экране нетерпеливо крутится у поверхности.",
    },
    {
      type: "silly_mistake",
      setup:
        "Взрослый «ловит» рыбку, поднимает удочку — на крючке ничего нет. Смотрит растерянно.",
      targetSignal: "Ребёнок смеётся, показывает на пруд, пытается помочь.",
      responseScript: "«Сорвалась! Где она? Ты поймаешь!»",
      digitalReaction: "Цапля закрывает глаза крыльями — стыдится.",
    },
    {
      type: "sabotage",
      setup: "Взрослый кладёт рыбку в ведёрко, но ведёрко переворачивает — рыбка «убегает» обратно.",
      targetSignal: "Ребёнок возражает, показывает на рыбку, хочет поправить.",
      responseScript: "«Ой, убежала! Помоги! Лови!»",
      digitalReaction: "Рыбка на экране весело уплывает — надо поймать снова.",
    },
    {
      type: "anticipation_hold",
      setup:
        "Рыбка на крючке, взрослый медленно, ОЧЕНЬ медленно поднимает удочку — пауза на каждые 5 см.",
      targetSignal: "Ребёнок вокализирует нетерпение, тянется к рыбке, говорит «дай».",
      responseScript: "«Тихо-тихо... вот она!» — финальный резкий подъём.",
      digitalReaction: "Рыбка на экране резко выпрыгивает из воды.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Рыбка под водой начинает плыть к поверхности.",
      adultScript: "Немедленно дать рыбку / помочь поймать.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Рыбка выпрыгивает из воды и падает обратно — игриво.",
      adultScript: "«Рыбка тебя слышит! Зови её!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Рыбка всплывает и кружится в особом танце.",
      adultScript: "«Рыбка! Ты позвал — она приплыла!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Рыбка прыгает высоко, оставляя радужный след.",
      adultScript: "«Плывёт к тебе! Ты её поймал словом!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["рыбка", "плыви", "дай", "моя", "синяя", "красная", "жёлтая", "ещё", "вот"],
  sensoryTargets: ["visual", "tactile", "proprioceptive"],

  coachingLayer: {
    before:
      "Сиди лицом к ребёнку через пруд. Не сбоку. Лицо к лицу — это основа совместного внимания. Твои глаза важнее всего, что происходит в пруду.",
    primaryStrategy: "OWL",
    duringPrompts: [
      "После поимки — пауза. Смотри на ребёнка, не на рыбку.",
      "Не называй рыбку сразу. Подожди — посмотрит ли он на тебя первым.",
      "Если назвал цвет — расширь: «Синяя — вот она, синяя рыбка!»",
      "Промахнись специально хотя бы раз. Реакция — это коммуникация.",
    ],
    celebrationScript:
      "Любой звук при виде рыбки → «Рыбка! Ты увидел!» Расширяй: «Синяя рыбка, смотри!»",
    reEngagement:
      "Опусти свою удочку в пруд очень медленно, шёпотом: «Где она...» Интрига без давления.",
    closeScript:
      "«Пруд полный. Все рыбки дома. Цапля Ляля рада.» Смотрите вместе на экран. «Пока, рыбки.»",
  },

  emotionalArc: {
    opening:
      "Экран показывает тёмный пустой пруд. «Рыбки в темноте. Надо их позвать.» Первый улов — взрослый, торжественно.",
    build:
      "Каждая рыбка делает пруд ярче. Взрослый иногда «не замечает» рыбку у поверхности — ждёт, когда ребёнок укажет.",
    climax:
      "Последняя рыбка. Самая большая или самая яркая. Взрослый «не может поймать» её — передаёт удочку ребёнку.",
    resolution:
      "Полный пруд. Цапля летит. Вода светится. Тихо сидеть и смотреть вместе.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 4 — SORTING GAME: "Сад волшебных семян"
// ─────────────────────────────────────────────────────────────────────────────

export const magicSeedGarden: HybridMiniGame = {
  id: "magic-seed-garden",
  name: "Сад волшебных семян",
  nameEn: "Magic Seed Garden",
  tagline: "Каждое семечко знает, куда хочет расти.",
  toyCategory: "sorting_game",
  stages: ["first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "teal",

  physicalLayer: {
    setup:
      "Сортировочная доска с 4 цветными ячейками (красная, синяя, жёлтая, зелёная). Фигурки в непрозрачном мешочке у взрослого. Планшет стоит за доской.",
    coreLoop:
      "Взрослый достаёт одну фигурку из мешочка, держит её — ребёнок должен указать на нужную ячейку или назвать цвет. Затем кладёт фигурку. Цифровой сад реагирует.",
    adultRole:
      "Контролирует мешочек. Специально путается с ячейками — ждёт поправки ребёнка. Держит фигурку на уровне глаз ребёнка, давая время её рассмотреть.",
    screenPosition:
      "Планшет за сортировочной доской. Каждая колонка экранного сада соответствует ячейке доски по цвету.",
    props: ["непрозрачный мешочек", "4 маленьких горшочка (по цветам) для финального переноса"],
  },

  digitalScene: {
    idleDescription:
      "Четыре грядки сада: красная, синяя, жёлтая, зелёная. Все пустые, тёмная земля ждёт. Маленький гном с лейкой стоит в центре.",
    ambientAnimation:
      "Гном ходит от грядки к грядке, заглядывает в землю, качает головой — пусто. Бабочки изредка пролетают.",
    palette: ["teal", "sunset"],
    progressUnit:
      "Каждая правильно положенная фигурка даёт рост: из земли появляется росток, потом цветок соответствующего цвета. Гном радостно поливает его.",
    completionState:
      "Все четыре грядки в цветах. Гном прыгает от радости, надевает праздничную шляпу. Цветы качаются на ветру.",
    companion: {
      name: "Гномик Зёрнышко",
      idleBehavior: "Ходит по саду, ковыряет землю лейкой.",
      reactionBehavior: "Бежит к новому ростку и поливает его с широкой улыбкой.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "После правильного размещения фигурки — взрослый нажимает соответствующую цветную кнопку на экране. 4 большие кнопки по цветам сада.",
    childMagicMoment:
      "Ребёнок кладёт фигурку → из земли на экране вырастает росток именно на той грядке. Правильная грядка = правильный цветок.",
    fallback:
      "Если ребёнок положил не туда — не нажимать. Подождать, пока взрослый выскажет удивление, ребёнок поправит. Тогда нажать.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый достаёт фигурку. Держит её высоко, разглядывает. «Красная. Куда красная?» Смотрит на доску, потом на ребёнка. Долгая пауза.",
    owlPause:
      "Фигурка в руке. Взрослый смотрит на ребёнка — не на доску. 5 секунд. Поднятые брови: «Ты знаешь?»",
    childInvitation:
      "Взрослый кладёт фигурку на нейтральную зону между ячейками. Ждёт, пока ребёнок возьмёт и выберет сам.",
    responseScript:
      "Ребёнок указывает или кладёт → «Да! Красная сюда! Сажаем!» — нажать синхронизацию.",
    loopTransition:
      "Цветок вырос → пауза. Оба смотрят на экран. Взрослый тихо: «Растёт...» Новая фигурка.",
  },

  communicationTemptations: [
    {
      type: "silly_mistake",
      setup: "Взрослый начинает класть синюю фигурку в красную ячейку — очень медленно.",
      targetSignal: "Ребёнок говорит «нет», показывает на синюю ячейку, исправляет.",
      responseScript: "«Нет? Сюда? Ты прав — синяя сюда!»",
      digitalReaction: "Гном смотрит на неправильную грядку, трясёт головой.",
    },
    {
      type: "inadequate_portion",
      setup: "Взрослый держит следующую фигурку близко к своей груди — не достаёт для ребёнка.",
      targetSignal: "Ребёнок тянется, смотрит на мешочек, просит ещё.",
      responseScript: "«Ещё? Вот! Какая это?»",
      digitalReaction: "Гном показывает на пустую грядку — «нужно ещё».",
    },
    {
      type: "anticipation_hold",
      setup: "Взрослый держит фигурку над нужной ячейкой — пауза 6 секунд, смотрит на ребёнка.",
      targetSignal: "Ребёнок сигнализирует «клади» жестом или словом.",
      responseScript: "«Туда? Кладём!» — опустить.",
      digitalReaction: "Земля на нужной грядке начинает светиться до касания.",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый убирает мешочек, когда ещё 2 фигурки не рассортированы. «Всё?»",
      targetSignal: "Ребёнок возражает, ищет фигурки, говорит «нет» / «ещё».",
      responseScript: "«Ещё есть? Давай ищем!» — достать мешочек.",
      digitalReaction: "Гном указывает на пустые грядки — явно ждёт.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Земля нужной грядки тепло светится.",
      adultScript: "Передать фигурку сразу.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Росток появляется до того, как фигурка положена — предвкушение.",
      adultScript: "«Ты назвал! Сажаем!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Цветок расцветает быстрее обычного — в один кадр.",
      adultScript: "«Красная! Ты сказал! Смотри, растёт!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Цветок вырастает с сиянием и бабочка садится на него.",
      adultScript: "«Красная — ты её позвал по имени! Вот цветок!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["красный", "синий", "жёлтый", "зелёный", "сюда", "нет", "да", "ещё", "расти"],
  sensoryTargets: ["visual", "tactile"],

  coachingLayer: {
    before:
      "Твои ошибки — лучший инструмент. Положи фигурку не туда — и жди поправки. Коррекция взрослого — это первое активное использование «нет» с целью.",
    primaryStrategy: "SPARK",
    duringPrompts: [
      "Держи мешочек. Не ставь его на стол.",
      "После каждого цветка — пауза. Смотреть на экран вместе.",
      "Специально путайся раз в 3 фигурки.",
      "Если назвал цвет — не повторяй. Кивни и жди действия.",
    ],
    celebrationScript:
      "Цвет назван или указан → «Да! Красная — сюда! Растёт!» Всегда имя цвета + действие.",
    reEngagement:
      "Медленно трясти мешочком рядом с ухом ребёнка. Шёпотом: «Там ещё один...» Не говорить какой.",
    closeScript:
      "«Все грядки в цветах. Гномик Зёрнышко рад. Его сад расцвёл.» Тихо смотреть на экран.",
  },

  emotionalArc: {
    opening: "Пустые грядки. Гном ждёт. «Ни одного цветка. Нужна помощь.» Первая фигурка — взрослый, медленно.",
    build: "Цвет за цветом грядки оживают. Взрослый комментирует только экран: «Смотри, синяя грядка ожила!»",
    climax: "Три грядки готовы, последняя пустая. Взрослый делает особую паузу. «Последняя...» Достаёт фигурку медленно.",
    resolution: "Сад полный. Гном в шляпе. Бабочки летают. Тихо сидеть вместе.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 5 — MEMORY GAME: "Спящий лес"
// ─────────────────────────────────────────────────────────────────────────────

export const sleepingForest: HybridMiniGame = {
  id: "sleeping-forest",
  name: "Спящий лес",
  nameEn: "Sleeping Forest",
  tagline: "Только ты знаешь, кто спит под каждой карточкой.",
  toyCategory: "memory_game",
  stages: ["first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "lavender",

  physicalLayer: {
    setup:
      "6–8 пар карточек с животными, разложены рубашкой вверх. Взрослый и ребёнок сидят рядом (не напротив) — оба смотрят на карточки с одной стороны. Планшет стоит за полем карточек.",
    coreLoop:
      "Взрослый открывает одну карточку — медленно, торжественно. Пауза. Ребёнок открывает вторую. Совпало → животное «просыпается» на экране. Не совпало → «заснуло» снова, взрослый делает «ах!».",
    adultRole:
      "Взрослый нарочно «забывает» карточки — открывает уже известные, промахивается. Это держит ребёнка в позиции знающего. Ребёнок здесь — эксперт.",
    screenPosition: "Планшет прямо за карточками. Лес на экране — продолжение поля.",
    props: ["мягкая ткань для накрывания «спящих» пар (по желанию)"],
  },

  digitalScene: {
    idleDescription:
      "Ночной лес. Деревья с дуплами. В каждом дупле — тёмный силуэт спящего животного. Луна светит мягко.",
    ambientAnimation:
      "Совы дремлют, дупла слабо светятся — кто-то дышит внутри. Листья едва движутся.",
    palette: ["lavender", "pink"],
    progressUnit:
      "Каждая найденная пара — животное «просыпается» в своём дупле: открывает глаза, потягивается, выглядывает наружу. Дупло становится тёплым и светлым.",
    completionState:
      "Все дупла светятся. Животные сидят снаружи на ветках, переговариваются. Лес превращается из ночного в рассветный.",
    companion: {
      name: "Совёнок Луминос",
      idleBehavior: "Спит на главной ветке, периодически приоткрывает один глаз.",
      reactionBehavior: "Открывает оба глаза и хлопает крыльями при каждом совпадении.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "При совпадении пары — взрослый нажимает карточку животного на экране. 8 силуэтов на экране соответствуют парам. Нажать нужное животное = разбудить его.",
    childMagicMoment:
      "Пара найдена — взрослый нажимает — животное просыпается. Ребёнок только что разбудил зверя словом и действием.",
    fallback:
      "Если пара не совпала — нажимать не нужно. Силуэты на экране не реагируют на несовпадения.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый медленно берёт одну карточку. Долгая пауза перед переворотом. Переворачивает — «О! Лиса!» Смотрит на ребёнка. Пауза 3 секунды.",
    owlPause:
      "Карточка открыта. Взрослый смотрит на ребёнка, не на карточку. «Где ещё одна лиса?» — тихо. Пауза. Ждёт жеста или взгляда ребёнка.",
    childInvitation:
      "Взрослый мягко указывает на всё поле карточек жестом: «Твоя очередь». Не говорит, какую брать.",
    responseScript:
      "Ребёнок берёт карточку → «Смотрим!» Не предугадывать. Дать открыть самому.",
    loopTransition:
      "Совпало → оба смотрят на экран. Пауза. «Проснулся!» Несовпало → «Ах, спит ещё...» и перевернуть обратно неспешно.",
  },

  communicationTemptations: [
    {
      type: "silly_mistake",
      setup: "Взрослый открывает карточку, которую только что перевернул обратно — «забыл».",
      targetSignal: "Ребёнок поправляет, показывает на другую карточку, говорит «нет, там».",
      responseScript: "«Там? Ты помнишь! Умница!» — перевернуть ту карточку.",
      digitalReaction: "Совёнок Луминос смотрит на взрослого укоризненно.",
    },
    {
      type: "anticipation_hold",
      setup: "Взрослый кладёт пальцы на карточку — и замирает. Смотрит на ребёнка: «Ты готов?»",
      targetSignal: "Ребёнок кивает, вокализирует «да», смотрит с ожиданием.",
      responseScript: "«Открываем!» — перевернуть вместе.",
      digitalReaction: "Дупло слабо вспыхивает до переворота карточки.",
    },
    {
      type: "sabotage",
      setup:
        "Взрослый «случайно» накрывает ладонью только что открытую карточку, смотрит мечтательно.",
      targetSignal: "Ребёнок убирает руку взрослого или вокализирует протест.",
      responseScript: "«Ой, закрыл! Покажи мне снова!»",
      digitalReaction: "Силуэт животного смотрит в сторону — «где карточка?»",
    },
    {
      type: "inadequate_portion",
      setup: "Взрослый забирает оба хода подряд, делая вид, что не замечает этого.",
      targetSignal: "Ребёнок говорит «моя», «я», тянется к карточкам.",
      responseScript: "«Твоя очередь! Прости!» — жестом отдать ход.",
      digitalReaction: "Совёнок указывает крылом на ребёнка: «Его очередь!»",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Силуэт нужного животного чуть ярче обычного — намёк.",
      adultScript: "Не комментировать. Дать сигнал пройти в действие.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Дупло мерцает теплее.",
      adultScript: "«Ты слышишь? Там кто-то!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Животное приоткрывает глаза — полупросыпается.",
      adultScript: "«Лиса! Ты её позвал!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Животное просыпается — без совпадения карточек. Один зов = пробуждение.",
      adultScript: "«Ты её позвал по имени — она проснулась!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["лиса", "медведь", "сова", "ёж", "вот", "там", "нашёл", "нет", "снова", "спит"],
  sensoryTargets: ["visual", "tactile"],

  coachingLayer: {
    before:
      "Сядь РЯДОМ с ребёнком — не напротив. Вы оба эксперты. Ты — притворяющийся. Он — настоящий.",
    primaryStrategy: "OWL",
    duringPrompts: [
      "Специально промахивайся раз в три хода.",
      "После каждого переворота — пауза 3 секунды. Не говори сразу.",
      "Когда ребёнок ищет пару — не подсказывай взглядом.",
      "Несовпадение — не драма. «Ах!» — и спокойно перевернуть.",
    ],
    celebrationScript:
      "Совпадение + любой звук → «Нашёл! Лиса проснулась!» Имя животного + «проснулась» — всегда.",
    reEngagement:
      "Взять одну карточку, держать рубашкой вверх и медленно тянуть к себе — шёпотом «кто же там...» Пробуждает любопытство.",
    closeScript:
      "«Все звери проснулись. Лес ожил. Совёнок Луминос рад.» Смотреть на рассветный экран молча.",
  },

  emotionalArc: {
    opening:
      "Ночной экран, все дупла тёмные. «Все спят. Тихо-тихо.» Первый переворот — шёпотом.",
    build:
      "Каждое пробуждение добавляет свет и звук в лес. Взрослый нарочно несколько раз промахивается — ребёнок чувствует себя умнее.",
    climax:
      "Последняя пара. Взрослый «не помнит» — долго думает. Смотрит на ребёнка: «Ты знаешь?»",
    resolution:
      "Рассветный лес. Все животные на ветках. Совёнок хлопает крыльями. Тихо сидеть вместе.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 6 — THREADING TOY: "Нить созвездий"
// ─────────────────────────────────────────────────────────────────────────────

export const constellationThread: HybridMiniGame = {
  id: "constellation-thread",
  name: "Нить созвездий",
  nameEn: "Constellation Thread",
  tagline: "Каждая бусина зажигает звезду в нашем небе.",
  toyCategory: "threading_toy",
  stages: ["first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "lavender",

  physicalLayer: {
    setup:
      "Крупные деревянные бусины в баночке. Нитка с деревянной иглой. Взрослый контролирует баночку. Экран стоит за рабочей поверхностью.",
    coreLoop:
      "Взрослый достаёт одну бусину из баночки, держит её на ладони. Ребёнок берёт бусину и нанизывает. Взрослый нажимает цвет на экране. Звезда появляется.",
    adultRole:
      "Держит баночку. Контролирует, какую бусину достаёт и когда. Иногда достаёт «не ту» — ждёт поправки ребёнка.",
    screenPosition:
      "Планшет стоит за нитью — ребёнок смотрит сквозь нанизываемые бусины на созвездие на экране.",
    props: ["маленькая баночка с крышкой для бусин", "2 иглы"],
  },

  digitalScene: {
    idleDescription:
      "Тёмное ночное небо. Контуры созвездий едва видны — пунктиром. Мотылёк летает между точками.",
    ambientAnimation:
      "Мотылёк-звёздочник медленно летит от точки к точке. Незажжённые звёзды едва мерцают.",
    palette: ["lavender", "pink"],
    progressUnit:
      "Каждая нанизанная бусина зажигает одну звезду соответствующего цвета. Когда 3 звезды одного созвездия зажжены — появляется линия, связывающая их: фигура проявляется.",
    completionState:
      "Все созвездия проявились. Небо полно. Мотылёк делает прощальный круг — и садится на самую яркую звезду.",
    companion: {
      name: "Мотылёк Мира",
      idleBehavior: "Летит по пунктиру созвездия, которое ближе всего к завершению.",
      reactionBehavior: "Кружится вокруг только что зажжённой звезды, оставляя световой след.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "Когда бусина нанизана — взрослый нажимает соответствующий цвет в палитре из 6 кнопок (красный, синий, жёлтый, зелёный, белый, фиолетовый).",
    childMagicMoment:
      "Бусина на нитке — и одновременно звезда того же цвета загорается на небе. Нитка в руках ребёнка = нить созвездия.",
    fallback:
      "Если нанизывание заняло много времени — нажать кнопку всё равно. Ребёнок увидит результат своего усилия.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый достаёт бусину из баночки. Кладёт на стол перед ребёнком — не отдаёт в руку. «Вот.» Пауза. Смотрит на небо.",
    owlPause:
      "Баночка в руке. Взрослый смотрит на ребёнка — не на бусины. 5 секунд. Рука на баночке — готов достать следующую.",
    childInvitation:
      "Бусина лежит на столе. Взрослый не указывает на нитку. Ждёт, пока ребёнок возьмёт сам и начнёт нанизывать.",
    responseScript:
      "Бусина нанизана → нажать экран. «Звезда! Горит!» — вместе посмотреть.",
    loopTransition:
      "Звезда зажглась → пауза. Оба смотрят на небо. «Какая следующая?» — взрослый приоткрывает баночку.",
  },

  communicationTemptations: [
    {
      type: "inadequate_portion",
      setup: "Взрослый нарочно достаёт бусину и сам начинает нанизывать, пока ребёнок смотрит.",
      targetSignal: "Ребёнок хочет нанизывать сам — говорит «я», тянется.",
      responseScript: "«Ты! Прости! Твоя очередь.»",
      digitalReaction: "Мотылёк Мира указывает крылом на ребёнка.",
    },
    {
      type: "silly_mistake",
      setup: "Взрослый берёт бусину не того цвета, чем следовало бы по паттерну.",
      targetSignal: "Ребёнок указывает на правильный цвет или говорит его.",
      responseScript: "«Синяя? Ты прав! Вот синяя!»",
      digitalReaction: "Мотылёк летит к незажжённой синей звезде — подсказка.",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый закрывает баночку с бусинами крышкой в середине игры. «Всё?»",
      targetSignal: "Ребёнок говорит «нет», «ещё», показывает на небо.",
      responseScript: "«Ещё есть! Смотри, звёзды ждут.» — открыть баночку.",
      digitalReaction: "Незажжённые звёзды начинают мерцать интенсивнее.",
    },
    {
      type: "anticipation_hold",
      setup:
        "Взрослый держит бусину у отверстия иглы — не нанизывает. Медленно подносит, останавливается.",
      targetSignal: "Ребёнок вокализирует нетерпение, говорит «давай», «туда».",
      responseScript: "«Туда! Нанизываем!»",
      digitalReaction: "Нужная звезда вспыхивает — как будто ждёт.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Ближайшая незажжённая звезда мягко пульсирует.",
      adultScript: "Дать бусину немедленно.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Мотылёк летит к нужной звезде и садится на неё.",
      adultScript: "«Мотылёк тебя услышал!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Звезда вспыхивает до нанизывания бусины.",
      adultScript: "«Синяя — звезда зажглась! Ты её назвал!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Звезда зажигается с кометным хвостом — яркая дуга по небу.",
      adultScript: "«Синяя! Громко! Комета!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["синяя", "красная", "жёлтая", "нитка", "бусина", "звезда", "туда", "ещё", "готово"],
  sensoryTargets: ["visual", "tactile", "proprioceptive"],

  coachingLayer: {
    before:
      "Мелкая моторика трудна — не подгоняй. Попытка нанизать без успеха — тоже достижение. Терпение взрослого здесь важнее любого навыка.",
    primaryStrategy: "4S",
    duringPrompts: [
      "Один цвет — одно слово. «Синяя.» Всё.",
      "Не помогай нанизывать, если не просит.",
      "Пауза после каждой звезды — смотреть на небо вместе.",
      "Баночку держи — не клади на стол.",
    ],
    celebrationScript:
      "Цвет назван → «Да! Синяя звезда!» Бусина нанизана → нажать экран + «Горит!»",
    reEngagement:
      "Тихонько встряхнуть баночку рядом с ухом ребёнка. Загадочно. Не говорить ничего.",
    closeScript:
      "«Небо полное. Мотылёк нашёл дом. Ты зажёг эти звёзды.» Смотреть на экран тихо.",
  },

  emotionalArc: {
    opening:
      "Тёмное небо. Пунктиры созвездий. «Звёзды не горят. Мотылёк ищет путь.» Первая бусина — взрослый, медленно.",
    build:
      "Когда первое созвездие проявляется — фигура — это особый момент: «Смотри — медведь!» Называть фигуры, не буквы.",
    climax:
      "Последняя звезда. Взрослый предлагает ребёнку нанизать её самому. Долгая пауза перед тем, как дать бусину.",
    resolution:
      "Полное небо. Мотылёк садится. Тихо смотреть вместе. Никаких слов.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 7 — LOTTO GAME: "Зов деревни"
// ─────────────────────────────────────────────────────────────────────────────

export const villageCall: HybridMiniGame = {
  id: "village-call",
  name: "Зов деревни",
  nameEn: "Village Call",
  tagline: "Позови — и он придёт домой.",
  toyCategory: "lotto_game",
  stages: ["communicator", "first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "sunset",

  physicalLayer: {
    setup:
      "Лото с животными: у каждого игрока поле 3×3. Карточки перевёрнуты в общей стопке. Взрослый тянет карточки — по одной. Ребёнок смотрит на своё поле.",
    coreLoop:
      "Взрослый медленно достаёт карточку из стопки. Держит лицом к ребёнку. Пауза. Ребёнок называет или показывает, есть ли у него этот зверь. Жетон кладётся на поле. Зверь «приходит домой» на экране.",
    adultRole:
      "Взрослый не просто вытаскивает карточки — он «читает» их с удивлением. «О! Кто это?» — и ждёт ответа ребёнка. Специально медленно.",
    screenPosition:
      "Планшет за полями лото. Деревня на экране — «дом» для всех животных.",
    props: ["два лото-поля (взрослый + ребёнок)", "стопка карточек"],
  },

  digitalScene: {
    idleDescription:
      "Уютная деревня с пустыми домиками. У каждого домика — силуэт жителя. Все ушли и ещё не вернулись.",
    ambientAnimation:
      "Дымок из труб, занавески шевелятся. Но животных нет — только следы у домиков.",
    palette: ["sunset", "teal"],
    progressUnit:
      "Каждое животное, чьё имя произнесено или его жетон положен, «входит» в свой домик: идёт через улицу, останавливается у двери, машет — и заходит. Окно загорается.",
    completionState:
      "Все домики светятся. Деревня полна. Животные выглядывают из окон. Петух поёт.",
    companion: {
      name: "Петя-петух",
      idleBehavior: "Ходит по улице деревни, заглядывает в тёмные окна.",
      reactionBehavior: "Хлопает крыльями и кукарекает при каждом возвращении жителя.",
    },
  },

  syncBridge: {
    method: "manual_confirm",
    parentAction:
      "Когда жетон положен на поле ребёнка — взрослый нажимает изображение этого животного на экране-деревне. Животное «отправляется домой».",
    childMagicMoment:
      "Ребёнок накрывает квадратик на своём поле — и видит, как его зверь идёт по деревне. Его карточка ожила.",
    fallback:
      "Если карточка взрослого, а не ребёнка — нажать всё равно. Деревня пополняется с каждого хода.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый достаёт карточку — держит её перед собой. «О! Кто это?» — смотрит на ребёнка. Пауза 4 секунды.",
    owlPause:
      "Карточка видна ребёнку, но взрослый смотрит на ребёнка — ждёт его реакции первой. Не называет сам.",
    childInvitation:
      "Взрослый кладёт карточку на стол — лицом вверх, между игроками. Ждёт, кто потянется или назовёт.",
    responseScript:
      "Ребёнок называет или показывает на своё поле → «Да! Ты! Кладём!» — помочь положить жетон, нажать экран.",
    loopTransition:
      "Жетон положен → смотреть на экран, как зверь идёт домой. Пауза. Новая карточка.",
  },

  communicationTemptations: [
    {
      type: "silly_mistake",
      setup: "Взрослый начинает класть жетон на чужое поле.",
      targetSignal: "Ребёнок говорит «нет», «моя», указывает на своё поле.",
      responseScript: "«Твоё! Прости! Сюда!»",
      digitalReaction: "Петя-петух указывает клювом на правильный домик.",
    },
    {
      type: "anticipation_hold",
      setup: "Взрослый держит карточку рубашкой вверх — долгая пауза. «Кто там? Угадай...»",
      targetSignal: "Ребёнок называет животное или вокализирует ожидание.",
      responseScript: "«Смотрим!» — перевернуть карточку торжественно.",
      digitalReaction: "Нужный домик в деревне тускло светится — словно хозяин близко.",
    },
    {
      type: "inadequate_portion",
      setup: "Взрослый кладёт жетон на своё поле, когда животное явно у ребёнка.",
      targetSignal: "Ребёнок возражает, показывает на своё поле.",
      responseScript: "«Твоя! Ты прав! Сюда!»",
      digitalReaction: "Зверь разворачивается и идёт к дому ребёнка.",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый переворачивает всю стопку рубашкой вверх. «Ой, перепутал!»",
      targetSignal: "Ребёнок помогает перевернуть, говорит «нет», «так неправильно».",
      responseScript: "«Ты прав! Спасибо, помог!»",
      digitalReaction: "Петя-петух прячется за дом — смущённо.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Нужный домик начинает светиться.",
      adultScript: "Помочь положить жетон немедленно.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Животное появляется на краю деревни — готово идти.",
      adultScript: "«Ты позвал! Он идёт!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Животное быстро идёт к домику.",
      adultScript: "«Кот! Ты позвал кота! Домой!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Животное бежит к домику и прыгает от радости перед входом.",
      adultScript: "«Кот! Слышит тебя! Бежит!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["кот", "собака", "петух", "корова", "овца", "мой", "туда", "домой", "вот", "нет"],
  sensoryTargets: ["visual", "tactile"],

  coachingLayer: {
    before:
      "Твоя роль — создавать паузу перед ответом. Не называй животное первым. Подними карточку — и жди. Пусть ребёнок идентифицирует.",
    primaryStrategy: "OWL",
    duringPrompts: [
      "Держи карточку на виду, но не называй.",
      "Когда кладёшь жетон — смотри на ребёнка, не на поле.",
      "Специально ошибись раз в игру — это золото.",
      "Петух кукарекует → тихо повтори звук вместе с ребёнком.",
    ],
    celebrationScript:
      "Животное названо → «Да! [Имя]! Домой! Смотри — идёт!» Всегда имя + «домой».",
    reEngagement:
      "Медленно, загадочно взять карточку двумя пальцами. Шёпот: «Кто там...» Интрига без требования.",
    closeScript:
      "«Деревня полная. Все дома. Петя рад.» Тихо смотреть на светящиеся окна.",
  },

  emotionalArc: {
    opening:
      "Пустая деревня. «Все ушли. Петя ждёт.» Первая карточка — взрослый, с удивлением: «О! Кто?»",
    build:
      "Деревня постепенно наполняется. Взрослый всё чаще «забывает» животное — ждёт подсказки ребёнка.",
    climax:
      "Предпоследняя карточка. Взрослый переворачивает её и замирает — долгая пауза. Смотрит на ребёнка: «Твой?»",
    resolution:
      "Все окна светятся. Петух поёт. Тихо смотреть на деревню. Взрослый тихо: «Все дома.»",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 8 — LOCK AND KEY: "Тайный сад"
// ─────────────────────────────────────────────────────────────────────────────

export const secretGarden: HybridMiniGame = {
  id: "secret-garden",
  name: "Тайный сад",
  nameEn: "Secret Garden",
  tagline: "За каждой дверью — живой уголок, который ждёт.",
  toyCategory: "lock_key_toy",
  stages: ["communicator", "first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "teal",

  physicalLayer: {
    setup:
      "Набор замков и ключей (4–6 пар). Замки разложены на столе. Ключи у взрослого на кольце. Планшет стоит за замками.",
    coreLoop:
      "Взрослый медленно снимает ключ с кольца — держит. Ребёнок сигнализирует, что хочет его. Взрослый отдаёт. Ребёнок подбирает к нужному замку. Клик — на экране открывается уголок сада.",
    adultRole:
      "Контролирует кольцо с ключами. Специально даёт явно «не тот» ключ — ждёт поправки. Не называет ключи первым.",
    screenPosition:
      "Планшет прямо за линией замков. Каждый замок на столе имеет соответствующую дверь на экране.",
    props: ["кольцо для ключей", "маленькая корзинка для открытых замков"],
  },

  digitalScene: {
    idleDescription:
      "Каменная стена с 5 запертыми деревянными дверьми. За стеной угадываются силуэты деревьев. Гномик-садовник стоит у ворот.",
    ambientAnimation:
      "Из-за стены слышатся тихие звуки: птица поёт, лист шуршит. Гномик прикладывает ухо к двери.",
    palette: ["teal", "lavender"],
    progressUnit:
      "Каждый открытый замок распахивает свою дверь: за ней — живой уголок. Первая дверь — цветочная поляна. Вторая — ручей с лягушками. Третья — дерево с гнёздами. Четвёртая — грибная рощица. Пятая — всё вместе.",
    completionState:
      "Все двери открыты. Стена исчезает. Сад виден целиком. Гномик бежит внутрь и кружится.",
    companion: {
      name: "Гномик Ключик",
      idleBehavior: "Ходит вдоль дверей, трогает замки. Вздыхает.",
      reactionBehavior: "Прыгает и хлопает, когда дверь открывается.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "Замок открыт — взрослый нажимает соответствующую дверь на экране. 5 дверей, пронумерованы по цвету замка.",
    childMagicMoment:
      "Замок клацает в руках ребёнка — и тут же дверь на экране распахивается. Физический щелчок = магический момент.",
    fallback:
      "Если замок трудный — взрослый помогает, но нажимает экран только когда ребёнок держит замок в момент открытия.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый медленно снимает один ключ с кольца. Поднимает его. «Какой цвет?» — смотрит на ребёнка. Пауза 5 секунд.",
    owlPause:
      "Ключ на ладони взрослого, вытянутой к ребёнку. Взрослый смотрит на ребёнка. Не двигается. 5 секунд.",
    childInvitation:
      "Взрослый кладёт ключ на стол перед ребёнком — между замками. Ждёт, какой замок ребёнок выберет.",
    responseScript:
      "Ребёнок берёт ключ и пробует замок → «Пробуй! Найди!» При клике — нажать экран.",
    loopTransition:
      "Дверь открылась → оба смотрят на уголок сада. Пауза. «Что там?» — без ответа, просто смотреть.",
  },

  communicationTemptations: [
    {
      type: "sabotage",
      setup: "Взрослый намеренно даёт ключ, который явно не подходит ни к одному замку.",
      targetSignal: "Ребёнок говорит «нет», «другой», тянется к кольцу.",
      responseScript: "«Не тот? Какой нужен? Покажи.»",
      digitalReaction: "Гномик Ключик смотрит на ключ и качает головой.",
    },
    {
      type: "anticipation_hold",
      setup:
        "Взрослый вставил ключ в замок, но не поворачивает — замер. Смотрит на ребёнка с широкими глазами.",
      targetSignal: "Ребёнок говорит «открой», «давай», помогает рукой повернуть.",
      responseScript: "«Вместе! Поворачиваем!» — открыть вместе.",
      digitalReaction: "Дверь начинает медленно открываться — до того, как замок щёлкнул.",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый кладёт кольцо с ключами в карман. «Всё готово?»",
      targetSignal: "Ребёнок говорит «нет», смотрит на закрытые замки, тянется к карману.",
      responseScript: "«Ещё есть! Смотри — двери закрыты!»",
      digitalReaction: "Закрытые двери начинают светиться — «мы ещё здесь».",
    },
    {
      type: "inadequate_portion",
      setup: "Взрослый даёт ключ, но не отпускает — держит двумя пальцами.",
      targetSignal: "Ребёнок тянет ключ, говорит «дай», смотрит на взрослого.",
      responseScript: "«Твой! Открывай!» — отпустить.",
      digitalReaction: "Соответствующая дверь тихонько скрипит — открыться хочет.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Нужная дверь чуть приоткрывается — щель с тёплым светом.",
      adultScript: "Дать ключ немедленно.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Из щели выглядывает лепесток цветка или лягушачья лапка.",
      adultScript: "«Кто-то там! Открывай скорее!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Дверь открывается на треть сама — без нажатия.",
      adultScript: "«Открывается! Ты сказал — услышала!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Дверь распахивается полностью сама — уголок виден целиком без нажатия.",
      adultScript: "«Открылась! Сама! Ты позвал!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["открой", "ключ", "дай", "нет", "да", "вот", "клик", "помоги", "смотри", "там"],
  sensoryTargets: ["tactile", "auditory", "visual"],

  coachingLayer: {
    before:
      "«Помоги» — это первое функциональное слово для многих детей. Эта игра специально создаёт моменты, когда «помоги» — это лучший выход. Не решай за ребёнка — создавай ситуацию.",
    primaryStrategy: "SPARK",
    duringPrompts: [
      "Держи кольцо с ключами — не клади на стол.",
      "Давай «неправильный» ключ раз в два хода.",
      "После каждой двери — пауза. Смотреть, что за ней.",
      "Если ребёнок застрял — «нужна помощь?» — один раз, без повторов.",
    ],
    celebrationScript:
      "Замок открыт + любой звук → «Клик! Открылось! Смотри — сад!»",
    reEngagement:
      "Взять самый красивый ключ, покрутить в руках, смотреть на него задумчиво. Шёпот: «Интересно, что за этой дверью...»",
    closeScript:
      "«Все двери открыты. Гномик Ключик нашёл свой сад.» Смотреть на полный сад на экране тихо.",
  },

  emotionalArc: {
    opening:
      "Каменная стена. Звуки сада, но не видно. «Слышишь? Там кто-то есть. Нужно открыть.»",
    build:
      "Каждая дверь добавляет звук и жизнь. Взрослый специально удивляется каждому уголку: «Лягушки! Смотри!»",
    climax:
      "Последняя дверь — самая большая. Взрослый делает особо долгую паузу перед последним ключом. «Главная дверь...»",
    resolution:
      "Стена исчезает. Сад полностью. Гномик кружится. Тихо сидеть вместе — ничего не делать.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GAME 9 — MATCHING GAME: "Тени лесного танца"
// ─────────────────────────────────────────────────────────────────────────────

export const shadowForestDance: HybridMiniGame = {
  id: "shadow-forest-dance",
  name: "Тени лесного танца",
  nameEn: "Shadow Forest Dance",
  tagline: "Найди тень — и она оживёт.",
  toyCategory: "matching_game",
  stages: ["first_words", "combiner"],
  duration: "5–8 мин",
  themeColor: "pink",

  physicalLayer: {
    setup:
      "Набор для сопоставления: предметные карточки (цветные) + теневые карточки (силуэты). Цветные у взрослого, теневые разложены перед ребёнком. Планшет за карточками.",
    coreLoop:
      "Взрослый показывает одну цветную карточку. Ребёнок ищет соответствующую тень среди своих карточек. Пара найдена → обе карточки положить рядом. Тень на экране оживает.",
    adultRole:
      "Взрослый не ищет — показывает. Он рассматривает карточку, разговаривает с ней: «Кто это? Лиса! Где твоя тень?» — и ждёт, пока ребёнок найдёт.",
    screenPosition:
      "Планшет за полем теневых карточек. Тени на экране — продолжение карточек на столе.",
    props: ["небольшой фонарик-игрушка (для «бросать тень» как введение в тему)"],
  },

  digitalScene: {
    idleDescription:
      "Вечерний лес с силуэтами деревьев. На поляне — тени без хозяев: движущиеся, но пустые. Лисица-проводница смотрит на тени.",
    ambientAnimation:
      "Тени на экране медленно движутся без хозяев — одиноко. Лисица грустно качает головой.",
    palette: ["pink", "lavender"],
    progressUnit:
      "Каждая найденная пара — тень на экране «наполняется»: цветной оригинал влетает в тень, и тень оживает, начинает танцевать в такт тихой музыке.",
    completionState:
      "Все тени живые, все танцуют. Лес полон движения. Лисица присоединяется к танцу.",
    companion: {
      name: "Лисица Риа",
      idleBehavior: "Смотрит на пустые тени, иногда трогает их лапой.",
      reactionBehavior: "Кружится вокруг каждой ожившей тени.",
    },
  },

  syncBridge: {
    method: "parent_tap",
    parentAction:
      "Пара сопоставлена — взрослый нажимает соответствующую тень на экране. Тень наполняется и танцует.",
    childMagicMoment:
      "Ребёнок кладёт карточки рядом — и его тень на экране оживает. Он «вернул» тени её хозяина.",
    fallback:
      "Если ребёнок поставил неправильную пару — не нажимать. Лисица на экране смотрит с сомнением. Подождать, пока исправит.",
  },

  turnExchange: {
    adultTurn:
      "Взрослый берёт одну цветную карточку. Рассматривает её с преувеличенным интересом. «О! Кто это?» — смотрит на ребёнка. Пауза.",
    owlPause:
      "Карточка видна ребёнку. Взрослый смотрит на ребёнка — ждёт, что скажет. 5 секунд.",
    childInvitation:
      "Взрослый кладёт цветную карточку в поле теневых карточек ребёнка. «Где её тень?» — жест на поле. Ждёт.",
    responseScript:
      "Ребёнок кладёт тень рядом → «Нашёл! Вот она!» — нажать экран.",
    loopTransition:
      "Тень ожила → оба смотрят, как она танцует. «Танцует!» Новая карточка.",
  },

  communicationTemptations: [
    {
      type: "silly_mistake",
      setup: "Взрослый намеренно кладёт цветную карточку рядом с явно неправильной тенью.",
      targetSignal: "Ребёнок говорит «нет», указывает на правильную тень.",
      responseScript: "«Нет? Вот эта? Ты прав!»",
      digitalReaction: "Лисица смотрит на неправильную тень, трясёт головой.",
    },
    {
      type: "anticipation_hold",
      setup: "Взрослый держит цветную карточку, глядя на поле теней — медленно водит ею над полем.",
      targetSignal: "Ребёнок указывает на правильную тень, говорит «туда», «вот».",
      responseScript: "«Туда! Ты знаешь! Кладём!»",
      digitalReaction: "Правильная тень начинает светиться в предвкушении.",
    },
    {
      type: "inadequate_portion",
      setup: "Взрослый забирает последнюю цветную карточку обратно в стопку. «Ой, пропустил!»",
      targetSignal: "Ребёнок возражает, показывает на незаконченную тень на экране.",
      responseScript: "«Ты прав! Смотри — она ещё не танцует!» — достать карточку.",
      digitalReaction: "Оставшаяся тень стоит неподвижно на экране — ждёт.",
    },
    {
      type: "unexpected_disappearance",
      setup: "Взрослый переворачивает стопку цветных карточек рубашкой вверх. «Где они?»",
      targetSignal: "Ребёнок помогает искать, переворачивает карточки, вокализирует.",
      responseScript: "«Нашёл! Молодец, помог!»",
      digitalReaction: "Лисица на экране ищет карточки, заглядывая под воображаемые листья.",
    },
  ],

  interactionRewards: [
    {
      trigger: "any_signal",
      digitalEffect: "Правильная тень слабо светится — «здесь».",
      adultScript: "Дать посмотреть на поле спокойно — не подсказывать.",
      tone: "quiet_warmth",
    },
    {
      trigger: "vocalization",
      digitalEffect: "Тень начинает медленно двигаться — оживать.",
      adultScript: "«Ты её позвал! Смотри — шевелится!»",
      tone: "shared_delight",
    },
    {
      trigger: "word_approximation",
      digitalEffect: "Тень наполовину наполняется цветом.",
      adultScript: "«Лиса! Ты сказал — она слышит!»",
      tone: "magical_surprise",
    },
    {
      trigger: "clear_word",
      digitalEffect: "Тень наполняется и сразу начинает танцевать — без нажатия.",
      adultScript: "«Лиса! Она сама пришла! Ты её позвал!»",
      tone: "magical_surprise",
    },
  ],

  speechTargets: ["лиса", "медведь", "ёж", "тень", "вот", "туда", "нашёл", "смотри", "танцует", "нет"],
  sensoryTargets: ["visual", "tactile"],

  coachingLayer: {
    before:
      "Твоя задача — создавать вопросы, не давать ответы. «Кто это?» — и ждать. Ребёнок знает животных. Твоя роль — создать пространство, где это знание нужно.",
    primaryStrategy: "OWL",
    duringPrompts: [
      "После «Кто это?» — жди 5 секунд перед любым дополнением.",
      "Специально ошибись раз в три хода.",
      "После каждой пары — смотреть на танцующую тень вместе, молча.",
      "Если ребёнок назвал животное — повтори его слово + расширь: «Лиса! Да, рыжая лиса!»",
    ],
    celebrationScript:
      "Пара найдена + любой звук → «Нашёл! Тень ожила! Смотри — танцует!»",
    reEngagement:
      "Медленно взять цветную карточку двумя руками, смотреть на неё долго. «Кто же это...» — загадочно. Не отдавать. Ждать.",
    closeScript:
      "«Все тени живые. Лисица рада. Лес танцует.» Тихо смотреть на полный танцующий лес.",
  },

  emotionalArc: {
    opening:
      "Пустые тени на экране. «Тени ждут своих хозяев. Им грустно одним.» Первая карточка — взрослый, с удивлением.",
    build:
      "Каждая ожившая тень добавляет движение и музыку. Взрослый иногда «не знает» животное — спрашивает у ребёнка.",
    climax:
      "Последняя тень — самая большая. Взрослый делает особо долгую паузу. «Последняя... Кто же там?»",
    resolution:
      "Все тени танцуют. Лисица кружится. Вечерний лес живой. Тихо смотреть вместе.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// INDEX AND UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_HYBRID_GAMES: HybridMiniGame[] = [
  thunderMountain,
  cloudCastle,
  rainbowPond,
  magicSeedGarden,
  sleepingForest,
  constellationThread,
  villageCall,
  secretGarden,
  shadowForestDance,
];

export function getGamesByStage(stage: CommunicationStage): HybridMiniGame[] {
  return ALL_HYBRID_GAMES.filter((g) => g.stages.includes(stage));
}

export function getGamesByToy(category: ToyCategory): HybridMiniGame | undefined {
  return ALL_HYBRID_GAMES.find((g) => g.toyCategory === category);
}

export function getGamesByTheme(color: ThemeColor): HybridMiniGame[] {
  return ALL_HYBRID_GAMES.filter((g) => g.themeColor === color);
}

export function getGamesByStrategy(
  strategy: "OWL" | "4S" | "ROCK" | "SPARK",
): HybridMiniGame[] {
  return ALL_HYBRID_GAMES.filter((g) => g.coachingLayer.primaryStrategy === strategy);
}
