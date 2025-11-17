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
        question: "My name is Raj",
        options: [
          "मेरा नाम राज है",
          "मेरी माँ राज है",
          "राज का नाम है",
          "मेरा राज नाम है"
        ],
        correctIndex: 0
      },
      {
        type: "match",
        question: "I am going to my home",
        options: [
          "मैं घर में हूँ",
          "मैं अपने घर जा रहा हूँ",
          "मेरा घर है",
          "घर जा रहा है"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मेरी ___ बहुत अच्छी है (My mother is very good)",
        options: ["माँ", "पापा", "भाई", "दोस्त"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "My sister is happy",
        options: [
          "मेरी बहन थकी है",
          "मेरी बहन खुश है",
          "मेरा भाई खुश है",
          "बहन है खुश"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मेरे पापा ___ बना रहे हैं (My father is making food)",
        options: ["खाना", "पानी", "घर", "स्कूल"],
        correctIndex: 0
      }
    ]
  },
  "sq-daily": {
    id: "sq-daily",
    title: "Daily Life Quiz",
    questions: [
      {
        type: "match",
        question: "I am going to school",
        options: [
          "मैं स्कूल में हूँ",
          "मैं स्कूल जा रहा हूँ",
          "स्कूल जा रहा है",
          "मेरा स्कूल है"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मुझे ___ चाहिए (I want water)",
        options: ["पानी", "खाना", "मिठाई", "स्कूल"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "Let's go outside",
        options: [
          "बाहर है चलो",
          "चलते हैं बाहर",
          "चलो बाहर चलते हैं",
          "बाहर जा रहे हैं"
        ],
        correctIndex: 2
      },
      {
        type: "fill",
        question: "मुझे ___ बहुत पसंद है (I like sweets very much)",
        options: ["मिठाई", "खाना", "पानी", "स्कूल"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "I am preparing",
        options: [
          "मैं तैयार हूँ",
          "मैं तैयारी कर रहा हूँ",
          "तैयारी है",
          "मेरी तैयारी"
        ],
        correctIndex: 1
      }
    ]
  },
  "sq-identity": {
    id: "sq-identity",
    title: "Identity & Pride Quiz",
    questions: [
      {
        type: "match",
        question: "I want to learn Hindi",
        options: [
          "मुझे हिंदी आती है",
          "मुझे हिंदी सीखनी है",
          "हिंदी सीखनी है",
          "मैं हिंदी हूँ"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मुझे अपनी ___ पर गर्व है (I am proud of my language)",
        options: ["भाषा", "संगीत", "फ़िल्म", "परंपरा"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "I like music",
        options: [
          "संगीत पसंद है",
          "मुझे संगीत पसंद है",
          "मेरा संगीत है",
          "संगीत है पसंद"
        ],
        correctIndex: 1
      },
      {
        type: "fill",
        question: "मैं ___ देख रहा हूँ (I am watching a movie)",
        options: ["फ़िल्म", "संगीत", "स्कूल", "घर"],
        correctIndex: 0
      },
      {
        type: "match",
        question: "I have self-confidence",
        options: [
          "मेरा आत्मविश्वास है",
          "मुझे आत्मविश्वास चाहिए",
          "मुझमें आत्मविश्वास है",
          "आत्मविश्वास में हूँ"
        ],
        correctIndex: 2
      }
    ]
  }
};
