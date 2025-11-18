import { 
  type User, 
  type InsertUser,
  type UserProfile,
  type InsertUserProfile,
  type UpdateUserProfile,
  type Progress,
  type InsertProgress,
  type UpdateProgress,
  type ReviewItem,
  type InsertReviewItem,
  type UpdateReviewItem,
  type WordProgress,
  type InsertWordProgress,
  type UpdateWordProgress,
  type SentenceProgress,
  type InsertSentenceProgress,
  type UpdateSentenceProgress,
  type ReadingProgress,
  type InsertReadingProgress,
  type UpdateReadingProgress,
  type Achievement,
  type InsertAchievement,
  users,
  userProfiles,
  progress,
  reviewItems,
  wordProgress,
  sentenceProgress,
  readingProgress,
  achievements,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, lt } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User profile methods
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(userId: string, profile: InsertUserProfile): Promise<UserProfile>;
  updateUserProfile(userId: string, updates: UpdateUserProfile): Promise<UserProfile | undefined>;
  
  // Progress methods
  getProgress(userId: string, category?: string): Promise<Progress[]>;
  createProgress(progressData: InsertProgress): Promise<Progress>;
  updateProgress(id: string, updates: UpdateProgress): Promise<Progress | undefined>;
  
  // Review methods
  getReviewItems(userId: string, dueOnly?: boolean): Promise<ReviewItem[]>;
  getReviewItem(userId: string, character: string): Promise<ReviewItem | undefined>;
  createReviewItem(item: InsertReviewItem): Promise<ReviewItem>;
  updateReviewItem(id: string, updates: UpdateReviewItem): Promise<ReviewItem | undefined>;
  
  // Word progress methods
  getWordProgress(userId: string, level?: string): Promise<WordProgress[]>;
  createWordProgress(wordData: InsertWordProgress): Promise<WordProgress>;
  updateWordProgress(id: string, updates: UpdateWordProgress): Promise<WordProgress | undefined>;
  
  // Sentence progress methods
  getSentenceProgress(userId: string, theme?: string): Promise<SentenceProgress[]>;
  createSentenceProgress(sentenceData: InsertSentenceProgress): Promise<SentenceProgress>;
  updateSentenceProgress(id: string, updates: UpdateSentenceProgress): Promise<SentenceProgress | undefined>;
  
  // Reading progress methods
  getReadingProgress(userId: string, level?: string): Promise<ReadingProgress[]>;
  createReadingProgress(readingData: InsertReadingProgress): Promise<ReadingProgress>;
  updateReadingProgress(id: string, updates: UpdateReadingProgress): Promise<ReadingProgress | undefined>;
  
  // Achievement methods
  getAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(achievementData: InsertAchievement): Promise<Achievement>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // User profile methods
  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const result = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1);
    return result[0];
  }

  async createUserProfile(userId: string, profile: InsertUserProfile): Promise<UserProfile> {
    const result = await db.insert(userProfiles).values({ ...profile, userId }).returning();
    return result[0];
  }

  async updateUserProfile(userId: string, updates: UpdateUserProfile): Promise<UserProfile | undefined> {
    const result = await db.update(userProfiles)
      .set(updates)
      .where(eq(userProfiles.userId, userId))
      .returning();
    return result[0];
  }

  // Progress methods
  async getProgress(userId: string, category?: string): Promise<Progress[]> {
    if (category) {
      return await db.select().from(progress)
        .where(and(eq(progress.userId, userId), eq(progress.category, category)))
        .orderBy(desc(progress.completedAt));
    }
    return await db.select().from(progress)
      .where(eq(progress.userId, userId))
      .orderBy(desc(progress.completedAt));
  }

  async createProgress(progressData: InsertProgress): Promise<Progress> {
    const result = await db.insert(progress).values(progressData).returning();
    return result[0];
  }

  async updateProgress(id: string, updates: UpdateProgress): Promise<Progress | undefined> {
    const result = await db.update(progress)
      .set(updates)
      .where(eq(progress.id, id))
      .returning();
    return result[0];
  }

  // Review methods
  async getReviewItems(userId: string, dueOnly = false): Promise<ReviewItem[]> {
    if (dueOnly) {
      const now = new Date();
      return await db.select().from(reviewItems)
        .where(
          and(
            eq(reviewItems.userId, userId),
            eq(reviewItems.mastered, false),
            lt(reviewItems.nextReviewDate, now)
          )
        )
        .orderBy(reviewItems.nextReviewDate);
    }
    return await db.select().from(reviewItems)
      .where(eq(reviewItems.userId, userId))
      .orderBy(reviewItems.nextReviewDate);
  }

  async getReviewItem(userId: string, character: string): Promise<ReviewItem | undefined> {
    const result = await db.select().from(reviewItems)
      .where(and(eq(reviewItems.userId, userId), eq(reviewItems.character, character)))
      .limit(1);
    return result[0];
  }

  async createReviewItem(item: InsertReviewItem): Promise<ReviewItem> {
    const result = await db.insert(reviewItems).values(item).returning();
    return result[0];
  }

  async updateReviewItem(id: string, updates: UpdateReviewItem): Promise<ReviewItem | undefined> {
    const result = await db.update(reviewItems)
      .set(updates)
      .where(eq(reviewItems.id, id))
      .returning();
    return result[0];
  }

  // Word progress methods
  async getWordProgress(userId: string, level?: string): Promise<WordProgress[]> {
    if (level) {
      return await db.select().from(wordProgress)
        .where(and(eq(wordProgress.userId, userId), eq(wordProgress.level, level)))
        .orderBy(desc(wordProgress.lastPracticedAt));
    }
    return await db.select().from(wordProgress)
      .where(eq(wordProgress.userId, userId))
      .orderBy(desc(wordProgress.lastPracticedAt));
  }

  async createWordProgress(wordData: InsertWordProgress): Promise<WordProgress> {
    const result = await db.insert(wordProgress).values(wordData).returning();
    return result[0];
  }

  async updateWordProgress(id: string, updates: UpdateWordProgress): Promise<WordProgress | undefined> {
    const result = await db.update(wordProgress)
      .set(updates)
      .where(eq(wordProgress.id, id))
      .returning();
    return result[0];
  }

  // Sentence progress methods
  async getSentenceProgress(userId: string, theme?: string): Promise<SentenceProgress[]> {
    if (theme) {
      return await db.select().from(sentenceProgress)
        .where(and(eq(sentenceProgress.userId, userId), eq(sentenceProgress.theme, theme)))
        .orderBy(desc(sentenceProgress.lastPracticedAt));
    }
    return await db.select().from(sentenceProgress)
      .where(eq(sentenceProgress.userId, userId))
      .orderBy(desc(sentenceProgress.lastPracticedAt));
  }

  async createSentenceProgress(sentenceData: InsertSentenceProgress): Promise<SentenceProgress> {
    const result = await db.insert(sentenceProgress).values(sentenceData).returning();
    return result[0];
  }

  async updateSentenceProgress(id: string, updates: UpdateSentenceProgress): Promise<SentenceProgress | undefined> {
    const result = await db.update(sentenceProgress)
      .set(updates)
      .where(eq(sentenceProgress.id, id))
      .returning();
    return result[0];
  }

  // Reading progress methods
  async getReadingProgress(userId: string, level?: string): Promise<ReadingProgress[]> {
    if (level) {
      return await db.select().from(readingProgress)
        .where(and(eq(readingProgress.userId, userId), eq(readingProgress.level, level)))
        .orderBy(desc(readingProgress.lastReadAt));
    }
    return await db.select().from(readingProgress)
      .where(eq(readingProgress.userId, userId))
      .orderBy(desc(readingProgress.lastReadAt));
  }

  async createReadingProgress(readingData: InsertReadingProgress): Promise<ReadingProgress> {
    const result = await db.insert(readingProgress).values(readingData).returning();
    return result[0];
  }

  async updateReadingProgress(id: string, updates: UpdateReadingProgress): Promise<ReadingProgress | undefined> {
    const result = await db.update(readingProgress)
      .set(updates)
      .where(eq(readingProgress.id, id))
      .returning();
    return result[0];
  }

  // Achievement methods
  async getAchievements(userId: string): Promise<Achievement[]> {
    return await db.select().from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(desc(achievements.unlockedAt));
  }

  async createAchievement(achievementData: InsertAchievement): Promise<Achievement> {
    const result = await db.insert(achievements).values(achievementData).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
