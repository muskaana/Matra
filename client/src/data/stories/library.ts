export interface StorySentence {
  hi: string;
  translit: string;
  en: string;
}

export interface Story {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate';
  summaryEn: string;
  sentences: StorySentence[];
}

export const storiesLibrary: Story[] = [
  {
    id: "nani-ke-ghar",
    title: "नानी के घर",
    level: "Beginner",
    summaryEn: "A WhatsApp message about visiting grandma's house this weekend",
    sentences: [
      {
        hi: "इस हफ्ते नानी के घर चलें?",
        translit: "Is hafte nani ke ghar chalen?",
        en: "Should we go to grandma's house this weekend?"
      },
      {
        hi: "हां! मुझे नानी से मिलना है।",
        translit: "Haan! Mujhe nani se milna hai.",
        en: "Yes! I want to meet grandma."
      },
      {
        hi: "शनिवार को चलते हैं।",
        translit: "Shanivaar ko chalte hain.",
        en: "Let's go on Saturday."
      }
    ]
  },
  {
    id: "pehla-din-college",
    title: "पहला दिन कॉलेज में",
    level: "Intermediate",
    summaryEn: "Nervous excitement on the first day of college",
    sentences: [
      {
        hi: "आज मेरा पहला दिन कॉलेज में है।",
        translit: "Aaj mera pehla din college mein hai.",
        en: "Today is my first day at college."
      },
      {
        hi: "मुझे थोड़ा घबराहट हो रही है।",
        translit: "Mujhe thoda ghabrahat ho rahi hai.",
        en: "I'm feeling a little nervous."
      },
      {
        hi: "लेकिन मैं नए दोस्त बनाने के लिए उत्सुक हूं।",
        translit: "Lekin main naye dost banane ke liye utsuk hoon.",
        en: "But I'm excited to make new friends."
      },
      {
        hi: "शाम को घर आकर सब कुछ बताऊंगा।",
        translit: "Shaam ko ghar aakar sab kuch bataunga.",
        en: "I'll come home in the evening and tell you everything."
      }
    ]
  },
  {
    id: "whatsapp-group",
    title: "फैमिली ग्रुप चैट",
    level: "Beginner",
    summaryEn: "Quick messages in the family WhatsApp group",
    sentences: [
      {
        hi: "हैलो सब लोग!",
        translit: "Hello sab log!",
        en: "Hello everyone!"
      },
      {
        hi: "आज रात डिनर पर क्या बनेगा?",
        translit: "Aaj raat dinner par kya banega?",
        en: "What's for dinner tonight?"
      },
      {
        hi: "मम्मी पनीर बना रही हैं।",
        translit: "Mummy paneer bana rahi hain.",
        en: "Mom is making paneer."
      },
      {
        hi: "वाह! मैं समय पर आऊंगा।",
        translit: "Waah! Main samay par aaunga.",
        en: "Wow! I'll come on time."
      }
    ]
  },
  {
    id: "diwali-plans",
    title: "दिवाली की तैयारी",
    level: "Beginner",
    summaryEn: "Getting ready for Diwali celebrations with family",
    sentences: [
      {
        hi: "दिवाली आ रही है!",
        translit: "Diwali aa rahi hai!",
        en: "Diwali is coming!"
      },
      {
        hi: "हमें घर की सफाई करनी है।",
        translit: "Hamein ghar ki safaai karni hai.",
        en: "We need to clean the house."
      },
      {
        hi: "और नए कपड़े खरीदने हैं।",
        translit: "Aur naye kapde kharidne hain.",
        en: "And we need to buy new clothes."
      },
      {
        hi: "मिठाई भी लेनी होगी।",
        translit: "Mithai bhi leni hogi.",
        en: "We'll also need to get sweets."
      }
    ]
  },
  {
    id: "airport-pickup",
    title: "एयरपोर्ट पिकअप",
    level: "Intermediate",
    summaryEn: "Coordinating to pick up relatives arriving from India",
    sentences: [
      {
        hi: "मामा जी की फ्लाइट कल सुबह आ रही है।",
        translit: "Mama ji ki flight kal subah aa rahi hai.",
        en: "Uncle's flight is arriving tomorrow morning."
      },
      {
        hi: "हमें एयरपोर्ट पर जाना होगा।",
        translit: "Hamein airport par jaana hoga.",
        en: "We'll have to go to the airport."
      },
      {
        hi: "फ्लाइट सुबह छह बजे लैंड करेगी।",
        translit: "Flight subah chhe baje land karegi.",
        en: "The flight will land at 6 AM."
      },
      {
        hi: "तो हमें पांच बजे घर से निकलना होगा।",
        translit: "To hamein paanch baje ghar se nikalna hoga.",
        en: "So we'll have to leave home at 5 AM."
      },
      {
        hi: "ठीक है, मैं तैयार रहूंगा।",
        translit: "Theek hai, main taiyaar rahunga.",
        en: "Okay, I'll be ready."
      }
    ]
  },
  {
    id: "grocery-shopping",
    title: "किराना खरीदना",
    level: "Beginner",
    summaryEn: "Shopping for groceries at the Indian store",
    sentences: [
      {
        hi: "हमें इंडियन स्टोर जाना है।",
        translit: "Hamein Indian store jaana hai.",
        en: "We need to go to the Indian store."
      },
      {
        hi: "चावल और आटा खत्म हो गया है।",
        translit: "Chawal aur aata khatam ho gaya hai.",
        en: "We're out of rice and flour."
      },
      {
        hi: "कुछ मसाले भी लेने हैं।",
        translit: "Kuch masaale bhi lene hain.",
        en: "We also need to get some spices."
      }
    ]
  },
  {
    id: "job-interview",
    title: "नौकरी का इंटरव्यू",
    level: "Intermediate",
    summaryEn: "Getting ready for an important job interview",
    sentences: [
      {
        hi: "कल मेरा इंटरव्यू है।",
        translit: "Kal mera interview hai.",
        en: "My interview is tomorrow."
      },
      {
        hi: "मैं बहुत excited और nervous हूं।",
        translit: "Main bahut excited aur nervous hoon.",
        en: "I'm very excited and nervous."
      },
      {
        hi: "मुझे अपने सारे documents तैयार रखने हैं।",
        translit: "Mujhe apne saare documents taiyaar rakhne hain.",
        en: "I need to keep all my documents ready."
      },
      {
        hi: "सब ठीक हो जाएगा, तुम अच्छा करोगे।",
        translit: "Sab theek ho jaayega, tum accha karoge.",
        en: "Everything will be fine, you'll do well."
      }
    ]
  },
  {
    id: "birthday-party",
    title: "जन्मदिन की पार्टी",
    level: "Beginner",
    summaryEn: "Planning a friend's surprise birthday party",
    sentences: [
      {
        hi: "अगले हफ्ते राज का जन्मदिन है।",
        translit: "Agle hafte Raj ka janmdin hai.",
        en: "Raj's birthday is next week."
      },
      {
        hi: "हम सरप्राइज पार्टी करेंगे।",
        translit: "Hum surprise party karenge.",
        en: "We'll throw a surprise party."
      },
      {
        hi: "किसी को बताना मत।",
        translit: "Kisi ko batana mat.",
        en: "Don't tell anyone."
      },
      {
        hi: "शनिवार शाम को सात बजे।",
        translit: "Shanivaar shaam ko saat baje.",
        en: "Saturday evening at 7 PM."
      }
    ]
  }
];
