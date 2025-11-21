import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { FileText, MessageSquare, Book, User, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useUserProgress";

export default function BottomNav() {
  const [location] = useLocation();
  const { user } = useAuth();
  const { progress, isLoading } = useProgress();
  const [talkUnlocked, setTalkUnlocked] = useState(false);
  
  useEffect(() => {
    if (user && progress && !isLoading) {
      // For authenticated users: Check database for completed lessons (not quizzes)
      // QuizPage saves type='lesson' records for unlock logic
      const completedLessons = progress.filter(p => p.type === 'lesson' && p.completed);
      
      // Count completed lessons by category
      const vowelsCompleted = completedLessons.filter(p => p.category === 'vowels').length;
      const consonantsCompleted = completedLessons.filter(p => p.category === 'consonants').length;
      const matraCompleted = completedLessons.filter(p => p.category === 'matra').length;
      const similarCompleted = completedLessons.filter(p => p.category === 'similar').length;
      const numbersCompleted = completedLessons.filter(p => p.category === 'numbers').length;
      
      // Talk tab unlocks when all script lessons are completed
      const allLessonsComplete = vowelsCompleted >= 10 && 
                                 consonantsCompleted >= 28 && 
                                 matraCompleted >= 10 && 
                                 similarCompleted >= 4 &&
                                 numbersCompleted >= 1;
      
      setTalkUnlocked(allLessonsComplete);
    } else if (!user) {
      // For unauthenticated users: Fall back to localStorage
      const vowels = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
      const consonants = parseInt(localStorage.getItem('consonantsQuizzesCompleted') || '0');
      const matra = parseInt(localStorage.getItem('matraQuizzesCompleted') || '0');
      const similar = parseInt(localStorage.getItem('similarQuizzesCompleted') || '0');
      const numbers = parseInt(localStorage.getItem('numbersQuizzesCompleted') || '0');

      const allComplete = vowels >= 10 && 
                          consonants >= 28 && 
                          matra >= 10 && 
                          similar >= 4 &&
                          numbers >= 1;
      
      setTalkUnlocked(allComplete);
    }
  }, [user, progress, isLoading, location])
  
  const isActive = (path: string) => location === path || location.startsWith(path);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="w-full max-w-sm mx-auto px-6 py-3">
        <div className="flex justify-around items-center">
          <Link href="/script">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/script') || isActive('/words') || isActive('/sentences') || isActive('/review')
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-script"
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/script') || isActive('/words') || isActive('/sentences') || isActive('/review') ? 'font-bold' : 'font-medium'}`}>Script</span>
            </button>
          </Link>
          
          {/* Talk tab - Unlocks when all script quizzes are completed */}
          {talkUnlocked ? (
            <Link href="/conversation">
              <button 
                className={`flex flex-col items-center p-2 transition-all ${
                  isActive('/conversation') 
                    ? 'text-[#ff9930]' 
                    : 'text-gray-600 hover:text-[#ff9930]'
                }`} 
                data-testid="button-nav-talk"
              >
                <MessageSquare className="w-6 h-6 mb-1" />
                <span className={`text-xs ${isActive('/conversation') ? 'font-bold' : 'font-medium'}`}>Talk</span>
              </button>
            </Link>
          ) : (
            <button 
              className="flex flex-col items-center text-gray-300 p-2 cursor-not-allowed relative" 
              data-testid="button-nav-talk-locked" 
              title="Complete all Script quizzes to unlock"
            >
              <div className="relative">
                <MessageSquare className="w-6 h-6 mb-1" />
                <Lock className="w-3 h-3 absolute -top-1 -right-1" />
              </div>
              <span className="text-xs font-medium">Talk</span>
            </button>
          )}
          
          {/* Read tab - Always unlocked */}
          <Link href="/reading">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/reading') || isActive('/stories')
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-read"
            >
              <Book className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/reading') || isActive('/stories') ? 'font-bold' : 'font-medium'}`}>Read</span>
            </button>
          </Link>
          
          <Link href="/profile">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/profile') 
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-profile"
            >
              <User className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/profile') ? 'font-bold' : 'font-medium'}`}>Profile</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
