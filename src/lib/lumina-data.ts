export type Strategy = {
  id: string;
  short: string;
  name: string;
  tagline: string;
  color: "teal" | "sunset" | "pink" | "lavender";
  description: string;
  steps: string[];
};

export const strategies: Strategy[] = [
  {
    id: "owl",
    short: "OWL",
    name: "Observe, Wait, Listen",
    tagline: "Lean back. Let your child lead.",
    color: "teal",
    description:
      "The foundation of It Takes Two to Talk. Quiet your voice and your hands so your child's interest becomes visible. The conversation is already starting — you just have to notice it.",
    steps: [
      "Observe what Leo is looking at, touching, or moving toward.",
      "Wait a full five seconds before adding any words.",
      "Listen to every sound, gesture, or glance as a message worth answering.",
    ],
  },
  {
    id: "four-s",
    short: "4S",
    name: "Say Less, Stress, Go Slow, Show",
    tagline: "Make every word land.",
    color: "sunset",
    description:
      "Toddlers process one or two words at a time. Strip your sentences down, stress the key word, slow the rhythm, and pair language with a visible action so meaning is unmistakable.",
    steps: [
      "Say less — shorten to two or three words per turn.",
      "Stress the most important word with warmth and emphasis.",
      "Go slow — pause between words like notes in a song.",
      "Show — point, hold up, or act out the meaning.",
    ],
  },
  {
    id: "rock",
    short: "ROCK",
    name: "Routines that build language",
    tagline: "Repeat. Offer. Cue. Keep going.",
    color: "pink",
    description:
      "Predictable routines (snack, bath, hello-and-goodbye games) become language gyms. Repetition lets Leo anticipate what comes next — and step in with a word, gesture, or sound.",
    steps: [
      "Repeat the same words and actions every time the routine happens.",
      "Offer Leo a turn — pause expectantly and look at him.",
      "Cue him with a gesture or the first sound of the word.",
      "Keep the routine going so he can practise the same word many times.",
    ],
  },
  {
    id: "spark",
    short: "SPARK",
    name: "Create communication opportunities",
    tagline: "Engineer the moment to talk.",
    color: "lavender",
    description:
      "Set the room up so Leo needs to communicate to make something happen — a jar he can't open, a missing puzzle piece, a silly mistake. Every obstacle is an invitation.",
    steps: [
      "Put a favourite toy in sight but out of reach.",
      "Pause in the middle of a familiar routine and look surprised.",
      "Offer a tiny portion so Leo asks for more.",
      "Pretend you forgot a step — let him correct you.",
    ],
  },
];

export type Lesson = {
  id: string;
  module: string;
  title: string;
  strategyId: string;
  duration: string;
  summary: string;
  body: string;
  tryThis: string;
};

export const lessons: Lesson[] = [
  {
    id: "observe-the-glance",
    module: "Module 01 · OWL",
    title: "Observing the smallest glance",
    strategyId: "owl",
    duration: "6 min watch · 5 min practice",
    summary:
      "Learn to spot the tiny eye flicks, finger points, and reaches that tell you what Leo wants to talk about — before he has words.",
    body: "In this lesson you'll watch a real parent kneel on the floor with their child during free play. Notice how she doesn't ask questions, doesn't name objects, doesn't praise. She simply lowers herself to eye level and follows Leo's gaze. By the time she finally speaks, the topic of conversation has already been chosen by the child.",
    tryThis:
      "For the next 90 seconds of play, do not speak. Just notice what Leo notices. When you finally talk, talk about that one thing.",
  },
  {
    id: "the-magic-pause",
    module: "Module 02 · OWL",
    title: "The magic of the five-second pause",
    strategyId: "owl",
    duration: "4 min watch · routine play",
    summary:
      "Most adults wait less than a second for a child to respond. Five seconds changes everything — including the brain's confidence to try.",
    body: "Count one Pixar, two Pixar, three Pixar, four Pixar, five Pixar in your head while looking warmly at Leo. The first time, it will feel uncomfortable. By the third pause, Leo will fill the silence — with a sound, a syllable, a gesture, or eventually a word.",
    tryThis:
      "During snack, hold up a slice of apple. Pause for five seconds before handing it over. Reward any sound or look with the apple and a warm response.",
  },
  {
    id: "say-less-stress",
    module: "Module 03 · 4S",
    title: "Say less, then stress what matters",
    strategyId: "four-s",
    duration: "7 min watch · 5 min practice",
    summary:
      "Shrink the sentence, then warm the word that counts. Less language often means more language back.",
    body: "Instead of \"Oh look, is that the big blue car driving over here so fast?\", try \"Bluuue car. Vroom!\" Same idea, three words, with the key word painted in bold. Leo's brain can now hold it.",
    tryThis:
      "Pick one toy. Decide the one word you most want Leo to hear. Use it five times in two minutes, always stressed, always paired with the toy.",
  },
  {
    id: "build-a-rock",
    module: "Module 04 · ROCK",
    title: "Build a daily ROCK routine",
    strategyId: "rock",
    duration: "8 min watch · 7-day plan",
    summary:
      "Choose one daily moment — bath, breakfast, leaving the house — and turn it into a predictable communication ritual.",
    body: "Pick a moment that already happens. Add the same opening phrase (\"In the tub!\"), the same closing phrase (\"All done!\"), and the same key word in the middle. Repeat for seven days without changing it. Watch Leo start to fill in the words.",
    tryThis:
      "Tonight at bath time, say \"In the tub!\" before stepping in. \"All done!\" before stepping out. Use the same words tomorrow.",
  },
  {
    id: "spark-the-jar",
    module: "Module 05 · SPARK",
    title: "The jar Leo can't open",
    strategyId: "spark",
    duration: "5 min watch · prop required",
    summary:
      "Engineer a small, friendly problem that only you can solve — so asking for help becomes irresistible.",
    body: "Put a beloved snack inside a clear jar with a lid that Leo can't twist. Place it gently in his hands and lean back with kind, open eyes. The moment he looks up, reaches, vocalises — even a tiny grunt — respond as if he made a full request.",
    tryThis:
      "Use a clear container with three favourite blocks inside. Hand it over. Wait. Respond to any sound with \"Open!\" and open it together.",
  },
  {
    id: "interpret-the-grunt",
    module: "Module 06 · Responsive",
    title: "Interpret every grunt as a sentence",
    strategyId: "owl",
    duration: "3 min watch",
    summary:
      "A grunt is a draft. Your job is to translate it back warmly, in slightly more grown-up words.",
    body: "When Leo points at the window and grunts, you say \"Bird! You see the bird.\" When he hands you a cup and grunts, you say \"More milk, please.\" You're not correcting — you're modelling the next version of his own message.",
    tryThis:
      "Today, treat every sound Leo makes as if it were a real word. Reply in two or three words that fit the moment.",
  },
];

