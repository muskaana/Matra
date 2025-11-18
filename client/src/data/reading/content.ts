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
    title: "Never Give Up",
    description: "Inspirational movie dialogue",
    lines: [
      {
        hindi: "ज़िंदगी में कभी हार नहीं माननी चाहिए।",
        transliteration: "Zindagi mein kabhi haar nahi maanni chahiye.",
        meaning: "You should never give up in life."
      },
      {
        hindi: "कोशिश करते रहना चाहिए!",
        transliteration: "Koshish karte rehna chahiye!",
        meaning: "You should keep trying!"
      },
      {
        hindi: "क्योंकि जब तक जीत नहीं होती, हार नहीं मानी जाती।",
        transliteration: "Kyonki jab tak jeet nahi hoti, haar nahi maani jaati.",
        meaning: "Because until you win, you haven't accepted defeat."
      }
    ],
    quizId: "rq-bolly-1"
  },
  {
    id: "bolly-2",
    type: "bollywood",
    title: "Kuch Kuch Hota Hai",
    description: "Romantic Bollywood classic",
    lines: [
      {
        hindi: "कुछ कुछ होता है",
        transliteration: "Kuch kuch hota hai",
        meaning: "Something happens"
      },
      {
        hindi: "तुम नहीं समझोगे",
        transliteration: "Tum nahin samjhoge",
        meaning: "You won't understand"
      },
      {
        hindi: "प्यार दोस्ती है",
        transliteration: "Pyaar dosti hai",
        meaning: "Love is friendship"
      }
    ],
    quizId: "rq-bolly-2"
  },
  {
    id: "bolly-3",
    type: "bollywood",
    title: "Kal Ho Naa Ho",
    description: "About living in the present",
    lines: [
      {
        hindi: "हर घड़ी बदल रही है रूप ज़िंदगी",
        transliteration: "Har ghadi badal rahi hai roop zindagi",
        meaning: "Every moment life is changing its form"
      },
      {
        hindi: "छाँव है कभी कभी है धूप ज़िंदगी",
        transliteration: "Chaanv hai kabhi kabhi hai dhoop zindagi",
        meaning: "Sometimes it's shade, sometimes it's sunshine, life is"
      },
      {
        hindi: "हर पल यहाँ जी भर जियो",
        transliteration: "Har pal yahaan jee bhar jiyo",
        meaning: "Live every moment here to the fullest"
      }
    ],
    quizId: "rq-bolly-3"
  },
  {
    id: "bolly-4",
    type: "bollywood",
    title: "Kabhi Khushi Kabhie Gham",
    description: "About family bonds",
    lines: [
      {
        hindi: "कभी खुशी कभी ग़म",
        transliteration: "Kabhi khushi kabhie gham",
        meaning: "Sometimes happiness, sometimes sorrow"
      },
      {
        hindi: "ऐसा है ये घर परिवार",
        transliteration: "Aisa hai ye ghar parivar",
        meaning: "Such is this home and family"
      },
      {
        hindi: "साथ हैं हम यहाँ हर खुशी में हर ग़म में",
        transliteration: "Saath hain hum yahaan har khushi mein har gham mein",
        meaning: "We're together here in every happiness and every sorrow"
      }
    ],
    quizId: "rq-bolly-4"
  },
  {
    id: "bolly-5",
    type: "bollywood",
    title: "Senorita",
    description: "Zindagi Na Milegi Dobara song",
    lines: [
      {
        hindi: "ये दुनिया पितल दी",
        transliteration: "Ye duniya pital di",
        meaning: "This world is made of brass"
      },
      {
        hindi: "हाँ हथेली पे सितारे",
        transliteration: "Haan hatheli pe sitaare",
        meaning: "Yes, stars on the palm"
      },
      {
        hindi: "दिल खोल के जी लो ओ लम्हों की बारिश में",
        transliteration: "Dil khol ke jee lo o lamhon ki baarish mein",
        meaning: "Live with an open heart in the rain of moments"
      }
    ],
    quizId: "rq-bolly-5"
  },
  {
    id: "bolly-6",
    type: "bollywood",
    title: "Mere Paas Maa Hai",
    description: "Famous dialogue about family",
    lines: [
      {
        hindi: "मेरे पास बंगला है, गाड़ी है, पैसा है।",
        transliteration: "Mere paas bangla hai, gaadi hai, paisa hai.",
        meaning: "I have a bungalow, a car, money."
      },
      {
        hindi: "तुम्हारे पास क्या है?",
        transliteration: "Tumhare paas kya hai?",
        meaning: "What do you have?"
      },
      {
        hindi: "मेरे पास माँ है!",
        transliteration: "Mere paas maan hai!",
        meaning: "I have my mother!"
      }
    ],
    quizId: "rq-bolly-6"
  },
  {
    id: "bolly-7",
    type: "bollywood",
    title: "Tum Hi Ho",
    description: "Romantic song lyrics",
    lines: [
      {
        hindi: "तुम ही हो, तुम ही हो",
        transliteration: "Tum hi ho, tum hi ho",
        meaning: "You are the one, you are the one"
      },
      {
        hindi: "ज़िंदगी अब तुम ही हो",
        transliteration: "Zindagi ab tum hi ho",
        meaning: "Life, now you are the one"
      },
      {
        hindi: "चैन भी, मेरा दर्द भी",
        transliteration: "Chain bhi, mera dard bhi",
        meaning: "My peace, my pain too"
      },
      {
        hindi: "मेरी आशिकी अब तुम ही हो",
        transliteration: "Meri aashiqui ab tum hi ho",
        meaning: "My love, now you are the one"
      }
    ],
    quizId: "rq-bolly-7"
  },
  {
    id: "bolly-8",
    type: "bollywood",
    title: "Chaiyya Chaiyya",
    description: "Energetic dance song",
    lines: [
      {
        hindi: "जिनके सर हो इश्क़ की छाँव",
        transliteration: "Jinke sar ho ishq ki chaanv",
        meaning: "Those who have the shade of love over their heads"
      },
      {
        hindi: "पाँव के नीचे जन्नत होगी",
        transliteration: "Paanv ke neeche jannat hogi",
        meaning: "Will have heaven beneath their feet"
      },
      {
        hindi: "चैय्या चैय्या!",
        transliteration: "Chaiyya chaiyya!",
        meaning: "Chaiyya chaiyya! (shade/shelter)"
      }
    ],
    quizId: "rq-bolly-8"
  }
];
