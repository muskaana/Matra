/**
 * SentenceLearningPage Component
 * 
 * Shows sentences with tap-to-reveal transliteration and meaning
 * Devanagari shown first, tap to reveal details
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Eye, EyeOff, ArrowRight } from "lucide-react";
import { sentenceSections } from '../data/sentences/beginner';

export default function SentenceLearningPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const sectionId = params.sectionId as string;
  
  const section = sentenceSections.find(s => s.id === sectionId);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Section not found</p>
      </div>
    );
  }

  const currentSentence = section.sentences[currentIndex];
  const isLastSentence = currentIndex === section.sentences.length - 1;

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  const handleNext = () => {
    if (isLastSentence) {
      // Go to quiz
      setLocation(`/sentences/${sectionId}/quiz`);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsRevealed(false);
    }
  };

  const progress = ((currentIndex + 1) / section.sentences.length) * 100;

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <button 
            onClick={() => setLocation('/sentences')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center flex-1">
            <h2 className="text-lg font-bold text-black">{section.title}</h2>
            <p className="text-sm text-gray-600">Sentence {currentIndex + 1} of {section.sentences.length}</p>
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

        {/* Sentence Card */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="w-full">
            <div 
              onClick={handleReveal}
              className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#ff9930] cursor-pointer transition-all hover:shadow-xl"
              data-testid="sentence-card"
            >
              {/* Devanagari - Always visible */}
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-black mb-4 leading-relaxed">
                  {currentSentence.hindi}
                </div>
              </div>

              {/* Reveal Button */}
              <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                {isRevealed ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
                <span className="text-sm">
                  {isRevealed ? 'Tap to hide' : 'Tap to reveal'}
                </span>
              </div>

              {/* Transliteration and Meaning - Revealed on tap */}
              {isRevealed && (
                <div className="bg-gradient-to-br from-[#ff9930] to-[#ff7730] rounded-2xl p-6 text-white animate-slide-in-up">
                  <div className="text-2xl font-bold mb-3 text-center">
                    {currentSentence.transliteration}
                  </div>
                  <div className="text-xl text-center">
                    {currentSentence.meaning}
                  </div>
                </div>
              )}
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
            {isLastSentence ? 'Take Quiz' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
