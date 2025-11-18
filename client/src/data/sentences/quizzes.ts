/**
 * Sentence Quizzes
 * Match English to Hindi or fill in missing words
 */

interface SentenceQuizQuestion {
  type: "match" | "fill";
  question: string;  // English sentence or Hindi with blank
  options: string[];  // Possible answers
  correctIndex: number;
}

interface SentenceQuiz {
  id: string;
  title: string;
  questions: SentenceQuizQuestion[];
}

export const sentenceQuizzes: { [key: string]: SentenceQuiz } = {
  "sq-family": {
    id: "sq-family",
    title: "Family Talk Quiz",
    questions: [
      {
        type: "match",
        question: "Mom, I'm hungry",
        options: [
          "माँ, मुझे भूख लगी है",
          "माँ, मुझे प्यास लगी है",
          "माँ, मैं खुश हूँ",
          "माँ, घर जाओ"
        ],
        correctIndex: 0
      },
      {
        type: "fill",
        question: "पापा, आप ___ हो? (Dad, where are you?)",
        options: ["कहाँ", "यहाँ", "वहाँ", "क्यों"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "My sister is at home",
        options: [
          "मेरी बहन स्कूल में है",
          "मेरी बहन घर पर है",
          "मेरा भाई घर पर है",
          "बहन है घर"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "दादी, ___ पी लो (Grandma, have some tea)",
        options: ["चाय", "पानी", "खाना", "मिठाई"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "Uncle is coming home",
        options: [
          "चाचा घर हैं",
          "चाचा घर आ रहे हैं",
          "चाचा स्कूल जा रहे हैं",
          "चाचा जा रहे हैं"
        ],
        correctIndex: 1
      }
    ]
  },
  "sq-daily": {
    id: "sq-daily",
    title: "Daily Routine Quiz",
    questions: [
      {
        type: "match",
        question: "I want a cup of tea",
        options: [
          "मुझे चाय है",
          "मुझे एक कप चाय चाहिए",
          "चाय पीता हूँ",
          "एक चाय"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "आज बहुत ___ है (It's very hot today)",
        options: ["गर्मी", "ठंड", "अच्छा", "खुशी"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "Are you going home?",
        options: [
          "तुम घर हो?",
          "क्या तुम घर जा रहे हो?",
          "घर जाओ",
          "तुम घर में हो"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मुझे ये ___ नहीं आया (I didn't understand this)",
        options: ["समझ", "सोच", "बात", "पता"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "I'm ready",
        options: [
          "मैं तैयारी हूँ",
          "मैं तैयार हो गया",
          "तैयार है",
          "मेरी तैयारी"
        ],
        correctIndex: 1
      }
    ]
  },
  "sq-feelings": {
    id: "sq-feelings",
    title: "How You Feel Quiz",
    questions: [
      {
        type: "match",
        question: "I'm very happy",
        options: [
          "मैं खुश हूँ",
          "मैं बहुत खुश हूँ",
          "खुश हूँ बहुत",
          "मुझे खुशी है"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मुझे थोड़ा ___ लग रहा है (I'm feeling a bit scared)",
        options: ["डर", "गुस्सा", "प्यार", "मज़ा"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "This is very difficult",
        options: [
          "ये आसान है",
          "ये बहुत मुश्किल है",
          "मुश्किल है ये",
          "ये है मुश्किल"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मुझे ___ है सब ठीक होगा (I hope everything will be okay)",
        options: ["उम्मीद", "ख़ुशी", "परेशान", "हैरान"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "Why are you worried?",
        options: [
          "तुम खुश क्यों हो?",
          "तुम परेशान क्यों हो?",
          "परेशान हो तुम?",
          "क्यों परेशान?"
        ],
        correctIndex: 1
      }
    ]
  },
  "sq-plans": {
    id: "sq-plans",
    title: "Making Plans Quiz",
    questions: [
      {
        type: "match",
        question: "Want to watch a movie tomorrow?",
        options: [
          "कल फ़िल्म है?",
          "कल फ़िल्म देखने चलें?",
          "फ़िल्म देखें कल?",
          "कल देखें?"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "हाँ, ___ चलते हैं (Yes, absolutely let's go)",
        options: ["बिल्कुल", "शायद", "नहीं", "ज़रा"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "Maybe I can come",
        options: [
          "मैं आ सकता हूँ",
          "शायद मैं आ सकूँ",
          "मैं आऊँगा",
          "शायद आना"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "ये ___ काम है (This is important work)",
        options: ["ज़रूरी", "आसान", "मुश्किल", "अच्छा"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "It suddenly came to my mind",
        options: [
          "मेरे मन में आया",
          "अचानक मेरे मन में आया",
          "मन में था",
          "मुझे याद आया"
        ],
        correctIndex: 1
      }
    ]
  }
};
