import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, ChevronRight, CheckCircle, Lock } from "lucide-react";
import { storiesLibrary } from "@/data/stories/library";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useUserProgress";

export default function StoriesLibraryPage() {
  const [completedStories, setCompletedStories] = useState<string[]>([]);
  const [isScriptComplete, setIsScriptComplete] = useState(false);
  const { isAuthenticated } = useAuth();
  const { progress } = useProgress();

  useEffect(() => {
    // Load completed stories from localStorage
    const completed = JSON.parse(localStorage.getItem('completedStories') || '[]');
    setCompletedStories(completed);

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

  const isCompleted = (storyId: string) => completedStories.includes(storyId);

  // Show locked state if script is not complete
  if (!isScriptComplete) {
    return (
      <div className="min-h-screen-safe bg-gradient-to-b from-orange-50 to-white pb-nav">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full text-center">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Story Library Locked
              </h2>
              <p className="text-gray-600 mb-6">
                Complete all Script sections first to unlock the Story Library!
              </p>
              <div className="bg-orange-50 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold text-gray-900 mb-2">Complete these sections:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Vowels</li>
                  <li>• Consonants</li>
                  <li>• Matra (Vowel Symbols)</li>
                  <li>• Similar Characters</li>
                  <li>• Numbers</li>
                </ul>
              </div>
              <Link href="/script" data-testid="link-go-to-script">
                <div className="inline-block mt-6 px-6 py-3 bg-[#ff9930] hover:bg-[#ff8800] text-white rounded-lg font-semibold">
                  Go to Script
                </div>
              </Link>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen-safe bg-white flex flex-col pb-nav">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#ff9930] text-white px-6 py-4 font-bold text-xl">
          Reading Practice
        </div>
        
        {/* Content Area */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mb-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold border border-green-200">
                B
              </div>
              <span className="text-gray-600">Beginner</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-bold border border-yellow-200">
                I
              </div>
              <span className="text-gray-600">Intermediate</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {storiesLibrary.map((story, index) => {
              const completed = isCompleted(story.id);
              
              // Story emojis for visual representation
              const storyEmojis = ['👪', '🎓', '📱', '🪔', '✈️', '🛒', '💼', '🎂'];

              return (
                <Link key={story.id} href={`/stories/${story.id}`} data-testid={`link-story-${story.id}`}>
                  <div className="flex flex-col items-center" data-testid={`story-${story.id}`}>
                    <div className="relative w-full">
                      <div className={`w-full aspect-square rounded-2xl flex items-center justify-center text-white font-bold text-[40px] shadow-md transition-all ${
                        completed ? 'bg-green-500 hover:bg-green-600' : 'bg-[#ff9930] hover:bg-[#CF7B24]'
                      } cursor-pointer`}>
                        {storyEmojis[index] || '📖'}
                      </div>
                      {completed && (
                        <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-700 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle className="w-4 h-4 text-white" data-testid={`checkmark-${story.id}`} />
                        </div>
                      )}
                      {story.level && (
                        <div className={`absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold border-2 border-white ${
                          story.level === 'Beginner' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                        data-testid={`badge-level-${story.id}`}>
                          {story.level === 'Beginner' ? 'B' : 'I'}
                        </div>
                      )}
                    </div>
                    <span className="text-center mt-3 font-medium text-sm text-black leading-tight">
                      {story.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        <BottomNav />
      </div>
    </div>
  );
}
