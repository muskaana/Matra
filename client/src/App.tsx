import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "@/pages/HomePage";
import ReadingPage from "@/pages/ReadingPage";
import ConversationPage from "@/pages/ConversationPage";
import ScriptPage from "@/pages/ScriptPage";
import VowelsPage from "@/pages/VowelsPage";
import LessonPage from "@/pages/LessonPage";
import QuizPage from "@/pages/QuizPage";
import PracticePage from "@/pages/PracticePage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={HomePage} />
      <Route path="/reading" component={ReadingPage} />
      <Route path="/conversation" component={ConversationPage} />
      <Route path="/script" component={ScriptPage} />
      <Route path="/script/vowels" component={VowelsPage} />
      <Route path="/script/lesson/vowels/:id" component={LessonPage} />
      <Route path="/script/lesson/vowels/practice/:id" component={PracticePage} />
      <Route path="/script/lesson/vowels/quiz/:id" component={QuizPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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
