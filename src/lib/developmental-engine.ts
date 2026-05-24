/**
 * Developmental Communication Engine
 *
 * Models the full Hanen communication pathway from pre-intentional signaling
 * to early phrase production. Given a child's observed milestone profile,
 * the engine computes an exact developmental position and generates:
 *
 *   → how the adult should speak (phrase length, complexity, timing)
 *   → how the adult should interact (role, control balance, physical position)
 *   → what activities to use (filtered by attention, demand, sensory match)
 *   → live scripts (OWL cues, wait cues, expansions, celebration lines)
 *   → what to watch for next (the nearest transition target)
 *
 * The pathway is multidimensional. A child does not have one "stage" —
 * they have a profile across seven developmental axes. The engine tracks all seven.
 */

import type { CommunicationStage, SensoryChannel } from "./therapy-mechanics";
import type { ToyCategory } from "./hybrid-mini-games";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — DEVELOPMENTAL PATHWAY NODES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * The seven axes of the developmental pathway.
 * A child's true position is a vector across all seven — not a single stage.
 */
export type PathwayAxis =
  | "joint_attention"
  | "communication_functions"
  | "vocalization"
  | "sound_imitation"
  | "first_words"
  | "word_combinations"
  | "phrases";

// ─── Axis 1: Joint Attention ──────────────────────────────────────────────────

export type JointAttentionLevel =
  | "ja0_no_response"          // does not orient to social stimuli
  | "ja1_social_response"      // responds to name, face, voice — but doesn't initiate
  | "ja2_follows_point"        // follows adult's gaze or pointing gesture
  | "ja3_gaze_shift"           // child initiates gaze from toy to adult face
  | "ja4_triangle"             // gaze triangle: toy → adult → toy, with shared affect
  | "ja5_sustained"            // maintains shared focus >30 seconds
  | "ja6_distal_point";        // points across space to share interest

export const JointAttentionLevels: JointAttentionLevel[] = [
  "ja0_no_response", "ja1_social_response", "ja2_follows_point",
  "ja3_gaze_shift", "ja4_triangle", "ja5_sustained", "ja6_distal_point",
];

export const JointAttentionDescriptions: Record<JointAttentionLevel, string> = {
  ja0_no_response:    "Не ориентируется на социальные стимулы. Внимание полностью внутреннее.",
  ja1_social_response:"Откликается на имя, голос, лицо. Но ждёт — не ищет.",
  ja2_follows_point:  "Следует за взглядом или жестом взрослого к третьему объекту.",
  ja3_gaze_shift:     "Переводит взгляд от игрушки к лицу взрослого — проверяет реакцию.",
  ja4_triangle:       "Треугольник внимания: игрушка → взрослый → игрушка. Есть аффективный обмен.",
  ja5_sustained:      "Удерживает совместное внимание дольше 30 секунд в разных контекстах.",
  ja6_distal_point:   "Указывает на удалённые объекты, чтобы поделиться интересом.",
};

// ─── Axis 2: Communication Functions ─────────────────────────────────────────

export type CommunicationFunctionLevel =
  | "cf0_none"                 // no communicative acts observed
  | "cf1_rejection"            // pushes away, turns head (earliest function)
  | "cf2_reach_adult"          // reaches toward adult (requests action)
  | "cf3_reach_object"         // reaches toward desired object (requests object)
  | "cf4_give_show"            // gives or holds up object to share (comment + request)
  | "cf5_proto_imperative"     // points to request an object or action
  | "cf6_proto_declarative"    // points to share interest (not to get — to connect)
  | "cf7_repair"               // repeats or changes signal if first attempt ignored
  | "cf8_verbal_request";      // uses word or approximation to communicate function

export const CommunicationFunctionDescriptions: Record<CommunicationFunctionLevel, string> = {
  cf0_none:           "Никаких коммуникативных актов не наблюдается.",
  cf1_rejection:      "Отталкивает, отворачивается — первая функция отказа.",
  cf2_reach_adult:    "Тянется к взрослому — просит действие (подними, дай).",
  cf3_reach_object:   "Тянется к объекту — запрашивает вещь.",
  cf4_give_show:      "Даёт или поднимает объект, чтобы поделиться вниманием.",
  cf5_proto_imperative:"Указывает, чтобы получить объект или действие.",
  cf6_proto_declarative:"Указывает, чтобы поделиться интересом — не чтобы получить.",
  cf7_repair:         "Повторяет или меняет сигнал, если первую попытку проигнорировали.",
  cf8_verbal_request: "Использует слово или приближение для выражения коммуникативной функции.",
};

// ─── Axis 3: Vocalization ─────────────────────────────────────────────────────

export type VocalizationLevel =
  | "v0_reflexive"             // only reflexive sounds (cries, grunts, coughs)
  | "v1_comfort"               // cooing, comfort vowels — context-dependent
  | "v2_vocal_play"            // sound experimentation: raspberry, clicks, squeals
  | "v3_canonical_babble"      // reduplicated syllables: ma-ma, ba-ba, da-da
  | "v4_variegated_babble"     // mixed syllables: ba-di-ga, varied consonants
  | "v5_jargon"                // sentence-length babble with adult intonation
  | "v6_proto_words";          // consistent sound-meaning pairs (not yet true words)

export const VocalizationDescriptions: Record<VocalizationLevel, string> = {
  v0_reflexive:     "Только рефлекторные звуки. Нет намеренного вокализирования.",
  v1_comfort:       "Гуление, комфортные гласные в спокойном состоянии.",
  v2_vocal_play:    "Эксперименты со звуком: кряхтение, клики, визг — ради звука.",
  v3_canonical_babble:"Редуплицированный лепет: ма-ма, ба-ба — регулярные слоги.",
  v4_variegated_babble:"Смешанный лепет с разными согласными: ба-ди-га.",
  v5_jargon:        "Лепет длиной с предложение, с взрослой интонацией и паузами.",
  v6_proto_words:   "Устойчивые связки звук–значение: «нэ» всегда = «нет», но не настоящее слово.",
};

// ─── Axis 4: Sound Imitation ──────────────────────────────────────────────────

export type SoundImitationLevel =
  | "si0_none"                 // no imitation
  | "si1_facial"               // imitates visible facial movements (tongue out)
  | "si2_actions"              // imitates body actions (clapping, waving)
  | "si3_environmental"        // imitates environmental sounds (vroom, moo)
  | "si4_familiar_words"       // imitates already-known words
  | "si5_novel_sounds"         // imitates new, unfamiliar sounds on request
  | "si6_novel_words";         // imitates novel words in conversation

export const SoundImitationDescriptions: Record<SoundImitationLevel, string> = {
  si0_none:         "Подражания нет — ни жестам, ни звукам.",
  si1_facial:       "Воспроизводит видимые движения рта: высунуть язык, открыть рот.",
  si2_actions:      "Воспроизводит действия: хлопать, махать, стучать.",
  si3_environmental:"Воспроизводит звуки окружения: бибика машины, мычание коровы.",
  si4_familiar_words:"Повторяет уже знакомые слова или их части.",
  si5_novel_sounds: "Пробует воспроизвести новый незнакомый звук.",
  si6_novel_words:  "Имитирует новые слова в ходе живого разговора.",
};

// ─── Axis 5: First Words ──────────────────────────────────────────────────────

export type FirstWordsLevel =
  | "fw0_none"                 // no words or consistent proto-words
  | "fw1_proto_words"          // 1–3 consistent idiosyncratic forms
  | "fw2_first_five"           // 3–10 recognizable words (approximations count)
  | "fw3_first_ten"            // 10–20 words, including action words
  | "fw4_to_25"                // 20–30 words, emerging verb vocabulary
  | "fw5_to_50"                // 30–50 words, rapid growth beginning
  | "fw6_over_50";             // >50 words — entering combiner territory

