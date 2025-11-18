/**
 * Beginner Words Quizzes
 * Simple multiple-choice quizzes for each word pack
 */

interface WordQuizQuestion {
  word: string;  // Devanagari word to test
  options: string[];  // Possible meanings
  correctIndex: number;
}

interface WordQuiz {
  id: string;
  title: string;
  questions: WordQuizQuestion[];
}

export const beginnerWordQuizzes: { [key: string]: WordQuiz } = {
  "bw-family": {
    id: "bw-family",
    title: "Family Words Quiz",
    questions: [
      {
        word: "माँ",
        options: ["Mother", "Father", "Sister", "Brother"],
        correctIndex: 0
      },
      {
        word: "पापा",
        options: ["Mother", "Father", "Grandmother", "Grandfather"],
        correctIndex: 1
      },
      {
        word: "दादी",
        options: ["Brother", "Sister", "Grandmother", "Mother"],
        correctIndex: 2
      },
      {
        word: "भाई",
        options: ["Sister", "Brother", "Friend", "Father"],
        correctIndex: 1
      },
      {
        word: "बहन",
        options: ["Mother", "Sister", "Grandmother", "Friend"],
        correctIndex: 1
      }
    ]
  },
  "bw-home": {
    id: "bw-home",
    title: "Home & Daily Words Quiz",
    questions: [
      {
        word: "घर",
        options: ["School", "Home", "Water", "Food"],
        correctIndex: 1
      },
      {
        word: "पानी",
        options: ["Food", "Water", "Home", "Friend"],
        correctIndex: 1
      },
      {
        word: "खाना",
        options: ["Water", "Food", "School", "Home"],
        correctIndex: 1
      },
      {
        word: "स्कूल",
        options: ["Home", "Friend", "School", "Food"],
        correctIndex: 2
      },
      {
        word: "दोस्त",
        options: ["Friend", "School", "Home", "Water"],
        correctIndex: 0
      }
    ]
  },
  "bw-nasal": {
    id: "bw-nasal",
    title: "Everyday Sounds Quiz",
    questions: [
      {
        word: "बातों",
        options: ["Hands", "Talks", "Eyes", "Days"],
        correctIndex: 1
      },
      {
        word: "हाथों",
        options: ["Hands", "Eyes", "People", "Nights"],
        correctIndex: 0
      },
      {
        word: "आँखों",
        options: ["Days", "People", "Eyes", "Hands"],
        correctIndex: 2
      },
      {
        word: "लोगों",
        options: ["People", "Talks", "Nights", "Eyes"],
        correctIndex: 0
      },
      {
        word: "दिनों",
        options: ["Nights", "Days", "Hands", "People"],
        correctIndex: 1
      },
      {
        word: "रातों",
        options: ["Days", "Eyes", "Nights", "Talks"],
        correctIndex: 2
      }
    ]
  },
  "bw-body": {
    id: "bw-body",
    title: "Body Parts Quiz",
    questions: [
      {
        word: "हाँ",
        options: ["No", "Yes", "Where", "Why"],
        correctIndex: 1
      },
      {
        word: "नहीं",
        options: ["Yes", "No", "There", "Here"],
        correctIndex: 1
      },
      {
        word: "कहाँ",
        options: ["There", "Here", "Where", "Why"],
        correctIndex: 2
      },
      {
        word: "यहाँ",
        options: ["Here", "There", "Where", "Why"],
        correctIndex: 0
      },
      {
        word: "वहाँ",
        options: ["Here", "There", "Where", "Yes"],
        correctIndex: 1
      },
      {
        word: "क्यों",
        options: ["Where", "Here", "There", "Why"],
        correctIndex: 3
      }
    ]
  },
  "bw-feelings": {
    id: "bw-feelings",
    title: "Feelings Words Quiz",
    questions: [
      {
        word: "खुश",
        options: ["Angry", "Happy", "Love", "Fear"],
        correctIndex: 1
      },
      {
        word: "प्यार",
        options: ["Love", "Happy", "Angry", "Fun"],
        correctIndex: 0
      },
      {
        word: "गुस्सा",
        options: ["Fear", "Angry", "Fun", "Good"],
        correctIndex: 1
      },
      {
        word: "मज़ा",
        options: ["Good", "Happy", "Fun", "Love"],
        correctIndex: 2
      },
      {
        word: "अच्छा",
        options: ["Angry", "Fun", "Happy", "Good"],
        correctIndex: 3
      }
    ]
  }
};
