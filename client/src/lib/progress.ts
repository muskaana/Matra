/**
 * XP and Streak System
 * 
 * Tracks user progress with XP points and daily streaks
 */

export interface ProgressData {
  totalXP: number;
  currentStreak: number;
  lastActivityDate: string; // ISO date string
}

const STORAGE_KEY = 'matraProgress';

/**
 * Get current progress data
 */
export function getProgress(): ProgressData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      totalXP: 0,
      currentStreak: 0,
      lastActivityDate: ''
    };
  }
  return JSON.parse(stored);
}

/**
 * Save progress data
 */
function saveProgress(data: ProgressData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Check if two date strings are consecutive days
 */
function isConsecutiveDay(lastDate: string, currentDate: string): boolean {
  if (!lastDate) return false;
  
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays === 1;
}

/**
 * Calculate streak update for database users
 * Returns { newStreak, today } to use with updateProfile
 */
export function calculateStreakUpdate(
  currentStreak: number,
  lastActiveDate: string | null | undefined
): { newStreak: number; today: string } {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  let newStreak = currentStreak || 0;
  
  if (lastActiveDate === today) {
    // Already practiced today - keep streak
    newStreak = currentStreak || 0;
  } else if (lastActiveDate) {
    // Check if it's a consecutive day
    const last = new Date(lastActiveDate);
    const current = new Date(today);
    const diffTime = current.getTime() - last.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day - increment streak
      newStreak = (currentStreak || 0) + 1;
    } else {
      // Missed days - reset streak to 1
      newStreak = 1;
    }
  } else {
    // First activity ever
    newStreak = 1;
  }
  
  return { newStreak, today };
}

/**
 * Award XP and update streak
 * @param amount - Amount of XP to award (10 for quiz, 15 for unit)
 */
export function awardXP(amount: number): ProgressData {
  const progress = getProgress();
  const today = getTodayDateString();
  
  // Add XP
  progress.totalXP += amount;
  
  // Update streak
  if (progress.lastActivityDate === today) {
    // Already did something today, don't change streak
  } else if (isConsecutiveDay(progress.lastActivityDate, today)) {
    // Consecutive day - increment streak
    progress.currentStreak += 1;
    progress.lastActivityDate = today;
  } else if (progress.lastActivityDate === '') {
    // First activity ever
    progress.currentStreak = 1;
    progress.lastActivityDate = today;
  } else {
    // Missed days - reset streak
    progress.currentStreak = 1;
    progress.lastActivityDate = today;
  }
  
  saveProgress(progress);
  return progress;
}

/**
 * Award XP for completing a quiz
 */
export function awardQuizXP(): ProgressData {
  return awardXP(10);
}

/**
 * Award XP for completing a unit
 */
export function awardUnitXP(): ProgressData {
  return awardXP(15);
}

/**
 * Get XP total
 */
export function getTotalXP(): number {
  return getProgress().totalXP;
}

/**
 * Get current streak
 */
export function getCurrentStreak(): number {
  return getProgress().currentStreak;
}
