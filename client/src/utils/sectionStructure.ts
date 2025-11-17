/**
 * Section Structure Definitions
 * 
 * Defines the structure of each section across different curriculum areas
 * Used for calculating progress and managing section navigation
 */

export interface SectionStructure {
  lessons: number;        // Number of lessons in this section
  quizQuestions: number;  // Number of quiz questions in this section
}

// Vowels sections: 5 sections total
// Grouped by similar sounds or short/long pairs
// All sections have 4 quiz questions
export const VOWEL_SECTIONS: SectionStructure[] = [
  { lessons: 2, quizQuestions: 4 },  // Section 1: अ, आ (short/long a pair)
  { lessons: 2, quizQuestions: 4 },  // Section 2: इ, ई (short/long i pair)
  { lessons: 2, quizQuestions: 4 },  // Section 3: उ, ऊ (short/long u pair)
  { lessons: 3, quizQuestions: 4 },  // Section 4: ए, ऐ, ओ (e/o sounds)
  { lessons: 2, quizQuestions: 4 },  // Section 5: औ, अं (diphthong + nasalized)
];

// Consonant sections: 16 sections total
// Grouped by phonetic categories and frequency of use
// All sections have 4 quiz questions
export const CONSONANT_SECTIONS: SectionStructure[] = [
  { lessons: 3, quizQuestions: 4 },  // Section 1: क, ख, ग (velar stops)
  { lessons: 2, quizQuestions: 4 },  // Section 2: घ, ङ (velar + nasal)
  { lessons: 3, quizQuestions: 4 },  // Section 3: च, छ, ज (palatal stops)
  { lessons: 2, quizQuestions: 4 },  // Section 4: झ, ञ (palatal + nasal)
  { lessons: 3, quizQuestions: 4 },  // Section 5: ट, ठ, ड (retroflex stops)
  { lessons: 2, quizQuestions: 4 },  // Section 6: ढ, ण (retroflex + nasal)
  { lessons: 3, quizQuestions: 4 },  // Section 7: त, थ, द (dental stops)
  { lessons: 2, quizQuestions: 4 },  // Section 8: ध, न (dental + nasal)
  { lessons: 2, quizQuestions: 4 },  // Section 9: प, फ (labial stops)
  { lessons: 2, quizQuestions: 4 },  // Section 10: ब, भ (labial voiced)
  { lessons: 2, quizQuestions: 4 },  // Section 11: म, य (nasal + semivowel)
  { lessons: 2, quizQuestions: 4 },  // Section 12: र, ल (liquids)
  { lessons: 2, quizQuestions: 4 },  // Section 13: व, श (semivowel + fricative)
  { lessons: 2, quizQuestions: 4 },  // Section 14: श, ष
  { lessons: 2, quizQuestions: 4 },  // Section 15: स, ह
  { lessons: 3, quizQuestions: 4 },  // Section 16: क्ष, त्र, ज्ञ
];

// Matra sections: 7 sections total
// Grouped by short/long pairs and similar sounds for pedagogical effectiveness
// All sections have 4 quiz questions
export const MATRA_SECTIONS: SectionStructure[] = [
  { lessons: 1, quizQuestions: 4 },  // Section 1: ◌ा (intro)
  { lessons: 2, quizQuestions: 4 },  // Section 2: ◌ि, ◌ी (short/long i pair)
  { lessons: 2, quizQuestions: 4 },  // Section 3: ◌ु, ◌ू (short/long u pair)
  { lessons: 2, quizQuestions: 4 },  // Section 4: ◌े, ◌ै (e-sound pair)
  { lessons: 2, quizQuestions: 4 },  // Section 5: ◌ो, ◌ौ (o-sound pair)
  { lessons: 2, quizQuestions: 4 },  // Section 6: ◌ृ, ◌ः (special matras)
  { lessons: 2, quizQuestions: 4 },  // Section 7: ◌ं, ◌ँ (nasal marks: anusvara and chandrabindu)
];

// Similar Characters sections: 5 sections total
// Focused on explaining differences between confusingly similar characters
// All sections have 4 quiz questions
export const SIMILAR_SECTIONS: SectionStructure[] = [
  { lessons: 2, quizQuestions: 4 },  // Section 1: न vs ण (dental vs retroflex na)
  { lessons: 2, quizQuestions: 4 },  // Section 2: ज्ञ vs ग (conjunct vs ga)
  { lessons: 2, quizQuestions: 4 },  // Section 3: ऋ vs री (vowel vs ra+matra)
  { lessons: 3, quizQuestions: 4 },  // Section 4: स vs श vs ष (three 's' sounds)
  { lessons: 2, quizQuestions: 4 },  // Section 5: ं vs ँ (bindu vs chandrabindu)
];

// Numbers sections: 4 sections total
// Hindi numerals ०-९ (0-9)
export const NUMBER_SECTIONS: SectionStructure[] = [
  { lessons: 3, quizQuestions: 3 },  // Section 1: ० १ २
  { lessons: 3, quizQuestions: 3 },  // Section 2: ३ ④ ⑤
  { lessons: 3, quizQuestions: 3 },  // Section 3: ⑥ ⑦ ⑧
  { lessons: 1, quizQuestions: 2 }   // Section 4: ⑨
];

