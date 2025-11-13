// Centralized section structure for progress calculation
// Each section has: lessons → practice page → quiz questions

export interface SectionStructure {
  lessons: number;
  quizQuestions: number;
}

// Vowel sections: 5 sections total
// Section 1: अ, आ (lessons 1-2)
// Section 2: इ, ई (lessons 3-4)
// Section 3: उ, ऊ (lessons 5-6)
// Section 4: ऋ, ए, ऐ (lessons 7-9)
// Section 5: ओ, औ, अं, अः (lessons 10-11, but quiz tests 4 characters)
export const VOWEL_SECTIONS: SectionStructure[] = [
  { lessons: 2, quizQuestions: 4 },  // Section 1
  { lessons: 2, quizQuestions: 4 },  // Section 2
  { lessons: 2, quizQuestions: 4 },  // Section 3
  { lessons: 3, quizQuestions: 4 },  // Section 4 (ऋ, ए, ऐ)
  { lessons: 2, quizQuestions: 6 },  // Section 5 (ओ, औ but quiz tests अं, अः too)
];

// Consonant sections: 16 sections total
// Most sections have 2 lessons, section 16 has 3 lessons (क्ष, त्र, ज्ञ)
// All sections have 4 quiz questions
export const CONSONANT_SECTIONS: SectionStructure[] = [
  { lessons: 2, quizQuestions: 4 },  // Section 1: क, ख
  { lessons: 2, quizQuestions: 4 },  // Section 2: ग, घ
  { lessons: 2, quizQuestions: 4 },  // Section 3: च, छ
  { lessons: 2, quizQuestions: 4 },  // Section 4: ज, झ
  { lessons: 2, quizQuestions: 4 },  // Section 5: ट, ठ
  { lessons: 2, quizQuestions: 4 },  // Section 6: ड, ढ
  { lessons: 2, quizQuestions: 4 },  // Section 7: त, थ
  { lessons: 2, quizQuestions: 4 },  // Section 8: द, ध
  { lessons: 2, quizQuestions: 4 },  // Section 9: प, फ
  { lessons: 2, quizQuestions: 4 },  // Section 10: ब, भ
  { lessons: 2, quizQuestions: 4 },  // Section 11: न, म
  { lessons: 2, quizQuestions: 4 },  // Section 12: य, र
  { lessons: 2, quizQuestions: 4 },  // Section 13: ल, व
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
  { lessons: 2, quizQuestions: 4 },  // Section 6: ◌ृ, ◌ं (remaining vowel + nasal)
  { lessons: 2, quizQuestions: 4 },  // Section 7: ◌ः, ◌ँ (nasal marks)
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
  
  // Fallback (should never reach here if data is correct)
  return { section: 1, lessonInSection: 1 };
}

/**
 * Get the section number for a matra lesson
 * @param lessonId - The lesson ID (e.g., "m1a", "m1b", "m2a")
 * @returns section number (1-7) and lesson position
 */
export function getMatraSectionInfo(lessonId: string): { section: number; lessonInSection: number } {
  // Extract section number from lesson ID (m1a → 1, m2b → 2)
  const match = lessonId.match(/^m(\d+)([ab]?)$/);
  if (!match) return { section: 1, lessonInSection: 1 };
  
  const section = parseInt(match[1]);
  const lessonLetter = match[2] || 'a'; // 'a' or 'b'
  const lessonInSection = lessonLetter === 'a' ? 1 : 2;
  
  return { section, lessonInSection };
}

/**
 * Get the section number for a similar characters lesson
 * @param lessonId - The lesson ID (e.g., "s1a", "s1b", "s4a", "s4b", "s4c")
 * @returns section number (1-5) and lesson position
 */
export function getSimilarSectionInfo(lessonId: string): { section: number; lessonInSection: number } {
  // Extract section number from lesson ID (s1a → 1, s2b → 2, s4c → 4)
  const match = lessonId.match(/^s(\d+)([abc]?)$/);
  if (!match) return { section: 1, lessonInSection: 1 };
  
  const section = parseInt(match[1]);
  const lessonLetter = match[2] || 'a'; // 'a', 'b', or 'c'
  const lessonInSection = lessonLetter === 'a' ? 1 : lessonLetter === 'b' ? 2 : 3;
  
  return { section, lessonInSection };
}

/**
 * Calculate progress percentage for a lesson, practice, or quiz
 * @param type - 'lesson', 'practice', or 'quiz'
 * @param sectionStructure - The section structure config
 * @param currentStep - Current position: lesson number (1-based) for lessons, 1 for practice, question number (1-based) for quizzes
 * @returns progress percentage (0-100)
 */
export function calculateProgress(
  type: 'lesson' | 'practice' | 'quiz',
  sectionStructure: SectionStructure,
  currentStep: number
): number {
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
