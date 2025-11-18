# Overview

This project is a Hindi language learning application, "Matra," designed to teach the Devanagari script, reading comprehension, and conversational skills. It's a full-stack web application with a React frontend and Express backend, offering an interactive, gamified learning experience. The application provides a structured learning path from basic script characters to advanced reading and conversation, including gamified elements, progress tracking, and encouraging feedback. The business vision is to make Hindi learning accessible and engaging, tapping into a significant market of individuals interested in learning the language.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend uses React 18 with TypeScript, Wouter for routing, TanStack Query for state management, and Tailwind CSS with shadcn/ui for styling, built with Vite. It follows a component-based architecture, utilizing reusable shadcn/ui components and custom hooks. Key design decisions include a mobile-first responsive design, Indian cultural theming (Rangoli, Mandala, orange primary color), gamification elements like confetti and a tiger mascot, and local storage for progress persistence.

## Backend Architecture

The backend is an Express.js server with TypeScript, using Drizzle ORM for database interactions with PostgreSQL (Neon serverless driver). It employs a modular route registration pattern, a storage abstraction layer, and middleware for logging and error handling. API routes are prefixed with `/api`, and the system supports environment detection and Vite integration with HMR in development.

## Data Storage

PostgreSQL is the primary database, managed by Drizzle ORM with a schema-first approach. The database schema includes comprehensive tables for user data and learning progress:

-   **Core Tables**:
    -   `users` - User authentication (UUID primary keys)
    -   `user_profiles` - XP, streak, placement level, last active date
    -   `progress` - Section/lesson completion tracking with scores
    -   `review_items` - Smart review system with spaced repetition data
    -   `achievements` - Unlocked achievements with timestamps

-   **Learning Progress Tables**:
    -   `word_progress` - Beginner/Advanced word mastery tracking (Talk section)
    -   `sentence_progress` - Sentence learning progress by theme (Talk section)
    -   `reading_progress` - Story completion and page bookmarks (Read section)

-   **Storage Architecture**:
    -   `IStorage` interface provides storage abstraction layer
    -   `DbStorage` class implements full database operations using Drizzle ORM
    -   All schemas validated with Zod through `drizzle-zod`
    -   API routes in `server/routes.ts` provide RESTful endpoints for all data operations

## UI/UX Decisions

The application prioritizes a mobile-first responsive design, optimized for phone screens. The visual theme incorporates Indian cultural elements like Rangoli and Mandala patterns, with orange (`#ff9930`) as the primary brand color. Gamification is integrated through confetti celebrations, a tiger mascot, and encouraging messages in Hindi and English.

## Feature Specifications

The application includes a structured curriculum covering Vowels, Consonants, Matra (vowel symbols), Similar Characters, and Numbers. Key features include:

-   **Placement Quiz & Dashboard**: Smart onboarding system that assesses user proficiency and provides personalized navigation.
    -   Placement quiz with 5 questions about Hindi knowledge and comfort level
    -   Assigns placement level (Script Confident, Script Learner, or Script Beginner) based on average score
    -   Dashboard shows "Welcome back" with current learning stage and "Continue Learning" button
    -   Routing: First-time visitors see landing page, returning users without placement see quiz, users with placement see dashboard
-   **Progressive Unlocking**: Lessons and levels (Beginner Words, Advanced Words, Sentences, Reading) unlock sequentially based on completion.
-   **Reading Practice**: Offers line-by-line tap-to-reveal reading exercises with comprehension quizzes, targeting heritage speakers.
-   **Word Learning (Beginner & Advanced)**: Flashcard-based learning and quizzes for vocabulary acquisition, focusing on conversational Hindi.
-   **Sentence Learning**: Thematic sentence practice with tap-to-reveal mechanics and diverse quiz types.
-   **Smart Review System**: An adaptive spaced repetition system (SM-2 inspired) tracks performance and schedules targeted review sessions for difficult items.
-   **Vocabulary**: All lesson content uses common, everyday conversational Hindi words, avoiding formal or technical terms.

# External Dependencies

-   **UI Components**: Radix UI, shadcn/ui, Canvas-confetti, Lucide React.
-   **Development Tools**: Vite, PostCSS, Tailwind CSS, Autoprefixer, tsx, esbuild.
-   **Database & ORM**: @neondatabase/serverless, Drizzle ORM, Drizzle Kit, drizzle-zod.
-   **Form & Validation**: React Hook Form, @hookform/resolvers, Zod.
-   **Routing & State**: wouter, @tanstack/react-query.
-   **Styling**: Tailwind CSS, class-variance-authority, clsx, custom fonts (DM Sans, Fira Code, Geist Mono, Architects Daughter, Tiro Devanagari Hindi).
-   **Session Management**: connect-pg-simple, Express session middleware.