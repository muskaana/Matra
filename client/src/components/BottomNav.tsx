import { Link, useLocation } from "wouter";
import { FileText, MessageSquare, Book, User, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useUserProgress";

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const [isScriptComplete, setIsScriptComplete] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { progress } = useProgress();
  
  const isActive = (path: string) => location === path || location.startsWith(path);
  
  useEffect(() => {
    if (isAuthenticated && progress) {
      // For authenticated users, check database progress
      const vowelsComplete = progress.filter(p => p.category === 'vowels' && p.type === 'lesson' && p.completed).length >= 5;
      const consonantsComplete = progress.filter(p => p.category === 'consonants' && p.type === 'lesson' && p.completed).length >= 16;
      const matraComplete = progress.filter(p => p.category === 'matra' && p.type === 'lesson' && p.completed).length >= 7;
      const similarComplete = progress.filter(p => p.category === 'similar' && p.type === 'lesson' && p.completed).length >= 5;
      const numbersComplete = progress.filter(p => p.category === 'numbers' && p.type === 'lesson' && p.completed).length >= 4;
      
      setIsScriptComplete(vowelsComplete && consonantsComplete && matraComplete && similarComplete && numbersComplete);
    } else {
      // For unauthenticated users, check localStorage
      const vowels = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
      const consonants = parseInt(localStorage.getItem('consonantsQuizzesCompleted') || '0');
      const matra = parseInt(localStorage.getItem('matraQuizzesCompleted') || '0');
      const similar = parseInt(localStorage.getItem('similarQuizzesCompleted') || '0');
      const numbers = parseInt(localStorage.getItem('numbersQuizzesCompleted') || '0');

      const totalVowels = 5;
      const totalConsonants = 16;
      const totalMatra = 7;
      const totalSimilar = 5;
      const totalNumbers = 4;

      const allScriptComplete = vowels >= totalVowels && 
                                consonants >= totalConsonants && 
                                matra >= totalMatra && 
                                similar >= totalSimilar &&
                                numbers >= totalNumbers;
      
      setIsScriptComplete(allScriptComplete);
    }
  }, [isAuthenticated, progress]);

  const handleReadClick = (e: React.MouseEvent) => {
    if (!isScriptComplete) {
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
          
          {/* Read tab - Locked until script is complete */}
          <Link href="/reading">
            <button 
              onClick={handleReadClick}
              className={`flex flex-col items-center p-2 transition-all relative ${
                isScriptComplete
                  ? (isActive('/reading') || isActive('/stories')
                      ? 'text-[#ff9930]' 
                      : 'text-gray-600 hover:text-[#ff9930]')
                  : 'text-gray-400 cursor-not-allowed'
              }`} 
              data-testid="button-nav-read"
            >
              <div className="relative">
                <Book className="w-6 h-6 mb-1" />
                {!isScriptComplete && (
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