export type RoutineStep = {
  id: string;
  time: string;
  title: string;
  strategyId: string;
  cue: string;
  status: "done" | "active" | "upcoming";
};

export const todayRoutine: RoutineStep[] = [
  {
    id: "wake",
    time: "07:10",
    title: "Morning hello & milk",
    strategyId: "rock",
    cue: "Same greeting song. Pause before the last word.",
    status: "done",
  },
  {
    id: "breakfast",
    time: "07:45",
    title: "Breakfast bubbles",
    strategyId: "four-s",
    cue: "One word per spoonful. Stress 'more'.",
    status: "done",
  },
  {
    id: "picnic",
    time: "10:30",
    title: "The Magic Picnic",
    strategyId: "spark",
    cue: "Use blue blocks as sandwiches. Forget Leo's plate on purpose.",
    status: "active",
  },
  {
    id: "bath",
    time: "17:30",
    title: "Bath time ROCK",
    strategyId: "rock",
    cue: "Open with 'In the tub!'. Close with 'All done!'.",
    status: "upcoming",
  },
  {
    id: "story",
    time: "19:15",
    title: "Whispering Woods story",
    strategyId: "owl",
    cue: "Read slowly. Wait at the end of each page.",
    status: "upcoming",
  },
];

export const progressMilestones = [
  {
    label: "Initiation rate",
    value: 72,
    delta: "+24%",
    note: "Leo now starts about 7 in 10 play moments on his own.",
    color: "teal" as const,
  },
  {
    label: "Single-word attempts",
    value: 58,
    delta: "+12 this week",
    note: "New approximations: 'baw' (ball), 'mo' (more), 'go-go'.",
    color: "pink" as const,
  },
  {
    label: "Joint attention",
    value: 84,
    delta: "+9%",
    note: "Sustained shared focus is averaging 92 seconds per routine.",
    color: "lavender" as const,
  },
];

export type ChatMessage = {
  id: string;
  role: "elara" | "parent";
  text: string;
  meta?: string;
};

export const initialCoachThread: ChatMessage[] = [
  {
    id: "m1",
    role: "elara",
    text: "I noticed Leo lit up when you brought out the wooden blocks this morning. That's a perfect SPARK moment waiting to happen — want me to set one up for The Magic Picnic at 10:30?",
    meta: "Observed 9:42",
  },
  {
    id: "m2",
    role: "parent",
    text: "Yes please. He keeps stacking them without saying anything.",
  },
  {
    id: "m3",
    role: "elara",
    text: "Lovely. Here's the recipe: Put his favourite block just out of reach. Lean back. Don't ask 'do you want it?' — that's a yes/no trap. Instead, look at him warmly and wait. The first sound he makes, answer with one stressed word: 'Block!' and hand it over.",
    meta: "4S + SPARK · 30 sec to read",
  },
];