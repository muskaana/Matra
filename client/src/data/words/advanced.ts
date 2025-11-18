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
    title: "Emotions & Feelings",
    description: "Express deeper feelings",
    words: [
      { word: "ख़ुशी", transliteration: "khushi", meaning: "Happiness" },
      { word: "उम्मीद", transliteration: "ummeed", meaning: "Hope" },
      { word: "ग़मगीन", transliteration: "gamgeen", meaning: "Sad/Sorrowful" },
      { word: "परेशान", transliteration: "pareshaan", meaning: "Worried/Troubled" },
      { word: "शर्मिंदा", transliteration: "sharminda", meaning: "Embarrassed" },
      { word: "हैरान", transliteration: "hairaan", meaning: "Surprised/Amazed" },
    ],
    quizId: "aw-emotions"
  },
  {
    id: "conversation",
    title: "Everyday Chat",
    description: "Words for daily conversations",
    words: [
      { word: "ज़रूरी", transliteration: "zaroori", meaning: "Important/Necessary" },
      { word: "मुश्किल", transliteration: "mushkil", meaning: "Difficult" },
      { word: "आसान", transliteration: "aasaan", meaning: "Easy" },
      { word: "बिल्कुल", transliteration: "bilkul", meaning: "Absolutely/Exactly" },
      { word: "शायद", transliteration: "shaayad", meaning: "Maybe/Perhaps" },
      { word: "अचानक", transliteration: "achaanak", meaning: "Suddenly" },
    ],
    quizId: "aw-conversation"
  },
  {
    id: "culture",
    title: "Culture & Entertainment",
    description: "Talk about culture and media",
    words: [
      { word: "फ़िल्म", transliteration: "film", meaning: "Film/Movie" },
      { word: "संगीत", transliteration: "sangeet", meaning: "Music" },
      { word: "किताब", transliteration: "kitaab", meaning: "Book" },
      { word: "कहानी", transliteration: "kahaani", meaning: "Story" },
      { word: "त्योहार", transliteration: "tyohaar", meaning: "Festival" },
      { word: "सामान", transliteration: "saamaan", meaning: "Stuff/Things" },
    ],
    quizId: "aw-culture"
  },
  {
    id: "daily-longer",
    title: "Daily Activities",
    description: "Longer everyday words",
    words: [
      { word: "तैयारी", transliteration: "taiyaari", meaning: "Preparation" },
      { word: "मिठाई", transliteration: "mithaai", meaning: "Sweets/Dessert" },
      { word: "समझना", transliteration: "samajhna", meaning: "To understand" },
      { word: "सोचना", transliteration: "sochna", meaning: "To think" },
      { word: "बताना", transliteration: "bataana", meaning: "To tell" },
      { word: "पूछना", transliteration: "poochna", meaning: "To ask" },
    ],
    quizId: "aw-daily"
  }
];
