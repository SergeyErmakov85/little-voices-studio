// Hanen "It Takes Two to Talk" — Interactive Therapy Mechanics
// Each mechanic maps to a real activity with digital enhancement and coaching scaffolds.

export type CommunicationStage =
  | "discoverer"       // pre-intentional, 0–3 signals
  | "communicator"     // intentional but pre-verbal
  | "first_words"      // 1–10 words emerging
  | "combiner";        // beginning to combine words

export type SensoryChannel = "visual" | "auditory" | "tactile" | "vestibular" | "proprioceptive";
export type SpeechTarget = string; // e.g. "more", "up", "go", "uh-oh"

export interface AdultGuidance {
  owl: string;        // Observe–Wait–Listen prompt
  fourS: string;      // Say less, Stress, Go Slow, Stop
  strategy: string;   // specific Hanen tip for this moment
  waitCue: string;    // what the adult should visually/physically signal
  responseCue: string; // how to respond if child vocalizes or initiates
}

export interface DigitalEnhancement {
  trigger: "child_touch" | "adult_touch" | "vocalization" | "toy_proximity" | "auto_timed";
  visualEffect: string;
  soundEffect: string;
  celebrationLevel: "subtle" | "warm" | "magical"; // never overwhelming
  loopBehavior: "once" | "loop_until_touch" | "idle_shimmer";
}

export interface TherapyMechanic {
  id: string;
  name: string;
  stages: CommunicationStage[];
  toyCategory: string;
  duration: string; // "3–5 min"

  // Core structure
  adultGuidance: AdultGuidance;
  expectedChildInteraction: string[];   // observable behaviors to watch for
  realWorldInteraction: string;         // what physically happens with the toy
  digitalEnhancement: DigitalEnhancement;

  // Targets
  speechTargets: SpeechTarget[];
  sensoryTargets: SensoryChannel[];
  communicationGoals: string[];

  // Emotional layer
  emotionalReinforcement: {
    attempt: string;   // response to any attempt (vocalization, gesture, eye contact)
    success: string;   // response to a clear communication act
    noResponse: string; // what to do if child is quiet / disengaged
  };

