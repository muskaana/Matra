/**
 * Advanced Words Quizzes
 * Focus on reading accuracy - recognizing Devanagari correctly
 */

interface AdvancedQuizQuestion {
  transliteration: string;  // Show this (test reading)
  options: string[];  // Devanagari options
  correctIndex: number;
}

interface AdvancedWordQuiz {
  id: string;
  title: string;
  questions: AdvancedQuizQuestion[];
}

export const advancedWordQuizzes: { [key: string]: AdvancedWordQuiz } = {
  "aw-emotions": {
    id: "aw-emotions",
    title: "Emotions & Identity Quiz",
    questions: [
      {
        transliteration: "garv",
        options: ["गर्व", "शर्म", "पर्व", "धर्म"],
        correctIndex: 0
      },
      {
        transliteration: "sharm",
        options: ["धर्म", "शर्म", "गर्म", "कर्म"],
        correctIndex: 1
      },
      {
        transliteration: "pahchaan",
        options: ["पहचान", "पचान", "पहलान", "परचान"],
        correctIndex: 0
      },
      {
        transliteration: "aatmavishvaas",
        options: ["आत्मविश्वास", "अत्मविश्वास", "आतमविश्वास", "आत्माविश्वास"],
        correctIndex: 0
      }
    ]
  },
  "aw-culture": {
    id: "aw-culture",
    title: "Culture & Media Quiz",
    questions: [
      {
        transliteration: "film",
        options: ["फिल्म", "फ़िल्म", "फीलम", "फलम"],
        correctIndex: 1
      },
      {
        transliteration: "sangeet",
        options: ["संगित", "संगीत", "सङ्गीत", "सगीत"],
        correctIndex: 1
      },
      {
        transliteration: "bhaasha",
        options: ["भाषा", "भासा", "बाषा", "भाशा"],
        correctIndex: 0
      },
      {
        transliteration: "parampara",
        options: ["परम्परा", "परंपरा", "परमपरा", "परमपारा"],
        correctIndex: 1
      }
    ]
  },
  "aw-daily": {
    id: "aw-daily",
    title: "Daily Life Quiz",
    questions: [
      {
        transliteration: "aspatal",
        options: ["अस्पताल", "असपताल", "अस्पतल", "असपतल"],
        correctIndex: 0
      },
      {
        transliteration: "mauka",
        options: ["मौका", "मोका", "माका", "मौकां"],
        correctIndex: 0
      },
      {
        transliteration: "mithaai",
        options: ["मिठाइ", "मिठाई", "मिठायी", "मिठई"],
        correctIndex: 1
      },
      {
        transliteration: "taiyaari",
        options: ["तैयारी", "तयारी", "तैयारि", "तयरी"],
        correctIndex: 0
      }
    ]
  }
};
