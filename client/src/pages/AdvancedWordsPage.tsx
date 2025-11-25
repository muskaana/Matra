/**
 * AdvancedWordsPage Component
 * 
 * Shows 3 word packs: Emotions/Identity, Culture/Media, Daily (Longer)
 * Tracks progress and unlocks packs sequentially
 */

import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { XCircle, Lock, CheckCircle2 } from "lucide-react";
import { advancedWordPacks } from '../data/words/advanced';
import { beginnerWordPacks } from '../data/words/beginner';
import ProgressSummary from '../components/ProgressSummary';
import SmartReviewSlot from '../components/SmartReviewSlot';
import BottomNav from '../components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useWordProgress } from '@/hooks/useUserProgress';

export default function AdvancedWordsPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { wordProgress, isLoading } = useWordProgress();
  const [localStorageCompleted, setLocalStorageCompleted] = useState<string[]>([]);
  const [isBeginnerComplete, setIsBeginnerComplete] = useState(false);

  // Load from localStorage for unauthenticated users
  useEffect(() => {
    if (!user) {
      const completed = localStorage.getItem('advancedWordsCompleted');
      if (completed) {
        setLocalStorageCompleted(JSON.parse(completed));
      }
    }
  }, [user]);

  // Check if beginner words are complete
  useEffect(() => {
    if (user && wordProgress) {
      // For authenticated users, check if beginner words packs are complete
      const masteredBeginner = wordProgress.filter((wp: any) => wp.level === 'beginner' && wp.mastered);
      const beginnerComplete = beginnerWordPacks.filter((pack: any) => 
        masteredBeginner.some((wp: any) => wp.wordId.startsWith(pack.id + '-'))
      ).length >= beginnerWordPacks.length;
      
      setIsBeginnerComplete(beginnerComplete);
    } else if (!user) {
      // For unauthenticated users, check localStorage
      const beginnerCompleted = localStorage.getItem('beginnerWordsCompleted');
      const beginnerPacks = beginnerCompleted ? JSON.parse(beginnerCompleted) : [];
      
      setIsBeginnerComplete(beginnerPacks.length >= beginnerWordPacks.length);
    }
  }, [user, wordProgress]);

  // Extract completed pack IDs from database for authenticated users
  const packsCompleted = useMemo(() => {
    if (user && wordProgress) {
      // Filter for advanced level and mastered words
      const masteredAdvancedWords = wordProgress.filter(
        wp => wp.level === 'advanced' && wp.mastered
      );
      
      // Check which packs have at least one mastered word
      // Use startsWith to handle pack IDs with hyphens
      const completedPackIds = advancedWordPacks
        .filter(pack => 
          masteredAdvancedWords.some(wp => wp.wordId.startsWith(pack.id + '-'))
        )
        .map(pack => pack.id);
      
      return completedPackIds;
    }
    
    // Fall back to localStorage for unauthenticated users
    return localStorageCompleted;
  }, [user, wordProgress, localStorageCompleted]);

  const isPackCompleted = (packId: string) => packsCompleted.includes(packId);
  const isPackUnlocked = (index: number) => {
    if (index === 0) return true;  // First pack always unlocked
    return isPackCompleted(advancedWordPacks[index - 1].id);
  };

  const allPacksComplete = advancedWordPacks.every(pack => isPackCompleted(pack.id));

  // Define icons for each pack
  const packIcons = ['😊', '🎬', '☀️'];

  // Show locked state if beginner words not complete
  if (!isBeginnerComplete && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-nav">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full text-center">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Advanced Words Locked
              </h2>
              <p className="text-gray-600 mb-6">
                Complete all Beginner Words to unlock Advanced Words!
              </p>
              <div className="bg-orange-50 rounded-lg p-4 text-left">
                <p className="text-sm font-semibold text-gray-900 mb-2">Complete these word packs:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  {beginnerWordPacks.map(pack => (
                    <li key={pack.id}>• {pack.title}</li>
                  ))}
                </ul>
              </div>
              <Link href="/words/beginner" data-testid="link-go-to-beginner">
                <div className="inline-block mt-6 px-6 py-3 bg-[#ff9930] hover:bg-[#ff8800] text-white rounded-lg font-semibold">
                  Go to Beginner Words
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6 pb-24">
        <ProgressSummary />
        <SmartReviewSlot reviewCount={0} />
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg flex items-center justify-between shadow-lg">
            <span>Level 3: Advanced Words</span>
            <button onClick={() => setLocation('/script')} data-testid="button-close">
              <XCircle className="w-5 h-5 hover:bg-white/20 rounded-full transition-colors" />
            </button>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200 flex flex-col justify-around">
            {/* Loading state for authenticated users */}
            {user && isLoading ? (
              <div className="flex flex-col justify-around flex-1">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-center gap-5 animate-pulse">
                    <div className="w-[80px] h-[80px] rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-around flex-1">
                {advancedWordPacks.map((pack, index) => {
                const completed = isPackCompleted(pack.id);
                const unlocked = isPackUnlocked(index);

                const content = (
                  <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors ${!unlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`} data-testid={`card-pack-${pack.id}`}>
                    <div className="relative flex-shrink-0">
                      <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-[40px] border-[3px] border-white shadow-md transition-colors ${!unlocked ? 'bg-gray-400' : completed ? 'bg-green-500 hover:bg-green-600' : 'bg-[#ff9930] hover:bg-[#CF7B24]'}`}>
                        {packIcons[index]}
                      </div>
                      {!unlocked && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Lock className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      {completed && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`leading-8 font-medium ${!unlocked ? 'text-gray-500' : 'text-black'} text-[22px]`}>
                        {pack.title}
                      </span>
                      {!unlocked && index > 0 && (
                        <p className="text-sm text-gray-400 mt-1">Complete {advancedWordPacks[index - 1].title} first</p>
                      )}
                    </div>
                  </div>
                );

                return unlocked ? (
                  <Link key={pack.id} href={`/words/advanced/${pack.id}/flashcards`}>
                    {content}
                  </Link>
                ) : (
                  <div key={pack.id}>{content}</div>
                );
              })}
            </div>
            )}
          </div>
        </div>

        {/* Completion Message */}
        {allPacksComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 mt-6 shadow-lg animate-slide-in-up">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0" />
              <h3 className="text-white font-bold text-lg">Level Complete!</h3>
            </div>
            <p className="text-white/90 text-sm">
              You've mastered reading longer words. Sentences unlocked!
            </p>
          </div>
        )}
        
        {/* Bottom Navigation - Fixed */}
        <BottomNav />
      </div>
    </div>
  );
}
