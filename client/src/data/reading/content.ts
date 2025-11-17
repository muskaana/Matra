/**
 * Reading Practice Content
 * For heritage speakers to practice reading Devanagari
 * Includes WhatsApp messages, paragraphs, and Bollywood-style captions
 */

export interface ReadingLine {
  hindi: string;
  transliteration: string;
  meaning: string;
}

export interface ReadingContent {
  id: string;
  type: "whatsapp" | "paragraph" | "bollywood";
  title: string;
  description: string;
  lines: ReadingLine[];
  quizId: string;
}

export const readingContent: ReadingContent[] = [
  // WhatsApp Messages
  {
    id: "whatsapp-1",
    type: "whatsapp",
    title: "Chat with Mom",
    description: "A quick message from Mom",
    lines: [
      {
        hindi: "बेटा, खाना खा लिया?",
        transliteration: "Beta, khaana kha liya?",
        meaning: "Child, did you eat?"
      },
      {
        hindi: "घर कब आ रहे हो?",
        transliteration: "Ghar kab aa rahe ho?",
        meaning: "When are you coming home?"
      }
    ],
    quizId: "rq-whatsapp-1"
  },
  {
    id: "whatsapp-2",
    type: "whatsapp",
    title: "Friend's Message",
    description: "Making weekend plans",
    lines: [
      {
        hindi: "यार, कल फ़िल्म देखने चलें?",
        transliteration: "Yaar, kal film dekhne chalen?",
        meaning: "Dude, want to see a movie tomorrow?"
      },
      {
        hindi: "नई फ़िल्म आई है, बहुत अच्छी है!",
        transliteration: "Nayi film aayi hai, bahut acchi hai!",
        meaning: "A new movie came out, it's really good!"
      }
    ],
    quizId: "rq-whatsapp-2"
  },
  {
    id: "whatsapp-3",
    type: "whatsapp",
    title: "Family Group Chat",
    description: "Planning a get-together",
    lines: [
      {
        hindi: "सब लोग रविवार को आ रहे हैं?",
        transliteration: "Sab log ravivaar ko aa rahe hain?",
        meaning: "Is everyone coming on Sunday?"
      },
      {
        hindi: "मैं मिठाई ला रही हूँ।",
        transliteration: "Main mithaai la rahi hoon.",
        meaning: "I'm bringing sweets."
      }
    ],
    quizId: "rq-whatsapp-3"
  },

  // Paragraphs
  {
    id: "para-1",
    type: "paragraph",
    title: "Morning Routine",
    description: "A typical morning at home",
    lines: [
      {
        hindi: "मैं सुबह उठा और चाय बनाई।",
        transliteration: "Main subah utha aur chaay banayi.",
        meaning: "I woke up in the morning and made tea."
      },
      {
        hindi: "माँ रसोई में नाश्ता बना रही थीं।",
        transliteration: "Maa rasoi mein naashta bana rahi theen.",
        meaning: "Mom was making breakfast in the kitchen."
      },
      {
        hindi: "पापा अखबार पढ़ रहे थे।",
        transliteration: "Papa akhbaar padh rahe the.",
        meaning: "Dad was reading the newspaper."
      },
      {
        hindi: "हम सब साथ बैठकर खाना खाए।",
        transliteration: "Hum sab saath baithkar khaana khaye.",
        meaning: "We all sat together and ate."
      }
    ],
    quizId: "rq-para-1"
  },
  {
    id: "para-2",
    type: "paragraph",
    title: "Weekend Plans",
    description: "Getting ready for the day",
    lines: [
      {
        hindi: "आज छुट्टी है, मैं बाहर घूमने जा रहा हूँ।",
        transliteration: "Aaj chutti hai, main baahar ghoomne ja raha hoon.",
        meaning: "Today is a holiday, I'm going out to roam around."
      },
      {
        hindi: "मेरे दोस्त भी आ रहे हैं।",
        transliteration: "Mere dost bhi aa rahe hain.",
        meaning: "My friends are also coming."
      },
      {
        hindi: "हम पार्क में मिलेंगे।",
        transliteration: "Hum park mein milenge.",
        meaning: "We will meet at the park."
      },
      {
        hindi: "बहुत मज़ा आएगा!",
        transliteration: "Bahut mazaa aayega!",
        meaning: "It will be so much fun!"
      }
    ],
    quizId: "rq-para-2"
  },
  {
    id: "para-3",
    type: "paragraph",
    title: "Festival Time",
    description: "Getting ready for celebration",
    lines: [
      {
        hindi: "आज दिवाली है।",
        transliteration: "Aaj Diwali hai.",
        meaning: "Today is Diwali."
      },
      {
        hindi: "पूरा घर सजाया है।",
        transliteration: "Poora ghar sajaaya hai.",
        meaning: "We've decorated the whole house."
      },
      {
        hindi: "मिठाई और पकवान बने हैं।",
        transliteration: "Mithaai aur pakwaan bane hain.",
        meaning: "Sweets and delicacies have been made."
      },
      {
        hindi: "शाम को सब लोग आएंगे।",
        transliteration: "Shaam ko sab log aayenge.",
        meaning: "Everyone will come in the evening."
      }
    ],
    quizId: "rq-para-3"
  },

  // Bollywood Style
  {
    id: "bolly-1",
    type: "bollywood",
    title: "Filmi Dialogue",
    description: "Classic Bollywood line",
    lines: [
      {
        hindi: "ज़िंदगी में कभी हार नहीं माननी चाहिए, कोशिश करते रहना चाहिए!",
        transliteration: "Zindagi mein kabhi haar nahi maanni chahiye, koshish karte rehna chahiye!",
        meaning: "You should never give up in life, you should keep trying!"
      }
    ],
    quizId: "rq-bolly-1"
  },
  {
    id: "bolly-2",
    type: "bollywood",
    title: "Love Song Line",
    description: "Romantic Bollywood style",
    lines: [
      {
        hindi: "तुम मेरे दिल की धड़कन हो, मेरी ज़िंदगी हो!",
        transliteration: "Tum mere dil ki dhadkan ho, meri zindagi ho!",
        meaning: "You are my heartbeat, you are my life!"
      }
    ],
    quizId: "rq-bolly-2"
  },
  {
    id: "bolly-3",
    type: "bollywood",
    title: "Party Vibes",
    description: "Upbeat dance song style",
    lines: [
      {
        hindi: "नाचो, गाओ, खुश रहो - ये ज़िंदगी है एक बार!",
        transliteration: "Nacho, gaao, khush raho - ye zindagi hai ek baar!",
        meaning: "Dance, sing, be happy - this life comes once!"
      }
    ],
    quizId: "rq-bolly-3"
  }
];
