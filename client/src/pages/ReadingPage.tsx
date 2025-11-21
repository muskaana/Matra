/**
 * ReadingPage Component
 * 
 * Shows reading practice content in the same design as other levels
 * 14 items total: 3 WhatsApp, 3 Short Stories, 8 Bollywood
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { XCircle, Lock, CheckCircle2 } from "lucide-react";
import { readingContent } from '../data/reading/content';
import ProgressSummary from '../components/ProgressSummary';
import SmartReviewSlot from '../components/SmartReviewSlot';
import BottomNav from '../components/BottomNav';
import { getItemsDueForReview } from '../utils/smartReview';
import { useAuth } from '@/hooks/useAuth';
import { useReadingProgress } from '@/hooks/useUserProgress';

export default function ReadingPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { readingProgress, isLoading } = useReadingProgress();
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  useEffect(() => {
    // For authenticated users, use database data
    if (user && readingProgress) {
      const completedStoryIds = readingProgress
        .filter(progress => progress.completed === true)
        .map(progress => progress.storyId);
      
      // Get unique storyIds
      const uniqueCompletedIds = Array.from(new Set(completedStoryIds));
      setCompletedItems(uniqueCompletedIds);
    } 
    // For unauthenticated users, fall back to localStorage
    else if (!user) {
      const completed = localStorage.getItem('readingCompleted');
      if (completed) {
        setCompletedItems(JSON.parse(completed));
      }
    }

    const dueItems = getItemsDueForReview();
    setReviewCount(dueItems.length);
  }, [user, readingProgress]);

  const isItemCompleted = (itemId: string) => completedItems.includes(itemId);
  const isItemUnlocked = (index: number) => {
    if (index === 0) return true;  // First item always unlocked
    return isItemCompleted(readingContent[index - 1].id);
  };

  const allItemsComplete = readingContent.every(item => isItemCompleted(item.id));

  // Icons for each of the 14 reading items
  const itemIcons = [
    '📱', '💬', '👪',  // WhatsApp (0-2)
    '📖', '☀️', '🎉',  // Short Stories (3-5)
    '🎬', '❤️', '🌟', '👩‍👩‍👦', '🎵', '🎤', '🌙', '💃'  // Bollywood (6-13)
  ];

  // Section headers appear at these indices
  const getSectionHeader = (index: number) => {
    if (index === 0) return '💬 WhatsApp Messages';
    if (index === 3) return '📖 Short Stories';
    if (index === 6) return '🎬 Bollywood Vibes';
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6 pb-24">
        <ProgressSummary />
        <SmartReviewSlot reviewCount={reviewCount} />
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg flex items-center justify-between shadow-lg">
            <span>Level 5: Reading</span>
            <button onClick={() => setLocation('/script')} data-testid="button-close">
              <XCircle className="w-5 h-5 hover:bg-white/20 rounded-full transition-colors" />
            </button>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200 flex flex-col">
            {/* Loading state for authenticated users */}
            {user && isLoading ? (
              <div className="flex flex-col gap-4 overflow-y-auto" data-testid="loading-state">
                {readingContent.map((item) => (
                  <div key={item.id} className="flex items-center gap-5 rounded-lg p-2 -m-2">
                    <div className="w-[80px] h-[80px] rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 overflow-y-auto">
                {readingContent.map((item, index) => {
                const completed = isItemCompleted(item.id);
                const unlocked = isItemUnlocked(index);
                const sectionHeader = getSectionHeader(index);

                const content = (
                  <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors ${!unlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`} data-testid={`card-reading-${item.id}`}>
                    <div className="relative flex-shrink-0">
                      <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-[40px] border-[3px] border-white shadow-md transition-colors ${!unlocked ? 'bg-gray-400' : completed ? 'bg-green-500 hover:bg-green-600' : 'bg-[#ff9930] hover:bg-[#CF7B24]'}`}>
                        {itemIcons[index]}
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
                      <span className={`leading-tight font-medium ${!unlocked ? 'text-gray-500' : 'text-black'} text-[20px]`}>
                        {item.title}
                      </span>
                      {!unlocked && index > 0 && (
                        <p className="text-sm text-gray-400 mt-1">Complete {readingContent[index - 1].title} first</p>
                      )}
                    </div>
                  </div>
                );

                return (
                  <div key={item.id}>
                    {sectionHeader && (
                      <div className="text-xs font-semibold text-[#ff9930] mb-2 mt-2">
                        {sectionHeader}
                      </div>
                    )}
                    {unlocked ? (
                      <Link href={`/reading/${item.id}`}>
                        {content}
                      </Link>
                    ) : (
                      <div>{content}</div>
                    )}
                  </div>
                );
              })}
              </div>
            )}
          </div>
        </div>

        {/* Completion Message */}
        {allItemsComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 mt-6 shadow-lg animate-slide-in-up">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0" />
              <h3 className="text-white font-bold text-lg">Level Complete!</h3>
            </div>
            <p className="text-white/90 text-sm">
              Amazing work! You've completed all reading practice! 📚
            </p>
          </div>
        )}
        
        {/* Bottom Navigation - Fixed */}
        <BottomNav />
      </div>
    </div>
  );
}
