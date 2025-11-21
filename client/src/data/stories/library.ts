export interface Story {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate';
  content: string[];
  comprehensionQuestions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export const storiesLibrary: Story[] = [
  {
    id: "chai-time",
    title: "चाय का समय (Chai Time)",
    description: "A quick chat over morning tea",
    difficulty: "Beginner",
    content: [
      "मुझे चाय चाहिए।",
      "दूध और चीनी के साथ।",
      "बहुत गर्म।"
    ]
  },
  {
    id: "market-trip",
    title: "बाजार जाना (Going to Market)",
    description: "Shopping for vegetables at the local market",
    difficulty: "Beginner",
    content: [
      "मैं बाजार जा रहा हूं।",
      "मुझे सब्जियां चाहिए।",
      "आलू, प्याज और टमाटर।",
      "कितने पैसे हैं?"
    ]
  },
  {
    id: "phone-call",
    title: "फ़ोन पर बात (Phone Chat)",
    description: "A short conversation on the phone",
    difficulty: "Beginner",
    content: [
      "हैलो, कैसे हो?",
      "मैं ठीक हूं, धन्यवाद।",
      "क्या तुम घर पर हो?",
      "हां, मैं घर पर हूं।"
    ]
  },
  {
    id: "movie-plan",
    title: "फ़िल्म देखने चलें (Let's Watch a Movie)",
    description: "Making plans to see a Bollywood film",
    difficulty: "Intermediate",
    content: [
      "आज शाम को फ़िल्म देखने चलें?",
      "कौन सी फ़िल्म देखनी है?",
      "नई शाहरुख़ खान की फ़िल्म आई है।",
      "बढ़िया! शो किस टाइम है?",
      "सात बजे का शो है।"
    ]
  },
  {
    id: "weather-talk",
    title: "मौसम की बात (Weather Talk)",
    description: "Discussing the weather and plans",
    difficulty: "Beginner",
    content: [
      "आज बहुत गर्मी है।",
      "हां, बहुत गर्म दिन है।",
      "मैं घर पर ही रहूंगा।",
      "ठंडा पानी पीओ।"
    ]
  },
  {
    id: "family-dinner",
    title: "परिवार का खाना (Family Dinner)",
    description: "Dinner time with the family",
    difficulty: "Intermediate",
    content: [
      "खाना तैयार है?",
      "हां, अभी आ रहा है।",
      "आज क्या बना है?",
      "रोटी, दाल और सब्जी बनी है।",
      "वाह! मुझे बहुत भूख लगी है।",
      "सब लोग बैठ जाओ, खाना परोसती हूं।"
    ]
  },
  {
    id: "cricket-match",
    title: "क्रिकेट मैच (Cricket Match)",
    description: "Excitement about a cricket game",
    difficulty: "Intermediate",
    content: [
      "आज भारत का मैच है!",
      "किसके साथ खेल रहे हैं?",
      "पाकिस्तान के साथ।",
      "मैच कितने बजे है?",
      "शाम को सात बजे।",
      "चलो साथ में देखते हैं!"
    ]
  },
  {
    id: "birthday-wish",
    title: "जन्मदिन की बधाई (Birthday Wishes)",
    description: "Wishing someone happy birthday",
    difficulty: "Beginner",
    content: [
      "जन्मदिन मुबारक हो!",
      "थैंक यू सो मच!",
      "पार्टी कहां है?",
      "घर पर ही है, शाम को आना।"
    ]
  }
];
