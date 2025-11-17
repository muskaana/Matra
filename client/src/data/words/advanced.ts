/**
 * Advanced Words Data
 * Longer words with more matras and conjuncts
 * For heritage speakers building reading fluency
 */

export interface AdvancedWordCard {
  word: string;  // Devanagari
  transliteration: string;
  meaning: string;
}

export interface AdvancedWordPack {
  id: string;
  title: string;
  description: string;
  words: AdvancedWordCard[];
  quizId: string;
}

export const advancedWordPacks: AdvancedWordPack[] = [
  {
    id: "emotions",
    title: "Emotions & Identity",
    description: "Express deeper feelings",
    words: [
      { word: "गर्व", transliteration: "garv", meaning: "Pride" },
      { word: "शर्म", transliteration: "sharm", meaning: "Shame/Shyness" },
      { word: "पहचान", transliteration: "pahchaan", meaning: "Identity/Recognition" },
      { word: "आत्मविश्वास", transliteration: "aatmavishvaas", meaning: "Self-confidence" },
    ],
    quizId: "aw-emotions"
  },
  {
    id: "culture",
    title: "Culture & Media",
    description: "Words about culture and art",
    words: [
      { word: "फ़िल्म", transliteration: "film", meaning: "Film/Movie" },
      { word: "संगीत", transliteration: "sangeet", meaning: "Music" },
      { word: "भाषा", transliteration: "bhaasha", meaning: "Language" },
      { word: "परंपरा", transliteration: "parampara", meaning: "Tradition" },
    ],
    quizId: "aw-culture"
  },
  {
    id: "daily-longer",
    title: "Daily Life (Longer)",
    description: "Common but longer words",
    words: [
      { word: "अस्पताल", transliteration: "aspatal", meaning: "Hospital" },
      { word: "मौका", transliteration: "mauka", meaning: "Opportunity/Chance" },
      { word: "मिठाई", transliteration: "mithaai", meaning: "Sweets/Dessert" },
      { word: "तैयारी", transliteration: "taiyaari", meaning: "Preparation" },
    ],
    quizId: "aw-daily"
  }
];