/**
 * Get the section number and lesson position for a vowel lesson
 * @param lessonPageNumber - The pageNumber field from lesson data (1-11)
 * @returns {section: number (1-5), lessonInSection: number (1-3)}
 */
export function getVowelSectionInfo(lessonPageNumber: number): { section: number; lessonInSection: number } {
  const sectionStarts = [1, 3, 5, 7, 10]; // Lesson 1, 3, 5, 7, 10 start new sections
  
  for (let i = 0; i < sectionStarts.length; i++) {
    const sectionStart = sectionStarts[i];
    const nextSectionStart = sectionStarts[i + 1] || 12; // 12 is past the last lesson
    
    if (lessonPageNumber >= sectionStart && lessonPageNumber < nextSectionStart) {
      return {
        section: i + 1,
        lessonInSection: lessonPageNumber - sectionStart + 1
      };
    }
  }
  
  return { section: 1, lessonInSection: 1 }; // fallback
}

/**
 * Get the section number for a consonant lesson
 * @param lessonPageNumber - The pageNumber field from lesson data (1-33)
 * @returns section number (1-16) and lesson position within section
 */
export function getConsonantSectionInfo(lessonPageNumber: number): { section: number; lessonInSection: number } {
  // Accumulate lesson counts to find which section contains this lesson
  let totalLessons = 0;
  for (let i = 0; i < CONSONANT_SECTIONS.length; i++) {
    const sectionLessons = CONSONANT_SECTIONS[i].lessons;
    if (lessonPageNumber <= totalLessons + sectionLessons) {
      return {
        section: i + 1,
        lessonInSection: lessonPageNumber - totalLessons
      };
    }
    totalLessons += sectionLessons;
  }
  
  return { section: 1, lessonInSection: 1 }; // fallback
}

/**
 * Get the section number for a matra lesson
 * @param lessonPageNumber - The pageNumber field from lesson data (1-13)
 * @returns section number (1-7) and lesson position within section
 */
export function getMatraSectionInfo(lessonPageNumber: number): { section: number; lessonInSection: number } {
  let totalLessons = 0;
  for (let i = 0; i < MATRA_SECTIONS.length; i++) {
    const sectionLessons = MATRA_SECTIONS[i].lessons;
    if (lessonPageNumber <= totalLessons + sectionLessons) {
      return {
        section: i + 1,
        lessonInSection: lessonPageNumber - totalLessons
      };
    }
    totalLessons += sectionLessons;
  }
  
  return { section: 1, lessonInSection: 1 }; // fallback
}

/**
 * Get the section number for a similar characters lesson
 * @param lessonPageNumber - The pageNumber field from lesson data (1-11)
 * @returns section number (1-5) and lesson position within section
 */
export function getSimilarSectionInfo(lessonPageNumber: number): { section: number; lessonInSection: number } {
  let totalLessons = 0;
  for (let i = 0; i < SIMILAR_SECTIONS.length; i++) {
    const sectionLessons = SIMILAR_SECTIONS[i].lessons;
    if (lessonPageNumber <= totalLessons + sectionLessons) {
      return {
        section: i + 1,
        lessonInSection: lessonPageNumber - totalLessons
      };
    }
    totalLessons += sectionLessons;
  }
  
  return { section: 1, lessonInSection: 1 }; // fallback
}

/**
 * Get the section number for a numbers lesson
 * @param lessonPageNumber - The pageNumber field from lesson data (1-10)
 * @returns section number (1-4) and lesson position within section
 */
export function getNumberSectionInfo(lessonPageNumber: number): { section: number; lessonInSection: number } {
  let totalLessons = 0;
  for (let i = 0; i < NUMBER_SECTIONS.length; i++) {
    const sectionLessons = NUMBER_SECTIONS[i].lessons;
    if (lessonPageNumber <= totalLessons + sectionLessons) {
      return {
        section: i + 1,
        lessonInSection: lessonPageNumber - totalLessons
      };
    }
    totalLessons += sectionLessons;
  }
  
  return { section: 1, lessonInSection: 1 }; // fallback
}

/**
 * Calculate progress percentage within a section
 * @param type - The type of activity (lesson, practice, quiz)
 * @param sectionStructure - The structure definition for this section
 * @param currentStep - The current step number within the type
 * @returns Progress percentage (0-100)
 */
export function calculateProgress(
  type: 'lesson' | 'practice' | 'quiz',
  sectionStructure: SectionStructure | undefined,
  currentStep: number
): number {
  // Fallback if sectionStructure is undefined
  if (!sectionStructure) {
    console.warn('calculateProgress called with undefined sectionStructure, returning 0');
    return 0;
  }
  
  const { lessons, quizQuestions } = sectionStructure;
  const totalSteps = lessons + 1 + quizQuestions; // lessons + practice + quiz questions
  
  let step: number;
  if (type === 'lesson') {
    step = currentStep; // Lesson 1, 2, or 3
  } else if (type === 'practice') {
    step = lessons + 1; // After all lessons
  } else { // quiz
    step = lessons + 1 + currentStep; // After lessons and practice
  }
  
  return Math.round((step / totalSteps) * 100);
}