export const FirstWordsDescriptions: Record<FirstWordsLevel, string> = {
  fw0_none:     "Слов нет, приближений нет.",
  fw1_proto_words:"1–3 устойчивых звукокомплекса со значением (только этот ребёнок понимает).",
  fw2_first_five:"До 10 узнаваемых слов или чётких приближений.",
  fw3_first_ten: "10–20 слов, появляются глаголы и наречия.",
  fw4_to_25:    "20–30 слов, словарь разнообразнее: названия, действия, прилагательные.",
  fw5_to_50:    "30–50 слов, начало лексического взрыва.",
  fw6_over_50:  "Более 50 слов — ребёнок готов к комбинированию.",
};

// ─── Axis 6: Word Combinations ────────────────────────────────────────────────

export type WordCombinationLevel =
  | "wc0_none"                 // no combinations
  | "wc1_juxtaposition"        // two words said separately but right after each other
  | "wc2_first_combos"         // first true two-word combinations (5–10 types)
  | "wc3_varied_combos"        // varied semantic roles: action+object, attr+noun
  | "wc4_productive"           // combines freely — not formulaic pairs
  | "wc5_three_element";       // three-element utterances emerging

export const WordCombinationDescriptions: Record<WordCombinationLevel, string> = {
  wc0_none:        "Комбинирования нет.",
  wc1_juxtaposition:"Два слова подряд, но пауза между ними: «ещё» ... «сок».",
  wc2_first_combos: "Первые настоящие двухсловные сочетания: «ещё сок», «папа там».",
  wc3_varied_combos:"Разные семантические роли: действие+объект, признак+существительное.",
  wc4_productive:  "Свободно комбинирует, не только заученные пары.",
  wc5_three_element:"Трёхэлементные высказывания: «папа дай мяч».",
};

// ─── Axis 7: Phrases ──────────────────────────────────────────────────────────

export type PhraseLevel =
  | "ph0_none"
  | "ph1_telegraphic"          // content words only, no function words
  | "ph2_morphemes_emerging"   // -а, -и, possessives beginning to appear
  | "ph3_simple_sentences"     // complete simple sentences, subject+verb+object
  | "ph4_complex_emerging";    // because, when, if beginning to appear

export const PhraseDescriptions: Record<PhraseLevel, string> = {
  ph0_none:           "Фраз нет.",
  ph1_telegraphic:    "Телеграфная речь: только знаменательные слова. «Папа машина едет».",
  ph2_morphemes_emerging:"Падежные окончания, притяжательные, множественное число появляются непоследовательно.",
  ph3_simple_sentences:"Полные простые предложения с согласованием.",
  ph4_complex_emerging:"Сложные предложения: «потому что», «когда», «если» появляются.",
};

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — STAGE PROFILES (4 HANEN STAGES)
// ═══════════════════════════════════════════════════════════════════════════════

export interface StageSubLevel {
  id: string;
  stage: CommunicationStage;
  name: string;                         // Russian display name
  summary: string;
  typicalPathwayPosition: {
    jointAttention: JointAttentionLevel;
    communicationFunctions: CommunicationFunctionLevel;
    vocalization: VocalizationLevel;
    soundImitation: SoundImitationLevel;
    firstWords: FirstWordsLevel;
  };
  definingCharacteristics: string[];    // 4–5 observable behaviors
  adultFocus: string;                   // the ONE thing the adult should prioritize
  watchFor: string[];                   // what signals readiness for next sub-level
}

