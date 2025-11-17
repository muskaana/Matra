/**
 * Conversation Snippets for Talk Tab
 * 
 * Simple scripted conversations matching the Sentences level
 * Uses everyday conversational Hindi
 */

export interface ConversationLine {
  hindi: string;
  transliteration: string;
  meaning: string;
}

export interface Conversation {
  id: string;
  title: string;
  context: string;
  lines: ConversationLine[];
}

export const conversations: Conversation[] = [
  {
    id: "at-home",
    title: "At Home with Parents",
    context: "Talking with your parents at home",
    lines: [
      {
        hindi: "मम्मी, खाना तैयार है?",
        transliteration: "Mummy, khaana taiyaar hai?",
        meaning: "Mom, is food ready?"
      },
      {
        hindi: "हां, बस पांच मिनट।",
        transliteration: "Haan, bas paanch minute.",
        meaning: "Yes, just five minutes."
      },
      {
        hindi: "पापा कहां हैं?",
        transliteration: "Papa kahaan hain?",
        meaning: "Where is Dad?"
      },
      {
        hindi: "वो बाहर गए हैं।",
        transliteration: "Vo baahar gaye hain.",
        meaning: "He went outside."
      }
    ]
  },
  {
    id: "with-friend",
    title: "With a Friend",
    context: "Casual chat with a friend",
    lines: [
      {
        hindi: "क्या हाल है?",
        transliteration: "Kya haal hai?",
        meaning: "How are you? / What's up?"
      },
      {
        hindi: "सब बढ़िया। तुम बताओ?",
        transliteration: "Sab badhiya. Tum batao?",
        meaning: "All good. How about you?"
      },
      {
        hindi: "आज क्या करोगे?",
        transliteration: "Aaj kya karoge?",
        meaning: "What will you do today?"
      },
      {
        hindi: "कुछ खास नहीं, घर पर रहूंगा।",
        transliteration: "Kuch khaas nahin, ghar par rahunga.",
        meaning: "Nothing special, will stay home."
      }
    ]
  },
  {
    id: "introducing-yourself",
    title: "Introducing Yourself",
    context: "Meeting a relative for the first time",
    lines: [
      {
        hindi: "नमस्ते, मेरा नाम राज है।",
        transliteration: "Namaste, mera naam Raj hai.",
        meaning: "Hello, my name is Raj."
      },
      {
        hindi: "मैं अमेरिका से हूं।",
        transliteration: "Main America se hoon.",
        meaning: "I am from America."
      },
      {
        hindi: "आप कैसे हैं?",
        transliteration: "Aap kaise hain?",
        meaning: "How are you? (formal)"
      },
      {
        hindi: "मैं ठीक हूं, धन्यवाद।",
        transliteration: "Main theek hoon, dhanyavaad.",
        meaning: "I am fine, thank you."
      }
    ]
  }
];
