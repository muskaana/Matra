import React, { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { X, ChevronLeft } from "lucide-react";

const quizData: Record<string, any> = {
  "1": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "What is अ?",
    type: "sound",
    options: [
      { text: "uh", correct: true },
      { text: "aa", correct: false },
    ],
    pageNumber: "Quiz 1",
    nextLesson: "/script/vowels/sections",
  },
  "2": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "What is ई?",
    type: "sound",
    options: [
      { text: "ee", correct: false },
      { text: "eee", correct: true },
    ],
    pageNumber: "Quiz 2",
    nextLesson: "/script/vowels/sections",
  },
  "3": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "What is उ?",
    type: "sound",
    options: [
      { text: "oo", correct: true },
      { text: "ooo", correct: false },
    ],
    pageNumber: "Quiz 3",
    nextLesson: "/script/vowels/sections",
  },
  "4": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "What is ऐ?",
    type: "sound",
    options: [
      { text: "ay", correct: false },
      { text: "aa-ay", correct: true },
    ],
    pageNumber: "Quiz 4",
    nextLesson: "/script/vowels/sections",
  },
  "5": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "What is औ?",
    type: "sound",
    options: [
      { text: "oh", correct: false },
      { text: "aa-oh", correct: true },
    ],
    pageNumber: "Quiz 5",
    nextLesson: "/script/vowels/sections",
  },
};

export default function QuizPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const quizId = params.id as string;
  const quiz = quizData[quizId];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!quiz) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Quiz not found</p></div>;
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (isCorrect && (quiz.nextLesson === '/script/vowels' || quiz.nextLesson === '/script/vowels/sections')) {
      const currentQuizzes = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
      const quizNumber = parseInt(quizId);
      if (quizNumber > currentQuizzes) {
        localStorage.setItem('vowelsQuizzesCompleted', quizNumber.toString());
      }
    }
    
    if (typeof quiz.nextLesson === 'string' && quiz.nextLesson.startsWith('/')) {
      setLocation(quiz.nextLesson);
    } else {
      setLocation(`/script/lesson/vowels/${quiz.nextLesson}`);
    }
  };

  const isCorrect = selectedAnswer !== null && quiz.options[selectedAnswer].correct;

  if (showFeedback) {
    return (
      <div className="h-screen bg-white px-4 py-4 flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setShowFeedback(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <Link href="/script/vowels/sections">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">{quiz.title}</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-5xl font-bold text-black">{quiz.char1}</span>
                <span className="text-xl font-semibold text-gray-500">vs</span>
                <span className="text-5xl font-bold text-black">{quiz.char2}</span>
              </div>
              <p className="text-gray-600 text-base mb-4">{quiz.subQuestion}</p>
            </div>

            <div className={`text-3xl font-bold mb-8 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "CORRECT" : "INCORRECT"}
            </div>

            {!isCorrect && (
              <p className="text-sm text-gray-500 mb-8">Try again to learn the difference!</p>
            )}

            <button 
              onClick={handleNext}
              className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white px-4 py-4 flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10"></div>
          <Link href="/script/vowels/sections">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col">
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
              <p className="text-xl text-black mb-6">{quiz.subQuestion}</p>
            </div>

            <div className={`gap-4 mb-4 ${quiz.type === 'sound' ? 'flex justify-center' : 'grid grid-cols-2'}`}>
              {quiz.options.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="px-8 py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-medium text-lg shadow-lg"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