export const STAGE_SUB_LEVELS: StageSubLevel[] = [

  // ── DISCOVERER ──────────────────────────────────────────────────────────────

  {
    id: "discoverer_1",
    stage: "discoverer",
    name: "Первооткрыватель · Уровень 1",
    summary: "Ребёнок поглощён окружающим миром. Социальные сигналы ещё не распознаются как приглашения к диалогу.",
    typicalPathwayPosition: {
      jointAttention: "ja1_social_response",
      communicationFunctions: "cf1_rejection",
      vocalization: "v2_vocal_play",
      soundImitation: "si1_facial",
      firstWords: "fw0_none",
    },
    definingCharacteristics: [
      "Откликается на своё имя и знакомые голоса",
      "Смотрит на лица, но быстро возвращается к игрушке",
      "Исследует объекты — ртом, руками, взглядом",
      "Вокализирует, но не как коммуникация — как часть игры",
      "Не отслеживает взгляд взрослого к третьему объекту",
    ],
    adultFocus: "Создать устойчивый ритуал лицом к лицу. Называть то, на что смотрит ребёнок — один раз, тепло, и ждать.",
    watchFor: [
      "Пауза в игре + взгляд на лицо взрослого",
      "Протягивает объект взрослому (хотя бы один раз)",
      "Следует за взглядом взрослого к предмету",
    ],
  },

  {
    id: "discoverer_2",
    stage: "discoverer",
    name: "Первооткрыватель · Уровень 2",
    summary: "Ребёнок начинает делать социальные паузы: прерывает игру и смотрит на взрослого. Диалог ещё не намеренный, но уже социальный.",
    typicalPathwayPosition: {
      jointAttention: "ja2_follows_point",
      communicationFunctions: "cf2_reach_adult",
      vocalization: "v3_canonical_babble",
      soundImitation: "si2_actions",
      firstWords: "fw0_none",
    },
    definingCharacteristics: [
      "Следует за точкой или взглядом взрослого",
      "Прерывает игру чтобы посмотреть на взрослого",
      "Тянется к взрослому когда хочет действия",
      "Лепет становится богаче и разнообразнее",
      "Подражает действиям (хлопать, стучать)",
    ],
    adultFocus: "Следовать за взглядом ребёнка и называть объект. Замирать после действия и ждать его реакции.",
    watchFor: [
      "Переводит взгляд игрушка → взрослый → игрушка (треугольник)",
      "Даёт объект взрослому",
      "Использует звук в момент тяги или протеста — намеренно",
    ],
  },

  // ── COMMUNICATOR ────────────────────────────────────────────────────────────

  {
    id: "communicator_1",
    stage: "communicator",
    name: "Общитель · Уровень 1",
    summary: "Ребёнок намеренно сигнализирует. Взгляд-жест-звук складываются в коммуникативный акт. Слов нет, но намерение есть.",
    typicalPathwayPosition: {
      jointAttention: "ja4_triangle",
      communicationFunctions: "cf4_give_show",
      vocalization: "v4_variegated_babble",
      soundImitation: "si3_environmental",
      firstWords: "fw0_none",
    },
    definingCharacteristics: [
      "Треугольник взгляда работает надёжно",
      "Даёт и показывает объекты, чтобы поделиться",
      "Использует звуки вместе с жестами — комбинированный сигнал",
      "Проявляет настойчивость: повторяет или усиливает сигнал, если не ответили",
      "Разнообразный лепет с интонацией",
    ],
    adultFocus: "Отвечать на каждый сигнал — слово, взгляд, жест — как на настоящее сообщение. Называть намерение ребёнка одним словом.",
    watchFor: [
      "Указывает на предмет (указательный жест)",
      "Звук + взгляд + жест одновременно",
      "Устойчивый звуковой комплекс с конкретным значением",
    ],
  },

  {
    id: "communicator_2",
    stage: "communicator",
    name: "Общитель · Уровень 2",
    summary: "Ребёнок указывает. Он открыл, что указательный жест меняет мир. Это proto-declarative и proto-imperative — предвестники слов.",
    typicalPathwayPosition: {
      jointAttention: "ja5_sustained",
      communicationFunctions: "cf6_proto_declarative",
      vocalization: "v5_jargon",
      soundImitation: "si4_familiar_words",
      firstWords: "fw1_proto_words",
    },
    definingCharacteristics: [
      "Указывает чтобы показать (не только чтобы получить)",
      "Жаргонный лепет с взрослой интонацией — как будто рассказывает",
      "1–3 устойчивых звукокомплекса со значением",
      "Подражает знакомым словам при поддержке",
      "Совместное внимание устойчиво 30+ секунд",
    ],
    adultFocus: "Расширять каждый proto-word на один шаг. Ввести ритуалы с обязательным gap для ребёнка.",
    watchFor: [
      "Первое узнаваемое слово — любое приближение",
      "Имитирует незнакомый звук",
      "Использует слово в двух разных контекстах",
    ],
  },

  // ── FIRST WORDS ─────────────────────────────────────────────────────────────

  {
    id: "first_words_1",
    stage: "first_words",
    name: "Первые слова · Уровень 1",
    summary: "Первые 10 слов. Каждое приближение — настоящее слово. Словарь растёт медленно — но надёжно.",
    typicalPathwayPosition: {
      jointAttention: "ja5_sustained",
      communicationFunctions: "cf8_verbal_request",
      vocalization: "v5_jargon",
      soundImitation: "si5_novel_sounds",
      firstWords: "fw2_first_five",
    },
    definingCharacteristics: [
      "5–10 узнаваемых слов или приближений",
      "Слова появляются в конкретных контекстах, не обобщены",
      "Лексика включает имена людей, любимых объектов, пару действий",
      "Может имитировать новые звуки",
      "Слово сопровождает жест — ещё не замещает",
    ],
    adultFocus: "Расширять каждое слово одним элементом: «мяч» → «Большой мяч». Повторять целевое слово 5–10 раз за сессию.",
    watchFor: [
      "10–15 слов используются спонтанно (без подсказки)",
      "Слово используется в новом контексте (обобщение)",
      "Начинает имитировать новые слова услышанные в разговоре",
    ],
  },

  {
    id: "first_words_2",
    stage: "first_words",
    name: "Первые слова · Уровень 2",
    summary: "10–25 слов. Лексический взрыв начинается. Ребёнок открыл, что у всего есть имя.",
    typicalPathwayPosition: {
      jointAttention: "ja6_distal_point",
      communicationFunctions: "cf8_verbal_request",
      vocalization: "v6_proto_words",
      soundImitation: "si6_novel_words",
      firstWords: "fw3_first_ten",
    },
    definingCharacteristics: [
      "10–25 слов, разные грамматические категории",
      "Активно имитирует новые слова в разговоре",
      "Указывает на картинки в книге и называет",
      "Слово используется во многих контекстах (обобщено)",
      "Начинает именовать действия, не только предметы",
    ],
    adultFocus: "Моделировать двухсловные фразы. «Мяч. Большой мяч. Дай мяч. Мой мяч». Ребёнок слышит образцы, не задание.",
    watchFor: [
      "Произносит два слова рядом (даже с паузой между ними)",
      "Словарь >25 слов",
      "Комбинирует жест + слово + взгляд одновременно",
    ],
  },

  {
    id: "first_words_3",
    stage: "first_words",
    name: "Первые слова · Уровень 3",
    summary: "25–50 слов. Готовность к комбинированию. Ребёнок всё чаще ставит слова рядом.",
    typicalPathwayPosition: {
      jointAttention: "ja6_distal_point",
      communicationFunctions: "cf8_verbal_request",
      vocalization: "v6_proto_words",
      soundImitation: "si6_novel_words",
      firstWords: "fw5_to_50",
    },
    definingCharacteristics: [
      "25–50 слов, активный лексический рост",
      "Слова в разных семантических категориях",
      "Называет действия, признаки, отношения («там», «нет», «ещё»)",
      "Иногда ставит два слова рядом (не всегда связно)",
      "Долгое совместное внимание на книги и рассказы",
    ],
    adultFocus: "Систематически моделировать двухсловные конструкции: «Мяч катится. Кот спит. Дай мне». Не требовать — показывать.",
    watchFor: [
      "Первые стабильные двухсловные сочетания",
      "50+ слов в лексиконе",
      "Начинает добавлять '-а', '-и', притяжательные окончания",
    ],
  },

  // ── COMBINER ────────────────────────────────────────────────────────────────

  {
    id: "combiner_1",
    stage: "combiner",
    name: "Соединитель · Уровень 1",
    summary: "Первые двухсловные сочетания. Пока формульные пары, но грамматика начинается.",
    typicalPathwayPosition: {
      jointAttention: "ja6_distal_point",
      communicationFunctions: "cf8_verbal_request",
      vocalization: "v6_proto_words",
      soundImitation: "si6_novel_words",
      firstWords: "fw6_over_50",
    },
    definingCharacteristics: [
      "Первые 5–15 двухсловных сочетаний",
      "Семантические роли: владелец+объект («папа машина»), действие+объект («дай мяч»)",
      "Слова отдельные, но идут рядом",
      "Может использовать слово в 3+ контекстах",
      "Активно именует людей и их действия",
    ],
    adultFocus: "Расширять двухсловные до трёхсловных. «Дай мяч» → «Дай большой мяч». Моделировать падежи и согласования.",
    watchFor: [
      "Разнообразие семантических ролей в комбинациях",
      "Трёхэлементные высказывания",
      "Появление грамматических морфем",
    ],
  },

  {
    id: "combiner_2",
    stage: "combiner",
    name: "Соединитель · Уровень 2",
    summary: "Свободное комбинирование. Ребёнок соединяет слова продуктивно, не только заученными парами.",
    typicalPathwayPosition: {
      jointAttention: "ja6_distal_point",
      communicationFunctions: "cf8_verbal_request",
      vocalization: "v6_proto_words",
      soundImitation: "si6_novel_words",
      firstWords: "fw6_over_50",
    },
    definingCharacteristics: [
      "Комбинирует свободно: новые пары каждый день",
      "Трёхэлементные высказывания («папа дай мяч»)",
      "Падежные окончания начинают согласовываться",
      "Описывает события: «машина упала», «кот кушает»",
      "Задаёт первые вопросы: «это что?», «где кот?»",
    ],
    adultFocus: "Моделировать простые предложения. Отвечать на вопросы полной фразой. Расширять телеграфную речь в развёрнутую.",
    watchFor: [
      "Полные простые предложения (подлежащее + сказуемое + дополнение)",
      "Союзы («и», «потому что»)",
      "Рассказывает о событиях из прошлого",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — DEVELOPMENTAL POSITION & PROFILE
// ═══════════════════════════════════════════════════════════════════════════════

/** A child's observed position on a single axis */
export interface AxisStatus<TLevel extends string> {
  axis: PathwayAxis;
  currentLevel: TLevel;
  isConsistent: boolean;       // happens in >2 contexts, not just one activity
  isSpontaneous: boolean;      // child initiates, not prompted
  daysSinceFirst: number;      // how long this has been observed
}

/** Full multidimensional profile — the truth about a child's development */
export interface DevelopmentalProfile {
  childId: string;
  assessedOn: string;          // ISO date
  overallStage: CommunicationStage;
  subLevelId: string;

  jointAttention: AxisStatus<JointAttentionLevel>;
  communicationFunctions: AxisStatus<CommunicationFunctionLevel>;
  vocalization: AxisStatus<VocalizationLevel>;
  soundImitation: AxisStatus<SoundImitationLevel>;
  firstWords: AxisStatus<FirstWordsLevel>;
  wordCombinations: AxisStatus<WordCombinationLevel>;
  phrases: AxisStatus<PhraseLevel>;

  /** Which axes are the current growth frontier (not yet consistent/spontaneous) */
  activeGrowthAxes: PathwayAxis[];
  /** Which axes are consolidated (consistent + spontaneous in 3+ contexts) */
  consolidatedAxes: PathwayAxis[];
  /** Notes from parent/clinician */
  observationNotes: string[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — ADULT SPEECH ADAPTATION
// ═══════════════════════════════════════════════════════════════════════════════

export interface AdultSpeechProfile {
  /** Target words per utterance */
  phraseLength: 1 | 2 | 3 | "4+";
  /** Type of sentence to model */
  sentenceType: "single_content_word" | "two_word_combo" | "three_element" | "simple_sentence";
  /** How strongly to stress the key word */
  emphasisLevel: "heavy"     // slow + loud + elongated: "МЯЯЯЧ"
    | "warm"                  // naturally warm stress: "Мяч — вот мяч!"
    | "natural";              // typical adult stress patterns
  /** Seconds of silence after the key word or utterance */
  pauseAfterKey: number;
  /** Pause before re-initiating (if child doesn't respond) */
  waitBeforeReinvite: number;
  /** Proportion of utterances that should be self-talk (narrating own actions) */
  selfTalkRatio: number;
  /** Whether to ask questions — and what type */
  questionPolicy: "none"       // 0–3 questions per session max, genuine curiosity only
    | "choice_only"            // only "Кот или мяч?" — never open, never test
    | "natural";               // normal conversational questions
  /** How many times to use the same target word per session */
  targetWordRepetition: number;
  /** Expansion depth: how many elements to add above child's current level */
  expansionDepth: 1 | 2;
  /** Whether to correct errors (NEVER) vs expand (ALWAYS) */
  correctionPolicy: "never_correct_always_expand";
  /** Example utterances at this profile level (Russian) */
  modelUtterances: string[];
  /** What NOT to say (counter-examples) */
  avoidPatterns: string[];
}

export function buildAdultSpeechProfile(subLevel: StageSubLevel): AdultSpeechProfile {
  const profiles: Record<string, AdultSpeechProfile> = {

    discoverer_1: {
      phraseLength: 1,
      sentenceType: "single_content_word",
      emphasisLevel: "heavy",
      pauseAfterKey: 5,
      waitBeforeReinvite: 8,
      selfTalkRatio: 0.7,
      questionPolicy: "none",
      targetWordRepetition: 8,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Мяч. [пауза 5 сек]",
        "Вот. Мяч.",
        "Кот. [смотреть вместе]",
        "Бам! [упал]",
        "Ещё. [ждать]",
      ],
      avoidPatterns: [
        "Покажи мне, где мяч? (вопрос-тест)",
        "Скажи «мяч»! (требование имитации)",
        "Правильно, это мяч, большой красивый мяч... (слишком много слов)",
        "Ты хочешь мяч или кубик? (выбор пока сложен)",
      ],
    },

    discoverer_2: {
      phraseLength: 1,
      sentenceType: "single_content_word",
      emphasisLevel: "heavy",
      pauseAfterKey: 5,
      waitBeforeReinvite: 6,
      selfTalkRatio: 0.6,
      questionPolicy: "none",
      targetWordRepetition: 8,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Едет. Машина едет.",
        "Упал! [пауза — смотреть на реакцию]",
        "Дай. [протянуть руку, ждать]",
        "Ещё? [вопросительная интонация, пауза]",
        "Вот! Нашёл.",
      ],
      avoidPatterns: [
        "Что это такое? (вопрос-тест)",
        "Скажи «машина»!",
        "Нет, это не так, смотри как надо.",
        "Он просто не хочет говорить... (вслух при ребёнке)",
      ],
    },

    communicator_1: {
      phraseLength: 1,
      sentenceType: "single_content_word",
      emphasisLevel: "warm",
      pauseAfterKey: 4,
      waitBeforeReinvite: 6,
      selfTalkRatio: 0.5,
      questionPolicy: "none",
      targetWordRepetition: 6,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Дай! [ребёнок тянется] Дай. Вот — дал.",
        "Ещё. [пауза — ждать его сигнал]",
        "Открой. [держать крышку закрытой]",
        "Упал. Бам! [пауза]",
        "Нет! [если он отодвигает] Нет, не хочет.",
      ],
      avoidPatterns: [
        "Скажи «дай»! (требование слова)",
        "Хочешь ещё? Хорошо, вот тебе ещё. (отвечает до того, как он попросил)",
        "Ой, какой умник! (Оценка вместо отклика)",
      ],
    },

    communicator_2: {
      phraseLength: 2,
      sentenceType: "two_word_combo",
      emphasisLevel: "warm",
      pauseAfterKey: 4,
      waitBeforeReinvite: 5,
      selfTalkRatio: 0.4,
      questionPolicy: "choice_only",
      targetWordRepetition: 6,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Кот там. [указать и ждать]",
        "Ещё мяч? [вопросительная интонация]",
        "Дай мне. [протянуть руку]",
        "Синяя машина. [подчеркнуть «синяя»]",
        "Едет машина. Вот — едет.",
      ],
      avoidPatterns: [
        "Скажи «ещё сок»! (полное требование)",
        "Ты хочешь мяч или машинку или кубик? (слишком много вариантов)",
        "Где мяч? Где? Ну где же мяч? (давление)",
      ],
    },

    first_words_1: {
      phraseLength: 2,
      sentenceType: "two_word_combo",
      emphasisLevel: "warm",
      pauseAfterKey: 3,
      waitBeforeReinvite: 5,
      selfTalkRatio: 0.35,
      questionPolicy: "choice_only",
      targetWordRepetition: 5,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Мяч. Большой мяч. [пауза]",
        "Кот спит. Смотри — спит.",
        "Дай мяч. [ждать — даже 5 сек]",
        "Ещё сок? [пауза]",
        "Нет — упал! Ух-ты.",
      ],
      avoidPatterns: [
        "Как это называется? (вопрос-тест)",
        "Нет, скажи правильно — МЯЧ. (коррекция)",
        "Повтори: «большой красный мяч». (завышенный уровень)",
      ],
    },

    first_words_2: {
      phraseLength: 2,
      sentenceType: "two_word_combo",
      emphasisLevel: "natural",
      pauseAfterKey: 3,
      waitBeforeReinvite: 4,
      selfTalkRatio: 0.3,
      questionPolicy: "choice_only",
      targetWordRepetition: 4,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Машина едет. Быстро едет!",
        "Мамин мяч. Мой мяч.",
        "Дай синюю. [пауза 4 сек]",
        "Кот там? [пауза — ждать ответа]",
        "Упала башня! Бум!",
      ],
      avoidPatterns: [
        "Скажи «большая красная машина едет быстро».",
        "Что делает кот? Ну, что делает? Смотри — он СПИТ! (подсказка до паузы)",
        "Нет, это не «мяка», это «мяч».",
      ],
    },

    first_words_3: {
      phraseLength: 3,
      sentenceType: "three_element",
      emphasisLevel: "natural",
      pauseAfterKey: 3,
      waitBeforeReinvite: 4,
      selfTalkRatio: 0.25,
      questionPolicy: "choice_only",
      targetWordRepetition: 4,
      expansionDepth: 1,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Большой синий мяч. [пауза]",
        "Кот там спит. Тихо спит.",
        "Дай мне мяч. [ждать]",
        "Папина машина едет.",
        "Упала — ой! Упала башня.",
      ],
      avoidPatterns: [
        "Расскажи мне про машинку. (слишком открытый запрос)",
        "Нет, говори полным предложением.",
      ],
    },

    combiner_1: {
      phraseLength: 3,
      sentenceType: "three_element",
      emphasisLevel: "natural",
      pauseAfterKey: 2,
      waitBeforeReinvite: 3,
      selfTalkRatio: 0.2,
      questionPolicy: "natural",
      targetWordRepetition: 3,
      expansionDepth: 2,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Дай мне синий мяч. [ждать]",
        "Кот там спит тихо.",
        "Папина большая машина.",
        "Мяч упал — далеко упал!",
        "Хочешь ещё сок? [пауза]",
      ],
      avoidPatterns: [
        "Нет, надо говорить «дай МНЕ мяч», а не «дай мяч». (коррекция)",
        "Ты уже большой, пора говорить правильно. (давление)",
      ],
    },

    combiner_2: {
      phraseLength: "4+",
      sentenceType: "simple_sentence",
      emphasisLevel: "natural",
      pauseAfterKey: 2,
      waitBeforeReinvite: 3,
      selfTalkRatio: 0.15,
      questionPolicy: "natural",
      targetWordRepetition: 2,
      expansionDepth: 2,
      correctionPolicy: "never_correct_always_expand",
      modelUtterances: [
        "Машина едет быстро по дороге.",
        "Кот спит потому что устал.",
        "Дай мне мяч, пожалуйста.",
        "Где твоя синяя машина?",
        "Башня упала — давай построим снова.",
      ],
      avoidPatterns: [
        "Скажи это правильно! (коррекция)",
        "Нет-нет-нет, послушай как надо. (перебивание)",
      ],
    },
  };

  return profiles[subLevel.id] ?? profiles["first_words_1"];
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — INTERACTION STYLE ADAPTATION
// ═══════════════════════════════════════════════════════════════════════════════

