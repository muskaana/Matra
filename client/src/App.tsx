import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import ReadingPage from "@/pages/ReadingPage";
import ConversationPage from "@/pages/ConversationPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import StoriesLibraryPage from "@/pages/StoriesLibraryPage";
import StoryDetailPage from "@/pages/StoryDetailPage";
import ScriptPage from "@/pages/ScriptPage";
import VowelsPage from "@/pages/VowelsPage";
import VowelSectionsPage from "@/pages/VowelSectionsPage";
import ConsonantsPage from "@/pages/ConsonantsPage";
import ConsonantSectionsPage from "@/pages/ConsonantSectionsPage";
import MatraPage from "@/pages/MatraPage";
import MatraSectionsPage from "@/pages/MatraSectionsPage";
import SimilarPage from "@/pages/SimilarPage";
import SimilarSectionsPage from "@/pages/SimilarSectionsPage";
import NumbersSectionsPage from "@/pages/NumbersSectionsPage";
import LessonPage from "@/pages/LessonPage";
import QuizPage from "@/pages/QuizPage";
import PracticePage from "@/pages/PracticePage";
import ReviewPage from "@/pages/ReviewPage";
import BeginnerWordsPage from "@/pages/BeginnerWordsPage";
import FlashcardPage from "@/pages/FlashcardPage";
import WordQuizPage from "@/pages/WordQuizPage";
import AdvancedWordsPage from "@/pages/AdvancedWordsPage";
import AdvancedFlashcardPage from "@/pages/AdvancedFlashcardPage";
import AdvancedWordQuizPage from "@/pages/AdvancedWordQuizPage";
import SentencesPage from "@/pages/SentencesPage";
import SentenceLearningPage from "@/pages/SentenceLearningPage";
import SentenceQuizPage from "@/pages/SentenceQuizPage";
import ReadingContentPage from "@/pages/ReadingContentPage";
import ReadingQuizPage from "@/pages/ReadingQuizPage";
import PlacementQuizPage from "@/pages/PlacementQuizPage";
import DashboardPage from "@/pages/DashboardPage";
import ReadingInstructionsPage from "@/pages/ReadingInstructionsPage";
import ProfilePage from "@/pages/ProfilePage";

function LessonPersistence({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Save current lesson path if on a lesson/practice/quiz page
    if (location.includes('/lesson/') || location.includes('/practice/') || location.includes('/quiz/')) {
      localStorage.setItem('currentLesson', location);
    }
    
    // Clear saved lesson if on sections pages (user deliberately navigated away)
    if (location.includes('/sections') || location === '/script' || location === '/') {
      localStorage.removeItem('currentLesson');
    }
  }, [location]);

  useEffect(() => {
    // On mount, restore saved lesson if exists (but not on home page)
    const savedLesson = localStorage.getItem('currentLesson');
    if (savedLesson && location === '/script') {
      setLocation(savedLesson);
    }
  }, []);

  return <>{children}</>;
}

function Router() {
  return (
    <LessonPersistence>
      <Switch>
        {/* Add pages below */}
        <Route path="/" component={Home} />
        <Route path="/reading" component={StoriesLibraryPage} />
        <Route path="/stories/:id" component={StoryDetailPage} />
        <Route path="/conversation" component={ComingSoonPage} />
        <Route path="/script/reading" component={ReadingPage} />
        <Route path="/script" component={ScriptPage} />
        <Route path="/script/vowels" component={VowelsPage} />
        <Route path="/script/vowels/sections" component={VowelSectionsPage} />
        <Route path="/script/lesson/vowels/:id" component={LessonPage} />
        <Route path="/script/lesson/vowels/practice/:id" component={PracticePage} />
        <Route path="/script/lesson/vowels/quiz/:id" component={QuizPage} />
        <Route path="/script/consonants" component={ConsonantsPage} />
        <Route path="/script/consonants/sections" component={ConsonantSectionsPage} />
        <Route path="/script/lesson/consonants/:id" component={LessonPage} />
        <Route path="/script/lesson/consonants/practice/:id" component={PracticePage} />
        <Route path="/script/lesson/consonants/quiz/:id" component={QuizPage} />
        <Route path="/script/matra" component={MatraPage} />
        <Route path="/script/matra/sections" component={MatraSectionsPage} />
        <Route path="/script/lesson/matra/:id" component={LessonPage} />
        <Route path="/script/lesson/matra/practice/:id" component={PracticePage} />
        <Route path="/script/lesson/matra/quiz/:id" component={QuizPage} />
        <Route path="/script/similar" component={SimilarPage} />
        <Route path="/script/similar/sections" component={SimilarSectionsPage} />
        <Route path="/script/lesson/similar/:id" component={LessonPage} />
        <Route path="/script/lesson/similar/practice/:id" component={PracticePage} />
        <Route path="/script/lesson/similar/quiz/:id" component={QuizPage} />
        <Route path="/script/numbers/sections" component={NumbersSectionsPage} />
        <Route path="/script/lesson/numbers/:id" component={LessonPage} />
        <Route path="/script/lesson/numbers/practice/:id" component={PracticePage} />
        <Route path="/script/lesson/numbers/quiz/:id" component={QuizPage} />
        <Route path="/review" component={ReviewPage} />
        <Route path="/words/beginner/intro" component={ReadingInstructionsPage} />
        <Route path="/words/beginner/intro/:id" component={ReadingInstructionsPage} />
        <Route path="/words/beginner" component={BeginnerWordsPage} />
        <Route path="/words/beginner/:packId/flashcards" component={FlashcardPage} />
        <Route path="/words/beginner/:packId/quiz" component={WordQuizPage} />
        <Route path="/words/advanced" component={AdvancedWordsPage} />
        <Route path="/words/advanced/:packId/flashcards" component={AdvancedFlashcardPage} />
        <Route path="/words/advanced/:packId/quiz" component={AdvancedWordQuizPage} />
        <Route path="/sentences" component={SentencesPage} />
        <Route path="/sentences/:sectionId/learn" component={SentenceLearningPage} />
        <Route path="/sentences/:sectionId/quiz" component={SentenceQuizPage} />
        <Route path="/reading/:contentId" component={ReadingContentPage} />
        <Route path="/reading/:contentId/quiz" component={ReadingQuizPage} />
        <Route path="/placement" component={PlacementQuizPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/profile" component={ProfilePage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </LessonPersistence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
