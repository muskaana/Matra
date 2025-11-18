/**
 * Word Reading Instruction Lessons
 * 
 * Multi-page lessons teaching how to read Hindi words
 * No quizzes - just instructional content
 */

export interface WordReadingLesson {
  id: string;
  title: string;
  content: {
    intro?: string;
    examples: Array<{
      devanagari: string;
      romanization?: string;
      meaning?: string;
      breakdown?: string;
    }>;
    tips?: string[];
  };
  nextLesson?: string;
}

export const wordReadingLessons: Record<string, WordReadingLesson> = {
  "1": {
    id: "1",
    title: "Syllable Structure",
    content: {
      intro: "Each consonant has an inherent अ (a) sound built in.",
      examples: [
        { devanagari: "क", romanization: "ka (not just 'k')", meaning: "" },
        { devanagari: "म", romanization: "ma", meaning: "" },
        { devanagari: "न", romanization: "na", meaning: "" },
        { devanagari: "र", romanization: "ra", meaning: "" },
        { devanagari: "स", romanization: "sa", meaning: "" },
      ],
      tips: [
        "Every consonant automatically has an 'a' sound",
        "This is why 'क' is read as 'ka', not just 'k'",
        "Understanding this is key to reading Hindi words"
      ]
    },
    nextLesson: "2"
  },
  "2": {
    id: "2",
    title: "Matras (Vowel Marks)",
    content: {
      intro: "Matras change the vowel sound. They attach to consonants:",
      examples: [
        { devanagari: "कि", romanization: "ki", meaning: "" },
        { devanagari: "की", romanization: "kee", meaning: "" },
        { devanagari: "कु", romanization: "ku", meaning: "" },
        { devanagari: "कू", romanization: "koo", meaning: "" },
        { devanagari: "के", romanization: "kay", meaning: "" },
        { devanagari: "को", romanization: "ko", meaning: "" },
        { devanagari: "का", romanization: "kaa", meaning: "" },
      ],
      tips: [
        "Matras modify the consonant's vowel sound",
        "The consonant stays the same, only the vowel changes",
        "Practice recognizing matras quickly for fluent reading"
      ]
    },
    nextLesson: "3"
  },
  "3": {
    id: "3",
    title: "Reading Simple Words",
    content: {
      intro: "Blend consonants together to form words:",
      examples: [
        { devanagari: "नम", romanization: "nam", meaning: "bow", breakdown: "na + ma" },
        { devanagari: "दम", romanization: "dam", meaning: "breath", breakdown: "da + ma" },
        { devanagari: "घर", romanization: "ghar", meaning: "home", breakdown: "gha + ra" },
        { devanagari: "जल", romanization: "jal", meaning: "water", breakdown: "ja + la" },
        { devanagari: "फल", romanization: "phal", meaning: "fruit", breakdown: "pha + la" },
      ],
      tips: [
        "Read each syllable, then blend them together",
        "Say the word out loud to practice pronunciation",
        "Start slow—speed will come with practice"
      ]
    },
    nextLesson: "4"
  },
  "4": {
    id: "4",
    title: "Half Consonants (Advanced)",
    content: {
      intro: "Sometimes consonants cluster together. A halant (्) removes the inherent 'a':",
      examples: [
        { devanagari: "स्कूल", romanization: "skool", meaning: "school", breakdown: "स् + कू + ल" },
        { devanagari: "क्लास", romanization: "klaas", meaning: "class", breakdown: "क् + ला + स" },
        { devanagari: "प्यार", romanization: "pyaar", meaning: "love", breakdown: "प् + या + र" },
      ],
      tips: [
        "The halant (्) removes the vowel from a consonant",
        "This creates consonant clusters like 'sk', 'kl', 'py'",
        "Don't worry! You'll practice these naturally as you learn words",
        "These patterns become familiar with exposure"
      ]
    }
  }
};

export const wordReadingLessonIds = ["1", "2", "3", "4"];