export type AdultInteractionRole =
  | "observer"              // mostly watching, minimal talking
  | "parallel_player"       // playing alongside, self-talking
  | "supportive_partner"    // equal partner, following child's lead
  | "conversational_partner"; // can initiate topics, extend conversations

export interface InteractionProfile {
  adultRole: AdultInteractionRole;
  /** 0 = adult leads everything, 1 = child leads everything */
  childControlRatio: number;
  /** Physical arrangement */
  positioning: "floor_face_to_face" | "floor_side_by_side" | "table_opposite" | "flexible";
  /** Distance that feels right */
  proximity: "very_close_18cm" | "close_50cm" | "conversational_1m" | "flexible";
  /** Imitation policy */
  imitationFocus: "adult_imitates_child" | "mutual_imitation" | "adult_models_for_child";
  /** Energy matching */
  energyMatching: "calm_attuned"   // match child's calm with calm
    | "warm_responsive"            // respond with warmth but don't amplify
    | "playfully_energetic"        // meet high energy with shared play energy
    | "co_regulating";             // actively bring energy down if dysregulated
  /** Minimum signal that earns a response */
  responseThreshold: "any_movement" | "directed_signal" | "clear_intent" | "vocalization";
  /** OWL pause script for this level */
  owlScript: string;
  /** What the adult's body says during the wait */
  waitBodyLanguage: string;
  /** How to re-invite if child doesn't respond */
  reInviteScript: string;
}

