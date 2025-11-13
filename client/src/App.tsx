import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import ReadingPage from "@/pages/ReadingPage";
import ConversationPage from "@/pages/ConversationPage";
import ScriptPage from "@/pages/ScriptPage";
import VowelsPage from "@/pages/VowelsPage";
import VowelSectionsPage from "@/pages/VowelSectionsPage";
import ConsonantsPage from "@/pages/ConsonantsPage";
import ConsonantSectionsPage from "@/pages/ConsonantSectionsPage";
import MatraPage from "@/pages/MatraPage";
import MatraSectionsPage from "@/pages/MatraSectionsPage";
import LessonPage from "@/pages/LessonPage";
import QuizPage from "@/pages/QuizPage";
import PracticePage from "@/pages/PracticePage";

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
    // On mount, restore saved lesson if exists
    const savedLesson = localStorage.getItem('currentLesson');
    if (savedLesson && location === '/') {
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
        <Route path="/" component={ScriptPage} />
        <Route path="/reading" component={ReadingPage} />
        <Route path="/conversation" component={ConversationPage} />
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
