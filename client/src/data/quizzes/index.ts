/**
 * Central export for all quiz data
 * Aggregates vowel, consonant, matra, and similar character quizzes
 */

import { vowelQuizzes } from './vowels';
import { consonantQuizzes } from './consonants';
import { matraQuizzes } from './matras';
import { similarQuizzes } from './similar';
import { QuizMap } from '../types';

export const allQuizzes: QuizMap = {
  ...vowelQuizzes,
  ...consonantQuizzes,
  ...matraQuizzes,
  ...similarQuizzes,
};

export { vowelQuizzes, consonantQuizzes, matraQuizzes, similarQuizzes };
