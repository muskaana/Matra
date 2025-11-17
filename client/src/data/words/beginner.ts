/**
 * Beginner Words Data
 * Simple, high-frequency words for heritage speakers
 * Organized into thematic packs
 */

export interface WordCard {
  word: string;  // Devanagari
  transliteration: string;
  meaning: string;
}

export interface WordPack {
  id: string;
  title: string;
  description: string;
  words: WordCard[];
  quizId: string;
}

export const beginnerWordPacks: WordPack[] = [
  {
    id: "family",
    title: "Family",
    description: "Learn family member words",
    words: [
      { word: "माँ", transliteration: "maa", meaning: "Mother/Mom" },
      { word: "पापा", transliteration: "papa", meaning: "Father/Dad" },
      { word: "दादी", transliteration: "daadi", meaning: "Grandmother (paternal)" },
      { word: "दादा", transliteration: "daada", meaning: "Grandfather (paternal)" },
      { word: "भाई", transliteration: "bhai", meaning: "Brother" },
      { word: "बहन", transliteration: "bahan", meaning: "Sister" },
    ],
    quizId: "bw-family"
  },
  {
    id: "home",
    title: "Home & Daily",
    description: "Common everyday words",
    words: [
      { word: "घर", transliteration: "ghar", meaning: "Home/House" },
      { word: "पानी", transliteration: "paani", meaning: "Water" },
      { word: "खाना", transliteration: "khaana", meaning: "Food" },
      { word: "स्कूल", transliteration: "school", meaning: "School" },
      { word: "दोस्त", transliteration: "dost", meaning: "Friend" },
    ],
    quizId: "bw-home"
  },
  {
    id: "feelings",
    title: "Feelings",
    description: "Express how you feel",
    words: [
      { word: "खुश", transliteration: "khush", meaning: "Happy" },
      { word: "थका", transliteration: "thaka", meaning: "Tired" },
      { word: "मज़ा", transliteration: "maza", meaning: "Fun" },
      { word: "अच्छा", transliteration: "accha", meaning: "Good/Nice" },
    ],
    quizId: "bw-feelings"
  }
];
