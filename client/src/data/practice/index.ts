/**
 * Central export for all practice exercise data
 * Aggregates vowel, consonant, matra, and similar character practice exercises
 */

import { vowelPractice } from './vowels';
import { consonantPractice } from './consonants';
import { matraPractice } from './matras';
import { similarPractice } from './similar';
import { PracticeMap } from '../types';

export const allPractice: PracticeMap = {
  ...vowelPractice,
  ...consonantPractice,
  ...matraPractice,
  ...similarPractice,
};

export { vowelPractice, consonantPractice, matraPractice, similarPractice };