  // Communication temptations embedded
  communicationTemptations: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 1 — STACKING CUPS: "Tower of Stars"
// ─────────────────────────────────────────────────────────────────────────────
export const towerOfStars: TherapyMechanic = {
  id: "tower-of-stars",
  name: "Tower of Stars",
  stages: ["discoverer", "communicator", "first_words"],
  toyCategory: "stacking_cups",
  duration: "3–5 min",

  adultGuidance: {
    owl:
      "Place a cup in front of the child. Do nothing. Watch their eyes — are they looking at the cup, at you, or back and forth? That triangle of gaze is joint attention. Wait 5 full seconds.",
    fourS:
      "Say ONE word when you stack: 'Up.' Pause. 'Up.' Use a rising tone as the tower grows. Stop talking between cups — silence is a communication invitation.",
    strategy:
      "Follow the child's lead. If they knock it down before you finish, celebrate that. Knocking IS communication. Rebuild and give them a cup to add.",
    waitCue:
      "Hold a cup at chest level, lean slightly forward, raise eyebrows. Your body says 'your turn' without a single word.",
    responseCue:
      "If child reaches, vocalizes, or looks at you — immediately give the cup and mirror their sound. 'Uh! Up it goes!'",
  },

  expectedChildInteraction: [
    "eye contact alternating between toy and adult (joint attention triangle)",
    "reaching toward cups (pre-intentional request)",
    "vocalizing during stacking ('uh', 'ah', 'eh')",
    "knocking tower deliberately and checking adult's face",
    "handing a cup to adult (first turn-taking)",
    "pointing at fallen cups",
    "approximating 'up' or 'more'",
  ],

  realWorldInteraction:
    "Adult and child sit face-to-face on the floor with 6–8 colored stacking cups. Adult stacks one cup slowly, waits, offers a cup to child. Child stacks, knocks, requests more cups. Routine alternates: adult turn → wait → child turn.",

  digitalEnhancement: {
    trigger: "child_touch",
    visualEffect:
      "Each cup added spawns a soft floating star trail that drifts upward. When the tower reaches full height, a golden shimmer radiates outward. Knock-down triggers a gentle cascade of sparkles — celebratory, not alarming.",
    soundEffect:
      "Soft rising chime per cup added. A warm 'whoosh' on knock-down. No jarring sounds — ambience stays magical and calm.",
    celebrationLevel: "warm",
    loopBehavior: "idle_shimmer",
  },

  speechTargets: ["up", "more", "down", "uh-oh", "go", "mama", "papa"],
  sensoryTargets: ["visual", "tactile", "proprioceptive"],

  communicationGoals: [
    "Establish joint attention triangle (toy ↔ adult ↔ toy)",
    "Elicit intentional communication to request more cups",
    "Reinforce turn-taking as a social routine",
    "Create repeated opportunities for 'more' and 'up' approximations",
    "Build cause-and-effect understanding through knock-down celebration",
  ],

  emotionalReinforcement: {
    attempt:
      "Any vocalization or reach → immediate warm smile, eye contact, give the cup. 'Yes! You said it! Here!'",
    success:
      "Clear 'more' or 'up' → animated celebration on screen + adult's enthusiastic mirroring. The character on screen dances briefly.",
    noResponse:
      "After 5s of no engagement: adult gently knocks one cup off, laughs, says 'uh-oh' — then waits again. Reset the invitation without pressure.",
  },

  communicationTemptations: [
    "Place the most exciting cup (largest or shiniest) just out of reach — child must signal to get it.",
    "Stack 3 cups, then pause with the 4th cup behind your back — child must look at you and signal.",
    "Pretend not to notice when tower is complete — wait for child to tap you or vocalize.",
    "Stack it wrong (small cup on large) and look at child with a confused face — invite correction.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 2 — POUNDING TOY: "Boom Drum"
// ─────────────────────────────────────────────────────────────────────────────
export const boomDrum: TherapyMechanic = {
  id: "boom-drum",
  name: "Boom Drum",
  stages: ["discoverer", "communicator", "first_words"],
  toyCategory: "pounding_toy",
  duration: "3–5 min",

  adultGuidance: {
    owl:
      "Watch the child's energy level first. High energy → fast pounding is appropriate. Calm → start slow. OWL before every turn: what is their body telling you about what they need?",
    fourS:
      "Say 'boom' — once, loud, joyful. Then wait. Let silence invite repetition. If they pound again, say it again. You are not teaching; you are narrating what they do.",
    strategy:
      "Parallel play narration: pound your hand on the table in rhythm with theirs. Show them you're IN it with them. Shared rhythm is a proto-conversation.",
    waitCue:
      "Hold the hammer up toward child. Big anticipatory pause. Lean in. Eyebrows up. '…?'",
    responseCue:
      "Match their rhythm with sound: 'boom — boom — BOOM!' Mirror their intensity and pace.",
  },

  expectedChildInteraction: [
    "spontaneous pounding with whole-body involvement",
    "alternating eye contact between hammer, adult, screen",
    "vocalizing impact sounds ('ba', 'buh', 'da')",
    "requesting hammer back with reach or vocalization",
    "imitating adult's single pound after demonstration",
    "handing hammer to adult to initiate turn",
  ],

  realWorldInteraction:
    "Child uses a xylophone-style pounding toy or drum. Adult has a matching surface (table, second drum). They pound in turn or together, building a shared rhythm ritual. Adult controls pace by holding the hammer between turns.",

  digitalEnhancement: {
    trigger: "toy_proximity",
    visualEffect:
      "Microphone or tablet detects impact sound. Each boom creates a ripple of color — warm orange for soft hits, deep magenta for strong hits. Ripples merge when parent and child pound together.",
    soundEffect:
      "Resonant, warm drum echo layered under the physical sound. Never replaces it — only enriches.",
    celebrationLevel: "warm",
    loopBehavior: "once",
  },

  speechTargets: ["boom", "bang", "more", "go", "again", "stop"],
  sensoryTargets: ["auditory", "tactile", "proprioceptive", "vestibular"],

  communicationGoals: [
    "Build turn-taking through rhythmic exchange",
    "Elicit imitation of impact vocalization",
    "Reinforce intentional communication through physical cause-and-effect",
    "Create shared emotional experience through synchronized rhythm",
    "Scaffold 'go', 'stop', 'more' in a high-motivation context",
  ],

  emotionalReinforcement: {
    attempt:
      "Any impact → adult immediately mirrors with their own pound and matching sound. Eye contact + smile + 'boom!'",
    success:
      "Child waits for their turn and then pounds → screen ripple + adult says their vocalization back with delight.",
    noResponse:
      "Adult pounds slowly, pauses, looks at child, waits 5s. If still no engagement, gently places child's hand on hammer — offers, doesn't push.",
  },

  communicationTemptations: [
    "Hold the hammer on your lap and look away — child must signal to get it back.",
    "Pound three times fast, then freeze and look at child with anticipation.",
    "Start the rhythm, miss a beat deliberately — child often fills the gap with sound or action.",
    "Dramatically hide the hammer behind your back and look around 'confused'.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 3 — MAGNETIC FISHING: "Fish Pond Wishes"
// ─────────────────────────────────────────────────────────────────────────────
export const fishPondWishes: TherapyMechanic = {
  id: "fish-pond-wishes",
  name: "Fish Pond Wishes",
  stages: ["communicator", "first_words", "combiner"],
  toyCategory: "magnetic_fishing",
  duration: "5–8 min",

  adultGuidance: {
    owl:
      "Watch what color fish the child reaches for first — that is their communication preference. Follow it. Comment on THAT fish first, not the most 'correct' one.",
    fourS:
      "Name the fish color only when the child holds it up. 'Fish. Red fish.' Two words max. Pause. Hold eye contact and wait for them to show you the next one.",
    strategy:
      "Sabotage gently: put 3 fish in the pond, then put one more in very slowly while they watch. That slow addition creates a communication temptation — child wants to 'catch' it.",
    waitCue:
      "Drop your fishing rod into the water, look at child, then back at water. Waiting body language: still, attentive, open.",
    responseCue:
      "Child catches a fish → pause 3 seconds. Look at them expectantly. If they vocalize anything, expand it: 'Fish! Blue fish caught!' Then celebrate.",
  },

  expectedChildInteraction: [
    "sustained joint attention on shared activity (>30s)",
    "requesting specific fish by pointing or reaching",
    "vocalizing or naming colors/animals when catching",
    "handing caught fish to adult (sharing / showing)",
    "indicating 'finished' or 'more fish' through gesture or word",
    "initiating play by picking up rod unprompted",
  ],

  realWorldInteraction:
    "Small magnetic fishing set with colored fish. Both adult and child have rods. Adult catches a fish, holds it up, waits. Child catches theirs, brings it to adult. Caught fish are placed in a shared 'keeper bucket' — a shared reference point.",

  digitalEnhancement: {
    trigger: "adult_touch",
    visualEffect:
      "Each 'caught' fish registered on screen causes a matching illustrated fish to swim onto a glowing pond scene. Collected fish appear as luminous silhouettes in an underwater backdrop.",
    soundEffect:
      "Gentle water sounds. Soft 'plop' when fish is registered. Collected fish make a soft, warm chime. When all fish are caught, the pond glows gold and a gentle melody plays.",
    celebrationLevel: "magical",
    loopBehavior: "idle_shimmer",
  },

  speechTargets: ["fish", "blue", "red", "yellow", "big", "more", "got it", "my turn"],
  sensoryTargets: ["visual", "tactile"],

  communicationGoals: [
    "Extend joint attention duration through shared goal (filling the pond)",
    "Elicit naming of colors and animals in natural context",
    "Reinforce turn-taking ('my turn / your turn') as verbal routine",
    "Scaffold 'more' and 'all done' in motivated context",
    "Build showing / sharing behavior as communication function",
  ],

  emotionalReinforcement: {
    attempt:
      "Any vocalization during catch → adult mirrors the sound joyfully, adds the word: 'Fa! Fish! You caught a fish!'",
    success:
      "Child names or approximates color → the corresponding fish on screen glows and swims in a special celebration path.",
    noResponse:
      "Make the fishing rod do something funny (tangle it, drop it, pretend fish stole it) — humor resets attention without pressure.",
  },

  communicationTemptations: [
    "Put a fish in the bucket before child can reach it — they must signal protest or request.",
    "Hand child the rod with no fish on it — they must tell you something is missing.",
    "Catch a fish and hold it out toward child without saying anything. Wait for them to signal they want it or name it.",
    "Fill the bucket 'wrong' (put a cup instead of fish) — child often spontaneously communicates the error.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 4 — SORTING GAME: "Color Village"
// ─────────────────────────────────────────────────────────────────────────────
export const colorVillage: TherapyMechanic = {
  id: "color-village",
  name: "Color Village",
  stages: ["first_words", "combiner"],
  toyCategory: "sorting_game",
  duration: "5–8 min",

  adultGuidance: {
    owl:
      "Let the child sort 'wrong' first. Watch their theory. Some children sort by shape, some by size, some by nothing visible to you. That IS their communication about the world. Observe before redirecting.",
    fourS:
      "When child places a piece: say its color or shape name once. 'Yellow.' Then point to the matching hole and wait. Don't say 'No' — say nothing. Expectant silence.",
    strategy:
      "Self-talk narration: sort your own pieces aloud in simple phrases. 'Blue circle. Goes here. In!' Model without directing.",
    waitCue:
      "Hold a piece toward child, tilt it toward the correct hole, then freeze and wait. Your physical signal says 'your turn' without words.",
    responseCue:
      "Correct placement → celebrate the ATTEMPT, not the outcome. Even if wrong hole: 'You tried! In! Hmm, not quite. Let's see...' Warm, calm, curious.",
  },

  expectedChildInteraction: [
    "independently attempting to place pieces (agency and initiation)",
    "looking at adult when piece doesn't fit (requesting help)",
    "pointing at the correct hole (non-verbal communication)",
    "naming colors or shapes spontaneously",
    "protesting when adult takes a piece they wanted",
    "requesting 'more' pieces when board is cleared",
    "celebrating successful placement with vocalization or body language",
  ],

  realWorldInteraction:
    "Color/shape sorting board with removable pieces. Adult and child each have pieces. They take turns. Adult deliberately makes mistakes and looks to child for correction. Pieces are held in a bag so child must request the next one.",

  digitalEnhancement: {
    trigger: "adult_touch",
    visualEffect:
      "Correct piece placed → the matching house or character in the 'Color Village' scene on screen lights up with a warm glow. When all pieces placed, the village comes fully alive with gentle animation: birds fly, smoke rises, lights twinkle.",
    soundEffect:
      "Soft 'click' sound per placement. Each color has a distinct musical note — the full village makes a chord when complete.",
    celebrationLevel: "magical",
    loopBehavior: "loop_until_touch",
  },

  speechTargets: ["in", "here", "yellow", "blue", "red", "circle", "square", "no", "yes", "help"],
  sensoryTargets: ["visual", "tactile"],

  communicationGoals: [
    "Elicit requesting behavior for pieces held by adult",
    "Scaffold 'help' as a communicative function",
    "Build color and shape vocabulary in motivated, natural context",
    "Reinforce error-repair communication ('no, here!')",
    "Establish adult as responsive partner, not director",
  ],

  emotionalReinforcement: {
    attempt:
      "Any attempt to place a piece → warm affirming sound and eye contact, regardless of correctness.",
    success:
      "Correct placement + any vocalization → character in the village waves at child from the screen.",
    noResponse:
      "Place a piece obviously wrong, look confused, and wait. Humor and 'mistakes' reliably pull children back into interaction.",
  },

  communicationTemptations: [
    "Give child a piece that doesn't belong to this board — they must communicate the mismatch.",
    "Put the bag of remaining pieces on your lap, not on the table — child must approach you to signal for more.",
    "Suddenly 'lose' one piece (slide it behind your back) — child initiates search communication.",
    "Fill one slot yourself, then pause before the last one and look at child expectantly.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 5 — BUBBLE ROUTINE: "Bubble Magic" (no toy — pure routine)
// ─────────────────────────────────────────────────────────────────────────────
export const bubbleMagic: TherapyMechanic = {
  id: "bubble-magic",
  name: "Bubble Magic",
  stages: ["discoverer", "communicator", "first_words"],
  toyCategory: "sensory_play",
  duration: "3–5 min",

  adultGuidance: {
    owl:
      "After blowing one bubble — stop. Close the wand. Look at the child. Wait. This is the most powerful OWL moment: they almost always signal for more within 5 seconds.",
    fourS:
      "One word: 'Bubbles.' Blow. Look at child. That's it. No running commentary. The bubbles do the work — your silence creates the need to communicate.",
    strategy:
      "Hold the wand up in ready position but do NOT blow. Your expectant face and frozen body are the invitation. Wait for eye contact + any signal. Then blow.",
    waitCue:
      "Wand near mouth. Eyes wide. Eyebrows up. Completely still. Exaggerated 'ready' posture. This non-verbal script teaches 'if I signal, magic happens.'",
    responseCue:
      "Any look, reach, vocalization, or body movement toward you → immediately blow a big cloud. 'You asked! Bubbles!'",
  },

  expectedChildInteraction: [
    "shifting gaze from bubbles to adult face (joint attention pivot)",
    "reaching toward wand or adult's mouth",
    "vocalizing 'buh', 'ba', 'moh' (approximations)",
    "pointing at bubbles",
    "taking adult's hand and moving it toward the bubbles",
    "blowing themselves (imitation)",
    "clapping when bubbles pop",
  ],

  realWorldInteraction:
    "Adult blows one small cluster of bubbles. Both watch them float. Adult closes wand and waits in exaggerated anticipatory posture. Child signals → adult responds immediately → repeat. This exact ritual creates the most powerful 'I can make things happen' experience.",

  digitalEnhancement: {
    trigger: "vocalization",
    visualEffect:
      "If microphone detects child's vocalization during the wait moment, soft digital bubbles drift across the screen in response — not a replacement, but a magical echo that says 'your sound did something.'",
    soundEffect:
      "Gentle tinkling when digital bubbles appear. Real bubble pops are enough — digital sound is subtle.",
    celebrationLevel: "subtle",
    loopBehavior: "once",
  },

  speechTargets: ["bubble", "more", "blow", "pop", "again", "go"],
  sensoryTargets: ["visual", "auditory", "vestibular"],

  communicationGoals: [
    "Create the most powerful 'I can communicate' experience in 3–5 minutes",
    "Establish joint attention pivot (toy → adult face → toy)",
    "Reinforce intentional communication initiation",
    "Scaffold 'more' and 'again' as first functional words",
    "Teach that adult responds to the child's signals — not the reverse",
  ],

  emotionalReinforcement: {
    attempt:
      "ANY signal of any kind → blow immediately, smile, name what they did: 'You looked at me! Bubbles!' Over time raise the bar slightly — wait for a louder signal — but always, always respond.",
    success:
      "Clear 'more' or 'buh' → adult visibly reacts with delight before blowing: 'You SAID it! Bubbles coming!' The reaction IS the reward.",
    noResponse:
      "Wait the full 10 seconds. If nothing: blow one small bubble. Let it land on the child gently. Reset joint attention. Wait again.",
  },

  communicationTemptations: [
    "Open the container, hold it up, say nothing, look at child and wait.",
    "Blow a bubble — then hold wand to child's mouth to try blowing themselves.",
    "Pop a bubble dramatically and freeze, staring at child with huge eyes.",
    "Put the bubbles 'away' in your bag. Wait. Child almost always signals for more.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 6 — MEMORY GAME: "Who's Hiding?"
// ─────────────────────────────────────────────────────────────────────────────
export const whosHiding: TherapyMechanic = {
  id: "whos-hiding",
  name: "Who's Hiding?",
  stages: ["first_words", "combiner"],
  toyCategory: "memory_game",
  duration: "5–8 min",

  adultGuidance: {
    owl:
      "Before each flip, watch the child's eyes — they often already know the answer but look at you first to gauge the social context. That gaze is a communication act. Acknowledge it.",
    fourS:
      "When a pair is found: name the animal once. 'Dog! Two dogs!' Stop there. Wait for child's reaction before adding anything.",
    strategy:
      "Exaggerate anticipation before flipping. Slow motion reveal. Build the dramatic pause — it holds attention and creates the emotional arc that triggers vocalization.",
    waitCue:
      "Finger on card, looking at child. Pause 3 seconds. Then flip slowly.",
    responseCue:
      "Child names or approximates → expand: 'Dog! Yes, big dog!' Never correct — only expand.",
  },

  expectedChildInteraction: [
    "sustained attention through multiple turns (attention endurance)",
    "naming or approximating animal sounds before or during reveal",
    "pointing at matching pairs",
    "expressing anticipation (leaning forward, vocalizing)",
    "requesting a specific card by pointing",
    "protesting when adult gets a turn instead of them",
    "narrating actions: 'mine!', 'found it!', 'no!'",
  ],

  realWorldInteraction:
    "Simple animal memory card pairs face down. Adult and child alternate flipping two cards each turn. Mismatches are flipped back — adult models 'oh no!' emotion. Matches stay visible. The shared emotional arc of reveal–match–celebrate drives communication.",

  digitalEnhancement: {
    trigger: "adult_touch",
    visualEffect:
      "Each matched pair triggers the animal to appear animated on screen — the dog wags its tail, the cat stretches, the bird flaps. Animals stay on screen as 'friends collected,' building a growing visible community.",
    soundEffect:
      "Each animal makes its sound when matched — soft, warm, not jarring. A gentle fanfare when all pairs are collected.",
    celebrationLevel: "warm",
    loopBehavior: "idle_shimmer",
  },

  speechTargets: ["dog", "cat", "bird", "more", "found it", "match", "no", "yes", "my turn", "again"],
  sensoryTargets: ["visual", "tactile"],

  communicationGoals: [
    "Build sustained joint attention through shared narrative (anticipation → reveal → reaction)",
    "Elicit animal vocabulary in natural, motivated context",
    "Scaffold turn-taking as a verbal social routine",
    "Create natural use of negation ('no match!') and affirmation ('yes!')",
    "Reinforce emotional commentary as communication ('uh-oh!', 'yay!')",
  ],

  emotionalReinforcement: {
    attempt:
      "Any animal sound or approximation → adult mirrors it with delight before confirming: 'Woof! Yes! Dog!'",
    success:
      "Clear naming → the animal on screen 'reacts' to being called by name (turns toward camera, tilts head).",
    noResponse:
      "Make a mismatch dramatically — 'oh NOOOOO' — and flip cards back in exaggerated slow motion. Resets engagement without words.",
  },

  communicationTemptations: [
    "Find a pair, but hold both cards face-down toward child. Wait for them to signal which they want to see.",
    "Put one card face-up in front of child without showing its pair — child must communicate about looking for it.",
    "Pretend to forget the rule — stack three cards together. Child often corrects the error.",
    "At the last pair, flip one over and freeze. Wait for child to flip the second.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 7 — BATH ROUTINE: "Splashy Story" (routine-based therapy)
// ─────────────────────────────────────────────────────────────────────────────
export const splashyStory: TherapyMechanic = {
  id: "splashy-story",
  name: "Splashy Story",
  stages: ["discoverer", "communicator", "first_words"],
  toyCategory: "routine_bath",
  duration: "10–15 min",

  adultGuidance: {
    owl:
      "Before washing each body part — pause. Look at the child's hand. Look at the soap. Look at the child. This 3-point OWL creates a micro joint attention moment before every action.",
    fourS:
      "Name the body part only while touching it: 'Hand. Wash hand.' Then wait. If child lifts the other hand for washing — that IS communication. Respond to it.",
    strategy:
      "Build predictable bath scripts: same words every night in the same order. Predictability creates space for the child to fill in the gap with a word or sound. After 10 nights, pause before 'toes' — they will often supply it.",
    waitCue:
      "Hold out a toy fish or cup toward the water. Freeze. Look at child with anticipation.",
    responseCue:
      "Child splashes, vocalizes, or points at water → label the action immediately: 'Splash! You splashed!'",
  },

  expectedChildInteraction: [
    "anticipating routine steps (reaching toward soap, lifting limbs)",
    "requesting continuation with vocalization or body movement",
    "pointing at water toys",
    "filling in routine script gaps ('toes!' in familiar sequence)",
    "protesting end of bath (communicative function: rejection)",
    "requesting specific toys in bath",
    "imitating bath sounds: 'swoosh', 'splish'",
  ],

  realWorldInteraction:
    "Bath with 2–3 simple water toys (cups, rubber animal, small boat). Adult and child do bath as a cooperative ritual. Adult uses water toys to narrate each step: duck 'swims' over to wash the arm, cup 'pours' water on toes. Each toy action is a communication temptation.",

  digitalEnhancement: {
    trigger: "auto_timed",
    visualEffect:
      "Tablet in bath-safe holder shows a soft underwater scene. As bath progresses (timed segments), new fish and bubbles drift in. Not interactive — ambient. Creates a magical atmosphere without pulling child's attention from parent.",
    soundEffect:
      "Gentle underwater ambient music. No loud effects — calm sensory backdrop that enhances without distracting.",
    celebrationLevel: "subtle",
    loopBehavior: "idle_shimmer",
  },

  speechTargets: ["wash", "water", "more", "done", "toes", "hand", "splash", "duck", "pour", "clean"],
  sensoryTargets: ["tactile", "vestibular", "auditory", "visual"],

  communicationGoals: [
    "Establish bath as a high-frequency, low-pressure communication routine",
    "Build script-based language through ritual repetition",
    "Create 10+ daily communication opportunities in natural context",
    "Scaffold protest, request, and comment as communicative functions",
    "Reinforce that adult is attuned and responsive to all signals",
  ],

  emotionalReinforcement: {
    attempt:
      "Any vocalization during bath → narrate it: 'You splashed! You said something! Splash!'",
    success:
      "Child fills in a word from the routine script → adult celebrates with physical response (a big gentle splash back, a towel toss).",
    noResponse:
      "Make the duck do something unexpected (dive under water, swim to other side) — novelty resets joint attention without any demand.",
  },

  communicationTemptations: [
    "Hold shampoo bottle up and look at child's head — wait for signal that they understand what's coming.",
    "Pour water slowly next to child, not on them — wait for them to signal 'on me!'",
    "Let the drain plug 'slip out' — child almost always signals alarm or delight.",
    "Put all bath toys in a bucket out of reach — child must signal for each one.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MECHANIC 8 — LOCK AND KEY: "Secret Garden Door"
// ─────────────────────────────────────────────────────────────────────────────
export const secretGardenDoor: TherapyMechanic = {
  id: "secret-garden-door",
  name: "Secret Garden Door",
  stages: ["communicator", "first_words", "combiner"],
  toyCategory: "lock_key_toy",
  duration: "5–8 min",

  adultGuidance: {
    owl:
      "Watch how the child approaches the lock — do they try the key independently, or do they immediately look to you? That first behavior tells you their current communication confidence level.",
    fourS:
      "When child struggles: wait 5 seconds. Say 'Help?' — just that one word, with a questioning face. If they reach toward you, give assistance. If they look away, let them keep trying.",
    strategy:
      "Control the keys: give child one key at a time from a set in your hand. Each exchange is a turn-taking communication moment. Child signals → you give the next key.",
    waitCue:
      "Hold all remaining keys visibly in your open palm. Look at child. Don't offer them — let child reach for them. That reach IS the request.",
    responseCue:
      "Correct key match → join in their celebration. Wrong key → 'Hmm. Not this one.' — neutral, curious, not corrective.",
  },

  expectedChildInteraction: [
    "persisting through challenge (frustration tolerance in communication context)",
    "requesting help by looking at adult or reaching toward them",
    "attempting to verbalize 'help', 'open', 'no'",
    "celebrating success (vocalization + body language)",
    "indicating a preference for which lock to try next",
    "rejecting the wrong key with gesture or word",
  ],

  realWorldInteraction:
    "Lock-and-key toy set with 4–6 colored locks and matching keys. Adult holds the key set. Child has the locks in front of them. Each round: adult hands one key, child tries it. If it works — the 'door opens' (lock releases). Adult controls pacing through key distribution.",

  digitalEnhancement: {
    trigger: "adult_touch",
    visualEffect:
      "Each lock opened reveals a scene element: a flower blooms, a bird lands, a butterfly emerges — building a magical garden on screen. Final lock opens the 'gate' and the whole garden comes alive.",
    soundEffect:
      "Satisfying soft 'click' per lock. Each reveal has a gentle nature sound (birdsong, wind chime, water drop). Full garden completion: a warm orchestral swell that feels like arrival.",
    celebrationLevel: "magical",
    loopBehavior: "idle_shimmer",
  },

  speechTargets: ["open", "help", "no", "yes", "click", "key", "in", "done", "more", "try"],
  sensoryTargets: ["tactile", "visual", "auditory"],

  communicationGoals: [
    "Build 'help' as a functional first word through motivated context",
    "Reinforce intentional requesting behavior",
    "Scaffold repair communication ('no, this one!')",
    "Build persistence as a communicative stance (keeps trying → keeps engaging)",
    "Create natural 'success' emotional arc that motivates continued interaction",
  ],

  emotionalReinforcement: {
    attempt:
      "Any attempt to try a key → warm encouragement before outcome: 'You're trying! Go!'",
    success:
      "Lock opens → adult's reaction is the primary reward: gasp, wide eyes, 'YOU DID IT!' — then screen celebrates.",
    noResponse:
      "Pretend to struggle with a lock yourself — exaggerated effort face. Child often leans in to help.",
  },

  communicationTemptations: [
    "Offer the clearly wrong key with a mischievous face — wait for child to reject it.",
    "Lock all the locks again mid-play and look 'confused' about where the keys went.",
    "Give child the correct key but hold onto the lock yourself — two-person cooperation required.",
    "After a successful open, close the lock again before child can look inside. Their protest IS communication.",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// INDEX
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_MECHANICS: TherapyMechanic[] = [
  towerOfStars,
  boomDrum,
  fishPondWishes,
  colorVillage,
  bubbleMagic,
  whosHiding,
  splashyStory,
  secretGardenDoor,
];

export function getMechanicsForStage(stage: CommunicationStage): TherapyMechanic[] {
  return ALL_MECHANICS.filter((m) => m.stages.includes(stage));
}

export function getMechanicsForToy(toyCategory: string): TherapyMechanic[] {
  return ALL_MECHANICS.filter((m) => m.toyCategory === toyCategory);
}
