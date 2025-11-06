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
      { text: "ai", correct: true },
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
      { text: "aw", correct: true },
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
  "c1a": {
    title: "Quiz 1 : Consonants",
    char1: "क",
    char2: "ख",
    subQuestion: "What is क?",
    type: "sound",
    options: [
      { text: "ka", correct: true },
      { text: "kha", correct: false },
    ],
    pageNumber: "Quiz C1a",
    nextLesson: "c1b",
  },
  "c1b": {
    title: "Quiz 1 : Consonants",
    char1: "क",
    char2: "ख",
    subQuestion: "Which word starts with ख?",
    type: "word",
    options: [
      { text: "Kitaab", correct: false },
      { text: "Khilaadi", correct: true },
      { text: "Kamal", correct: false },
      { text: "Kam", correct: false },
    ],
    pageNumber: "Quiz C1b",
    nextLesson: "/script/consonants/sections",
  },
  "c2a": {
    title: "Quiz 2 : Consonants",
    char1: "ग",
    char2: "घ",
    subQuestion: "What is ग?",
    type: "sound",
    options: [
      { text: "ga", correct: true },
      { text: "gha", correct: false },
    ],
    pageNumber: "Quiz C2a",
    nextLesson: "c2b",
  },
  "c2b": {
    title: "Quiz 2 : Consonants",
    char1: "ग",
    char2: "घ",
    subQuestion: "Which word starts with घ?",
    type: "word",
    options: [
      { text: "Gamla", correct: false },
      { text: "Ghar", correct: true },
      { text: "Gaana", correct: false },
      { text: "Ghadi", correct: true },
    ],
    pageNumber: "Quiz C2b",
    nextLesson: "/script/consonants/sections",
  },
  "c3a": {
    title: "Quiz 3 : Consonants",
    char1: "च",
    char2: "छ",
    subQuestion: "What is च?",
    type: "sound",
    options: [
      { text: "cha", correct: true },
      { text: "chha", correct: false },
    ],
    pageNumber: "Quiz C3a",
    nextLesson: "c3b",
  },
  "c3b": {
    title: "Quiz 3 : Consonants",
    char1: "च",
    char2: "छ",
    subQuestion: "Which word starts with छ?",
    type: "word",
    options: [
      { text: "Chaay", correct: false },
      { text: "Chhaata", correct: true },
      { text: "Chaabi", correct: false },
      { text: "Chhota", correct: true },
    ],
    pageNumber: "Quiz C3b",
    nextLesson: "/script/consonants/sections",
  },
  "c4a": {
    title: "Quiz 4 : Consonants",
    char1: "ज",
    char2: "झ",
    subQuestion: "What is ज?",
    type: "sound",
    options: [
      { text: "ja", correct: true },
      { text: "jha", correct: false },
    ],
    pageNumber: "Quiz C4a",
    nextLesson: "c4b",
  },
  "c4b": {
    title: "Quiz 4 : Consonants",
    char1: "ज",
    char2: "झ",
    subQuestion: "Which word starts with झ?",
    type: "word",
    options: [
      { text: "Jahaaz", correct: false },
      { text: "Jhanda", correct: true },
      { text: "Jangal", correct: false },
      { text: "Jharna", correct: true },
    ],
    pageNumber: "Quiz C4b",
    nextLesson: "/script/consonants/sections",
  },
  "c5a": {
    title: "Quiz 5 : Consonants",
    char1: "ट",
    char2: "ठ",
    subQuestion: "What is ट?",
    type: "sound",
    options: [
      { text: "ṭa", correct: true },
      { text: "ṭha", correct: false },
    ],
    pageNumber: "Quiz C5a",
    nextLesson: "c5b",
  },
  "c5b": {
    title: "Quiz 5 : Consonants",
    char1: "ट",
    char2: "ठ",
    subQuestion: "Which word starts with ठ?",
    type: "word",
    options: [
      { text: "Tamaatar", correct: false },
      { text: "Thanda", correct: true },
      { text: "Topi", correct: false },
      { text: "Theek", correct: true },
    ],
    pageNumber: "Quiz C5b",
    nextLesson: "/script/consonants/sections",
  },
  "c6a": {
    title: "Quiz 6 : Consonants",
    char1: "ड",
    char2: "ढ",
    subQuestion: "What is ड?",
    type: "sound",
    options: [
      { text: "ḍa", correct: true },
      { text: "ḍha", correct: false },
    ],
    pageNumber: "Quiz C6a",
    nextLesson: "c6b",
  },
  "c6b": {
    title: "Quiz 6 : Consonants",
    char1: "ड",
    char2: "ढ",
    subQuestion: "Which word starts with ढ?",
    type: "word",
    options: [
      { text: "Damru", correct: false },
      { text: "Dhol", correct: true },
      { text: "Daal", correct: false },
      { text: "Dhakkan", correct: true },
    ],
    pageNumber: "Quiz C6b",
    nextLesson: "/script/consonants/sections",
  },
  "c7a": {
    title: "Quiz 7 : Consonants",
    char1: "त",
    char2: "थ",
    subQuestion: "What is त?",
    type: "sound",
    options: [
      { text: "ta", correct: true },
      { text: "tha", correct: false },
    ],
    pageNumber: "Quiz C7a",
    nextLesson: "c7b",
  },
  "c7b": {
    title: "Quiz 7 : Consonants",
    char1: "त",
    char2: "थ",
    subQuestion: "Which word starts with थ?",
    type: "word",
    options: [
      { text: "Tarbooz", correct: false },
      { text: "Thaali", correct: true },
      { text: "Taala", correct: false },
      { text: "Thaila", correct: true },
    ],
    pageNumber: "Quiz C7b",
    nextLesson: "/script/consonants/sections",
  },
  "c8a": {
    title: "Quiz 8 : Consonants",
    char1: "द",
    char2: "ध",
    subQuestion: "What is द?",
    type: "sound",
    options: [
      { text: "da", correct: true },
      { text: "dha", correct: false },
    ],
    pageNumber: "Quiz C8a",
    nextLesson: "c8b",
  },
  "c8b": {
    title: "Quiz 8 : Consonants",
    char1: "द",
    char2: "ध",
    subQuestion: "Which word starts with ध?",
    type: "word",
    options: [
      { text: "Darwaza", correct: false },
      { text: "Dhaan", correct: true },
      { text: "Doodh", correct: false },
      { text: "Dhoop", correct: true },
    ],
    pageNumber: "Quiz C8b",
    nextLesson: "/script/consonants/sections",
  },
  "c9a": {
    title: "Quiz 9 : Consonants",
    char1: "प",
    char2: "फ",
    subQuestion: "What is प?",
    type: "sound",
    options: [
      { text: "pa", correct: true },
      { text: "pha", correct: false },
    ],
    pageNumber: "Quiz C9a",
    nextLesson: "c9b",
  },
  "c9b": {
    title: "Quiz 9 : Consonants",
    char1: "प",
    char2: "फ",
    subQuestion: "Which word starts with फ?",
    type: "word",
    options: [
      { text: "Paani", correct: false },
      { text: "Phal", correct: true },
      { text: "Patta", correct: false },
      { text: "Phool", correct: true },
    ],
    pageNumber: "Quiz C9b",
    nextLesson: "/script/consonants/sections",
  },
  "c10a": {
    title: "Quiz 10 : Consonants",
    char1: "ब",
    char2: "भ",
    subQuestion: "What is ब?",
    type: "sound",
    options: [
      { text: "ba", correct: true },
      { text: "bha", correct: false },
    ],
    pageNumber: "Quiz C10a",
    nextLesson: "c10b",
  },
  "c10b": {
    title: "Quiz 10 : Consonants",
    char1: "ब",
    char2: "भ",
    subQuestion: "Which word starts with भ?",
    type: "word",
    options: [
      { text: "Bandar", correct: false },
      { text: "Bhaalu", correct: true },
      { text: "Baal", correct: false },
      { text: "Bhai", correct: true },
    ],
    pageNumber: "Quiz C10b",
    nextLesson: "/script/consonants/sections",
  },
  "c11a": {
    title: "Quiz 11 : Consonants",
    char1: "न",
    char2: "म",
    subQuestion: "What is न?",
    type: "sound",
    options: [
      { text: "na", correct: true },
      { text: "ma", correct: false },
    ],
    pageNumber: "Quiz C11a",
    nextLesson: "c11b",
  },
  "c11b": {
    title: "Quiz 11 : Consonants",
    char1: "न",
    char2: "म",
    subQuestion: "Which word starts with म?",
    type: "word",
    options: [
      { text: "Namak", correct: false },
      { text: "Makaan", correct: true },
      { text: "Naak", correct: false },
      { text: "Maa", correct: true },
    ],
    pageNumber: "Quiz C11b",
    nextLesson: "/script/consonants/sections",
  },
  "c12a": {
    title: "Quiz 12 : Consonants",
    char1: "य",
    char2: "र",
    subQuestion: "What is य?",
    type: "sound",
    options: [
      { text: "ya", correct: true },
      { text: "ra", correct: false },
    ],
    pageNumber: "Quiz C12a",
    nextLesson: "c12b",
  },
  "c12b": {
    title: "Quiz 12 : Consonants",
    char1: "य",
    char2: "र",
    subQuestion: "Which word starts with र?",
    type: "word",
    options: [
      { text: "Yaatra", correct: false },
      { text: "Roti", correct: true },
      { text: "Yaad", correct: false },
      { text: "Raja", correct: true },
    ],
    pageNumber: "Quiz C12b",
    nextLesson: "/script/consonants/sections",
  },
  "c13a": {
    title: "Quiz 13 : Consonants",
    char1: "ल",
    char2: "व",
    subQuestion: "What is ल?",
    type: "sound",
    options: [
      { text: "la", correct: true },
      { text: "va", correct: false },
    ],
    pageNumber: "Quiz C13a",
    nextLesson: "c13b",
  },
  "c13b": {
    title: "Quiz 13 : Consonants",
    char1: "ल",
    char2: "व",
    subQuestion: "Which word starts with व?",
    type: "word",
    options: [
      { text: "Ladka", correct: false },
      { text: "Vriksh", correct: true },
      { text: "Laal", correct: false },
      { text: "Varsha", correct: true },
    ],
    pageNumber: "Quiz C13b",
    nextLesson: "/script/consonants/sections",
  },
  "c14a": {
    title: "Quiz 14 : Consonants",
    char1: "श",
    char2: "ष",
    subQuestion: "What is श?",
    type: "sound",
    options: [
      { text: "sha", correct: true },
      { text: "ṣa", correct: false },
    ],
    pageNumber: "Quiz C14a",
    nextLesson: "c14b",
  },
  "c14b": {
    title: "Quiz 14 : Consonants",
    char1: "श",
    char2: "ष",
    subQuestion: "Which word starts with ष?",
    type: "word",
    options: [
      { text: "Sher", correct: false },
      { text: "Shadyantra", correct: true },
      { text: "Shanti", correct: false },
      { text: "Shatkona", correct: true },
    ],
    pageNumber: "Quiz C14b",
    nextLesson: "/script/consonants/sections",
  },
  "c15a": {
    title: "Quiz 15 : Consonants",
    char1: "स",
    char2: "ह",
    subQuestion: "What is स?",
    type: "sound",
    options: [
      { text: "sa", correct: true },
      { text: "ha", correct: false },
    ],
    pageNumber: "Quiz C15a",
    nextLesson: "c15b",
  },
  "c15b": {
    title: "Quiz 15 : Consonants",
    char1: "स",
    char2: "ह",
    subQuestion: "Which word starts with ह?",
    type: "word",
    options: [
      { text: "Sooraj", correct: false },
      { text: "Haathi", correct: true },
      { text: "Seb", correct: false },
      { text: "Hawa", correct: true },
    ],
    pageNumber: "Quiz C15b",
    nextLesson: "/script/consonants/sections",
  },
  "c16a": {
    title: "Quiz 16 : Consonants",
    char1: "क्ष",
    char2: "त्र",
    subQuestion: "What is क्ष?",
    type: "sound",
    options: [
      { text: "kṣa", correct: true },
      { text: "tra", correct: false },
      { text: "gya", correct: false },
    ],
    pageNumber: "Quiz C16a",
    nextLesson: "c16b",
  },
  "c16b": {
    title: "Quiz 16 : Consonants",
    char1: "त्र",
    char2: "ज्ञ",
    subQuestion: "Which word starts with ज्ञ?",
    type: "word",
    options: [
      { text: "Kshamata", correct: false },
      { text: "Trikon", correct: false },
      { text: "Gyaan", correct: true },
      { text: "Vigyaan", correct: false },
    ],
    pageNumber: "Quiz C16b",
    nextLesson: "/script/consonants/sections",
  },
};

