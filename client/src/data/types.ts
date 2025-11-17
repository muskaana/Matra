/**
 * Type definitions for lesson curriculum data
 * These types ensure consistency across all lesson, quiz, and practice content
 */

export interface SampleWord {
  word: string;
  transliteration: string;
  meaning: string;
  image: string;
}

export interface LessonData {
  title: string;
  character: string;
  transliteration: string;
  sound: string;
  sampleWords: SampleWord[];
  sentence: string;
  nextLesson: string;
  pageNumber?: number;
}

export interface QuizOption {
  text?: string;
  hindi?: string;
  transliteration?: string;
  correct: boolean;
}

export interface QuizData {
  title: string;
  char1: string;
  char2: string;
  subQuestion: string;
  type: "sound" | "word" | "syllable";
  options: QuizOption[];
  pageNumber: string;
  nextLesson: string;
}

export interface PracticeData {
  title: string;
  question: string;
  pairs: {
    character: string;
    sound: string;
  }[];
  nextLesson: string;
  pageNumber: string;
}

export type LessonMap = Record<string, LessonData>;
export type QuizMap = Record<string, QuizData>;
export type PracticeMap = Record<string, PracticeData>;
