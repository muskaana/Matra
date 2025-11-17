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
import { X, CheckCircle2, XCircle } from "lucide-react";
import confetti from "canvas-confetti";

import tigerWaving from '@assets/generated_images/Waving_tiger_transparent_9a08bf58.png';
import { allQuizzes } from '../data/quizzes';
import { ProgressBar } from '../components/shared/ProgressBar';
import { recordAttempt, ContentType } from '../utils/smartReview';

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
  
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  // Determine quiz type based on URL path
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');
  const isSimilar = location.includes('/similar/');

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
      // Single select: immediately check and navigate
      const isCorrect = quiz.options[index].correct;
      
      // Record attempt for smart review system
      recordAttempt({
        contentId: getTestedCharacter(),
        contentType: getContentType(),
        quizId: quizId,
        correct: isCorrect,
        quizTitle: quiz.title,
      });
      
      if (isCorrect) {
        setScore(1);
      }
      
      // Navigate to next question or results
      setTimeout(() => {
        if (quiz.nextLesson.includes('/')) {
          // End of quiz - go to sections page
          setShowResults(true);
          if (isCorrect) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        } else {
          // Next question
          let basePath = '/script/lesson/vowels/quiz/';
          if (isConsonant) basePath = '/script/lesson/consonants/quiz/';
          if (isMatra) basePath = '/script/lesson/matra/quiz/';
          if (isSimilar) basePath = '/script/lesson/similar/quiz/';
          setLocation(`${basePath}${quiz.nextLesson}`);
        }
      }, 300);
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
    
    if (isCorrect) {
      setScore(1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

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
    const basePath = isSimilar ? "/script/similar/sections" :
                     isMatra ? "/script/matra/sections" : 
                     isConsonant ? "/script/consonants/sections" : 
                     "/script/vowels/sections";
    setLocation(basePath);
  };

  // Handle continuing after quiz completion
  const handleContinue = () => {
    if (quiz.nextLesson.includes('/')) {
      setLocation(quiz.nextLesson);
    }
  };

  // Results screen
  if (showResults) {
    const percentage = (score / 1) * 100;

    return (
      <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="w-10"></div>
            <button onClick={handleConfirmExit} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-close">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col justify-between relative animate-slide-in-up overflow-y-auto">
            <div>
              <div className="mb-6">
                <div className="text-6xl font-bold text-[#ff9930] mb-2">{percentage}%</div>
                <p className="text-2xl font-bold text-black mb-1">{getRandomMessage()}</p>
                <p className="text-gray-500">
                  You got {score} out of 1 correct
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">{quiz.subQuestion}</p>
                  <div className="space-y-2">
                    {quiz.options.map((option: any, index: number) => {
                      const wasSelected = selectedAnswers.includes(index);
                      const isCorrectAnswer = option.correct;
                      const showAsCorrect = isCorrectAnswer;
                      const showAsWrong = wasSelected && !isCorrectAnswer;

                      return (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-2 flex items-center justify-between ${
                            showAsCorrect ? 'border-green-500 bg-green-50' :
                            showAsWrong ? 'border-red-500 bg-red-50' :
                            'border-gray-200'
                          }`}
                        >
                          <span className="text-base">{formatOptionLabel(quiz.type, option, 'results')}</span>
                          {showAsCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                          {showAsWrong && <XCircle className="w-5 h-5 text-red-600" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg"
              data-testid="button-continue"
            >
              Continue
            </button>
          </div>
        </div>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 opacity-70 animate-wiggle" style={{ transform: 'rotate(-12deg)' }}>
            <img src={tigerWaving} alt="Waving tiger" className="w-full h-full object-contain" />
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-8">{quiz.title}</h2>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-7xl font-bold text-black">{quiz.char1}</span>
              <span className="text-2xl font-semibold text-gray-500">vs</span>
              <span className="text-7xl font-bold text-black">{quiz.char2}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-8">
              <p className="text-xl text-black mb-4" data-testid="text-question">{quiz.subQuestion}</p>
            </div>

            <div className={`gap-4 mb-4 ${quiz.type === 'sound' ? 'flex justify-center' : 'grid grid-cols-2'}`}>
              {quiz.options.map((option: any, index: number) => {
                const isSelected = selectedAnswers.includes(index);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`px-4 py-4 rounded-xl transition-colors font-medium text-base shadow-lg btn-bounce whitespace-nowrap overflow-hidden text-ellipsis ${
                      isMultiSelect && isSelected
                        ? 'bg-[#CF7B24] text-white'
                        : 'bg-[#ff9930] text-white hover:bg-[#CF7B24]'
                    }`}
                    data-testid={`button-answer-${index}`}
                  >
                    {formatOptionLabel(quiz.type, option, 'quiz')}
                  </button>
                );
              })}
            </div>

            {isMultiSelect && (
              <button
                onClick={handleSubmitMultiSelect}
                disabled={selectedAnswers.length === 0}
                className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-submit"
              >
                Submit Answer{selectedAnswers.length > 0 ? ` (${selectedAnswers.length} selected)` : ''}
              </button>
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
