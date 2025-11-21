/**
 * BeginnerWordsPage Component
 * 
 * Shows 3 word packs: Family, Home & Daily, Feelings
 * Tracks progress and unlocks packs sequentially
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { XCircle, Lock, CheckCircle2, BookOpen } from "lucide-react";
import { beginnerWordPacks } from '../data/words/beginner';
import ProgressSummary from '../components/ProgressSummary';
import SmartReviewSlot from '../components/SmartReviewSlot';
import BottomNav from '../components/BottomNav';

export default function BeginnerWordsPage() {
  const [, setLocation] = useLocation();
  const [packsCompleted, setPacksCompleted] = useState<string[]>([]);
  const [readingIntroComplete, setReadingIntroComplete] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('beginnerWordsCompleted');
    const introViewed = localStorage.getItem('readingInstructionsViewed');
    if (completed) {
      setPacksCompleted(JSON.parse(completed));
    }
    if (introViewed === 'true') {
      setReadingIntroComplete(true);
    }
  }, []);

  const isPackCompleted = (packId: string) => packsCompleted.includes(packId);
  const isPackUnlocked = (index: number) => {
    if (index === 0) return readingIntroComplete;  // First pack requires reading intro
    return isPackCompleted(beginnerWordPacks[index - 1].id);
  };

  const allPacksComplete = beginnerWordPacks.every(pack => isPackCompleted(pack.id)) && readingIntroComplete;

  // Define icons for each pack
  const packIcons = ['👨‍👩‍👧', '🗣️', '🏠', '❓', '❤️'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6 pb-24">
        <ProgressSummary />
        <SmartReviewSlot reviewCount={0} />
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg flex items-center justify-between shadow-lg">
            <span>Level 2: Beginner Words</span>
            <button onClick={() => setLocation('/script')} data-testid="button-close">
              <XCircle className="w-5 h-5 hover:bg-white/20 rounded-full transition-colors" />
            </button>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200 flex flex-col justify-around">
            <div className="flex flex-col justify-around flex-1">
              {/* Reading Instructions - First Item */}
              <Link href="/words/beginner/intro/1">
                <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors cursor-pointer hover:bg-gray-50`} data-testid="card-reading-intro">
                  <div className="relative flex-shrink-0">
                    <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-[40px] border-[3px] border-white shadow-md transition-colors ${readingIntroComplete ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                      📖
                    </div>
                    {readingIntroComplete && (
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="leading-8 font-medium text-black text-[20px]">
                      How to Read Words
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Required • 4-page lesson</p>
                  </div>
                </div>
              </Link>

              {/* Word Packs */}
              {beginnerWordPacks.map((pack, index) => {
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
                      {!unlocked && index === 0 && !readingIntroComplete && (
                        <p className="text-sm text-gray-400 mt-1">Complete How to Read Words first</p>
                      )}
                      {!unlocked && index > 0 && (
                        <p className="text-sm text-gray-400 mt-1">Complete {beginnerWordPacks[index - 1].title} first</p>
                      )}
                    </div>
                  </div>
                );

                return unlocked ? (
                  <Link key={pack.id} href={`/words/beginner/${pack.id}/flashcards`}>
                    {content}
                  </Link>
                ) : (
                  <div key={pack.id}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {allPacksComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mt-6 text-center shadow-lg animate-slide-in-up">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">Level Complete!</h3>
            <p className="text-white/90 text-sm">
              You've learned basic Hindi words. Advanced Words unlocked!
            </p>
          </div>
        )}
        
        {/* Bottom Navigation - Fixed */}
        <BottomNav />
      </div>
    </div>
  );
}
