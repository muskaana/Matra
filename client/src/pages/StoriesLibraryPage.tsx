import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, ChevronRight, CheckCircle, Lock } from "lucide-react";
import { storiesLibrary } from "@/data/stories/library";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useWordProgress } from "@/hooks/useUserProgress";
import { advancedWordPacks } from "@/data/words/advanced";

export default function StoriesLibraryPage() {
  const [completedStories, setCompletedStories] = useState<string[]>([]);
  const [isAdvancedComplete, setIsAdvancedComplete] = useState(false);
  const { isAuthenticated } = useAuth();
  const { wordProgress } = useWordProgress();

  useEffect(() => {
    // Load completed stories from localStorage
    const completed = JSON.parse(localStorage.getItem('completedStories') || '[]');
    setCompletedStories(completed);

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

  const isCompleted = (storyId: string) => completedStories.includes(storyId);

  // Show locked state if advanced words not complete
  if (!isAdvancedComplete) {
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
                Complete all Advanced Words to unlock the Story Library!
              </p>
              <div className="bg-orange-50 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold text-gray-900 mb-2">Complete these word packs:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Emotions & Feelings</li>
                  <li>• Everyday Chat</li>
                  <li>• Culture & Entertainment</li>
                </ul>
              </div>
              <Link href="/words/advanced" data-testid="link-go-to-words">
                <div className="inline-block mt-6 px-6 py-3 bg-[#ff9930] hover:bg-[#ff8800] text-white rounded-lg font-semibold">
                  Go to Advanced Words
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