export default function QuizPage() {
  const params = useParams();
  const location = useLocation()[0];
  const [, setLocation] = useLocation();
  const quizId = params.id as string;
  const quiz = quizData[quizId];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const currentQuizIdRef = useRef(quizId);
  
  const isConsonant = location.includes('/consonants/');

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

  const calculateProgress = () => {
    const baseId = quizId.replace(/[ab]$/, '');
    if (isConsonant) {
      const quizNum = parseInt(baseId.replace('c', '')) || 0;
      const lessonNum = quizNum * 2;
      const progress = (lessonNum / 33) * 100;
      return Math.min(Math.max(progress, 0), 100);
    } else {
      const quizNum = parseInt(baseId) || 0;
      const lessonNum = quizNum * 2;
      const progress = (lessonNum / 12) * 100;
      return Math.min(Math.max(progress, 0), 100);
    }
  };

  const progress = calculateProgress();

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
      const storageKey = isConsonant ? 'consonantsQuizzesCompleted' : 'vowelsQuizzesCompleted';
      const sectionsPath = isConsonant ? '/script/consonants/sections' : '/script/vowels/sections';
      
      if (quiz.nextLesson === sectionsPath || quiz.nextLesson === sectionsPath.replace('/sections', '')) {
        const currentQuizzes = parseInt(localStorage.getItem(storageKey) || '0');
        const sectionNumber = parseInt(quizId.replace(/[abc]/, ''));
        if (sectionNumber > currentQuizzes) {
          localStorage.setItem(storageKey, sectionNumber.toString());
        }
      }
      
      // Navigate to next quiz/page
      if (typeof quiz.nextLesson === 'string' && quiz.nextLesson.startsWith('/')) {
        setLocation(quiz.nextLesson);
      } else {
        const basePath = isConsonant ? '/script/lesson/consonants/quiz/' : '/script/lesson/vowels/quiz/';
        setLocation(`${basePath}${quiz.nextLesson}`);
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
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <button onClick={() => setShowFeedback(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <Link href={isConsonant ? "/script/consonants/sections" : "/script/vowels/sections"}>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </Link>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
            <div 
              className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl text-center border border-gray-100 flex-1 flex flex-col overflow-hidden relative animate-slide-in-up">
            <div className="absolute bottom-16 right-8 w-20 h-20 opacity-75 animate-bounce-subtle" style={{ transform: 'rotate(10deg)' }}>
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
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="w-10"></div>
          <Link href={isConsonant ? "/script/consonants/sections" : "/script/vowels/sections"}>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

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
