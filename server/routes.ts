import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserProfileSchema, 
  insertProgressSchema, 
  insertReviewItemSchema,
  insertWordProgressSchema,
  insertSentenceProgressSchema,
  insertReadingProgressSchema,
  insertAchievementSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User Profile Routes
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getUserProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.post("/api/profile/:userId", async (req, res) => {
    try {
      const validatedData = insertUserProfileSchema.parse(req.body);
      const profile = await storage.createUserProfile(req.params.userId, validatedData);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  app.patch("/api/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.updateUserProfile(req.params.userId, req.body);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Failed to update profile" });
    }
  });

  // Progress Routes
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const progress = await storage.getProgress(req.params.userId, category);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post("/api/progress", async (req, res) => {
    try {
      const validatedData = insertProgressSchema.parse(req.body);
      const progress = await storage.createProgress(validatedData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid progress data" });
    }
  });

  app.patch("/api/progress/:id", async (req, res) => {
    try {
      const { completed, score } = req.body;
      const progress = await storage.updateProgress(req.params.id, completed, score);
      if (!progress) {
        return res.status(404).json({ error: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Failed to update progress" });
    }
  });

  // Review Items Routes
  app.get("/api/review/:userId", async (req, res) => {
    try {
      const dueOnly = req.query.dueOnly === "true";
      const items = await storage.getReviewItems(req.params.userId, dueOnly);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch review items" });
    }
  });

  app.get("/api/review/:userId/:character", async (req, res) => {
    try {
      const item = await storage.getReviewItem(req.params.userId, req.params.character);
      if (!item) {
        return res.status(404).json({ error: "Review item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch review item" });
    }
  });

  app.post("/api/review", async (req, res) => {
    try {
      const validatedData = insertReviewItemSchema.parse(req.body);
      const item = await storage.createReviewItem(validatedData);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid review item data" });
    }
  });

  app.patch("/api/review/:id", async (req, res) => {
    try {
      const item = await storage.updateReviewItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: "Review item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Failed to update review item" });
    }
  });

  // Word Progress Routes
  app.get("/api/words/:userId", async (req, res) => {
    try {
      const level = req.query.level as string | undefined;
      const words = await storage.getWordProgress(req.params.userId, level);
      res.json(words);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch word progress" });
    }
  });

  app.post("/api/words", async (req, res) => {
    try {
      const validatedData = insertWordProgressSchema.parse(req.body);
      const word = await storage.createWordProgress(validatedData);
      res.json(word);
    } catch (error) {
      res.status(400).json({ error: "Invalid word progress data" });
    }
  });

  app.patch("/api/words/:id", async (req, res) => {
    try {
      const word = await storage.updateWordProgress(req.params.id, req.body);
      if (!word) {
        return res.status(404).json({ error: "Word progress not found" });
      }
      res.json(word);
    } catch (error) {
      res.status(400).json({ error: "Failed to update word progress" });
    }
  });

  // Sentence Progress Routes
  app.get("/api/sentences/:userId", async (req, res) => {
    try {
      const theme = req.query.theme as string | undefined;
      const sentences = await storage.getSentenceProgress(req.params.userId, theme);
      res.json(sentences);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sentence progress" });
    }
  });

  app.post("/api/sentences", async (req, res) => {
    try {
      const validatedData = insertSentenceProgressSchema.parse(req.body);
      const sentence = await storage.createSentenceProgress(validatedData);
      res.json(sentence);
    } catch (error) {
      res.status(400).json({ error: "Invalid sentence progress data" });
    }
  });

  app.patch("/api/sentences/:id", async (req, res) => {
    try {
      const sentence = await storage.updateSentenceProgress(req.params.id, req.body);
      if (!sentence) {
        return res.status(404).json({ error: "Sentence progress not found" });
      }
      res.json(sentence);
    } catch (error) {
      res.status(400).json({ error: "Failed to update sentence progress" });
    }
  });

  // Reading Progress Routes
  app.get("/api/reading/:userId", async (req, res) => {
    try {
      const level = req.query.level as string | undefined;
      const reading = await storage.getReadingProgress(req.params.userId, level);
      res.json(reading);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reading progress" });
    }
  });

  app.post("/api/reading", async (req, res) => {
    try {
      const validatedData = insertReadingProgressSchema.parse(req.body);
      const reading = await storage.createReadingProgress(validatedData);
      res.json(reading);
    } catch (error) {
      res.status(400).json({ error: "Invalid reading progress data" });
    }
  });

  app.patch("/api/reading/:id", async (req, res) => {
    try {
      const reading = await storage.updateReadingProgress(req.params.id, req.body);
      if (!reading) {
        return res.status(404).json({ error: "Reading progress not found" });
      }
      res.json(reading);
    } catch (error) {
      res.status(400).json({ error: "Failed to update reading progress" });
    }
  });

  // Achievement Routes
  app.get("/api/achievements/:userId", async (req, res) => {
    try {
      const achievements = await storage.getAchievements(req.params.userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  });

  app.post("/api/achievements", async (req, res) => {
    try {
      const validatedData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(validatedData);
      res.json(achievement);
    } catch (error) {
      res.status(400).json({ error: "Invalid achievement data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
