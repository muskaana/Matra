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
      { word: "नानी", transliteration: "naani", meaning: "Grandmother (maternal)" },
      { word: "भाई", transliteration: "bhai", meaning: "Brother" },
      { word: "बहन", transliteration: "bahan", meaning: "Sister" },
      { word: "चाचा", transliteration: "chacha", meaning: "Uncle (father's brother)" },
      { word: "बुआ", transliteration: "bua", meaning: "Aunt (father's sister)" },
    ],
    quizId: "bw-family"
  },
  {
    id: "nasal-words",
    title: "Everyday Sounds",
    description: "Words with nasal sounds",
    words: [
      { word: "बातों", transliteration: "baaton", meaning: "Talks/Conversations" },
      { word: "हाथों", transliteration: "haathon", meaning: "Hands" },
      { word: "आँखों", transliteration: "aankhon", meaning: "Eyes" },
      { word: "लोगों", transliteration: "logon", meaning: "People" },
      { word: "दिनों", transliteration: "dinon", meaning: "Days" },
      { word: "रातों", transliteration: "raaton", meaning: "Nights" },
    ],
    quizId: "bw-nasal"
  },
  {
    id: "home",
    title: "Home & Daily",
    description: "Common everyday words",
    words: [
      { word: "घर", transliteration: "ghar", meaning: "Home/House" },
      { word: "पानी", transliteration: "paani", meaning: "Water" },
      { word: "खाना", transliteration: "khaana", meaning: "Food" },
      { word: "कमरा", transliteration: "kamra", meaning: "Room" },
      { word: "दरवाज़ा", transliteration: "darwaaza", meaning: "Door" },
      { word: "चाय", transliteration: "chaay", meaning: "Tea" },
    ],
    quizId: "bw-home"
  },
  {
    id: "body-nasal",
    title: "Body Parts",
    description: "Talk about your body",
    words: [
      { word: "हाँ", transliteration: "haa", meaning: "Yes" },
      { word: "नहीं", transliteration: "nahi", meaning: "No" },
      { word: "कहाँ", transliteration: "kaha", meaning: "Where" },
      { word: "वहाँ", transliteration: "vaha", meaning: "There" },
      { word: "यहाँ", transliteration: "yaha", meaning: "Here" },
      { word: "क्यों", transliteration: "kyon", meaning: "Why" },
    ],
    quizId: "bw-body"
  },
  {
    id: "feelings",
    title: "Feelings",
    description: "Express how you feel",
    words: [
      { word: "खुश", transliteration: "khush", meaning: "Happy" },
      { word: "प्यार", transliteration: "pyaar", meaning: "Love" },
      { word: "गुस्सा", transliteration: "gussa", meaning: "Angry" },
      { word: "डर", transliteration: "dar", meaning: "Fear" },
      { word: "मज़ा", transliteration: "maza", meaning: "Fun" },
      { word: "अच्छा", transliteration: "accha", meaning: "Good/Nice" },
    ],
    quizId: "bw-feelings"
  }
];
