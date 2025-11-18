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
    title: "Emotions & Feelings Quiz",
    questions: [
      {
        transliteration: "khushi",
        options: ["खुशी", "ख़ुशी", "कुशी", "खुसी"],
        correctIndex: 1
      },
      {
        transliteration: "ummeed",
        options: ["उम्मीद", "उमीद", "उममीद", "ऊमीद"],
        correctIndex: 0
      },
      {
        transliteration: "gamgeen",
        options: ["गमगीन", "ग़मगीन", "गमगिन", "गमगीण"],
        correctIndex: 1
      },
      {
        transliteration: "pareshaan",
        options: ["परेशान", "परेसान", "पेरशान", "पारेशान"],
        correctIndex: 0
      },
      {
        transliteration: "sharminda",
        options: ["शरमिंदा", "शरमीन्दा", "शर्मिंदा", "सरमिंदा"],
        correctIndex: 2
      },
      {
        transliteration: "hairaan",
        options: ["हैरान", "हयरान", "हैरन", "हेरान"],
        correctIndex: 0
      }
    ]
  },
  "aw-conversation": {
    id: "aw-conversation",
    title: "Everyday Chat Quiz",
    questions: [
      {
        transliteration: "zaroori",
        options: ["जरूरी", "ज़रूरी", "ज़रुरी", "जरुरी"],
        correctIndex: 1
      },
      {
        transliteration: "mushkil",
        options: ["मुश्किल", "मुसकिल", "मुशकील", "मुसकील"],
        correctIndex: 0
      },
      {
        transliteration: "aasaan",
        options: ["आसन", "आसान", "आशान", "आसन"],
        correctIndex: 1
      },
      {
        transliteration: "bilkul",
        options: ["बिलकुल", "बिलकूल", "बिल्कुल", "बीलकुल"],
        correctIndex: 2
      },
      {
        transliteration: "shaayad",
        options: ["शायद", "शयद", "शाईद", "सायद"],
        correctIndex: 0
      },
      {
        transliteration: "achaanak",
        options: ["अचानक", "अचनक", "अछानक", "अचानाक"],
        correctIndex: 0
      }
    ]
  },
  "aw-culture": {
    id: "aw-culture",
    title: "Culture & Entertainment Quiz",
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
        transliteration: "kitaab",
        options: ["किताब", "कितब", "किताव", "कीताब"],
        correctIndex: 0
      },
      {
        transliteration: "kahaani",
        options: ["कहनी", "कहानी", "कहाणी", "कहानि"],
        correctIndex: 1
      },
      {
        transliteration: "tyohaar",
        options: ["त्योहार", "तयोहार", "त्यौहार", "तोहार"],
        correctIndex: 0
      },
      {
        transliteration: "saamaan",
        options: ["सामान", "समान", "सामन", "सामाण"],
        correctIndex: 0
      }
    ]
  },
  "aw-daily": {
    id: "aw-daily",
    title: "Daily Activities Quiz",
    questions: [
      {
        transliteration: "taiyaari",
        options: ["तैयारी", "तयारी", "तैयारि", "तयरी"],
        correctIndex: 0
      },
      {
        transliteration: "mithaai",
        options: ["मिठाइ", "मिठाई", "मिठायी", "मिठई"],
        correctIndex: 1
      },
      {
        transliteration: "samajhna",
        options: ["समजना", "समझना", "समाझना", "समजहना"],
        correctIndex: 1
      },
      {
        transliteration: "sochna",
        options: ["सोचना", "सोछना", "सोचन", "सौचना"],
        correctIndex: 0
      },
      {
        transliteration: "bataana",
        options: ["बताना", "बतना", "बताणा", "बतान"],
        correctIndex: 0
      },
      {
        transliteration: "poochna",
        options: ["पूछना", "पुछना", "पूचना", "पुचना"],
        correctIndex: 0
      }
    ]
  }
};
