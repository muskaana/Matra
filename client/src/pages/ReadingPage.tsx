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
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#ff9930] text-white px-6 py-4 font-bold text-xl">
          Reading Practice
        </div>
        
        {/* Content Area */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          {/* Loading state for authenticated users */}
          {user && isLoading ? (
            <div className="grid grid-cols-2 gap-4" data-testid="loading-state">
              {readingContent.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-20 mt-3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {readingContent.map((item, index) => {
                const completed = isItemCompleted(item.id);
                const unlocked = isItemUnlocked(index);

                const cardContent = (
                  <div className="flex flex-col items-center" data-testid={`card-reading-${item.id}`}>
                    <div className="relative w-full">
                      <div className={`w-full aspect-square rounded-2xl flex items-center justify-center text-white font-bold text-[40px] shadow-md transition-all ${!unlocked ? 'bg-gray-400 cursor-not-allowed opacity-50' : completed ? 'bg-green-500 hover:bg-green-600 cursor-pointer' : 'bg-[#ff9930] hover:bg-[#CF7B24] cursor-pointer'}`}>
                        {itemIcons[index]}
                      </div>
                      {!unlocked && (
                        <div className="absolute bottom-2 right-2 w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {completed && (
                        <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-700 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <span className={`text-center mt-3 font-medium text-sm ${!unlocked ? 'text-gray-400' : 'text-black'}`}>
                      {item.title}
                    </span>
                  </div>
                );

                return unlocked ? (
                  <Link key={item.id} href={`/reading/${item.id}`}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={item.id}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Completion Message */}
        {allItemsComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 mx-6 mb-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-white flex-shrink-0" />
              <h3 className="text-white font-bold text-lg">All Complete!</h3>
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
