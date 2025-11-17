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
    description: "Talking about family",
    sentences: [
      {
        id: "s1",
        hindi: "मेरा नाम राज है",
        transliteration: "Mera naam Raj hai",
        meaning: "My name is Raj"
      },
      {
        id: "s2",
        hindi: "मैं अपने घर जा रहा हूँ",
        transliteration: "Main apne ghar ja raha hoon",
        meaning: "I am going to my home"
      },
      {
        id: "s3",
        hindi: "मेरी माँ बहुत अच्छी है",
        transliteration: "Meri maa bahut acchi hai",
        meaning: "My mother is very good/nice"
      },
      {
        id: "s4",
        hindi: "मेरे पापा खाना बना रहे हैं",
        transliteration: "Mere papa khaana bana rahe hain",
        meaning: "My father is making food"
      },
      {
        id: "s5",
        hindi: "मेरी बहन खुश है",
        transliteration: "Meri bahan khush hai",
        meaning: "My sister is happy"
      },
      {
        id: "s6",
        hindi: "मेरा भाई दादी के साथ है",
        transliteration: "Mera bhai daadi ke saath hai",
        meaning: "My brother is with grandmother"
      }
    ],
    quizId: "sq-family"
  },
  {
    id: "daily-life",
    title: "Daily Life",
    description: "Everyday activities",
    sentences: [
      {
        id: "s7",
        hindi: "मैं स्कूल जा रहा हूँ",
        transliteration: "Main school ja raha hoon",
        meaning: "I am going to school"
      },
      {
        id: "s8",
        hindi: "मुझे पानी चाहिए",
        transliteration: "Mujhe paani chahiye",
        meaning: "I want water"
      },
      {
        id: "s9",
        hindi: "मेरा दोस्त खाना खा रहा है",
        transliteration: "Mera dost khaana kha raha hai",
        meaning: "My friend is eating food"
      },
      {
        id: "s10",
        hindi: "चलो बाहर चलते हैं",
        transliteration: "Chalo baahar chalte hain",
        meaning: "Let's go outside"
      },
      {
        id: "s11",
        hindi: "मुझे मिठाई बहुत पसंद है",
        transliteration: "Mujhe mithaai bahut pasand hai",
        meaning: "I like sweets very much"
      },
      {
        id: "s12",
        hindi: "मैं तैयारी कर रहा हूँ",
        transliteration: "Main taiyaari kar raha hoon",
        meaning: "I am preparing/getting ready"
      }
    ],
    quizId: "sq-daily"
  },
  {
    id: "identity-pride",
    title: "Identity & Pride",
    description: "Expressing yourself",
    sentences: [
      {
        id: "s13",
        hindi: "मुझे हिंदी सीखनी है",
        transliteration: "Mujhe Hindi seekhni hai",
        meaning: "I want to learn Hindi"
      },
      {
        id: "s14",
        hindi: "मुझे अपनी भाषा पर गर्व है",
        transliteration: "Mujhe apni bhaasha par garv hai",
        meaning: "I am proud of my language"
      },
      {
        id: "s15",
        hindi: "मुझे संगीत पसंद है",
        transliteration: "Mujhe sangeet pasand hai",
        meaning: "I like music"
      },
      {
        id: "s16",
        hindi: "मैं फ़िल्म देख रहा हूँ",
        transliteration: "Main film dekh raha hoon",
        meaning: "I am watching a movie"
      },
      {
        id: "s17",
        hindi: "मेरी पहचान मेरी परंपरा है",
        transliteration: "Meri pahchaan meri parampara hai",
        meaning: "My tradition is my identity"
      },
      {
        id: "s18",
        hindi: "मुझमें आत्मविश्वास है",
        transliteration: "Mujhme aatmavishvaas hai",
        meaning: "I have self-confidence"
      }
    ],
    quizId: "sq-identity"
  }
];
