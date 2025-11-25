import { Link, useLocation } from "wouter";
import { FileText, MessageSquare, Book, User, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useWordProgress } from "@/hooks/useUserProgress";
import { advancedWordPacks } from "@/data/words/advanced";

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const [isAdvancedComplete, setIsAdvancedComplete] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { wordProgress } = useWordProgress();
  
  const isActive = (path: string) => location === path || location.startsWith(path);
  
  useEffect(() => {
    if (isAuthenticated && wordProgress) {
      // For authenticated users, check if advanced words are complete
      const masteredWords = wordProgress.filter((w: any) => w.level === 'advanced' && w.mastered);
      const advancedComplete = advancedWordPacks.filter((pack: any) => 
        masteredWords.some((w: any) => w.wordId.startsWith(pack.id + '-'))
      ).length >= advancedWordPacks.length;
      
      setIsAdvancedComplete(advancedComplete);
    } else {
      // For unauthenticated users, check localStorage
      const advancedCompleted = localStorage.getItem('advancedWordsCompleted');
      const advancedPacks = advancedCompleted ? JSON.parse(advancedCompleted) : [];
      const totalAdvancedPacks = 3; // emotions, conversation, culture
      
      setIsAdvancedComplete(advancedPacks.length >= totalAdvancedPacks);
    }
  }, [isAuthenticated, wordProgress]);

  const handleReadClick = (e: React.MouseEvent) => {
    if (!isAdvancedComplete) {
      e.preventDefault();
      // Navigate to reading page which will show the locked message
      setLocation('/reading');
    }
  };
  
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
          
          {/* Talk tab - Always clickable, shows coming soon */}
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
          
          {/* Read tab - Locked until advanced words complete */}
          <Link href="/reading">
            <button 
              onClick={handleReadClick}
              className={`flex flex-col items-center p-2 transition-all relative ${
                isAdvancedComplete
                  ? (isActive('/reading') || isActive('/stories')
                      ? 'text-[#ff9930]' 
                      : 'text-gray-600 hover:text-[#ff9930]')
                  : 'text-gray-400 cursor-not-allowed'
              }`} 
              data-testid="button-nav-read"
            >
              <div className="relative">
                <Book className="w-6 h-6 mb-1" />
                {!isAdvancedComplete && (
                  <Lock className="w-3 h-3 absolute -top-1 -right-1 text-gray-400" />
                )}
              </div>
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
