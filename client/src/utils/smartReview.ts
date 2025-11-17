/**
 * Smart Review System
 * 
 * Tracks user performance and identifies difficult items for review.
 * Uses SM-2-inspired spaced repetition to schedule review sessions.
 * 
 * Frontend-first implementation using localStorage with forward-compatible
 * design for eventual backend persistence.
 */

export type ContentType = 'vowel' | 'consonant' | 'matra' | 'similar';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type EventType = 'attempt' | 'review';

export interface ReviewItem {
  contentId: string; // e.g., "अ", "क", "ा"
  contentType: ContentType;
  characterId: string; // unique key: "vowel-अ"
  sourceQuizId?: string; // where this was first encountered
  attemptCount: number;
  mistakeCount: number;
  streak: number; // consecutive correct answers
  difficulty: DifficultyLevel;
  lastSeen: number; // timestamp
  nextReview: number; // timestamp
  lastReviewed: number | null; // timestamp
  metadata?: {
    lessonContext?: string; // e.g., "vowels-section-1"
    quizTitle?: string;
  };
}

export interface ReviewEvent {
  eventId: string;
  contentId: string;
  contentType: ContentType;
  quizId: string;
  eventType: EventType;
  correct: boolean;
  timestamp: number;
}

export interface ReviewData {
  items: Record<string, ReviewItem>;
  history: ReviewEvent[];
  lastSync: number;
}

const STORAGE_KEY = 'smartReview';
const BASE_INTERVAL = 24 * 60 * 60 * 1000; // 1 day in ms
const MIN_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours in ms
const MAX_INTERVAL = 21 * 24 * 60 * 60 * 1000; // 21 days in ms
const DIFFICULTY_MULTIPLIERS = {
  hard: 1,
  medium: 2,
  easy: 3,
};
const SUCCESS_THRESHOLD = 3; // consecutive correct to mark as mastered
const MISTAKE_THRESHOLD = 2; // mistakes needed to add to review queue

/**
 * Get all review data from localStorage
 */
export function getReviewData(): ReviewData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { items: {}, history: [], lastSync: Date.now() };
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { items: {}, history: [], lastSync: Date.now() };
  }
}

/**
 * Save review data to localStorage
 */
function saveReviewData(data: ReviewData): void {
  data.lastSync = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Calculate next review interval based on difficulty and streak
 */
function calculateNextReview(difficulty: DifficultyLevel, streak: number): number {
  const multiplier = DIFFICULTY_MULTIPLIERS[difficulty];
  const interval = Math.min(
    BASE_INTERVAL * multiplier * Math.max(1, streak),
    MAX_INTERVAL
  );
  return Date.now() + interval;
}

/**
 * Record a quiz attempt (correct or incorrect)
 */
export function recordAttempt(params: {
  contentId: string;
  contentType: ContentType;
  quizId: string;
  correct: boolean;
  lessonContext?: string;
  quizTitle?: string;
}): void {
  const data = getReviewData();
  const characterId = `${params.contentType}-${params.contentId}`;
  
  // Record event in history
  const event: ReviewEvent = {
    eventId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    contentId: params.contentId,
    contentType: params.contentType,
    quizId: params.quizId,
    eventType: 'attempt',
    correct: params.correct,
    timestamp: Date.now(),
  };
  data.history.push(event);
  
  // Limit history to last 1000 events
  if (data.history.length > 1000) {
    data.history = data.history.slice(-1000);
  }
  
  let item = data.items[characterId];
  
  if (!item) {
    // Create new review item
    item = {
      contentId: params.contentId,
      contentType: params.contentType,
      characterId,
      sourceQuizId: params.quizId,
      attemptCount: 0,
      mistakeCount: 0,
      streak: 0,
      difficulty: 'easy',
      lastSeen: Date.now(),
      nextReview: Date.now() + BASE_INTERVAL,
      lastReviewed: null,
      metadata: {
        lessonContext: params.lessonContext,
        quizTitle: params.quizTitle,
      },
    };
  }
  
  item.attemptCount++;
  item.lastSeen = Date.now();
  
  if (!params.correct) {
    // Incorrect answer
    item.mistakeCount++;
    item.streak = 0;
    item.difficulty = 'hard';
    item.nextReview = Date.now() + MIN_INTERVAL;
  } else {
    // Correct answer
    item.streak++;
    
    // Improve difficulty if streak is building
    if (item.streak >= SUCCESS_THRESHOLD && item.difficulty === 'hard') {
      item.difficulty = 'medium';
    } else if (item.streak >= SUCCESS_THRESHOLD && item.difficulty === 'medium') {
      item.difficulty = 'easy';
    }
    
    item.nextReview = calculateNextReview(item.difficulty, item.streak);
  }
  
  data.items[characterId] = item;
  saveReviewData(data);
}

/**
 * Get items that need review right now
 */
export function getItemsDueForReview(): ReviewItem[] {
  const data = getReviewData();
  const now = Date.now();
  
  return Object.values(data.items).filter(item => 
    item.mistakeCount >= MISTAKE_THRESHOLD && 
    item.nextReview <= now
  );
}

/**
 * Get all difficult items (regardless of review schedule)
 */
export function getDifficultItems(): ReviewItem[] {
  const data = getReviewData();
  return Object.values(data.items).filter(item => 
    item.mistakeCount >= MISTAKE_THRESHOLD
  );
}

/**
 * Mark an item as reviewed
 */
export function markItemReviewed(characterId: string, correct: boolean): void {
  const data = getReviewData();
  const item = data.items[characterId];
  
  if (item) {
    item.lastReviewed = Date.now();
    item.lastSeen = Date.now();
    
    // Record review event
    const event: ReviewEvent = {
      eventId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      contentId: item.contentId,
      contentType: item.contentType,
      quizId: `review-${characterId}`,
      eventType: 'review',
      correct,
      timestamp: Date.now(),
    };
    data.history.push(event);
    
    if (correct) {
      item.streak++;
      
      // Reduce difficulty on successful review
      if (item.streak >= SUCCESS_THRESHOLD && item.difficulty === 'hard') {
        item.difficulty = 'medium';
      } else if (item.streak >= SUCCESS_THRESHOLD && item.difficulty === 'medium') {
        item.difficulty = 'easy';
      }
      
      item.nextReview = calculateNextReview(item.difficulty, item.streak);
    } else {
      item.streak = 0;
      item.mistakeCount++;
      item.difficulty = 'hard';
      item.nextReview = Date.now() + MIN_INTERVAL;
    }
    
    saveReviewData(data);
  }
}

/**
 * Get review statistics
 */
export function getReviewStats() {
  const data = getReviewData();
  const allItems = Object.values(data.items);
  const difficult = getDifficultItems();
  const dueNow = getItemsDueForReview();
  
  return {
    totalTracked: allItems.length,
    difficultItems: difficult.length,
    dueForReview: dueNow.length,
    byDifficulty: {
      easy: allItems.filter(i => i.difficulty === 'easy').length,
      medium: allItems.filter(i => i.difficulty === 'medium').length,
      hard: allItems.filter(i => i.difficulty === 'hard').length,
    },
    byType: {
      vowel: allItems.filter(i => i.contentType === 'vowel').length,
      consonant: allItems.filter(i => i.contentType === 'consonant').length,
      matra: allItems.filter(i => i.contentType === 'matra').length,
      similar: allItems.filter(i => i.contentType === 'similar').length,
    },
  };
}

/**
 * Clear all review data (for testing/debugging)
 */
export function clearReviewData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
