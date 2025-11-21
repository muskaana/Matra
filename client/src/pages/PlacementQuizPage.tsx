/**
 * PlacementQuizPage Component
 * 
 * Actual reading assessment that tests ability to read Devanagari script
 * Marks mastered lessons as complete and routes to correct starting point
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, XCircle } from "lucide-react";
import confetti from "canvas-confetti";
import tigerCalm from '@assets/sitting-calm-tiger.jpg';
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@shared/schema";

interface ReadingQuestion {
  id: string;
  category: "vowel" | "consonant" | "matra";
  character: string;
  correctAnswer: string;
  options: string[];
  lessonId: string; // for marking complete
}

// Actual reading assessment questions - testing real character recognition
const readingQuestions: ReadingQuestion[] = [
  // Basic Vowels (easier)
  { id: "q1", category: "vowel", character: "अ", correctAnswer: "a", options: ["a", "aa", "i", "u"], lessonId: "1" },
  { id: "q2", category: "vowel", character: "आ", correctAnswer: "aa", options: ["a", "aa", "i", "ee"], lessonId: "2" },
  { id: "q3", category: "vowel", character: "इ", correctAnswer: "i", options: ["i", "ee", "a", "u"], lessonId: "3" },
  
  // Basic Consonants (medium)
  { id: "q4", category: "consonant", character: "क", correctAnswer: "ka", options: ["ka", "kha", "ga", "cha"], lessonId: "c1" },
  { id: "q5", category: "consonant", character: "ग", correctAnswer: "ga", options: ["ka", "ga", "gha", "cha"], lessonId: "c3" },
  { id: "q6", category: "consonant", character: "च", correctAnswer: "cha", options: ["cha", "chha", "ja", "ka"], lessonId: "c5" },
  
  // More Vowels (medium)
  { id: "q7", category: "vowel", character: "उ", correctAnswer: "u", options: ["u", "oo", "a", "i"], lessonId: "5" },
  { id: "q8", category: "vowel", character: "ए", correctAnswer: "e", options: ["e", "ai", "o", "a"], lessonId: "8" },
  
  // More Consonants (harder)
  { id: "q9", category: "consonant", character: "प", correctAnswer: "pa", options: ["pa", "ba", "pha", "ma"], lessonId: "c13" },
  { id: "q10", category: "consonant", character: "स", correctAnswer: "sa", options: ["sa", "sha", "ha", "ta"], lessonId: "c27" },
  
  // Matras (harder)
  { id: "q11", category: "matra", character: "का", correctAnswer: "kaa", options: ["ka", "kaa", "ki", "kee"], lessonId: "m1" },
  { id: "q12", category: "matra", character: "कि", correctAnswer: "ki", options: ["ka", "ki", "kee", "ku"], lessonId: "m2" },
];

export default function PlacementQuizPage() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: boolean }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = readingQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === readingQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / readingQuestions.length) * 100;

  // Mutation to save placement results
  const saveResultsMutation = useMutation({
    mutationFn: async (data: { userId: string; masteredLessons: string[]; placementLevel: string; score: number }) => {
      // Mark placement as complete
      await apiRequest("/api/placement/complete", "POST", data);
    }
  });

  const handleAnswerSelect = (selectedOption: string) => {
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    // Record answer
    const newAnswers = { ...answers, [currentQuestion.id]: isCorrect };
    setAnswers(newAnswers);
    
    // Show immediate feedback
    setShowFeedback(true);

    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      if (isLastQuestion) {
        processResults(newAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1500);
  };

  const processResults = (finalAnswers: { [key: string]: boolean }) => {
    // Calculate score
    const correctCount = Object.values(finalAnswers).filter(Boolean).length;
    const totalQuestions = readingQuestions.length;
    const percentageScore = (correctCount / totalQuestions) * 100;

    // Determine which lessons they've mastered
    const masteredLessons: string[] = [];
    readingQuestions.forEach((q) => {
      if (finalAnswers[q.id]) {
        masteredLessons.push(q.lessonId);
      }
    });

    // Determine placement level and starting point
    let placementLevel: string;
    let startPath: string;

    if (percentageScore >= 80) {
      // Mastered most of script - can skip to Talk (Words/Sentences)
      placementLevel = "Script Confident";
      startPath = "/words/beginner";
    } else if (percentageScore >= 50) {
      // Know some basics - start from Matra
      placementLevel = "Script Learner";
      startPath = "/script/matra";
    } else if (percentageScore >= 25) {
      // Know very basics - start from Consonants
      placementLevel = "Script Beginner";
      startPath = "/script/consonants";
    } else {
      // Complete beginner - start from Vowels
      placementLevel = "Absolute Beginner";
      startPath = "/script/vowels";
    }

    // Save results to localStorage
    localStorage.setItem('placementLevel', placementLevel);
    localStorage.setItem('placementScore', percentageScore.toString());
    localStorage.setItem('placementCompleted', 'true');
    localStorage.setItem('masteredLessons', JSON.stringify(masteredLessons));

    // If user is authenticated, save to database
    if (user && (user as User).id) {
      saveResultsMutation.mutate({
        userId: (user as User).id,
        masteredLessons,
        placementLevel,
        score: percentageScore
      });
    }

    // Show results
    setShowResults(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Navigate after showing results
    setTimeout(() => {
      setLocation(startPath);
    }, 3500);
  };

  // Results Screen
  if (showResults) {
    const correctCount = Object.values(answers).filter(Boolean).length;
    const totalQuestions = readingQuestions.length;
    const percentageScore = (correctCount / totalQuestions) * 100;
    const placementLevel = localStorage.getItem('placementLevel') || "Absolute Beginner";

    return (
      <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col justify-center relative animate-slide-in-up">
            <div className="mb-8">
              <CheckCircle2 className="w-16 h-16 text-[#ff9930] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-black mb-4">Assessment Complete!</h2>
              <img 
                src={tigerCalm} 
                alt="Waving tiger" 
                className="w-32 h-32 mx-auto object-contain mb-6" 
              />
              <div className="mb-4">
                <div className="text-5xl font-bold text-[#ff9930] mb-2">
                  {correctCount}/{totalQuestions}
                </div>
                <div className="text-sm text-gray-600 mb-4">correct answers</div>
                <div className="text-2xl font-bold text-gray-700">
                  {placementLevel}
                </div>
              </div>
              <p className="text-gray-600 text-base mb-4">
                {percentageScore >= 80 && "Excellent! You can read most Hindi script. We'll start you with vocabulary building."}
                {percentageScore >= 50 && percentageScore < 80 && "Good foundation! You know the basics. We'll start you with Matra (vowel symbols)."}
                {percentageScore >= 25 && percentageScore < 50 && "Nice start! You know some letters. We'll start you with Consonants."}
                {percentageScore < 25 && "Welcome! We'll start from the very beginning and build your reading skills step by step."}
              </p>
              <div className="bg-orange-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Lessons marked complete:</strong> {Object.values(answers).filter(Boolean).length}
                </p>
              </div>
              <p className="text-sm text-gray-500 italic">
                Starting your journey in a moment...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="text-center mb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-black mb-2">Reading Assessment</h1>
          <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {readingQuestions.length}</p>
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
            <p className="text-sm text-gray-600 mb-4">What sound does this character make?</p>
            <div className="text-8xl font-bold text-black mb-4" style={{ fontFamily: 'Tiro Devanagari Hindi, serif' }}>
              {currentQuestion.character}
            </div>
            
            {/* Feedback */}
            {showFeedback && (
              <div className={`flex items-center justify-center gap-2 mt-4 ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isAnswerCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    <span className="font-medium">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    <span className="font-medium">The answer is "{currentQuestion.correctAnswer}"</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showFeedback && handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`px-4 py-3 rounded-xl font-medium text-lg shadow-lg transition-all ${
                    showFeedback && selectedAnswer === option
                      ? isAnswerCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : showFeedback
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-[#ff9930] text-white hover:bg-[#CF7B24] btn-bounce'
                  }`}
                  data-testid={`button-option-${index}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
