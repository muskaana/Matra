/**
 * Central export for all lesson data
 * Aggregates vowels, consonants, matras, and similar character lessons
 */

import { vowelLessons } from './vowels';
import { consonantLessons } from './consonants';
import { matraLessons } from './matras';
import { similarLessons } from './similar';
import { LessonMap } from '../types';

export const allLessons: LessonMap = {
  ...vowelLessons,
  ...consonantLessons,
  ...matraLessons,
  ...similarLessons,
};

export { vowelLessons, consonantLessons, matraLessons, similarLessons };
