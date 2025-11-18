/**
 * ReadingInstructionsPage Component
 * 
 * Multi-page lesson teaching how to read Hindi words
 * Covers syllable structure, matras, simple words, and half consonants
 * No quizzes - just instructional content
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { wordReadingLessons, wordReadingLessonIds } from '../data/lessons/wordReading';
import { ProgressBar } from '../components/shared/ProgressBar';

export default function ReadingInstructionsPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const lessonId = params.id || "1";
  const lesson = wordReadingLessons[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

  const currentIndex = wordReadingLessonIds.indexOf(lessonId);
  const isFirstLesson = currentIndex === 0;
  const isLastLesson = currentIndex === wordReadingLessonIds.length - 1;
  const progress = ((currentIndex + 1) / wordReadingLessonIds.length) * 100;

  const handleNext = () => {
    if (lesson.nextLesson) {
      setLocation(`/words/beginner/intro/${lesson.nextLesson}`);
    } else {
      // Mark as complete and return to beginner words
      localStorage.setItem('readingInstructionsViewed', 'true');
      setLocation('/words/beginner');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevId = wordReadingLessonIds[currentIndex - 1];
      setLocation(`/words/beginner/intro/${prevId}`);
    }
  };

  const handleBack = () => {
    setLocation('/words/beginner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-black">How to Read Words</h1>
          <div className="w-10"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar progress={progress} />
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto mb-6">
          {/* Lesson Title */}
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-xl font-bold text-xl mb-6 shadow-lg flex items-center gap-3">
            <span className="text-3xl">{currentIndex + 1}️⃣</span>
            <span>{lesson.title}</span>
          </div>

          {/* Introduction */}
          {lesson.content.intro && (
            <div className="bg-white rounded-xl p-5 shadow-md border-2 border-[#ff9930] mb-6">
              <p className="text-gray-700 leading-relaxed">{lesson.content.intro}</p>
            </div>
          )}

          {/* Examples */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h2 className="text-lg font-bold text-black mb-4">Examples</h2>
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ff9930]">
              <div className="space-y-3">
                {lesson.content.examples.map((example, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black min-w-[80px]">{example.devanagari}</span>
                    <span className="text-gray-600">=</span>
                    <div className="flex-1">
                      <span className="text-lg text-gray-700">
                        {example.romanization}
                        {example.meaning && ` (${example.meaning})`}
                      </span>
                      {example.breakdown && (
                        <div className="text-sm text-gray-500 mt-1">{example.breakdown}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          {lesson.content.tips && lesson.content.tips.length > 0 && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 shadow-md">
              <h3 className="text-white font-bold text-lg mb-3">💡 Tips</h3>
              <ul className="text-white/90 text-sm space-y-2">
                {lesson.content.tips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {!isFirstLesson && (
            <button
              onClick={handlePrevious}
              className="flex-1 bg-gray-200 text-gray-700 font-bold py-4 rounded-xl shadow-md hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
              data-testid="button-previous"
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            className={`${isFirstLesson ? 'flex-1' : 'flex-[2]'} bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}
            data-testid="button-next"
          >
            {isLastLesson ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Start Learning Words
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
