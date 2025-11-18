import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - Replit Auth blueprint
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - Replit Auth blueprint
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
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
export const updateUserProfileSchema = z.object({
  xp: z.number().int().min(0).optional(),
  currentStreak: z.number().int().min(0).optional(),
  lastActiveDate: z.string().optional(),
  placementLevel: z.string().optional(),
  completedPlacement: z.boolean().optional(),
});
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
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
}, (table) => ({
  userIdIdx: index("progress_user_id_idx").on(table.userId),
  categoryIdx: index("progress_category_idx").on(table.category),
}));

export const insertProgressSchema = createInsertSchema(progress).omit({ id: true, completedAt: true });
export const updateProgressSchema = z.object({
  completed: z.boolean().optional(),
  score: z.number().int().min(0).max(100).optional(),
});
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type UpdateProgress = z.infer<typeof updateProgressSchema>;
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
}, (table) => ({
  userIdIdx: index("review_items_user_id_idx").on(table.userId),
  nextReviewDateIdx: index("review_items_next_review_date_idx").on(table.nextReviewDate),
}));

export const insertReviewItemSchema = createInsertSchema(reviewItems).omit({ id: true });
export const updateReviewItemSchema = z.object({
  difficulty: z.enum(["easy", "medium", "hard"]).optional(),
  consecutiveCorrect: z.number().int().min(0).optional(),
  totalAttempts: z.number().int().min(0).optional(),
  correctAttempts: z.number().int().min(0).optional(),
  nextReviewDate: z.coerce.date().optional(),
  lastReviewedAt: z.coerce.date().optional(),
  intervalDays: z.number().int().min(0).optional(),
  mastered: z.boolean().optional(),
});
export type InsertReviewItem = z.infer<typeof insertReviewItemSchema>;
export type UpdateReviewItem = z.infer<typeof updateReviewItemSchema>;
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
}, (table) => ({
  userIdIdx: index("word_progress_user_id_idx").on(table.userId),
}));

export const insertWordProgressSchema = createInsertSchema(wordProgress).omit({ id: true, lastPracticedAt: true });
export const updateWordProgressSchema = z.object({
  mastered: z.boolean().optional(),
  attempts: z.number().int().min(0).optional(),
});
export type InsertWordProgress = z.infer<typeof insertWordProgressSchema>;
export type UpdateWordProgress = z.infer<typeof updateWordProgressSchema>;
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
}, (table) => ({
  userIdIdx: index("sentence_progress_user_id_idx").on(table.userId),
}));

export const insertSentenceProgressSchema = createInsertSchema(sentenceProgress).omit({ id: true, lastPracticedAt: true });
export const updateSentenceProgressSchema = z.object({
  mastered: z.boolean().optional(),
  attempts: z.number().int().min(0).optional(),
});
export type InsertSentenceProgress = z.infer<typeof insertSentenceProgressSchema>;
export type UpdateSentenceProgress = z.infer<typeof updateSentenceProgressSchema>;
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
}, (table) => ({
  userIdIdx: index("reading_progress_user_id_idx").on(table.userId),
}));

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({ id: true, lastReadAt: true });
export const updateReadingProgressSchema = z.object({
  currentPage: z.number().int().min(1).optional(),
  completed: z.boolean().optional(),
});
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type UpdateReadingProgress = z.infer<typeof updateReadingProgressSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;

// Achievements
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  achievementType: text("achievement_type").notNull(), // "first_lesson", "vowels_complete", "10_day_streak", etc.
  unlockedAt: timestamp("unlocked_at").defaultNow(),
}, (table) => ({
  userIdIdx: index("achievements_user_id_idx").on(table.userId),
}));

export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true, unlockedAt: true });
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