export function buildInteractionProfile(subLevel: StageSubLevel): InteractionProfile {
  const id = subLevel.id;

  if (id === "discoverer_1") return {
    adultRole: "parallel_player",
    childControlRatio: 0.8,
    positioning: "floor_face_to_face",
    proximity: "very_close_18cm",
    imitationFocus: "adult_imitates_child",
    energyMatching: "calm_attuned",
    responseThreshold: "any_movement",
    owlScript: "Прежде чем что-то сделать — остановись. Смотри на его руки и глаза 5 секунд. Только потом скажи одно слово.",
    waitBodyLanguage: "Тело расслаблено. Взгляд мягко на ребёнке. Рот закрыт. Никакого движения к игрушке.",
    reInviteScript: "Тихо подвинуть интересный предмет ближе. Ждать ещё 5 секунд. Не говорить.",
  };

  if (id === "discoverer_2") return {
    adultRole: "parallel_player",
    childControlRatio: 0.75,
    positioning: "floor_face_to_face",
    proximity: "very_close_18cm",
    imitationFocus: "adult_imitates_child",
    energyMatching: "warm_responsive",
    responseThreshold: "any_movement",
    owlScript: "Следи за его взглядом. Когда он посмотрел на предмет — скажи его название. Потом замри.",
    waitBodyLanguage: "Рука на игрушке, но неподвижна. Глаза на лице ребёнка. Брови чуть подняты.",
    reInviteScript: "Медленно потрясти игрушку. Пауза. Смотреть на ребёнка. Не говорить.",
  };

  if (id === "communicator_1") return {
    adultRole: "supportive_partner",
    childControlRatio: 0.7,
    positioning: "floor_face_to_face",
    proximity: "close_50cm",
    imitationFocus: "mutual_imitation",
    energyMatching: "warm_responsive",
    responseThreshold: "directed_signal",
    owlScript: "Отдай игрушку — и жди. Твоё тело говорит «я слушаю, у тебя есть ход». Не заполняй тишину.",
    waitBodyLanguage: "Игрушка у ребёнка. Руки сложены или лежат на коленях. Лицо открытое, ожидающее. 5–8 секунд.",
    reInviteScript: "Коснуться игрушки, посмотреть на ребёнка — пауза. Если нет реакции: убрать игрушку.",
  };

  if (id === "communicator_2") return {
    adultRole: "supportive_partner",
    childControlRatio: 0.65,
    positioning: "floor_face_to_face",
    proximity: "close_50cm",
    imitationFocus: "mutual_imitation",
    energyMatching: "warm_responsive",
    responseThreshold: "directed_signal",
    owlScript: "После каждого его сигнала — пауза, имя сигнала, один шаг вверх. «Дал! — Дай. — Дай мне.»",
    waitBodyLanguage: "Ладонь открыта вперёд. Взгляд на ребёнке. Тихая ожидающая улыбка.",
    reInviteScript: "Убрать объект в непрозрачный мешочек. Подождать. Если нет — покрутить мешочек и посмотреть вопросительно.",
  };

  if (id.startsWith("first_words")) return {
    adultRole: "supportive_partner",
    childControlRatio: 0.6,
    positioning: "flexible",
    proximity: "close_50cm",
    imitationFocus: "mutual_imitation",
    energyMatching: "warm_responsive",
    responseThreshold: "vocalization",
    owlScript: "После его слова или приближения — пауза 3 секунды. Потом расширь на один шаг. Не требуй повтора.",
    waitBodyLanguage: "Немного наклониться вперёд. Брови подняты. Глаза широкие и тёплые. Рот закрыт.",
    reInviteScript: "Скомментировать что-то новое в окружении. Ждать, вступит ли он. Не повторять вопрос.",
  };

  // combiner
  return {
    adultRole: "conversational_partner",
    childControlRatio: 0.5,
    positioning: "flexible",
    proximity: "conversational_1m",
    imitationFocus: "adult_models_for_child",
    energyMatching: "playfully_energetic",
    responseThreshold: "vocalization",
    owlScript: "Пусть он ведёт тему. Добавляй один элемент к его фразе. Задавай настоящие вопросы — не тесты.",
    waitBodyLanguage: "Расслабленная поза. Взгляд на совместном объекте. Иногда смотреть в сторону — он подойдёт.",
    reInviteScript: "Начать делать что-то интересное рядом. Комментировать своё действие вслух. Ждать его прихода.",
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — ACTIVITY ADAPTATION
// ═══════════════════════════════════════════════════════════════════════════════

export interface ActivityAdaptation {
  /** Recommended toy categories for this sub-level */
  toyCategories: ToyCategory[];
  /** Attention span this level typically supports */
  attentionSpanMinutes: [number, number]; // [min, max]
  /** Routines that work best */
  routineContexts: string[];
  /** Communication demand to aim for */
  communicationDemand: "none" | "gesture_ok" | "any_sound" | "approximation" | "word" | "two_words";
  /** Sensory channels to prioritize */
  sensoryCombination: SensoryChannel[];
  /** Activity adaptation notes per sub-level */
  adaptationNotes: string;
  /** Specific SPARK setups that work at this level */
  sparkSetups: string[];
}

export function buildActivityAdaptation(subLevel: StageSubLevel): ActivityAdaptation {
  const id = subLevel.id;

  const adaptations: Record<string, ActivityAdaptation> = {
    discoverer_1: {
      toyCategories: ["pounding_toy", "stacking_cups"],
      attentionSpanMinutes: [1, 3],
      routineContexts: ["bath", "meal_setup", "dressing", "face_to_face_play"],
      communicationDemand: "none",
      sensoryCombination: ["tactile", "auditory", "vestibular"],
      adaptationNotes: "Сессии короткие: 2–3 минуты лицом к лицу. Главное — качество внимания, не длительность. Пудинги и стучалки — потому что звук немедленный.",
      sparkSetups: [
        "Запустить волчок — и ждать, пока он сам не посмотрит на тебя",
        "Надуть пузырь один — закрыть трубочку — ждать взгляда",
        "Поставить кубик — замереть с следующим кубиком в руке",
      ],
    },
    discoverer_2: {
      toyCategories: ["pounding_toy", "stacking_cups", "sorting_game"],
      attentionSpanMinutes: [2, 4],
      routineContexts: ["bath", "meal", "outdoor_walk", "book_looking"],
      communicationDemand: "gesture_ok",
      sensoryCombination: ["visual", "tactile", "auditory"],
      adaptationNotes: "Книги с чёткими картинками — золото на этом уровне. Указывает, взрослый называет. Чередование: он → взрослый → он.",
      sparkSetups: [
        "Положить любимую игрушку за прозрачную крышку — пусть тянется",
        "Дать пустую чашку на завтрак — ждать указания",
        "Спрятать предмет под платком на его глазах",
      ],
    },
    communicator_1: {
      toyCategories: ["magnetic_fishing", "stacking_cups", "sorting_game"],
      attentionSpanMinutes: [3, 5],
      routineContexts: ["bath", "meal", "cleanup", "dressing"],
      communicationDemand: "gesture_ok",
      sensoryCombination: ["visual", "tactile", "proprioceptive"],
      adaptationNotes: "Игры с очевидной причинно-следственной связью: стук → звук, рыбка → в ведёрко. Каждый результат — моментальный. Контролируй темп через предметы в руке.",
      sparkSetups: [
        "Контролировать мешочек с предметами — давать по одному",
        "Положить желаемый предмет за спину — ждать сигнала",
        "Начать действие неправильно — ждать поправки",
      ],
    },
    communicator_2: {
      toyCategories: ["magnetic_fishing", "lotto_game", "lock_key_toy"],
      attentionSpanMinutes: [4, 7],
      routineContexts: ["bath", "meal", "book", "bedtime"],
      communicationDemand: "any_sound",
      sensoryCombination: ["visual", "tactile", "auditory"],
      adaptationNotes: "Лото и рыбалка создают естественную очерёдность. Книги с животными — ребёнок указывает, взрослый называет. Ритуальные игры: читать одну и ту же книгу каждый вечер.",
      sparkSetups: [
        "Начать ритуальную фразу — остановиться до финального слова",
        "Налить половину стакана — ждать сигнала 'ещё'",
        "Показать известную книгу — не открывать, ждать",
      ],
    },
    first_words_1: {
      toyCategories: ["lotto_game", "memory_game", "sorting_game"],
      attentionSpanMinutes: [4, 7],
      routineContexts: ["bath", "meal", "book", "outdoor_walk", "bedtime"],
      communicationDemand: "approximation",
      sensoryCombination: ["visual", "auditory", "tactile"],
      adaptationNotes: "Игры с называнием: лото, картинки, простое мемори. Каждый предмет — шанс услышать слово. Книги с простыми повторяющимися текстами идеальны.",
      sparkSetups: [
        "Дать предмет 'не того' цвета — ждать протеста или называния",
        "Спрятать любимый предмет так что видно — ждать называния",
        "Налить чай взрослому, а не ребёнку — ждать 'мне!'",
      ],
    },
    first_words_2: {
      toyCategories: ["lotto_game", "memory_game", "threading_toy"],
      attentionSpanMinutes: [5, 8],
      routineContexts: ["all_routines", "book", "outdoor"],
      communicationDemand: "word",
      sensoryCombination: ["visual", "auditory"],
      adaptationNotes: "Нанизывание развивает терпение и мотивацию. Бусина одного цвета = один шанс назвать. Мемори с животными — ребёнок хочет назвать когда переворачивает.",
      sparkSetups: [
        "Держать бусину и смотреть вопросительно — ждать цвет",
        "Перевернуть карточку в мемори — замереть, ждать называния",
        "Начать петь знакомую песню — остановиться на ключевом слове",
      ],
    },
    first_words_3: {
      toyCategories: ["memory_game", "matching_game", "threading_toy"],
      attentionSpanMinutes: [6, 10],
      routineContexts: ["all_routines"],
      communicationDemand: "word",
      sensoryCombination: ["visual", "auditory"],
      adaptationNotes: "Готовность к комбинированию. Добавляй признаки при всех называниях: «синяя», «большая», «быстрая». Ребёнок слышит образец, не задание.",
      sparkSetups: [
        "Давать 'не ту' карточку в мемори — ждать поправки с называнием",
        "Строить по инструкции: 'сначала синяя, потом красная'",
        "Рассматривать книгу с открытым вопросом: 'кто это?'",
      ],
    },
    combiner_1: {
      toyCategories: ["matching_game", "lotto_game", "lock_key_toy"],
      attentionSpanMinutes: [7, 12],
      routineContexts: ["all_routines", "story_time"],
      communicationDemand: "two_words",
      sensoryCombination: ["visual", "auditory"],
      adaptationNotes: "Настоящий диалог начинается здесь. Задавай вопросы-выборы: «Дать синюю или красную?» Ребёнок даёт одно слово — взрослый расширяет до двух.",
      sparkSetups: [
        "Взять не тот предмет — ждать двухсловного уточнения",
        "Задать вопрос с очевидным ответом: «Где мяч?» — ждать «Там, на полу»",
        "Разыграть незнание: «Я забыл, как зовут этого?» — ждать",
      ],
    },
    combiner_2: {
      toyCategories: ["lotto_game", "matching_game", "lock_key_toy"],
      attentionSpanMinutes: [8, 15],
      routineContexts: ["all_routines", "story_time", "dramatic_play"],
      communicationDemand: "two_words",
      sensoryCombination: ["visual", "auditory"],
      adaptationNotes: "Ролевые игры и сюжетные истории. Ребёнок начинает рассказывать что было. Взрослый слушает и добавляет «потому что», «когда», «если».",
      sparkSetups: [
        "Разыграть маленькую сценку — ждать комментария",
        "Прочитать страницу и закрыть книгу — ждать «а что там дальше»",
        "Начать строить по плану — делать намеренную ошибку — ждать объяснения",
      ],
    },
  };

  return adaptations[id] ?? adaptations["first_words_1"];
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — LIVE PROMPT LIBRARY
// ═══════════════════════════════════════════════════════════════════════════════

export interface PromptLibrary {
  /** How to frame your own mindset before starting (adult self-instruction) */
  beforeSessionMindset: string;
  /** Word-for-word OWL self-reminder */
  owlReminder: string;
  /** Body language during the wait moment */
  waitBodyScript: string;
  /** How to respond to ANY signal (lowest bar) */
  signalResponse: string;
  /** Expansion examples keyed by input → output */
  expansionExamples: { input: string; output: string; note: string }[];
  /** Self-talk examples (narrating own actions as a model) */
  selfTalkExamples: string[];
  /** Celebration scripts — vary these so they don't feel mechanical */
  celebrationVariants: string[];
  /** SPARK setups — communication temptation starters */
  sparkOpeners: string[];
  /** What to do if the child disengages */
  disengagementPlan: string;
}

export function buildPromptLibrary(subLevel: StageSubLevel): PromptLibrary {
  const id = subLevel.id;

  if (id === "discoverer_1" || id === "discoverer_2") return {
    beforeSessionMindset: "Я не пришла учить. Я пришла быть рядом и называть мир вокруг него. Мои слова — это подпись к его внутреннему опыту.",
    owlReminder: "Наблюдай — куда смотрят его глаза. Жди — пять полных секунд. Слушай — любой звук как слово.",
    waitBodyScript: "Сложить руки или положить на колени. Мягко смотреть на него. Рот закрыт. Никакого движения.",
    signalResponse: "Любое движение в сторону объекта → немедленно назови объект одним словом. Пауза. Смотри на него.",
    expansionExamples: [
      { input: "тянется к мячу", output: "Мяч. [дать] Вот — мяч.", note: "называй то, чего он хочет, в момент получения" },
      { input: "смотрит на кошку", output: "Кот. [пауза] Кот там.", note: "называй то, на что он смотрит" },
      { input: "звук 'ааа'", output: "Да! Вот! [имитируй звук] Ааа!", note: "зеркало его звука — это уже диалог" },
    ],
    selfTalkExamples: [
      "Беру мяч. [взять медленно] Вот — мяч.",
      "Кладу в ящик. Вот так.",
      "Падает! Бам.",
      "Ищу... [пауза] Нашёл!",
    ],
    celebrationVariants: [
      "Да! [мягко, тепло]",
      "Вот! [широкие глаза]",
      "О! Смотри! [вместе смотреть]",
      "Ты посмотрел! [улыбка]",
    ],
    sparkOpeners: [
      "Показать желаемый предмет и медленно убрать за спину.",
      "Начать делать что-то интересное рядом — не предлагать.",
      "Надуть щёки — пауза — смотреть на него.",
    ],
    disengagementPlan: "Перестать говорить полностью. Тихо начать делать что-то рядом. Не звать. Ждать до 2 минут. Затем — пузырь или знакомый звук.",
  };

  if (id === "communicator_1" || id === "communicator_2") return {
    beforeSessionMindset: "Он уже общается — только не словами. Каждое его действие — это предложение. Моя работа — принять его и ответить на один шаг выше.",
    owlReminder: "Отдай предмет, замри, жди сигнала. Сигнал пришёл → ответь словом. Слова идут ПОСЛЕ его хода, не до.",
    waitBodyScript: "Предмет у него. Ладони открыты, лежат на коленях. Взгляд — на его лице. Брови чуть подняты: «Я жду тебя».",
    signalResponse: "Он тянется, смотрит, даёт — немедленный словесный ответ: «Дай! [дать] Вот — дал.» Имя его действия + выполнение.",
    expansionExamples: [
      { input: "даёт предмет взрослому", output: "Дай! [принять] Дал. Ты дал.", note: "назови функцию + выполни" },
      { input: "тянется + звук", output: "Ещё! [дать] Вот — ещё.", note: "название + немедленное удовлетворение" },
      { input: "указательный жест + взгляд", output: "Там! Кот там. Ты видишь!", note: "подтверди наблюдение" },
    ],
    selfTalkExamples: [
      "Беру синюю. [взять] Синяя.",
      "Открываю. [открыть] Вот — открыто.",
      "Ищу... Нет здесь. [пауза] Вот! Нашёл.",
      "Кладу сюда. [медленно положить]",
    ],
    celebrationVariants: [
      "Ты дал! [с теплом]",
      "Вот так! [вместе посмотреть на результат]",
      "Он слышит тебя! [смотреть на экран или игрушку]",
      "Да! [короткое, тёплое, немедленное]",
    ],
    sparkOpeners: [
      "Контролировать мешочек — давать по одному.",
      "Дать контейнер, который не открывается — ждать 'помоги'.",
      "Начать играть самой — не предлагать ему участвовать.",
    ],
    disengagementPlan: "Убрать все игрушки. Сидеть рядом молча. Через 30 секунд достать самый желанный предмет — не давать. Ждать сигнала.",
  };

  if (id.startsWith("first_words")) return {
    beforeSessionMindset: "Его слова — черновики, не ошибки. Моя работа — взять его черновик и сделать из него один шаг дальше. Не исправлять — расширять.",
    owlReminder: "После его слова — пауза 3 секунды. Потом расширение. Потом пауза. Цепочка: его слово → мой ответ → пауза → ждать его реакцию.",
    waitBodyScript: "Немного наклониться вперёд. Рот закрыт. Тёплый взгляд на нём. Брови приподняты: «Я слышу, что ты скажешь».",
    signalResponse: "Любой звук + жест → принять как слово. Назвать его намерение: «Ещё? Хочешь ещё?» Дать немедленно.",
    expansionExamples: [
      { input: "«мя»", output: "Мяч! Вот мяч.", note: "принять приближение + расширить одним шагом" },
      { input: "«ещ»", output: "Ещё! Ещё сок.", note: "добавить существительное к функциональному слову" },
      { input: "«топ-топ»", output: "Топ-топ! Идём. Ножки топают.", note: "принять его форму + моделировать" },
      { input: "«там» + указание", output: "Там! Кот там спит.", note: "расширь на два слова" },
    ],
    selfTalkExamples: [
      "Наливаю сок. Вот — сок. Жёлтый сок.",
      "Иду в ванну. Топ-топ. Ванна.",
      "Беру синюю бусину. Синяя. Нанизываю.",
      "Упала! Ой — упала башня.",
    ],
    celebrationVariants: [
      "Мяч! Ты сказал «мяч»! [тепло, не преувеличенно]",
      "Да! Ещё! [немедленно дать ещё]",
      "Ты позвал! [посмотреть на экран вместе]",
      "Слышу! Сок — вот сок. [принять + дать]",
      "Бананааа! Ты сказал бабана! [принять его форму с радостью]",
    ],
    sparkOpeners: [
      "Дать неполную порцию — явно мало — и ждать 'ещё'.",
      "Положить любимое на виду, но в контейнере с крышкой.",
      "Начать ритуальную фразу — остановиться перед финальным словом.",
    ],
    disengagementPlan: "Спокойно убрать игрушку. Начать делать что-то немного шумное рядом — стучать ложкой, переворачивать стакан. Не звать. Ждать подхода.",
  };

  // combiner
  return {
    beforeSessionMindset: "Он уже говорит. Теперь моя работа — быть интересным собеседником, не учителем. Слушать. Расширять. Следовать за его темой.",
    owlReminder: "Он начинает тему — я следую. Его два слова → мои три слова. Никогда не исправлять грамматику — только моделировать правильную форму в своей фразе.",
    waitBodyScript: "Расслабленная, открытая поза. Взгляд иногда на совместном объекте, иногда на нём. Не смотреть в упор. Создавать ощущение: 'Я здесь и слушаю'.",
    signalResponse: "Он что-то сказал → принять → расширить. «Дай мяч» → «Дай мне синий мяч, пожалуйста?» Его форма плюс один-два элемента.",
    expansionExamples: [
      { input: "«папа машина»", output: "Папина машина! Большая папина машина.", note: "добавь притяжательное + признак" },
      { input: "«ещё сок»", output: "Ещё сока, пожалуйста? [пауза] Вот — ещё сок.", note: "добавь вежливость + разыграй" },
      { input: "«кот спит»", output: "Кот спит — тихо спит. Устал кот.", note: "расширь на причину" },
      { input: "«там упал»", output: "Упал — бум! Упал на пол.", note: "добавь место/обстоятельство" },
    ],
    selfTalkExamples: [
      "Я строю башню. Сначала большой, потом маленький.",
      "Ищу синюю машину. Где же она? Вот — нашёл!",
      "Кошка пьёт молоко. Вкусное молоко.",
      "Открываю замок. Нужен правильный ключ.",
    ],
    celebrationVariants: [
      "Папина машина! Точно! [естественно, без преувеличения]",
      "Ты сказал два слова! [тепло]",
      "Слышу тебя! [контакт глазами + улыбка]",
      "Именно! Кот спит. [принять + подтвердить]",
    ],
    sparkOpeners: [
      "Начать делать что-то неправильно — ждать объяснения.",
      "Не понимать намеренно: «Который мяч? Я не вижу.»",
      "Читать вслух и делать очевидную ошибку в тексте.",
    ],
    disengagementPlan: "Начать интересную деятельность рядом, вслух рассуждать, ничего не предлагать. Ждать до 1 минуты. Если всё ещё нет — «Смотри что я нашёл!»",
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — TRANSITION CRITERIA
// ═══════════════════════════════════════════════════════════════════════════════

export interface TransitionCriteria {
  fromSubLevel: string;
  toSubLevel: string;
  /** Signals that must be observed before considering transition */
  requiredSignals: {
    signal: string;
    frequency: "once" | "3x_in_one_session" | "3x_across_sessions" | "consistently_spontaneous";
    context: "any" | "supported" | "spontaneous_only";
  }[];
  /** How long to observe consolidation before calling it stable */
  consolidationPeriodDays: number;
  /** Whether these can be parent-reported or need professional observation */
  parentReportable: boolean;
  note: string;
}

export const TRANSITION_CRITERIA: TransitionCriteria[] = [
  {
    fromSubLevel: "discoverer_1",
    toSubLevel: "discoverer_2",
    requiredSignals: [
      { signal: "Следует за точкой или взглядом взрослого", frequency: "3x_across_sessions", context: "any" },
      { signal: "Прерывает игру и смотрит на лицо взрослого", frequency: "3x_in_one_session", context: "any" },
      { signal: "Тянется к взрослому (не к предмету)", frequency: "3x_across_sessions", context: "any" },
    ],
    consolidationPeriodDays: 7,
    parentReportable: true,
    note: "Главный маркер: ребёнок начинает включать взрослого в свой мир — хотя бы взглядом.",
  },
  {
    fromSubLevel: "discoverer_2",
    toSubLevel: "communicator_1",
    requiredSignals: [
      { signal: "Треугольник взгляда: игрушка → взрослый → игрушка", frequency: "3x_across_sessions", context: "any" },
      { signal: "Даёт или протягивает объект взрослому", frequency: "3x_across_sessions", context: "any" },
      { signal: "Звук + жест одновременно (не случайно)", frequency: "3x_in_one_session", context: "any" },
    ],
    consolidationPeriodDays: 7,
    parentReportable: true,
    note: "Ключ: намеренность. Ребёнок выбирает общение как инструмент.",
  },
  {
    fromSubLevel: "communicator_1",
    toSubLevel: "communicator_2",
    requiredSignals: [
      { signal: "Указательный жест (proto-declarative или proto-imperative)", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "Устойчивый звукокомплекс со значением (хотя бы один)", frequency: "3x_across_sessions", context: "any" },
      { signal: "Настойчивость: повторяет сигнал если проигнорировали", frequency: "3x_across_sessions", context: "any" },
    ],
    consolidationPeriodDays: 10,
    parentReportable: true,
    note: "Появление указательного жеста — ключевой переход. Это открытие, что жест меняет мир.",
  },
  {
    fromSubLevel: "communicator_2",
    toSubLevel: "first_words_1",
    requiredSignals: [
      { signal: "Узнаваемое слово или приближение, используемое в контексте", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "То же слово используется в двух разных ситуациях", frequency: "3x_across_sessions", context: "any" },
      { signal: "Имитирует знакомые звуки и слова при поддержке", frequency: "3x_in_one_session", context: "supported" },
    ],
    consolidationPeriodDays: 10,
    parentReportable: true,
    note: "Не требовать 'правильное' произношение. Приближение = слово.",
  },
  {
    fromSubLevel: "first_words_1",
    toSubLevel: "first_words_2",
    requiredSignals: [
      { signal: "10–15 слов, используемых спонтанно", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "Слово используется в новом контексте (обобщение)", frequency: "3x_across_sessions", context: "spontaneous_only" },
      { signal: "Имитирует новые слова в разговоре", frequency: "3x_in_one_session", context: "supported" },
    ],
    consolidationPeriodDays: 10,
    parentReportable: true,
    note: "Обобщение слова — это понимание категории, не просто ярлык.",
  },
  {
    fromSubLevel: "first_words_2",
    toSubLevel: "first_words_3",
    requiredSignals: [
      { signal: "25+ слов в активном словаре", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "Слова из разных категорий (имена, действия, наречия)", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "Иногда ставит два слова рядом", frequency: "3x_across_sessions", context: "any" },
    ],
    consolidationPeriodDays: 7,
    parentReportable: true,
    note: "Начало лексического взрыва: новые слова каждый день.",
  },
  {
    fromSubLevel: "first_words_3",
    toSubLevel: "combiner_1",
    requiredSignals: [
      { signal: "Первые стабильные двухсловные сочетания (5+ разных пар)", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "50+ слов в активном словаре", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "Двухсловные сочетания в разных контекстах", frequency: "3x_across_sessions", context: "any" },
    ],
    consolidationPeriodDays: 10,
    parentReportable: true,
    note: "Комбинирование — качественный скачок. Не количественный.",
  },
  {
    fromSubLevel: "combiner_1",
    toSubLevel: "combiner_2",
    requiredSignals: [
      { signal: "Разнообразие семантических ролей в комбинациях", frequency: "consistently_spontaneous", context: "spontaneous_only" },
      { signal: "Трёхэлементные высказывания (хотя бы несколько)", frequency: "3x_across_sessions", context: "any" },
      { signal: "Первые грамматические морфемы (-а, -и, мой/моя)", frequency: "3x_across_sessions", context: "any" },
    ],
    consolidationPeriodDays: 14,
    parentReportable: true,
    note: "Свобода комбинирования — ребёнок изобретает новые пары, не только повторяет заученные.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — ENGINE: RUNTIME ADAPTATION
// ═══════════════════════════════════════════════════════════════════════════════

export interface AdaptedSession {
  subLevel: StageSubLevel;
  speechProfile: AdultSpeechProfile;
  interactionProfile: InteractionProfile;
  activityAdaptation: ActivityAdaptation;
  promptLibrary: PromptLibrary;
  transitionWatch: TransitionCriteria | null;
  sessionBrief: string;         // one paragraph for the parent before play
  inSessionCoachCards: string[]; // 4 micro-prompts to show during play
}

export function adaptSession(subLevelId: string): AdaptedSession {
  const subLevel = STAGE_SUB_LEVELS.find((s) => s.id === subLevelId)
    ?? STAGE_SUB_LEVELS.find((s) => s.id === "first_words_1")!;

  const speechProfile = buildAdultSpeechProfile(subLevel);
  const interactionProfile = buildInteractionProfile(subLevel);
  const activityAdaptation = buildActivityAdaptation(subLevel);
  const promptLibrary = buildPromptLibrary(subLevel);
  const transitionWatch =
    TRANSITION_CRITERIA.find((t) => t.fromSubLevel === subLevel.id) ?? null;

  const phraseLabel = speechProfile.phraseLength === "4+"
    ? "полными предложениями"
    : speechProfile.phraseLength === 1
    ? "одним словом"
    : `${speechProfile.phraseLength} словами`;

  const sessionBrief =
    `${subLevel.summary} ` +
    `Сейчас говори ${phraseLabel}, делай паузу ${speechProfile.pauseAfterKey} секунд после ключевого слова. ` +
    `${subLevel.adultFocus}`;

  const inSessionCoachCards = [
    interactionProfile.owlScript,
    promptLibrary.owlReminder,
    promptLibrary.signalResponse,
    transitionWatch?.requiredSignals[0]
      ? `Смотри за этим: ${transitionWatch.requiredSignals[0].signal}`
      : promptLibrary.disengagementPlan,
  ];

  return {
    subLevel,
    speechProfile,
    interactionProfile,
    activityAdaptation,
    promptLibrary,
    transitionWatch,
    sessionBrief,
    inSessionCoachCards,
  };
}

// ─── Profile-based auto-placement ─────────────────────────────────────────────

/** Infer the most appropriate sub-level from a child's observed milestone profile */
export function inferSubLevel(profile: {
  wordCount: number;
  hasTwoWordCombos: boolean;
  hasPointingGesture: boolean;
  hasJointAttentionTriangle: boolean;
  hasIntentionalSignals: boolean;
  hasAnyWords: boolean;
}): string {
  if (profile.hasTwoWordCombos && profile.wordCount >= 50) return "combiner_1";
  if (profile.hasTwoWordCombos) return "combiner_1";
  if (profile.wordCount >= 25) return "first_words_3";
  if (profile.wordCount >= 10) return "first_words_2";
  if (profile.hasAnyWords) return "first_words_1";
  if (profile.hasPointingGesture) return "communicator_2";
  if (profile.hasIntentionalSignals && profile.hasJointAttentionTriangle) return "communicator_1";
  if (profile.hasJointAttentionTriangle) return "discoverer_2";
  return "discoverer_1";
}

// ─── Index and utilities ──────────────────────────────────────────────────────

export function getSubLevel(id: string): StageSubLevel | undefined {
  return STAGE_SUB_LEVELS.find((s) => s.id === id);
}

export function getSubLevelsByStage(stage: CommunicationStage): StageSubLevel[] {
  return STAGE_SUB_LEVELS.filter((s) => s.stage === stage);
}

export function getNextSubLevel(currentId: string): StageSubLevel | null {
  const idx = STAGE_SUB_LEVELS.findIndex((s) => s.id === currentId);
  return idx >= 0 && idx < STAGE_SUB_LEVELS.length - 1
    ? STAGE_SUB_LEVELS[idx + 1]
    : null;
}

export const ALL_SUB_LEVEL_IDS = STAGE_SUB_LEVELS.map((s) => s.id);
