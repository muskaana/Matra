/**
 * AdvancedWordsPage Component
 * 
 * Shows 3 word packs: Emotions/Identity, Culture/Media, Daily (Longer)
 * Tracks progress and unlocks packs sequentially
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { advancedWordPacks } from '../data/words/advanced';

export default function AdvancedWordsPage() {
  const [, setLocation] = useLocation();
  const [packsCompleted, setPacksCompleted] = useState<string[]>([]);

  useEffect(() => {
    const completed = localStorage.getItem('advancedWordsCompleted');
    if (completed) {
      setPacksCompleted(JSON.parse(completed));
    }
  }, []);

  const isPackCompleted = (packId: string) => packsCompleted.includes(packId);
  const isPackUnlocked = (index: number) => {
    if (index === 0) return true;  // First pack always unlocked
    return isPackCompleted(advancedWordPacks[index - 1].id);
  };

  const allPacksComplete = advancedWordPacks.every(pack => isPackCompleted(pack.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setLocation('/script')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-black">Advanced Words</h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-center">
          Build reading fluency with longer words
        </p>

        {/* Word Packs */}
        <div className="flex-1 space-y-4">
          {advancedWordPacks.map((pack, index) => {
            const completed = isPackCompleted(pack.id);
            const unlocked = isPackUnlocked(index);

            const content = (
              <div 
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all ${
                  !unlocked 
                    ? 'border-gray-200 opacity-50 cursor-not-allowed' 
                    : completed
                    ? 'border-green-500 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                    : 'border-[#ff9930] cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                }`}
                data-testid={`card-pack-${pack.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold mb-1 ${!unlocked ? 'text-gray-400' : 'text-black'}`}>
                      {pack.title}
                    </h2>
                    <p className={`text-sm ${!unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                      {pack.description}
                    </p>
                  </div>
                  {completed && (
                    <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                  )}
                  {!unlocked && (
                    <Lock className="w-8 h-8 text-gray-400 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className={`text-sm font-medium ${!unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                    {pack.words.length} words
                  </div>
                  {!unlocked && index > 0 && (
                    <div className="text-xs text-gray-400">
                      Complete {advancedWordPacks[index - 1].title} first
                    </div>
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

        {/* Completion Message */}
        {allPacksComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mt-6 text-center shadow-lg animate-slide-in-up">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">Advanced Words Complete!</h3>
            <p className="text-white/90 text-sm">
              You've mastered reading longer words. Keep practicing!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
