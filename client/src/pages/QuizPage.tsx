/**
 * QuizPage Component
 * 
 * Displays multi-question quizzes to test character recognition
 * Shows questions about sounds and words, supports multi-select answers
 * Tracks score and shows results with celebratory feedback
 * 
 * Scoring Logic:
 * - Each question worth 1 point
 * - Multi-select questions: all correct answers must be selected
 * - Final score shown as percentage (e.g., 3/4 = 75%)
 * - Results show which answers were correct with green/red indicators
 * 
 * Flow:
 * 1. Display question with character comparison (char1 vs char2)
 * 2. User selects answer(s)
 * 3. Navigate to next question or show results
 * 4. Results screen shows score, breakdown, and next action
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { X, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

import tigerWaving from '@assets/generated_images/Waving_tiger_transparent_9a08bf58.png';
import { allQuizzes } from '../data/quizzes';
import { ProgressBar } from '../components/shared/ProgressBar';
import { recordAttempt, ContentType } from '../utils/smartReview';
import { awardQuizXP } from '../lib/progress';

// Encouraging messages shown on results screen
const encouragingMessages = [
  "बहुत अच्छा! (Bahut accha!)",
  "शाबाश! (Shabash!)",
  "Amazing work!",
  "You're doing great!",
  "Perfect!",
];

const getRandomMessage = () => {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
};

// Format quiz option labels based on type and display mode
const formatOptionLabel = (quizType: string, option: any, mode: 'quiz' | 'results') => {
  if (quizType === 'word') {
    if (mode === 'quiz') {
      return option.hindi;
    } else {
      return `${option.hindi} (${option.transliteration})`;
    }
  } else {
    return option.text;
  }
};

export default function QuizPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const location = useLocation()[0];
  const quizId = params.id as string;
  const quiz = allQuizzes[quizId];
  
  // Get quiz section ID (e.g., "1" from "1a", "1b", etc. or "2" from "s2a", "s2b")
  const quizSectionId = quizId.replace(/[a-z]/gi, '');
  const quizStorageKey = `quiz_${location.split('/')[3]}_section_${quizSectionId}`;
  
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Get cumulative score from localStorage
  const getQuizScore = () => {
    const stored = localStorage.getItem(quizStorageKey);
    return stored ? JSON.parse(stored) : { correct: 0, total: 0 };
  };
  
  const updateQuizScore = (isCorrect: boolean) => {
    const current = getQuizScore();
    const updated = {
      correct: current.correct + (isCorrect ? 1 : 0),
      total: current.total + 1
    };
    localStorage.setItem(quizStorageKey, JSON.stringify(updated));
    return updated;
  };

  // Determine quiz type based on URL path
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');
  const isSimilar = location.includes('/similar/');
  const isNumbers = location.includes('/numbers/');

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Quiz not found</p>
      </div>
    );
  }

  // Determine if this is a multi-select question (multiple correct answers)
  const correctAnswers = quiz.options
    .map((opt: any, idx: number) => opt.correct ? idx : -1)
    .filter((idx: number) => idx !== -1);
  const isMultiSelect = correctAnswers.length > 1;

  // Calculate progress through the quiz section
  const progress = (() => {
    const quizNumber = parseInt(quiz.pageNumber.split(' ')[1]?.replace(/[a-z]/i, '') || '1');
    const questionLetter = quiz.pageNumber.match(/[a-z]$/i)?.[0] || 'a';
    const questionIndex = questionLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    const totalQuestions = 4;
    return ((questionIndex + 1) / totalQuestions) * 100;
  })();

  // Determine content type based on URL
  const getContentType = (): ContentType => {
    if (isNumbers) return 'vowel'; // Numbers use same tracking as vowels for now
    if (isSimilar) return 'similar';
    if (isMatra) return 'matra';
    if (isConsonant) return 'consonant';
    return 'vowel';
  };

  // Get the primary character being tested in this quiz
  const getTestedCharacter = (): string => {
    // The first character is typically the one being tested
    return quiz.char1 || quiz.char2 || '';
  };

  // Handle answer selection (single or multi-select)
  const handleAnswer = (index: number) => {
    if (isMultiSelect) {
      // Multi-select: toggle answer
      if (selectedAnswers.includes(index)) {
        setSelectedAnswers(selectedAnswers.filter(i => i !== index));
      } else {
        setSelectedAnswers([...selectedAnswers, index]);
      }
    } else {
      // Single select: show feedback then navigate
      const isCorrect = quiz.options[index].correct;
      
      // Set selected answer and show feedback
      setSelectedAnswers([index]);
      setShowFeedback(true);
      setFeedbackCorrect(isCorrect);
      
      // Record attempt for smart review system
      recordAttempt({
        contentId: getTestedCharacter(),
        contentType: getContentType(),
        quizId: quizId,
        correct: isCorrect,
        quizTitle: quiz.title,
      });
      
      // Update cumulative score
      updateQuizScore(isCorrect);
      
      if (isCorrect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Navigate to next question or results after showing feedback
      setTimeout(() => {
        if (quiz.nextLesson.includes('/')) {
          // End of quiz section - award XP and show results
          awardQuizXP();
          setShowResults(true);
        } else {
          // Next question - reset feedback state
          setShowFeedback(false);
          setSelectedAnswers([]);
          let basePath = '/script/lesson/vowels/quiz/';
          if (isConsonant) basePath = '/script/lesson/consonants/quiz/';
          if (isMatra) basePath = '/script/lesson/matra/quiz/';
          if (isSimilar) basePath = '/script/lesson/similar/quiz/';
          if (isNumbers) basePath = '/script/lesson/numbers/quiz/';
          setLocation(`${basePath}${quiz.nextLesson}`);
        }
      }, 1200);
    }
  };

  // Handle multi-select submission
  const handleSubmitMultiSelect = () => {
    const isCorrect = selectedAnswers.length === correctAnswers.length &&
                      selectedAnswers.every(idx => correctAnswers.includes(idx));
    
    // Record attempt for smart review system
    recordAttempt({
      contentId: getTestedCharacter(),
      contentType: getContentType(),
      quizId: quizId,
      correct: isCorrect,
      quizTitle: quiz.title,
    });
    
    // Update cumulative score
    updateQuizScore(isCorrect);
    
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Award XP for quiz completion (always, on every completion)
    awardQuizXP();
    setShowResults(true);
  };

  // Handle exit confirmation dialog
  const handleExitClick = () => {
    setShowExitConfirmation(true);
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  const handleConfirmExit = () => {
    const basePath = isNumbers ? "/script/numbers/sections" :
                     isSimilar ? "/script/similar/sections" :
                     isMatra ? "/script/matra/sections" : 
                     isConsonant ? "/script/consonants/sections" : 
                     "/script/vowels/sections";
    setLocation(basePath);
  };

  // Handle continuing after quiz completion
  const handleContinue = (percentage: number) => {
    // Clear the quiz score for this section
    localStorage.removeItem(quizStorageKey);
    
    if (quiz.nextLesson.includes('/')) {
      // This is the last quiz in the section
      
      // Only save progress if score is 60% or higher
      if (percentage >= 60) {
        const sectionNumber = parseInt(quizSectionId);
        
        if (isNumbers) {
          const current = parseInt(localStorage.getItem('numbersQuizzesCompleted') || '0');
          if (sectionNumber > current) {
            localStorage.setItem('numbersQuizzesCompleted', sectionNumber.toString());
          }
        } else if (isSimilar) {
          const current = parseInt(localStorage.getItem('similarQuizzesCompleted') || '0');
          if (sectionNumber > current) {
            localStorage.setItem('similarQuizzesCompleted', sectionNumber.toString());
          }
        } else if (isMatra) {
          const current = parseInt(localStorage.getItem('matraQuizzesCompleted') || '0');
          if (sectionNumber > current) {
            localStorage.setItem('matraQuizzesCompleted', sectionNumber.toString());
          }
        } else if (isConsonant) {
          const current = parseInt(localStorage.getItem('consonantsQuizzesCompleted') || '0');
          if (sectionNumber > current) {
            localStorage.setItem('consonantsQuizzesCompleted', sectionNumber.toString());
          }
        } else {
          const current = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
          if (sectionNumber > current) {
            localStorage.setItem('vowelsQuizzesCompleted', sectionNumber.toString());
          }
        }
        
        setLocation(quiz.nextLesson);
      } else {
        // Score below 60% - restart the quiz
        // Show loading state before redirect
        setIsRedirecting(true);
        
        // Get the prefix (e.g., "n" for numbers, "s" for similar, "m" for matra)
        const prefix = quizId.match(/^[a-z]+/i)?.[0] || '';
        const firstQuizId = prefix + quizSectionId + 'a';
        let basePath = '/script/lesson/vowels/quiz/';
        if (isConsonant) basePath = '/script/lesson/consonants/quiz/';
        if (isMatra) basePath = '/script/lesson/matra/quiz/';
        if (isSimilar) basePath = '/script/lesson/similar/quiz/';
        if (isNumbers) basePath = '/script/lesson/numbers/quiz/';
        
        // Small delay to show loading state, then redirect
        setTimeout(() => {
          // Force full page navigation to ensure clean state reset
          window.location.href = `${basePath}${firstQuizId}`;
        }, 100);
      }
    }
  };

  // Results screen
  if (showResults) {
    const finalScore = getQuizScore();
    const percentage = finalScore.total > 0 ? Math.round((finalScore.correct / finalScore.total) * 100) : 0;

    return (
      <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="w-10"></div>
            <button onClick={handleConfirmExit} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-close">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col justify-center relative animate-slide-in-up">
            <div className="mb-8">
              <img 
                src={tigerWaving} 
                alt="Waving tiger" 
                className="w-32 h-32 mx-auto object-contain mb-6" 
              />
              <div className={`text-6xl font-bold mb-4 ${percentage >= 60 ? 'text-[#ff9930]' : 'text-red-500'}`}>
                {percentage}%
              </div>
              {percentage >= 60 ? (
                <>
                  <p className="text-2xl font-bold text-black mb-2">{getRandomMessage()}</p>
                  <p className="text-gray-600 text-lg">
                    You got {finalScore.correct} out of {finalScore.total} correct
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-black mb-2">Keep Practicing!</p>
                  <p className="text-gray-600 text-lg mb-2">
                    You got {finalScore.correct} out of {finalScore.total} correct
                  </p>
                  <p className="text-red-600 font-semibold">
                    You need at least 60% to continue. Try again!
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => handleContinue(percentage)}
              className={`w-full py-4 text-white rounded-xl transition-colors text-lg font-semibold shadow-lg ${
                percentage >= 60 
                  ? 'bg-[#ff9930] hover:bg-[#CF7B24]' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              data-testid="button-continue"
            >
              {percentage >= 60 ? 'Continue' : 'Try Again'}
            </button>
          </div>
        </div>
        
        {/* Loading overlay when redirecting */}
        {isRedirecting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-slide-in-up">
              <Loader2 className="w-12 h-12 text-[#ff9930] animate-spin" />
              <p className="text-lg font-semibold text-black">Loading quiz...</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="w-10"></div>
          <button onClick={handleExitClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-exit">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <ProgressBar progress={progress} />

        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col relative animate-slide-in-up">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-8">{quiz.title}</h2>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-8">
              <p className="text-xl text-black mb-4" data-testid="text-question">{quiz.subQuestion}</p>
              {isMultiSelect && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border-2 border-purple-300" data-testid="badge-multi-select">
                    Select all that apply
                  </div>
                </div>
              )}
            </div>

            <div className={`gap-4 mb-4 ${quiz.type === 'sound' ? 'flex justify-center' : 'grid grid-cols-2'}`}>
              {quiz.options.map((option: any, index: number) => {
                const isSelected = selectedAnswers.includes(index);
                const isCorrectOption = option.correct;
                
                // For single-select with feedback, show correct/incorrect states
                let buttonClass = '';
                if (showFeedback && !isMultiSelect) {
                  if (isSelected && isCorrectOption) {
                    buttonClass = 'bg-green-500 text-white border-2 border-green-600';
                  } else if (isSelected && !isCorrectOption) {
                    buttonClass = 'bg-red-500 text-white border-2 border-red-600';
                  } else if (!isSelected && isCorrectOption) {
                    buttonClass = 'bg-green-100 text-green-700 border-2 border-green-500';
                  } else {
                    buttonClass = 'bg-gray-200 text-gray-500';
                  }
                } else if (isMultiSelect && isSelected) {
                  buttonClass = 'bg-[#CF7B24] text-white';
                } else {
                  buttonClass = 'bg-[#ff9930] text-white hover:bg-[#CF7B24]';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback && !isMultiSelect}
                    className={`px-4 py-4 rounded-xl transition-colors font-medium text-base shadow-lg btn-bounce ${buttonClass} ${
                      showFeedback && !isMultiSelect ? 'cursor-default' : ''
                    }`}
                    data-testid={`button-answer-${index}`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="flex items-center gap-2">
                        {formatOptionLabel(quiz.type, option, showFeedback && !isMultiSelect ? 'results' : 'quiz')}
                        {showFeedback && !isMultiSelect && isSelected && isCorrectOption && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                        {showFeedback && !isMultiSelect && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 flex-shrink-0" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {isMultiSelect && (
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-12 h-12 opacity-60 z-10">
                  <img src={tigerWaving} alt="Waving tiger" className="w-full h-full object-contain" />
                </div>
                <button
                  onClick={handleSubmitMultiSelect}
                  disabled={selectedAnswers.length === 0}
                  className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit"
                >
                  Submit Answer{selectedAnswers.length > 0 ? ` (${selectedAnswers.length} selected)` : ''}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-slide-in-up">
            <h3 className="text-xl font-bold text-black mb-3">Exit Quiz?</h3>
            <p className="text-gray-600 mb-6">
              If you exit now, your progress in this quiz will be reset and you'll need to start over.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelExit}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                data-testid="button-cancel-exit"
              >
                Stay
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 px-6 py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-medium"
                data-testid="button-confirm-exit"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
