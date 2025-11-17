/**
 * Reading Comprehension Quizzes
 * Light, fun questions about reading content
 */

interface ReadingQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ReadingQuiz {
  id: string;
  title: string;
  questions: ReadingQuizQuestion[];
}

export const readingQuizzes: { [key: string]: ReadingQuiz } = {
  "rq-whatsapp-1": {
    id: "rq-whatsapp-1",
    title: "Chat with Mom",
    questions: [
      {
        question: "What did Mom ask about?",
        options: ["If you ate food", "If you're sleeping", "If you're studying", "If you're working"],
        correctIndex: 0
      },
      {
        question: "What else did Mom want to know?",
        options: ["What time is it", "When you're coming home", "What you're doing", "Who you're with"],
        correctIndex: 1
      }
    ]
  },
  "rq-whatsapp-2": {
    id: "rq-whatsapp-2",
    title: "Friend's Message",
    questions: [
      {
        question: "What does your friend want to do tomorrow?",
        options: ["Go to a party", "Watch a movie", "Play cricket", "Study together"],
        correctIndex: 1
      },
      {
        question: "What did your friend say about the movie?",
        options: ["It's boring", "It's old", "It's really good", "It's scary"],
        correctIndex: 2
      }
    ]
  },
  "rq-whatsapp-3": {
    id: "rq-whatsapp-3",
    title: "Family Group Chat",
    questions: [
      {
        question: "When is everyone coming?",
        options: ["Monday", "Saturday", "Sunday", "Friday"],
        correctIndex: 2
      },
      {
        question: "What is the person bringing?",
        options: ["Sweets", "Food", "Drinks", "Gifts"],
        correctIndex: 0
      }
    ]
  },
  "rq-para-1": {
    id: "rq-para-1",
    title: "Morning Routine",
    questions: [
      {
        question: "What did the person make in the morning?",
        options: ["Coffee", "Tea", "Breakfast", "Lunch"],
        correctIndex: 1
      },
      {
        question: "What was Dad doing?",
        options: ["Cooking", "Reading newspaper", "Watching TV", "Sleeping"],
        correctIndex: 1
      },
      {
        question: "What did the family do together?",
        options: ["Watched TV", "Went out", "Ate together", "Cleaned house"],
        correctIndex: 2
      }
    ]
  },
  "rq-para-2": {
    id: "rq-para-2",
    title: "Weekend Plans",
    questions: [
      {
        question: "Why is the person going out?",
        options: ["It's a work day", "It's a holiday", "They're bored", "They have class"],
        correctIndex: 1
      },
      {
        question: "Where will they meet?",
        options: ["At home", "At school", "At the park", "At a restaurant"],
        correctIndex: 2
      },
      {
        question: "How does the person feel about the plans?",
        options: ["Nervous", "Excited/fun", "Tired", "Worried"],
        correctIndex: 1
      }
    ]
  },
  "rq-para-3": {
    id: "rq-para-3",
    title: "Festival Time",
    questions: [
      {
        question: "What festival is it?",
        options: ["Holi", "Diwali", "Eid", "Christmas"],
        correctIndex: 1
      },
      {
        question: "What have they prepared?",
        options: ["Only decorations", "Only gifts", "Sweets and delicacies", "Only lights"],
        correctIndex: 2
      },
      {
        question: "When will people come?",
        options: ["Morning", "Afternoon", "Evening", "Night"],
        correctIndex: 2
      }
    ]
  },
  "rq-bolly-1": {
    id: "rq-bolly-1",
    title: "Filmi Dialogue",
    questions: [
      {
        question: "What is the main message?",
        options: ["Give up easily", "Never give up", "Don't try hard", "Sleep more"],
        correctIndex: 1
      },
      {
        question: "What should you keep doing?",
        options: ["Complaining", "Trying", "Sleeping", "Worrying"],
        correctIndex: 1
      }
    ]
  },
  "rq-bolly-2": {
    id: "rq-bolly-2",
    title: "Love Song Line",
    questions: [
      {
        question: "What type of song is this?",
        options: ["Sad song", "Party song", "Romantic song", "Friendship song"],
        correctIndex: 2
      },
      {
        question: "What does the person call their beloved?",
        options: ["Their friend", "Their heartbeat", "Their teacher", "Their family"],
        correctIndex: 1
      }
    ]
  },
  "rq-bolly-3": {
    id: "rq-bolly-3",
    title: "Party Vibes",
    questions: [
      {
        question: "What's the mood of this line?",
        options: ["Sad and slow", "Upbeat and fun", "Angry", "Sleepy"],
        correctIndex: 1
      },
      {
        question: "What is the message about life?",
        options: ["It's hard", "It comes once, enjoy it", "It's boring", "It's too long"],
        correctIndex: 1
      }
    ]
  }
};
