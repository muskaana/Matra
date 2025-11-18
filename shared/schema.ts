import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// User profile and gamification data
export const userProfiles = pgTable("user_profiles", {
  userId: varchar("user_id").primaryKey().references(() => users.id),
  xp: integer("xp").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  lastActiveDate: text("last_active_date"),
  placementLevel: text("placement_level"), // "Script Confident", "Script Learner", "Script Beginner"
  completedPlacement: boolean("completed_placement").notNull().default(false),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({ userId: true });
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;

// Progress tracking for sections and lessons
export const progress = pgTable("progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  category: text("category").notNull(), // "vowels", "consonants", "matra", "similar", "numbers"
  sectionId: text("section_id").notNull(),
  lessonId: text("lesson_id"),
  type: text("type").notNull(), // "lesson", "practice", "quiz", "section"
  completed: boolean("completed").notNull().default(false),
  score: integer("score"), // for quizzes
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, completedAt: true });
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progress.$inferSelect;

// Smart review system
export const reviewItems = pgTable("review_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  character: text("character").notNull(),
  category: text("category").notNull(), // "vowel", "consonant", "matra", "similar"
  difficulty: text("difficulty").notNull().default("medium"), // "easy", "medium", "hard"
  consecutiveCorrect: integer("consecutive_correct").notNull().default(0),
  totalAttempts: integer("total_attempts").notNull().default(0),
  correctAttempts: integer("correct_attempts").notNull().default(0),
  nextReviewDate: timestamp("next_review_date"),
  lastReviewedAt: timestamp("last_reviewed_at"),
  intervalDays: integer("interval_days").notNull().default(1),
  mastered: boolean("mastered").notNull().default(false),
});

export const insertReviewItemSchema = createInsertSchema(reviewItems).omit({ id: true });
export type InsertReviewItem = z.infer<typeof insertReviewItemSchema>;
export type ReviewItem = typeof reviewItems.$inferSelect;

// Word learning progress (for Talk section)
export const wordProgress = pgTable("word_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  wordId: text("word_id").notNull(),
  level: text("level").notNull(), // "beginner", "advanced"
  mastered: boolean("mastered").notNull().default(false),
  attempts: integer("attempts").notNull().default(0),
  lastPracticedAt: timestamp("last_practiced_at").defaultNow(),
});

export const insertWordProgressSchema = createInsertSchema(wordProgress).omit({ id: true, lastPracticedAt: true });
export type InsertWordProgress = z.infer<typeof insertWordProgressSchema>;
export type WordProgress = typeof wordProgress.$inferSelect;

// Sentence learning progress (for Talk section)
export const sentenceProgress = pgTable("sentence_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  sentenceId: text("sentence_id").notNull(),
  theme: text("theme"), // "greetings", "family", etc.
  mastered: boolean("mastered").notNull().default(false),
  attempts: integer("attempts").notNull().default(0),
  lastPracticedAt: timestamp("last_practiced_at").defaultNow(),
});

export const insertSentenceProgressSchema = createInsertSchema(sentenceProgress).omit({ id: true, lastPracticedAt: true });
export type InsertSentenceProgress = z.infer<typeof insertSentenceProgressSchema>;
export type SentenceProgress = typeof sentenceProgress.$inferSelect;

// Reading progress (for Read section)
export const readingProgress = pgTable("reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  storyId: text("story_id").notNull(),
  level: text("level").notNull(), // "picture_book", "chapter_book"
  currentPage: integer("current_page").notNull().default(1),
  completed: boolean("completed").notNull().default(false),
  lastReadAt: timestamp("last_read_at").defaultNow(),
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({ id: true, lastReadAt: true });
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

// Achievements
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  achievementType: text("achievement_type").notNull(), // "first_lesson", "vowels_complete", "10_day_streak", etc.
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, unlockedAt: true });
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
