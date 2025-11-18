/**
 * Character Lookup Utility
 * 
 * Helper functions to look up character information from lesson data
 */

import { vowelLessons } from '../data/lessons/vowels';
import { consonantLessons } from '../data/lessons/consonants';
import { matraLessons } from '../data/lessons/matras';
import { similarLessons } from '../data/lessons/similar';
import { LessonData } from '../data/types';

/**
 * Find the sound/transliteration for a given character
 * Searches through all lesson data to find a matching character
 */
export function getCharacterSound(character: string): string {
  // Search vowels
  for (const lesson of Object.values(vowelLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.sound;
    }
  }
  
  // Search consonants
  for (const lesson of Object.values(consonantLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.sound;
    }
  }
  
  // Search matra
  for (const lesson of Object.values(matraLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.sound;
    }
  }
  
  // Search similar
  for (const lesson of Object.values(similarLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.sound;
    }
  }
  
  // Fallback: return the character itself if not found
  return character;
}

/**
 * Find the transliteration for a given character
 */
export function getCharacterTransliteration(character: string): string {
  // Search vowels
  for (const lesson of Object.values(vowelLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.transliteration;
    }
  }
  
  // Search consonants
  for (const lesson of Object.values(consonantLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.transliteration;
    }
  }
  
  // Search matra
  for (const lesson of Object.values(matraLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.transliteration;
    }
  }
  
  // Search similar
  for (const lesson of Object.values(similarLessons) as LessonData[]) {
    if (lesson.character === character) {
      return lesson.transliteration;
    }
  }
  
  // Fallback
  return character;
}

/**
 * Get both sound and transliteration for a character
 */
export function getCharacterInfo(character: string): {
  sound: string;
  transliteration: string;
} {
  return {
    sound: getCharacterSound(character),
    transliteration: getCharacterTransliteration(character)
  };
}
