/**
 * FlashcardPage Component
 * 
 * Flashcard-style learning for word packs
 * Front: Devanagari, Back: Transliteration + Meaning
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, RotateCw, ArrowRight } from "lucide-react";
import { beginnerWordPacks } from '../data/words/beginner';

export default function FlashcardPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const packId = params.packId as string;
  
  const pack = beginnerWordPacks.find(p => p.id === packId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!pack) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Word pack not found</p>
      </div>
    );
  }

  const currentWord = pack.words[currentIndex];
  const isLastCard = currentIndex === pack.words.length - 1;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (isLastCard) {
      // Go to quiz
      setLocation(`/words/beginner/${packId}/quiz`);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const progress = ((currentIndex + 1) / pack.words.length) * 100;

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <button 
            onClick={() => setLocation('/words/beginner')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-lg font-bold text-black">{pack.title}</h2>
            <p className="text-sm text-gray-600">{currentIndex + 1} of {pack.words.length}</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Flashcard */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div 
            onClick={handleFlip}
            className="relative w-full h-[400px] cursor-pointer perspective-1000"
            data-testid="flashcard"
          >
            <div 
              className={`absolute inset-0 transition-transform duration-500 preserve-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border-4 border-[#ff9930]">
                <div className="text-8xl font-bold text-black mb-4">
                  {currentWord.word}
                </div>
                <div className="flex items-center gap-2 text-gray-500 mt-4">
                  <RotateCw className="w-4 h-4" />
                  <span className="text-sm">Tap to reveal</span>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#ff9930] to-[#ff7730] rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-white">
                <div className="text-4xl font-bold mb-3">
                  {currentWord.transliteration}
                </div>
                <div className="text-3xl">
                  {currentWord.meaning}
                </div>
                <div className="flex items-center gap-2 text-white/80 mt-6">
                  <RotateCw className="w-4 h-4" />
                  <span className="text-sm">Tap to flip back</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-colors ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            data-testid="button-previous"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg flex items-center justify-center gap-2"
            data-testid="button-next"
          >
            {isLastCard ? 'Take Quiz' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
