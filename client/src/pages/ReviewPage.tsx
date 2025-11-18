/**
 * ReviewPage Component
 * 
 * Smart review session for characters the user struggles with.
 * Uses spaced repetition to reinforce difficult concepts.
 * 
 * Flow:
 * 1. Load items due for review
 * 2. Show flashcard-style review for each item
 * 3. User marks if they remembered correctly
 * 4. Update review schedule based on performance
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Volume2, CheckCircle2, XCircle, Home } from "lucide-react";
import confetti from "canvas-confetti";

import tigerThinking from '@assets/generated_images/Thinking_tiger_transparent_d7773890.png';
import tigerExcited from '@assets/generated_images/Excited_jumping_tiger_transparent_3fe7af96.png';
import { getItemsDueForReview, markItemReviewed, ReviewItem } from '../utils/smartReview';
import { getCharacterInfo } from '../utils/characterLookup';

export default function ReviewPage() {
  const [, setLocation] = useLocation();
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    const items = getItemsDueForReview();
    setReviewItems(items);
    
    if (items.length === 0) {
      setSessionComplete(true);
    }
  }, []);

  const currentItem = reviewItems[currentIndex];
  const totalItems = reviewItems.length;
  const progress = totalItems > 0 ? ((currentIndex + 1) / totalItems) * 100 : 0;

  // Text-to-speech for character pronunciation
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(voice => 
          voice.lang.startsWith('hi') || 
          voice.lang === 'hi-IN' ||
          voice.name.toLowerCase().includes('hindi')
        );
        
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }
  };

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleResponse = (remembered: boolean) => {
    if (currentItem) {
      markItemReviewed(currentItem.characterId, remembered);
      
      if (remembered) {
        setCompleted(completed + 1);
      }

      // Move to next item or complete session
      if (currentIndex < totalItems - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        setSessionComplete(true);
        if (remembered) {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
          });
        }
      }
    }
  };

  // No items to review
  if (sessionComplete && totalItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 py-6 justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100">
            <div className="mb-4">
              <img 
                src={tigerExcited} 
                alt="Excited tiger" 
                className="w-24 h-24 mx-auto object-contain" 
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">All Caught Up!</h2>
            <p className="text-gray-600 mb-6">
              You don't have any items due for review right now. Keep practicing to build your review queue.
            </p>

            <button
              onClick={() => setLocation('/script')}
              className="w-full py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
              data-testid="button-back-to-learning"
            >
              <Home className="w-5 h-5" />
              Back to Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Session complete
  if (sessionComplete) {
    const percentage = Math.round((completed / totalItems) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 py-6 justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100">
            <div className="mb-4">
              <img 
                src={tigerExcited} 
                alt="Excited tiger" 
                className="w-24 h-24 mx-auto object-contain" 
              />
            </div>
            
            <div className="text-6xl font-bold text-[#ff9930] mb-2">{percentage}%</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Complete!</h2>
            <p className="text-gray-600 mb-6">
              You reviewed {totalItems} {totalItems === 1 ? 'item' : 'items'} and remembered {completed} correctly.
            </p>

            <button
              onClick={() => setLocation('/script')}
              className="w-full py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
              data-testid="button-finish-review"
            >
              <Home className="w-5 h-5" />
              Back to Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review session in progress
  if (!currentItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 py-4">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {currentIndex + 1} of {totalItems}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#ff9930] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 flex-1 flex flex-col justify-between animate-slide-in-up">
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-3">
              <img 
                src={tigerThinking} 
                alt="Thinking tiger" 
                className="w-16 h-16 mx-auto object-contain opacity-50" 
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Do you remember this character?
            </h2>

            {/* Character display */}
            <div className="mb-6">
              <div className="text-7xl font-bold text-black mb-3">
                {currentItem.contentId}
              </div>
              
              <button 
                onClick={() => speak(currentItem.contentId)}
                className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-lg inline-flex items-center gap-2"
                data-testid="button-speak-character"
              >
                <Volume2 className="w-5 h-5" />
                <span className="font-medium">Listen</span>
              </button>
            </div>

            {/* Metadata */}
            <div className="text-sm text-gray-500 mb-4">
              <p className="mb-1">
                Type: <span className="font-medium text-gray-700 capitalize">{currentItem.contentType}</span>
              </p>
              <p className="mb-1">
                Mistakes: <span className="font-medium text-gray-700">{currentItem.mistakeCount}</span>
              </p>
              <p>
                Difficulty: <span className={`font-medium capitalize ${
                  currentItem.difficulty === 'hard' ? 'text-red-600' :
                  currentItem.difficulty === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>{currentItem.difficulty}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          {!showAnswer ? (
            <button
              onClick={handleReveal}
              className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-lg font-semibold"
              data-testid="button-reveal-answer"
            >
              Reveal Sound
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-4 border-2 border-orange-200">
                <p className="text-sm text-gray-600 mb-1">Sound:</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getCharacterInfo(currentItem.contentId).sound}
                </p>
                <p className="text-lg text-gray-700 mt-2">
                  ({getCharacterInfo(currentItem.contentId).transliteration})
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleResponse(false)}
                  className="py-4 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors font-semibold flex items-center justify-center gap-2 border-2 border-red-200"
                  data-testid="button-forgot"
                >
                  <XCircle className="w-5 h-5" />
                  Forgot
                </button>
                <button
                  onClick={() => handleResponse(true)}
                  className="py-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors font-semibold flex items-center justify-center gap-2 border-2 border-green-200"
                  data-testid="button-remembered"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Remembered
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
