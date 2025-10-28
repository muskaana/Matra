import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { X, ChevronLeft } from "lucide-react";
import confetti from 'canvas-confetti';
import tigerThinking from '@assets/generated_images/Thinking_tiger_transparent_d7773890.png';
import tigerWaving from '@assets/generated_images/Waving_tiger_transparent_9a08bf58.png';

const encouragingMessages = [
  "शाबाश! (Shaabash!)",
  "बहुत अच्छे! (Bahut acche!)",
  "कमाल है! (Kamaal hai!)",
  "Fantastic!",
  "Excellent!",
  "Amazing work!",
  "You're doing great!",
  "Perfect!",
];

const getRandomMessage = () => {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
};

const quizData: Record<string, any> = {
  "1a": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "What is अ?",
    type: "sound",
    options: [
      { text: "uh", correct: true },
      { text: "aa", correct: false },
    ],
    pageNumber: "Quiz 1a",
    nextLesson: "1b",
  },
  "1b": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "Which word starts with आ?",
    type: "word",
    options: [
      { text: "Aam", correct: true },
      { text: "Anar", correct: false },
      { text: "Imli", correct: false },
      { text: "Abhi", correct: false },
    ],
    pageNumber: "Quiz 1b",
    nextLesson: "/script/vowels/sections",
  },
  "2a": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "What is ई?",
    type: "sound",
    options: [
      { text: "ee", correct: false },
      { text: "eee", correct: true },
    ],
    pageNumber: "Quiz 2a",
    nextLesson: "2b",
  },
  "2b": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "Which word starts with ई?",
    type: "word",
    options: [
      { text: "Imli", correct: false },
      { text: "Eed", correct: true },
      { text: "Idli", correct: false },
      { text: "Izzat", correct: false },
    ],
    pageNumber: "Quiz 2b",
    nextLesson: "/script/vowels/sections",
  },
  "3a": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "What is उ?",
    type: "sound",
    options: [
      { text: "oo", correct: true },
      { text: "ooo", correct: false },
    ],
    pageNumber: "Quiz 3a",
    nextLesson: "3b",
  },
  "3b": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "Which word starts with ऊ?",
    type: "word",
    options: [
      { text: "Ullu", correct: false },
      { text: "Oon", correct: true },
      { text: "Ummeed", correct: false },
      { text: "Utho", correct: false },
    ],
    pageNumber: "Quiz 3b",
    nextLesson: "/script/vowels/sections",
  },
  "4a": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "What is ऐ?",
    type: "sound",
    options: [
      { text: "ay", correct: false },
      { text: "aa-ay", correct: true },
    ],
    pageNumber: "Quiz 4a",
    nextLesson: "4b",
  },
  "4b": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "Which word starts with ऐ?",
    type: "word",
    options: [
      { text: "Ek", correct: false },
      { text: "Ainak", correct: true },
      { text: "Ehsaan", correct: false },
      { text: "Alag", correct: false },
    ],
    pageNumber: "Quiz 4b",
    nextLesson: "/script/vowels/sections",
  },
  "5a": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "What is औ?",
    type: "sound",
    options: [
      { text: "oh", correct: false },
      { text: "aa-oh", correct: true },
    ],
    pageNumber: "Quiz 5a",
    nextLesson: "5b",
  },
  "5b": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "Which word starts with औ?",
    type: "word",
    options: [
      { text: "Okhli", correct: false },
      { text: "Aurat", correct: true },
      { text: "Os", correct: false },
      { text: "Om", correct: false },
    ],
    pageNumber: "Quiz 5b",
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
  const currentQuizIdRef = useRef(quizId);

  // Reset state when quiz changes
  useEffect(() => {
    if (currentQuizIdRef.current !== quizId) {
      setSelectedAnswer(null);
      setShowFeedback(false);
      currentQuizIdRef.current = quizId;
    }
  }, [quizId]);

  if (!quiz) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Quiz not found</p></div>;
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    // Trigger confetti if correct answer with Indian flag colors
    if (quiz.options[index].correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9930', '#138808', '#FFFFFF', '#2E86AB', '#FFD700']
      });
    }
  };

  const handleNext = () => {
    if (isCorrect) {
      // Mark quiz as completed only if answer is correct
      if (quiz.nextLesson === '/script/vowels' || quiz.nextLesson === '/script/vowels/sections') {
        const currentQuizzes = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
        const sectionNumber = parseInt(quizId.replace(/[ab]/, ''));
        if (sectionNumber > currentQuizzes) {
          localStorage.setItem('vowelsQuizzesCompleted', sectionNumber.toString());
        }
      }
      
      // Navigate to next quiz/page
      if (typeof quiz.nextLesson === 'string' && quiz.nextLesson.startsWith('/')) {
        setLocation(quiz.nextLesson);
      } else {
        setLocation(`/script/lesson/vowels/quiz/${quiz.nextLesson}`);
      }
    } else {
      // If incorrect, go back to the quiz to try again
      setShowFeedback(false);
      setSelectedAnswer(null);
    }
  };

  const isCorrect = selectedAnswer !== null && quiz.options[selectedAnswer].correct;

  // Only show feedback if we're still on the same quiz that was answered
  if (showFeedback && currentQuizIdRef.current === quizId && selectedAnswer !== null) {
    const correctAnswerIndex = quiz.options.findIndex((opt: any) => opt.correct);
    const correctAnswerText = quiz.options[correctAnswerIndex]?.text;
    const selectedAnswerText = selectedAnswer !== null ? quiz.options[selectedAnswer]?.text : '';

    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <button onClick={() => setShowFeedback(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <Link href="/script/vowels/sections">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl text-center border border-gray-100 flex-1 flex flex-col overflow-hidden relative animate-slide-in-up">
            <div className="absolute bottom-16 right-8 w-20 h-20 opacity-50 animate-bounce-subtle" style={{ transform: 'rotate(10deg)' }}>
              <img src={tigerThinking} alt="Thinking tiger" className="w-full h-full object-contain" />
            </div>
            
            <div className="px-8 pt-8 pb-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-black mb-4">{quiz.title}</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-5xl font-bold text-black">{quiz.char1}</span>
                <span className="text-xl font-semibold text-gray-500">vs</span>
                <span className="text-5xl font-bold text-black">{quiz.char2}</span>
              </div>
              <p className="text-gray-600 text-base">{quiz.subQuestion}</p>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 overflow-y-auto">
              <div className={`text-3xl font-bold mb-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "✓ CORRECT" : "✗ INCORRECT"}
              </div>
              
              {isCorrect && (
                <p className="text-xl font-semibold bg-gradient-to-r from-[#ff9930] to-[#FFD700] bg-clip-text text-transparent mb-4">{getRandomMessage()}</p>
              )}

              {!isCorrect && (
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-2">You selected: <span className="font-bold text-red-600">{selectedAnswerText}</span></p>
                  <p className="text-sm text-gray-700">Correct answer: <span className="font-bold text-green-600">{correctAnswerText}</span></p>
                </div>
              )}

              {isCorrect && (
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">Your answer: <span className="font-bold text-green-600">{selectedAnswerText}</span></p>
                </div>
              )}
            </div>

            <div className="px-8 pb-8 pt-4 flex-shrink-0">
              <button 
                onClick={handleNext}
                className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg btn-bounce"
              >
                {isCorrect ? "Next" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="w-10"></div>
          <Link href="/script/vowels/sections">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col relative animate-slide-in-up">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 opacity-45 animate-wiggle" style={{ transform: 'rotate(-12deg)' }}>
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
              <p className="text-xl text-black mb-6">{quiz.subQuestion}</p>
            </div>

            <div className={`gap-4 mb-4 ${quiz.type === 'sound' ? 'flex justify-center' : 'grid grid-cols-2'}`}>
              {quiz.options.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="px-8 py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-medium text-lg shadow-lg btn-bounce"
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
