import "dotenv/config";

import { supabase } from "../config/supabase.js";
import { createEmbedding } from "../services/embedding.service.js";


const movies = [
  // =========================================================
  // HORROR / MYSTERY / THRILLER
  // =========================================================

  {
    title: "Sinners",
    year: 2025,
    description:
      "Twin brothers return to their hometown hoping to leave their troubled lives behind, only to discover that a sinister supernatural force is waiting for them.",
    genres: ["Horror", "Drama", "Thriller"],
    rating: 7.5,
    posterUrl: null,
    runtimeMinutes: 137,
    themes: [
      "family",
      "past trauma",
      "survival",
      "supernatural evil",
      "redemption",
    ],
    tone: ["dark", "tense", "sinister", "atmospheric", "frightening"],
    keywords: [
      "supernatural horror",
      "brothers",
      "evil force",
      "small town",
      "suspense",
    ],
  },

  {
    title: "Weapons",
    year: 2025,
    description:
      "A community is thrown into fear and confusion when children from the same class mysteriously disappear, leading to a disturbing investigation into what happened.",
    genres: ["Horror", "Mystery", "Thriller"],
    rating: 7.4,
    posterUrl: null,
    runtimeMinutes: 128,
    themes: [
      "disappearance",
      "community fear",
      "mystery",
      "investigation",
      "hidden evil",
    ],
    tone: ["dark", "disturbing", "mysterious", "tense", "unsettling"],
    keywords: [
      "horror mystery",
      "missing children",
      "investigation",
      "suspense",
      "psychological horror",
    ],
  },

  {
    title: "The Substance",
    year: 2024,
    description:
      "A fading celebrity uses a mysterious experimental substance that creates a younger version of herself, with disturbing consequences involving identity, beauty and obsession.",
    genres: ["Horror", "Drama", "Sci-Fi"],
    rating: 7.2,
    posterUrl: null,
    runtimeMinutes: 141,
    themes: ["identity", "aging", "beauty", "obsession", "self-image"],
    tone: ["disturbing", "dark", "psychological", "grotesque", "intense"],
    keywords: [
      "body horror",
      "psychological horror",
      "identity",
      "transformation",
      "experimental substance",
    ],
  },

  {
    title: "Get Out",
    year: 2017,
    description:
      "A young man visits his girlfriend's family and gradually discovers a terrifying conspiracy hidden beneath their welcoming behavior.",
    genres: ["Horror", "Mystery", "Thriller"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 104,
    themes: [
      "identity",
      "manipulation",
      "social horror",
      "conspiracy",
      "survival",
    ],
    tone: ["tense", "dark", "psychological", "unsettling", "suspenseful"],
    keywords: [
      "psychological horror",
      "social thriller",
      "conspiracy",
      "paranoia",
      "Jordan Peele",
    ],
  },

  {
    title: "A Quiet Place",
    year: 2018,
    description:
      "A family struggles to survive in a world inhabited by deadly creatures that hunt by sound, forcing them to live almost entirely in silence.",
    genres: ["Horror", "Sci-Fi", "Thriller"],
    rating: 7.5,
    posterUrl: null,
    runtimeMinutes: 90,
    themes: ["family", "survival", "parenthood", "sacrifice", "fear"],
    tone: [
      "tense",
      "frightening",
      "suspenseful",
      "emotional",
      "claustrophobic",
    ],
    keywords: [
      "creature horror",
      "survival",
      "silence",
      "family",
      "post-apocalyptic",
    ],
  },

  {
    title: "The Conjuring",
    year: 2013,
    description:
      "Paranormal investigators help a family terrorized by a sinister supernatural presence inside their isolated farmhouse.",
    genres: ["Horror", "Mystery", "Thriller"],
    rating: 7.5,
    posterUrl: null,
    runtimeMinutes: 112,
    themes: ["family", "supernatural evil", "faith", "possession", "survival"],
    tone: ["terrifying", "dark", "supernatural", "tense", "ominous"],
    keywords: [
      "haunted house",
      "paranormal",
      "demon",
      "supernatural horror",
      "ghost",
    ],
  },

  // =========================================================
  // SCI-FI
  // =========================================================

  {
    title: "Dune: Part Two",
    year: 2024,
    description:
      "Paul Atreides joins the Fremen and seeks revenge against those who destroyed his family while facing a choice between love and the fate of the universe.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.5,
    posterUrl: null,
    runtimeMinutes: 166,
    themes: ["destiny", "power", "revenge", "leadership", "religion"],
    tone: ["epic", "serious", "intense", "thoughtful", "grand"],
    keywords: ["space opera", "science fiction", "desert", "war", "politics"],
  },

  {
    title: "Mickey 17",
    year: 2025,
    description:
      "A disposable worker on a dangerous space mission repeatedly dies and is regenerated, leading him to question his identity, purpose and the system controlling his existence.",
    genres: ["Sci-Fi", "Comedy", "Drama"],
    rating: 6.8,
    posterUrl: null,
    runtimeMinutes: 137,
    themes: ["identity", "mortality", "exploitation", "technology", "purpose"],
    tone: [
      "thought-provoking",
      "darkly comic",
      "strange",
      "satirical",
      "philosophical",
    ],
    keywords: ["space", "cloning", "science fiction", "identity", "future"],
  },

  {
    title: "Arrival",
    year: 2016,
    description:
      "A linguist is recruited to communicate with mysterious extraterrestrial visitors and discovers that understanding their language changes her perception of time and life.",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    rating: 7.9,
    posterUrl: null,
    runtimeMinutes: 116,
    themes: ["communication", "time", "humanity", "grief", "choice"],
    tone: [
      "thoughtful",
      "emotional",
      "intelligent",
      "mysterious",
      "reflective",
    ],
    keywords: [
      "aliens",
      "first contact",
      "language",
      "intelligent science fiction",
      "time",
    ],
  },

  {
    title: "Blade Runner 2049",
    year: 2017,
    description:
      "A futuristic police officer uncovers a secret that leads him through a mystery involving artificial humans, identity and the disappearance of a former blade runner.",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    rating: 8.0,
    posterUrl: null,
    runtimeMinutes: 164,
    themes: ["identity", "humanity", "memory", "technology", "existence"],
    tone: [
      "dark",
      "atmospheric",
      "philosophical",
      "slow-burning",
      "mysterious",
    ],
    keywords: [
      "cyberpunk",
      "artificial intelligence",
      "future",
      "androids",
      "science fiction",
    ],
  },

  // =========================================================
  // ACTION / ADVENTURE
  // =========================================================

  {
    title: "Mission: Impossible - The Final Reckoning",
    year: 2025,
    description:
      "Ethan Hunt and his team face another dangerous global mission involving powerful enemies, impossible choices, espionage and high-stakes action.",
    genres: ["Action", "Adventure", "Thriller"],
    rating: 7.2,
    posterUrl: null,
    runtimeMinutes: 169,
    themes: ["loyalty", "sacrifice", "duty", "global danger", "teamwork"],
    tone: ["intense", "exciting", "suspenseful", "fast-paced", "high-stakes"],
    keywords: [
      "spy thriller",
      "espionage",
      "action",
      "global mission",
      "stunts",
    ],
  },

  {
    title: "Furiosa: A Mad Max Saga",
    year: 2024,
    description:
      "A young Furiosa is taken from her homeland and must survive brutal warlords and violent wasteland conflicts while searching for a way home.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 7.5,
    posterUrl: null,
    runtimeMinutes: 148,
    themes: ["survival", "revenge", "freedom", "resilience", "home"],
    tone: ["intense", "violent", "epic", "gritty", "energetic"],
    keywords: [
      "post-apocalyptic",
      "wasteland",
      "car chase",
      "action",
      "survival",
    ],
  },

  {
    title: "Civil War",
    year: 2024,
    description:
      "A team of journalists travels across a divided and violent United States while documenting a devastating internal conflict and trying to reach Washington.",
    genres: ["Action", "Drama", "Thriller"],
    rating: 7.0,
    posterUrl: null,
    runtimeMinutes: 109,
    themes: ["war", "journalism", "division", "violence", "survival"],
    tone: ["tense", "serious", "disturbing", "intense", "realistic"],
    keywords: [
      "war thriller",
      "journalists",
      "conflict",
      "dystopian",
      "action",
    ],
  },

  {
    title: "John Wick",
    year: 2014,
    description:
      "A retired assassin returns to the criminal underworld after a personal tragedy and unleashes a relentless campaign against those responsible.",
    genres: ["Action", "Crime", "Thriller"],
    rating: 7.4,
    posterUrl: null,
    runtimeMinutes: 101,
    themes: ["revenge", "grief", "violence", "criminal underworld", "loyalty"],
    tone: ["intense", "stylish", "dark", "fast-paced", "violent"],
    keywords: [
      "assassin",
      "revenge",
      "gunfight",
      "martial arts",
      "action thriller",
    ],
  },

  {
    title: "Top Gun: Maverick",
    year: 2022,
    description:
      "A veteran naval aviator returns to train an elite group of pilots for a dangerous mission while confronting memories and relationships from his past.",
    genres: ["Action", "Drama", "Adventure"],
    rating: 8.2,
    posterUrl: null,
    runtimeMinutes: 130,
    themes: ["courage", "mentorship", "legacy", "friendship", "sacrifice"],
    tone: ["exciting", "emotional", "inspiring", "energetic", "heroic"],
    keywords: ["fighter jets", "aviation", "military", "action", "mission"],
  },

  // =========================================================
  // SUPERHERO / BLOCKBUSTER
  // =========================================================

  {
    title: "Superman",
    year: 2025,
    description:
      "Superman struggles to reconcile his Kryptonian heritage with his human upbringing while defending the world and proving that compassion remains one of humanity's greatest strengths.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 7.0,
    posterUrl: null,
    runtimeMinutes: 129,
    themes: ["identity", "hope", "compassion", "heroism", "belonging"],
    tone: ["hopeful", "heroic", "uplifting", "adventurous", "emotional"],
    keywords: [
      "superhero",
      "Superman",
      "alien hero",
      "comic book",
      "saving the world",
    ],
  },

  {
    title: "Deadpool & Wolverine",
    year: 2024,
    description:
      "Deadpool joins forces with Wolverine on a chaotic multiverse adventure filled with violent action, irreverent comedy and unlikely friendship.",
    genres: ["Action", "Comedy", "Sci-Fi"],
    rating: 7.5,
    posterUrl: null,
    runtimeMinutes: 128,
    themes: ["friendship", "redemption", "heroism", "identity", "teamwork"],
    tone: ["funny", "violent", "irreverent", "energetic", "chaotic"],
    keywords: [
      "superhero",
      "multiverse",
      "Marvel",
      "action comedy",
      "antihero",
    ],
  },

  {
    title: "Thunderbolts*",
    year: 2025,
    description:
      "A group of unconventional antiheroes is forced into a dangerous mission that makes them confront their pasts and decide whether they can function as a team.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 7.2,
    posterUrl: null,
    runtimeMinutes: 127,
    themes: ["redemption", "trauma", "teamwork", "identity", "second chances"],
    tone: [
      "action-packed",
      "darkly comic",
      "emotional",
      "intense",
      "character-driven",
    ],
    keywords: ["antiheroes", "superhero", "Marvel", "team", "action"],
  },

  // =========================================================
  // FAMILY / ANIMATION / FANTASY
  // =========================================================

  {
    title: "The Wild Robot",
    year: 2024,
    description:
      "A robot stranded on a remote island learns to survive among animals, develops unexpected friendships and discovers the meaning of family and belonging.",
    genres: ["Animation", "Adventure", "Family"],
    rating: 8.2,
    posterUrl: null,
    runtimeMinutes: 102,
    themes: ["family", "belonging", "friendship", "parenthood", "adaptation"],
    tone: ["heartwarming", "hopeful", "emotional", "gentle", "uplifting"],
    keywords: [
      "animated adventure",
      "robot",
      "animals",
      "family movie",
      "friendship",
    ],
  },

  {
    title: "Inside Out 2",
    year: 2024,
    description:
      "Riley enters adolescence as new emotions arrive inside her mind, forcing Joy and the other emotions to adapt to anxiety, change and growing up.",
    genres: ["Animation", "Comedy", "Family"],
    rating: 7.6,
    posterUrl: null,
    runtimeMinutes: 96,
    themes: ["growing up", "emotions", "identity", "anxiety", "friendship"],
    tone: ["funny", "heartwarming", "emotional", "uplifting", "thoughtful"],
    keywords: [
      "Pixar",
      "animation",
      "family movie",
      "emotions",
      "coming of age",
    ],
  },

  {
    title: "How to Train Your Dragon",
    year: 2025,
    description:
      "A young Viking forms an unexpected friendship with a dragon, challenging generations of fear and changing the relationship between humans and dragons.",
    genres: ["Adventure", "Fantasy", "Family"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 125,
    themes: [
      "friendship",
      "courage",
      "acceptance",
      "family",
      "breaking tradition",
    ],
    tone: ["adventurous", "heartwarming", "exciting", "hopeful", "emotional"],
    keywords: [
      "dragons",
      "fantasy adventure",
      "Vikings",
      "family movie",
      "friendship",
    ],
  },

  {
    title: "A Minecraft Movie",
    year: 2025,
    description:
      "A group of ordinary people is transported into a strange block-based fantasy world where creativity and teamwork are essential for finding their way home.",
    genres: ["Adventure", "Comedy", "Fantasy"],
    rating: 5.7,
    posterUrl: null,
    runtimeMinutes: 101,
    themes: ["creativity", "teamwork", "friendship", "adventure", "belonging"],
    tone: ["fun", "lighthearted", "colorful", "adventurous", "playful"],
    keywords: [
      "Minecraft",
      "fantasy world",
      "family adventure",
      "video game",
      "comedy",
    ],
  },

  {
    title: "Wicked",
    year: 2024,
    description:
      "Two young women with very different personalities form an unlikely friendship in the magical land of Oz before their lives lead them toward very different destinies.",
    genres: ["Fantasy", "Musical", "Romance"],
    rating: 7.4,
    posterUrl: null,
    runtimeMinutes: 160,
    themes: ["friendship", "identity", "prejudice", "destiny", "acceptance"],
    tone: ["magical", "emotional", "uplifting", "dramatic", "romantic"],
    keywords: ["musical", "Oz", "magic", "friendship", "fantasy"],
  },

  {
    title: "Coco",
    year: 2017,
    description:
      "A young musician enters the Land of the Dead and uncovers the history of his family while pursuing his dream of making music.",
    genres: ["Animation", "Adventure", "Family"],
    rating: 8.4,
    posterUrl: null,
    runtimeMinutes: 105,
    themes: ["family", "memory", "death", "music", "dreams"],
    tone: ["heartwarming", "emotional", "colorful", "uplifting", "bittersweet"],
    keywords: [
      "Pixar",
      "family movie",
      "music",
      "Land of the Dead",
      "animation",
    ],
  },

  // =========================================================
  // ROMANCE / DRAMA
  // =========================================================

  {
    title: "Challengers",
    year: 2024,
    description:
      "A former tennis player turned coach becomes caught in a complicated relationship involving her champion husband and his former best friend and rival.",
    genres: ["Drama", "Romance", "Sport"],
    rating: 7.1,
    posterUrl: null,
    runtimeMinutes: 131,
    themes: ["desire", "competition", "relationships", "ambition", "jealousy"],
    tone: ["sensual", "tense", "dramatic", "romantic", "competitive"],
    keywords: ["tennis", "love triangle", "romance", "sports drama", "rivalry"],
  },

  {
    title: "The Notebook",
    year: 2004,
    description:
      "A young couple from different social backgrounds fall deeply in love and struggle against circumstances that threaten to separate them.",
    genres: ["Romance", "Drama"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 123,
    themes: ["love", "memory", "devotion", "class differences", "loss"],
    tone: ["romantic", "emotional", "heartfelt", "bittersweet", "sentimental"],
    keywords: [
      "love story",
      "romantic drama",
      "relationship",
      "emotional romance",
      "devotion",
    ],
  },

  {
    title: "La La Land",
    year: 2016,
    description:
      "An aspiring actress and a jazz musician fall in love while pursuing ambitious careers that increasingly pull their lives in different directions.",
    genres: ["Romance", "Drama", "Musical"],
    rating: 8.0,
    posterUrl: null,
    runtimeMinutes: 128,
    themes: ["love", "ambition", "dreams", "sacrifice", "career"],
    tone: ["romantic", "dreamy", "emotional", "bittersweet", "uplifting"],
    keywords: ["musical romance", "Hollywood", "jazz", "love story", "dreams"],
  },

  {
    title: "Me Before You",
    year: 2016,
    description:
      "A cheerful young woman becomes a caregiver for a wealthy man whose life changed after an accident, and an unexpected relationship develops between them.",
    genres: ["Romance", "Drama"],
    rating: 7.4,
    posterUrl: null,
    runtimeMinutes: 106,
    themes: ["love", "disability", "choice", "life", "loss"],
    tone: ["romantic", "emotional", "heartfelt", "sad", "bittersweet"],
    keywords: [
      "romantic drama",
      "love story",
      "caregiver",
      "relationship",
      "tearjerker",
    ],
  },

  // =========================================================
  // COMEDY
  // =========================================================

  {
    title: "The Fall Guy",
    year: 2024,
    description:
      "A stunt performer returns to work on a major film production and becomes involved in a mystery while trying to reconnect with the woman he loves.",
    genres: ["Action", "Comedy", "Romance"],
    rating: 6.8,
    posterUrl: null,
    runtimeMinutes: 126,
    themes: ["love", "second chances", "filmmaking", "courage", "identity"],
    tone: ["funny", "lighthearted", "romantic", "exciting", "playful"],
    keywords: ["action comedy", "stuntman", "romance", "Hollywood", "mystery"],
  },

  {
    title: "Game Night",
    year: 2018,
    description:
      "A group of friends participating in a regular game night becomes caught in a dangerous mystery that is far more real than they initially believe.",
    genres: ["Comedy", "Crime", "Mystery"],
    rating: 6.9,
    posterUrl: null,
    runtimeMinutes: 100,
    themes: ["friendship", "competition", "marriage", "mystery", "teamwork"],
    tone: ["funny", "fast-paced", "playful", "suspenseful", "lighthearted"],
    keywords: [
      "comedy mystery",
      "game night",
      "friends",
      "crime comedy",
      "fun",
    ],
  },

  {
    title: "Crazy Rich Asians",
    year: 2018,
    description:
      "A woman travels to Singapore with her boyfriend and discovers that his family is extraordinarily wealthy, forcing her to navigate expectations, romance and family pressure.",
    genres: ["Comedy", "Romance", "Drama"],
    rating: 6.9,
    posterUrl: null,
    runtimeMinutes: 120,
    themes: ["love", "family", "culture", "class", "acceptance"],
    tone: ["romantic", "funny", "glamorous", "heartwarming", "uplifting"],
    keywords: [
      "romantic comedy",
      "family",
      "Singapore",
      "wealth",
      "relationship",
    ],
  },

  // =========================================================
  // SPORT / DRAMA
  // =========================================================

  {
    title: "F1",
    year: 2025,
    description:
      "A veteran racing driver returns to Formula One to mentor a talented young driver while confronting his past and competing at the highest level of motorsport.",
    genres: ["Drama", "Sport", "Action"],
    rating: 7.7,
    posterUrl: null,
    runtimeMinutes: 155,
    themes: ["mentorship", "competition", "redemption", "ambition", "teamwork"],
    tone: ["exciting", "inspiring", "intense", "emotional", "energetic"],
    keywords: [
      "Formula One",
      "racing",
      "motorsport",
      "competition",
      "sports drama",
    ],
  },

  {
    title: "Ford v Ferrari",
    year: 2019,
    description:
      "An automotive designer and a fearless racing driver work together to build a revolutionary race car capable of challenging Ferrari at Le Mans.",
    genres: ["Drama", "Sport", "Action"],
    rating: 8.1,
    posterUrl: null,
    runtimeMinutes: 152,
    themes: [
      "friendship",
      "competition",
      "innovation",
      "ambition",
      "perseverance",
    ],
    tone: ["exciting", "inspiring", "energetic", "emotional", "competitive"],
    keywords: ["racing", "cars", "Le Mans", "sports drama", "motorsport"],
  },

  // =========================================================
  // ADDITIONAL ADVENTURE / SCI-FI
  // =========================================================

  {
    title: "Jurassic World Rebirth",
    year: 2025,
    description:
      "An expedition enters dangerous territory populated by surviving dinosaurs while searching for genetic material that could lead to an important medical breakthrough.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 6.2,
    posterUrl: null,
    runtimeMinutes: 134,
    themes: ["survival", "science", "exploration", "danger", "nature"],
    tone: ["adventurous", "tense", "exciting", "dangerous", "suspenseful"],
    keywords: [
      "dinosaurs",
      "expedition",
      "science fiction",
      "survival adventure",
      "creatures",
    ],
  },

  {
    title: "Everything Everywhere All at Once",
    year: 2022,
    description:
      "A struggling woman is pulled into a multiverse conflict and must connect with alternate versions of herself while confronting her fractured family relationships.",
    genres: ["Sci-Fi", "Action", "Comedy"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 139,
    themes: ["family", "identity", "meaning", "love", "choice"],
    tone: ["strange", "emotional", "funny", "philosophical", "energetic"],
    keywords: [
      "multiverse",
      "science fiction",
      "family",
      "martial arts",
      "existential",
    ],
  },

  {
    title: "Edge of Tomorrow",
    year: 2014,
    description:
      "A soldier trapped in a time loop repeatedly relives a battle against an alien invasion and gradually becomes humanity's best chance of survival.",
    genres: ["Sci-Fi", "Action", "Adventure"],
    rating: 7.9,
    posterUrl: null,
    runtimeMinutes: 113,
    themes: ["survival", "sacrifice", "persistence", "war", "growth"],
    tone: ["exciting", "intense", "clever", "fast-paced", "suspenseful"],
    keywords: ["time loop", "aliens", "science fiction", "war", "action"],
  },

  {
    title: "The Matrix",
    year: 1999,
    description:
      "A computer hacker discovers that the world he knows is an artificial simulation and joins a rebellion fighting the machines controlling humanity.",
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.7,
    posterUrl: null,
    runtimeMinutes: 136,
    themes: ["reality", "freedom", "identity", "technology", "choice"],
    tone: ["intelligent", "dark", "philosophical", "exciting", "stylish"],
    keywords: [
      "simulation",
      "artificial intelligence",
      "cyberpunk",
      "science fiction",
      "martial arts",
    ],
  },

  // =========================================================
  // CRIME / THRILLER
  // =========================================================

  {
    title: "Knives Out",
    year: 2019,
    description:
      "A detective investigates the suspicious death of a wealthy novelist while uncovering secrets and lies within the man's eccentric family.",
    genres: ["Mystery", "Crime", "Comedy"],
    rating: 7.9,
    posterUrl: null,
    runtimeMinutes: 130,
    themes: ["family", "greed", "deception", "class", "justice"],
    tone: ["clever", "mysterious", "funny", "suspenseful", "playful"],
    keywords: [
      "murder mystery",
      "detective",
      "whodunit",
      "family secrets",
      "crime",
    ],
  },

  {
    title: "Gone Girl",
    year: 2014,
    description:
      "A man becomes the center of intense suspicion after his wife mysteriously disappears and disturbing secrets about their marriage begin to emerge.",
    genres: ["Thriller", "Mystery", "Drama"],
    rating: 8.1,
    posterUrl: null,
    runtimeMinutes: 149,
    themes: ["marriage", "deception", "media", "manipulation", "identity"],
    tone: ["dark", "psychological", "tense", "disturbing", "mysterious"],
    keywords: [
      "psychological thriller",
      "missing person",
      "marriage",
      "mystery",
      "manipulation",
    ],
  },

  // =========================================================
  // DRAMA / INSPIRATIONAL
  // =========================================================

  {
    title: "Whiplash",
    year: 2014,
    description:
      "An ambitious young drummer enters an intense relationship with a demanding music instructor who pushes him toward greatness at enormous personal cost.",
    genres: ["Drama", "Music"],
    rating: 8.5,
    posterUrl: null,
    runtimeMinutes: 106,
    themes: ["ambition", "perfection", "obsession", "sacrifice", "success"],
    tone: ["intense", "inspiring", "stressful", "dramatic", "energetic"],
    keywords: ["music", "drumming", "ambition", "mentor", "perfectionism"],
  },

  {
    title: "The Social Network",
    year: 2010,
    description:
      "A Harvard student builds a revolutionary social networking platform while conflicts over friendship, ownership and ambition threaten the relationships around him.",
    genres: ["Drama", "Biography"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 120,
    themes: ["ambition", "friendship", "betrayal", "technology", "success"],
    tone: [
      "intelligent",
      "dramatic",
      "fast-paced",
      "sharp",
      "thought-provoking",
    ],
    keywords: [
      "technology",
      "startup",
      "entrepreneurship",
      "social media",
      "business drama",
    ],
  },

  // =========================================================
  // LEGACY POPCHOICE MOVIES
  // =========================================================

  {
    title: "Interstellar",
    year: 2014,
    description:
      "A group of explorers travels through a wormhole in space in search of a new home for humanity as Earth becomes increasingly uninhabitable.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.7,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    runtimeMinutes: 169,
    themes: ["family", "time", "survival", "love", "humanity", "sacrifice"],
    tone: ["epic", "thoughtful", "emotional", "intelligent", "inspiring"],
    keywords: [
      "space exploration",
      "wormhole",
      "Christopher Nolan",
      "intelligent science fiction",
      "space adventure",
    ],
  },

  {
    title: "The Martian",
    year: 2015,
    description:
      "An astronaut stranded alone on Mars uses science, creativity and determination to survive while NASA works to bring him home.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.0,
    posterUrl: null,
    runtimeMinutes: 144,
    themes: [
      "survival",
      "resilience",
      "science",
      "problem solving",
      "teamwork",
      "hope",
    ],
    tone: ["inspiring", "intelligent", "hopeful", "funny", "adventurous"],
    keywords: [
      "Mars",
      "astronaut",
      "space survival",
      "science fiction",
      "problem solving",
    ],
  },

  {
    title: "The Pursuit of Happyness",
    year: 2006,
    description:
      "A struggling father faces homelessness and financial hardship while pursuing a difficult career opportunity and caring for his young son.",
    genres: ["Drama", "Biography"],
    rating: 8.0,
    posterUrl: null,
    runtimeMinutes: 117,
    themes: [
      "perseverance",
      "family",
      "fatherhood",
      "poverty",
      "ambition",
      "success",
    ],
    tone: ["inspiring", "emotional", "hopeful", "heartfelt", "motivational"],
    keywords: [
      "father and son",
      "success story",
      "overcoming hardship",
      "career",
      "inspirational drama",
    ],
  },

  {
    title: "Forrest Gump",
    year: 1994,
    description:
      "A kind-hearted man experiences extraordinary moments in American history while remaining devoted to the people he loves.",
    genres: ["Drama", "Romance"],
    rating: 8.8,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    runtimeMinutes: 142,
    themes: ["love", "life", "friendship", "destiny", "perseverance", "loss"],
    tone: ["heartwarming", "emotional", "inspiring", "bittersweet", "romantic"],
    keywords: [
      "life journey",
      "romantic drama",
      "American history",
      "friendship",
      "inspirational",
    ],
  },

  {
    title: "The Shawshank Redemption",
    year: 1994,
    description:
      "A wrongly imprisoned man builds a lasting friendship and maintains hope while enduring years inside prison.",
    genres: ["Drama"],
    rating: 9.3,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    runtimeMinutes: 142,
    themes: [
      "hope",
      "friendship",
      "freedom",
      "justice",
      "perseverance",
      "redemption",
    ],
    tone: ["emotional", "inspiring", "serious", "hopeful", "powerful"],
    keywords: [
      "prison drama",
      "friendship",
      "hope",
      "redemption",
      "inspirational",
    ],
  },

  {
    title: "Back to the Future",
    year: 1985,
    description:
      "A teenager accidentally travels into the past using a scientist's time machine and must repair history before returning home.",
    genres: ["Sci-Fi", "Adventure", "Comedy"],
    rating: 8.5,
    posterUrl: null,
    runtimeMinutes: 116,
    themes: ["family", "time", "friendship", "destiny", "growing up"],
    tone: ["fun", "adventurous", "lighthearted", "exciting", "nostalgic"],
    keywords: [
      "time travel",
      "science fiction",
      "teen adventure",
      "comedy",
      "time machine",
    ],
  },

  // =========================================================
  // FINAL CATALOG BALANCING
  // =========================================================

  {
    title: "Parasite",
    year: 2019,
    description:
      "A struggling family gradually enters the lives of a wealthy household, leading to deception, conflict and increasingly unexpected consequences.",
    genres: ["Drama", "Thriller", "Comedy"],
    rating: 8.5,
    posterUrl: null,
    runtimeMinutes: 132,
    themes: ["class inequality", "family", "wealth", "deception", "survival"],
    tone: ["dark", "clever", "tense", "satirical", "unpredictable"],
    keywords: [
      "social thriller",
      "class conflict",
      "Korean cinema",
      "dark comedy",
      "family",
    ],
  },

  {
    title: "Prisoners",
    year: 2013,
    description:
      "A desperate father takes matters into his own hands after his daughter disappears while a detective pursues the increasingly disturbing investigation.",
    genres: ["Thriller", "Mystery", "Crime"],
    rating: 8.2,
    posterUrl: null,
    runtimeMinutes: 153,
    themes: ["justice", "morality", "family", "desperation", "revenge"],
    tone: ["dark", "tense", "disturbing", "psychological", "suspenseful"],
    keywords: [
      "missing child",
      "detective",
      "crime mystery",
      "psychological thriller",
      "investigation",
    ],
  },

  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    description:
      "A devoted hotel concierge and his young protégé become involved in the theft of a valuable painting and a battle over a large family fortune.",
    genres: ["Comedy", "Adventure", "Drama"],
    rating: 8.1,
    posterUrl: null,
    runtimeMinutes: 99,
    themes: ["friendship", "loyalty", "nostalgia", "adventure", "change"],
    tone: ["quirky", "funny", "charming", "whimsical", "lighthearted"],
    keywords: [
      "hotel",
      "quirky comedy",
      "adventure",
      "friendship",
      "Wes Anderson",
    ],
  },

  {
    title: "Palm Springs",
    year: 2020,
    description:
      "Two wedding guests trapped in a repeating time loop develop an unexpected relationship while trying to understand what their strange situation means.",
    genres: ["Comedy", "Romance", "Sci-Fi"],
    rating: 7.4,
    posterUrl: null,
    runtimeMinutes: 90,
    themes: ["love", "meaning", "commitment", "change", "relationships"],
    tone: ["funny", "romantic", "lighthearted", "clever", "warm"],
    keywords: [
      "time loop",
      "romantic comedy",
      "wedding",
      "science fiction comedy",
      "relationship",
    ],
  },

  {
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    description:
      "A teenager gains extraordinary abilities and meets heroes from alternate dimensions while learning what it truly means to become Spider-Man.",
    genres: ["Animation", "Action", "Adventure"],
    rating: 8.4,
    posterUrl: null,
    runtimeMinutes: 117,
    themes: ["identity", "family", "courage", "mentorship", "self-belief"],
    tone: ["energetic", "fun", "inspiring", "emotional", "colorful"],
    keywords: [
      "superhero",
      "multiverse",
      "Spider-Man",
      "animation",
      "coming of age",
    ],
  },

  {
    title: "Puss in Boots: The Last Wish",
    year: 2022,
    description:
      "A fearless adventurer discovers that he has nearly exhausted his nine lives and sets out on a magical journey to restore them.",
    genres: ["Animation", "Adventure", "Comedy"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 102,
    themes: ["mortality", "friendship", "fear", "love", "appreciating life"],
    tone: ["funny", "heartwarming", "adventurous", "emotional", "exciting"],
    keywords: [
      "family movie",
      "fairy tale",
      "animated adventure",
      "comedy",
      "friendship",
    ],
  },

  {
    title: "Mad Max: Fury Road",
    year: 2015,
    description:
      "Survivors race across a brutal wasteland while escaping a tyrannical ruler in a relentless battle for freedom.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.1,
    posterUrl: null,
    runtimeMinutes: 120,
    themes: ["survival", "freedom", "rebellion", "redemption", "oppression"],
    tone: ["intense", "relentless", "energetic", "violent", "epic"],
    keywords: [
      "post-apocalyptic",
      "car chase",
      "wasteland",
      "action",
      "survival",
    ],
  },

  {
    title: "Ex Machina",
    year: 2014,
    description:
      "A programmer is invited to evaluate a highly advanced artificial intelligence and becomes caught in a psychological struggle involving consciousness and manipulation.",
    genres: ["Sci-Fi", "Drama", "Thriller"],
    rating: 7.7,
    posterUrl: null,
    runtimeMinutes: 108,
    themes: [
      "artificial intelligence",
      "consciousness",
      "manipulation",
      "humanity",
      "control",
    ],
    tone: [
      "intelligent",
      "psychological",
      "tense",
      "thought-provoking",
      "mysterious",
    ],
    keywords: [
      "artificial intelligence",
      "robot",
      "technology",
      "intelligent science fiction",
      "psychological thriller",
    ],
  },

  {
    title: "Her",
    year: 2013,
    description:
      "A lonely writer develops a deep emotional relationship with an advanced artificial intelligence operating system.",
    genres: ["Romance", "Sci-Fi", "Drama"],
    rating: 8.0,
    posterUrl: null,
    runtimeMinutes: 126,
    themes: ["love", "loneliness", "technology", "connection", "identity"],
    tone: ["romantic", "thoughtful", "melancholic", "emotional", "intimate"],
    keywords: [
      "artificial intelligence",
      "romance",
      "future",
      "relationship",
      "technology",
    ],
  },

  {
    title: "The Hangover",
    year: 2009,
    description:
      "A group of friends wakes after a chaotic night in Las Vegas and attempts to reconstruct what happened while searching for their missing friend.",
    genres: ["Comedy"],
    rating: 7.7,
    posterUrl: null,
    runtimeMinutes: 100,
    themes: ["friendship", "chaos", "responsibility", "adventure", "loyalty"],
    tone: ["funny", "wild", "chaotic", "lighthearted", "outrageous"],
    keywords: [
      "Las Vegas",
      "friends",
      "party comedy",
      "road comedy",
      "buddy comedy",
    ],
  },

  {
    title: "About Time",
    year: 2013,
    description:
      "A young man discovers that the men in his family can travel through time and uses the ability while learning deeper lessons about love, family and everyday life.",
    genres: ["Romance", "Drama", "Fantasy"],
    rating: 7.8,
    posterUrl: null,
    runtimeMinutes: 123,
    themes: ["love", "family", "time", "life", "appreciation"],
    tone: ["romantic", "heartwarming", "emotional", "bittersweet", "uplifting"],
    keywords: ["time travel", "romantic drama", "family", "love story", "life"],
  },

  {
    title: "The Dark Knight",
    year: 2008,
    description:
      "Batman confronts a criminal mastermind whose campaign of chaos forces Gotham's heroes to face difficult moral choices.",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
    posterUrl: null,
    runtimeMinutes: 152,
    themes: ["justice", "chaos", "morality", "heroism", "sacrifice"],
    tone: ["dark", "intense", "serious", "psychological", "suspenseful"],
    keywords: [
      "Batman",
      "superhero",
      "crime thriller",
      "Joker",
      "Christopher Nolan",
    ],
  },

  {
    title: "Soul",
    year: 2020,
    description:
      "A musician separated from his body shortly before his big opportunity journeys through a strange realm and begins reconsidering what makes life meaningful.",
    genres: ["Animation", "Adventure", "Family"],
    rating: 8.0,
    posterUrl: null,
    runtimeMinutes: 100,
    themes: ["purpose", "life", "passion", "meaning", "self-discovery"],
    tone: ["thoughtful", "heartwarming", "uplifting", "emotional", "gentle"],
    keywords: [
      "Pixar",
      "music",
      "meaning of life",
      "family movie",
      "self-discovery",
    ],
  },

  {
    title: "Good Will Hunting",
    year: 1997,
    description:
      "A brilliant but troubled young man begins confronting his past and potential after forming relationships with a therapist and people who challenge him to change.",
    genres: ["Drama", "Romance"],
    rating: 8.3,
    posterUrl: null,
    runtimeMinutes: 126,
    themes: ["potential", "trauma", "friendship", "love", "self-discovery"],
    tone: ["emotional", "thoughtful", "inspiring", "heartfelt", "intimate"],
    keywords: [
      "genius",
      "therapy",
      "personal growth",
      "friendship",
      "inspirational drama",
    ],
  },
];

function buildMovieEmbeddingText(movie) {
  return [
    `Title: ${movie.title}`,
    `Genres: ${movie.genres.join(", ")}`,
    `Description: ${movie.description}`,
    `Themes: ${movie.themes?.join(", ") || "General"}`,
    `Tone: ${movie.tone?.join(", ") || "General"}`,
    `Keywords: ${movie.keywords?.join(", ") || "General"}`,
  ].join("\n");
}

async function findExistingMovie(movie) {
  const { data, error } = await supabase
    .from("movies")
    .select("id")
    .eq("title", movie.title)
    .eq("year", movie.year)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

async function seedMovie(movie, index) {
  console.log(
    `\n[${index + 1}/${movies.length}] ${movie.title} (${movie.year})`,
  );

  const existingMovie = await findExistingMovie(movie);

  if (existingMovie) {
    console.log("Existing movie found — regenerating embedding...");
  } else {
    console.log("New movie — creating embedding...");
  }

  const embeddingText = buildMovieEmbeddingText(movie);

  console.log("\nEmbedding text:");
  console.log("---------------------------------");
  console.log(embeddingText);
  console.log("---------------------------------");

  const embedding = await createEmbedding(embeddingText);

  if (!embedding || embedding.length !== 384) {
    throw new Error(
      `Invalid embedding for ${movie.title}. Expected 384 dimensions, received ${embedding?.length}.`,
    );
  }

  console.log(`Embedding dimensions: ${embedding.length}`);

  const movieData = {
    title: movie.title,
    year: movie.year,
    description: movie.description,
    genres: movie.genres,
    rating: movie.rating,
    poster_url: movie.posterUrl ?? null,
    runtime_minutes: movie.runtimeMinutes,
    embedding,
  };

  if (existingMovie) {
    const { error } = await supabase
      .from("movies")
      .update(movieData)
      .eq("id", existingMovie.id);

    if (error) {
      throw error;
    }

    console.log("Updated successfully.");

    return "updated";
  }

  const { error } = await supabase.from("movies").insert(movieData);

  if (error) {
    throw error;
  }

  console.log("Inserted successfully.");

  return "inserted";
}

async function seedMovies() {
  console.log("=================================");
  console.log("PopChoice Movie Seeder");
  console.log("=================================");
  console.log(`Movies in dataset: ${movies.length}`);

  let inserted = 0;
  let updated = 0;
  let failed = 0;

  for (let index = 0; index < movies.length; index += 1) {
    const movie = movies[index];

    try {
      const result = await seedMovie(movie, index);

      if (result === "inserted") {
        inserted += 1;
      }

      if (result === "updated") {
        updated += 1;
      }
    } catch (error) {
      failed += 1;

      console.error(`Failed to seed ${movie.title}:`, error.message || error);
    }
  }

  console.log("\n=================================");
  console.log("Seed complete");
  console.log("=================================");
  console.log(`Inserted: ${inserted}`);
  console.log(`Updated:  ${updated}`);
  console.log(`Failed:   ${failed}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

seedMovies();
