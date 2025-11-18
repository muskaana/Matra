/**
 * Beginner Sentences Data
 * Simple sentences using vocabulary from Beginner Words + Advanced Words
 * Organized into thematic sections
 */

export interface Sentence {
  id: string;
  hindi: string;  // Devanagari
  transliteration: string;
  meaning: string;
}

export interface SentenceSection {
  id: string;
  title: string;
  description: string;
  sentences: Sentence[];
  quizId: string;
}

export const sentenceSections: SentenceSection[] = [
  {
    id: "family-talk",
    title: "Family Talk",
    description: "Chat with family members",
    sentences: [
      {
        id: "s1",
        hindi: "माँ, मुझे भूख लगी है",
        transliteration: "Maa, mujhe bhookh lagi hai",
        meaning: "Mom, I'm hungry"
      },
      {
        id: "s2",
        hindi: "पापा, आप कहाँ हो?",
        transliteration: "Papa, aap kaha ho?",
        meaning: "Dad, where are you?"
      },
      {
        id: "s3",
        hindi: "मेरी बहन घर पर है",
        transliteration: "Meri bahan ghar par hai",
        meaning: "My sister is at home"
      },
      {
        id: "s4",
        hindi: "दादी, चाय पी लो",
        transliteration: "Daadi, chaay pee lo",
        meaning: "Grandma, have some tea"
      },
      {
        id: "s5",
        hindi: "भाई, ज़रा मदद करो",
        transliteration: "Bhai, zara madad karo",
        meaning: "Brother, help me a bit"
      },
      {
        id: "s6",
        hindi: "चाचा घर आ रहे हैं",
        transliteration: "Chacha ghar aa rahe hain",
        meaning: "Uncle is coming home"
      }
    ],
    quizId: "sq-family"
  },
  {
    id: "daily-life",
    title: "Daily Routine",
    description: "Everyday conversations",
    sentences: [
      {
        id: "s7",
        hindi: "मुझे एक कप चाय चाहिए",
        transliteration: "Mujhe ek cup chaay chahiye",
        meaning: "I want a cup of tea"
      },
      {
        id: "s8",
        hindi: "आज बहुत गर्मी है",
        transliteration: "Aaj bahut garmi hai",
        meaning: "It's very hot today"
      },
      {
        id: "s9",
        hindi: "क्या तुम घर जा रहे हो?",
        transliteration: "Kya tum ghar ja rahe ho?",
        meaning: "Are you going home?"
      },
      {
        id: "s10",
        hindi: "मुझे ये समझ नहीं आया",
        transliteration: "Mujhe ye samajh nahi aaya",
        meaning: "I didn't understand this"
      },
      {
        id: "s11",
        hindi: "चलो, बाहर चलते हैं",
        transliteration: "Chalo, baahar chalte hain",
        meaning: "Come on, let's go outside"
      },
      {
        id: "s12",
        hindi: "मैं तैयार हो गया",
        transliteration: "Main taiyaar ho gaya",
        meaning: "I'm ready"
      }
    ],
    quizId: "sq-daily"
  },
  {
    id: "feelings-talk",
    title: "How You Feel",
    description: "Express your feelings",
    sentences: [
      {
        id: "s13",
        hindi: "मैं बहुत खुश हूँ",
        transliteration: "Main bahut khush hoon",
        meaning: "I'm very happy"
      },
      {
        id: "s14",
        hindi: "मुझे थोड़ा डर लग रहा है",
        transliteration: "Mujhe thoda dar lag raha hai",
        meaning: "I'm feeling a bit scared"
      },
      {
        id: "s15",
        hindi: "ये बहुत मुश्किल है",
        transliteration: "Ye bahut mushkil hai",
        meaning: "This is very difficult"
      },
      {
        id: "s16",
        hindi: "मुझे उम्मीद है सब ठीक होगा",
        transliteration: "Mujhe ummeed hai sab theek hoga",
        meaning: "I hope everything will be okay"
      },
      {
        id: "s17",
        hindi: "तुम परेशान क्यों हो?",
        transliteration: "Tum pareshaan kyon ho?",
        meaning: "Why are you worried?"
      },
      {
        id: "s18",
        hindi: "मैं थोड़ा शर्मिंदा हूँ",
        transliteration: "Main thoda sharminda hoon",
        meaning: "I'm a bit embarrassed"
      }
    ],
    quizId: "sq-feelings"
  },
  {
    id: "plans-chat",
    title: "Making Plans",
    description: "Talk about what to do",
    sentences: [
      {
        id: "s19",
        hindi: "कल फ़िल्म देखने चलें?",
        transliteration: "Kal film dekhne chalen?",
        meaning: "Want to watch a movie tomorrow?"
      },
      {
        id: "s20",
        hindi: "हाँ, बिल्कुल चलते हैं",
        transliteration: "Haa, bilkul chalte hain",
        meaning: "Yes, absolutely let's go"
      },
      {
        id: "s21",
        hindi: "शायद मैं आ सकूँ",
        transliteration: "Shaayad main aa sakoon",
        meaning: "Maybe I can come"
      },
      {
        id: "s22",
        hindi: "ये ज़रूरी काम है",
        transliteration: "Ye zaroori kaam hai",
        meaning: "This is important work"
      },
      {
        id: "s23",
        hindi: "मुझे कुछ सामान लाना है",
        transliteration: "Mujhe kuch saamaan laana hai",
        meaning: "I need to bring some stuff"
      },
      {
        id: "s24",
        hindi: "अचानक मेरे मन में आया",
        transliteration: "Achaanak mere man mein aaya",
        meaning: "It suddenly came to my mind"
      }
    ],
    quizId: "sq-plans"
  }
];
