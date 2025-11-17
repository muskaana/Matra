# Overview

This is a Hindi language learning application called "Matra" that teaches users the Devanagari script, reading comprehension, and conversational skills. The application is built as a full-stack web application with a React frontend and Express backend, designed to provide an interactive, gamified learning experience for Hindi language learners.

The application follows a structured learning path starting with basic script characters (vowels and consonants), progressing through word formation, and advancing to sentences and reading comprehension. Users complete lessons, practice exercises, and quizzes with progress tracking and encouraging feedback.

## Curriculum Structure

The app currently includes five main chapters in the script learning section:
1. **Vowels** (5 sections/12 lessons) - Basic vowel sounds and characters
2. **Consonants** (16 sections/33 lessons) - Consonant characters and sounds
3. **Matra/Vowel Symbols** (7 sections/13 lessons) - Vowel modifiers that attach to consonants
4. **Similar Characters** (5 sections/11 lessons) - Confusing character pairs commonly mistaken by learners:
   - Section 1: न vs ण (dental vs retroflex 'na')
   - Section 2: ज्ञ vs ग (conjunct 'gya' vs simple 'ga')
   - Section 3: ऋ vs री (vowel vs ra+matra combination)
   - Section 4: स, श, ष (three variants of 's' sounds)
   - Section 5: ं vs ँ (anusvara vs chandrabindu nasalization marks)
5. **Numbers** (2 sections/10 lessons) - Hindi numerals ०-९ (0-9) with everyday conversational usage

## Recent Changes

### November 17, 2025 (Evening)
- **Numbers Section Complete**: Added complete Numbers chapter with 10 individual lessons (one per digit ०-९)
  - Section 1: Digits ०-④ (Zero through Four) with 5 lessons
  - Section 2: Digits ⑤-⑨ (Five through Nine) with 5 lessons
  - Each lesson includes Devanagari digit, transliteration, Hindi pronunciation, and everyday sentence example
  - Sentences use common conversational words: चाय (tea), रोटी (roti), लोग (people), बजे (o'clock), मिनट (minute), दिन (day), खाना (food), सोना (sleep), पैसे (money)
  - 2 practice exercises (one per section) reviewing digit-sound pairs
  - 8 quiz questions total (4 per section) testing both digit recognition and Hindi word knowledge
  - Progress tracking via localStorage key 'numbersQuizzesCompleted'
  - Fully integrated with all page navigation, routing, and section structure
  - Updated VowelsPage (/script/vowels) to display Numbers card with "१" icon and progress tracking

### November 17, 2025 (Morning)
- **Smart Review System**: Implemented adaptive spaced repetition system using SM-2-inspired algorithm
  - Tracks quiz performance per character (vowels, consonants, matra, similar)
  - Identifies difficult items (2+ mistakes) and schedules targeted review sessions
  - Review intervals based on difficulty: hard (1 day), medium (2 days), easy (3 days), max 21 days
  - ReviewPage provides flashcard-style practice with reveal/remember flow
  - Review notification banner on ScriptPage shows count of items due for review
  - localStorage-based with forward-compatible schema for future backend migration
  - Bounded history (1000 events max) prevents storage bloat

### November 16, 2025
- **Quiz Instructions**: Updated matra quiz questions to include "(Select all)" text directly in the question for multi-answer quizzes, removing the generic "Multiple answers possible" message
- **Similar Characters Bug Fix**: Fixed navigation issue where Similar Characters quizzes were using the wrong URL path (vowels instead of similar), preventing section progress tracking
- **Progress Tracking**: Added safety check to calculateProgress function to handle undefined section structures gracefully

### November 13, 2025
- **Quiz Updates**: Changed all quiz questions to ask about sounds instead of displaying Devanagari characters (e.g., "Which word starts with a short 'a' sound?" instead of "Which word starts with अ?")
- **Display Format**: Implemented discriminated quiz display - showing only Hindi script during active quizzes, but showing "Hindi (transliteration)" format in results
- **New Chapter**: Added complete Similar Characters chapter with lessons, practice exercises, and quizzes to help learners distinguish between commonly confused Devanagari characters
- **Navigation**: Replaced the locked "स,श,ष" placeholder with the new unlocked Similar Characters chapter across all hub pages

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for the UI framework
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management
- Tailwind CSS for styling with shadcn/ui component library
- Vite as the build tool and development server

**Design Patterns:**
- Component-based architecture with reusable UI components from shadcn/ui
- Page-based routing structure under `client/src/pages/`
- Custom hooks for mobile detection and toast notifications
- Local storage for persisting user progress (quiz completion tracking)

**Key Design Decisions:**
- Mobile-first responsive design optimized for phone screens (max-width: 540px containers)
- Indian cultural theming with decorative patterns (Rangoli, Mandala) and orange (#ff9930) primary color
- Gamification elements including confetti celebrations, tiger mascot characters, and encouraging Hindi/English messages
- Asset management through a dedicated `attached_assets` directory for generated images

## Backend Architecture

**Technology Stack:**
- Express.js server with TypeScript
- Drizzle ORM for database operations
- PostgreSQL as the primary database (configured via Neon serverless driver)
- Session management with connect-pg-simple for PostgreSQL-backed sessions

**Design Patterns:**
- Modular route registration pattern via `registerRoutes` function
- Storage abstraction layer with `IStorage` interface
- In-memory storage implementation (`MemStorage`) as a development/testing fallback
- Middleware pipeline for request logging and error handling
- Custom logging with timestamp formatting

**Key Design Decisions:**
- API routes prefixed with `/api` for clear separation from static assets
- Development/production environment detection via `NODE_ENV`
- Vite integration in development mode with HMR support
- Request/response logging truncated to 80 characters for readability
- User authentication schema ready with username/password fields

## Data Storage

**Database:**
- PostgreSQL database configured via `DATABASE_URL` environment variable
- Drizzle ORM with schema-first approach defined in `shared/schema.ts`
- Migration files stored in `./migrations` directory
- UUID primary keys generated via PostgreSQL's `gen_random_uuid()`

**Schema Design:**
- Users table with id, username (unique), and password fields
- Zod validation schemas derived from Drizzle schemas for type safety
- Shared types between client and server via `shared/` directory

**Storage Abstraction:**
- `IStorage` interface defining CRUD operations
- `MemStorage` class providing in-memory implementation for development
- Database implementation expected to replace MemStorage in production
- Methods for user retrieval by ID and username, plus user creation

## External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components
- shadcn/ui configuration with "new-york" style variant
- Canvas-confetti for celebration animations
- Lucide React for iconography

**Development Tools:**
- Replit-specific plugins: runtime error overlay, cartographer, dev banner
- PostCSS with Tailwind CSS and Autoprefixer
- tsx for TypeScript execution in development
- esbuild for production server bundling

**Database & ORM:**
- @neondatabase/serverless for PostgreSQL connections
- Drizzle ORM and Drizzle Kit for migrations
- drizzle-zod for schema-to-validation integration

**Form & Validation:**
- React Hook Form with @hookform/resolvers
- Zod for schema validation

**Routing & State:**
- wouter for client-side routing
- @tanstack/react-query for server state with infinite stale time

**Styling:**
- Tailwind CSS with CSS variables for theming
- Custom fonts: DM Sans, Fira Code, Geist Mono, Architects Daughter, Tiro Devanagari Hindi
- class-variance-authority and clsx for conditional styling

**Session Management:**
- connect-pg-simple for PostgreSQL session storage
- Express session middleware (implied by connect-pg-simple dependency)