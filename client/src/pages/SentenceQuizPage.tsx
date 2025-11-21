/**
 * SentenceQuizPage Component
 * 
 * Quiz for sentence matching (English → Hindi) and fill-in-the-blank
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { X, CheckCircle2, XCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { sentenceSections } from '../data/sentences/beginner';
import { sentenceQuizzes } from '../data/sentences/quizzes';
import tigerExcited from '@assets/excited-jumping-tiger.png';
import { awardQuizXP, awardUnitXP } from '../lib/progress';

export default function SentenceQuizPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const sectionId = params.sectionId as string;
  
  const section = sentenceSections.find(s => s.id === sectionId);
  const quiz = section ? sentenceQuizzes[section.quizId] : null;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!section || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Quiz not found</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      
      // Award XP for quiz completion (always, on every completion)
      awardQuizXP();
      
      // Calculate final score percentage
      const percentage = Math.round((score / quiz.questions.length) * 100);
      
      // Only save completion if score is 60% or higher
      if (percentage >= 60) {
        const completed = localStorage.getItem('sentencesCompleted');
        const completedSections = completed ? JSON.parse(completed) : [];
        const isNewCompletion = !completedSections.includes(sectionId);
        
        if (isNewCompletion) {
          completedSections.push(sectionId);
          localStorage.setItem('sentencesCompleted', JSON.stringify(completedSections));
          
          // Check if all sentence sections complete for unit bonus (one-time only)
          if (completedSections.length === sentenceSections.length) {
            awardUnitXP();
          }
        }
      }

      // Confetti for good score
      if (percentage >= 80) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleExit = () => {
    setLocation('/sentences');
  };

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  // Results Screen
  if (showResults) {
    const finalScore = score;
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);

    return (
      <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="w-10"></div>
            <button onClick={handleExit} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-close">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col justify-center relative animate-slide-in-up">
            <div className="mb-8">
              <img 
                src={tigerExcited} 
                alt="Excited tiger" 
                className="w-32 h-32 mx-auto object-contain mb-6" 
              />
              <div className={`text-6xl font-bold mb-4 ${percentage >= 80 ? 'text-[#ff9930]' : percentage >= 60 ? 'text-yellow-500' : 'text-gray-500'}`}>
                {percentage}%
              </div>
              <p className="text-2xl font-bold text-black mb-2">
                {percentage >= 80 ? 'वाह! (Waah!)' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
              </p>
              <p className="text-gray-600 text-lg">
                You got {finalScore} out of {quiz.questions.length} correct
              </p>
            </div>

            <button
              onClick={handleExit}
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

  // Quiz Screen
  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="w-10"></div>
          <div className="text-center flex-1">
            <h2 className="text-lg font-bold text-black">{quiz.title}</h2>
            <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
          </div>
          <button onClick={handleExit} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-exit">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col relative animate-slide-in-up">
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-4">
              {currentQuestion.type === "match" ? "Match:" : "Fill in the blank:"}
            </p>
            <div className={`font-bold text-black mb-8 ${currentQuestion.type === "fill" ? "text-3xl" : "text-2xl"}`}>
              {currentQuestion.question}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 gap-4 mb-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctIndex;
                
                let buttonClass = '';
                if (showFeedback) {
                  if (isSelected && isCorrect) {
                    buttonClass = 'bg-green-500 text-white border-2 border-green-600';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-red-500 text-white border-2 border-red-600';
                  } else if (!isSelected && isCorrect) {
                    buttonClass = 'bg-green-100 text-green-700 border-2 border-green-500';
                  } else {
                    buttonClass = 'bg-gray-200 text-gray-500';
                  }
                } else {
                  buttonClass = 'bg-[#ff9930] text-white hover:bg-[#CF7B24]';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                    className={`px-6 py-5 rounded-xl transition-colors font-medium text-2xl shadow-lg btn-bounce ${buttonClass} ${
                      showFeedback ? 'cursor-default' : ''
                    }`}
                    data-testid={`button-answer-${index}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {option}
                      {showFeedback && isSelected && isCorrect && <CheckCircle2 className="w-6 h-6 flex-shrink-0" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="w-6 h-6 flex-shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <button
                onClick={handleNext}
                className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg mt-4"
                data-testid="button-next"
              >
                {isLastQuestion ? 'See Results' : 'Next Question'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
