import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { X, ChevronLeft } from "lucide-react";

const quizData: Record<string, any> = {
  "1": {
    title: "Quiz 1 : Vowels",
    question: "अ vs आ",
    subQuestion: "What is अ ?",
    options: [
      { text: "uh", correct: true },
      { text: "aa", correct: false },
    ],
    pageNumber: "Quiz 1",
    nextLesson: "3",
  },
  "2": {
    title: "Quiz 1 : Vowels",
    question: "इ vs ई",
    subQuestion: "What is ई ?",
    options: [
      { text: "ee", correct: false },
      { text: "eee", correct: true },
    ],
    pageNumber: "Quiz 2",
    nextLesson: "5",
  },
  "3": {
    title: "Quiz 1 : Vowels",
    question: "उ vs ऊ",
    subQuestion: "What is उ ?",
    options: [
      { text: "oo", correct: true },
      { text: "ooo", correct: false },
    ],
    pageNumber: "Quiz 3",
    nextLesson: "7",
  },
  "4": {
    title: "Quiz 1 : Vowels",
    question: "ए vs ऐ",
    subQuestion: "What is ऐ ?",
    options: [
      { text: "ay", correct: false },
      { text: "aa-ay", correct: true },
    ],
    pageNumber: "Quiz 4",
    nextLesson: "6",
  },
  "5": {
    title: "Quiz 1 : Vowels",
    question: "ओ vs औ",
    subQuestion: "What is औ ?",
    options: [
      { text: "oh", correct: false },
      { text: "aa-oh", correct: true },
    ],
    pageNumber: "Quiz 5",
    nextLesson: "8",
  },
  "6": {
    title: "Quiz 1 : Vowels",
    question: "अ vs आ",
    subQuestion: "Which word starts with आ?",
    type: "word-identification",
    options: [
      { text: "Aam", correct: true },
      { text: "Anar", correct: true },
      { text: "Imli", correct: false },
      { text: "Amma", correct: true },
    ],
    pageNumber: "Quiz 6",
    nextLesson: "9",
  },
  "7": {
    title: "Quiz 1 : Vowels",
    question: "उ vs ऊ",
    subQuestion: "Which word starts with ऊ?",
    type: "word-identification",
    options: [
      { text: "Ullu", correct: true },
      { text: "Unt", correct: false },
      { text: "Upar", correct: false },
      { text: "Oon", correct: true },
    ],
    pageNumber: "Quiz 7",
    nextLesson: "10",
  },
  "8": {
    title: "Quiz 1 : Vowels",
    question: "ओ vs औ",
    subQuestion: "Which word starts with औ?",
    type: "word-identification",
    options: [
      { text: "Aurat", correct: true },
      { text: "Om", correct: false },
      { text: "Aur", correct: true },
      { text: "Okhli", correct: false },
    ],
    pageNumber: "Quiz 8",
    nextLesson: "11",
  },
  "9": {
    title: "Quiz 1 : Vowels",
    question: "इ vs ई",
    subQuestion: "Which word starts with ई?",
    type: "word-identification",
    options: [
      { text: "Imli", correct: false },
      { text: "Eent", correct: true },
      { text: "Idli", correct: false },
      { text: "ईख", correct: true },
    ],
    pageNumber: "Quiz 9",
    nextLesson: "11",
  },
  "10": {
    title: "Quiz 1 : Vowels",
    question: "ए vs ऐ",
    subQuestion: "Which word starts with ऐ?",
    type: "word-identification",
    options: [
      { text: "Ek", correct: false },
      { text: "Ainák", correct: true },
      { text: "Aisa", correct: true },
      { text: "Elephant", correct: false },
    ],
    pageNumber: "Quiz 10",
    nextLesson: "/script/vowels",
  },
};

export default function QuizPage() {
  const params = useParams();
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

  const isCorrect = selectedAnswer !== null && quiz.options[selectedAnswer].correct;

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-white p-5">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setShowFeedback(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <Link href="/script/vowels">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-200">
            <div className="mb-6">
              <div className="text-2xl font-bold text-black mb-3">{quiz.question}</div>
              <p className="text-gray-600 text-sm mb-4">{quiz.subQuestion}</p>
            </div>

            <div className={`text-2xl font-bold mb-6 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
              {isCorrect ? "CORRECT" : "INCORRECT"}
            </div>

            {!isCorrect && (
              <p className="text-xs text-gray-500 mb-6">Try again to learn the difference!</p>
            )}

            <Link href={typeof quiz.nextLesson === 'string' && quiz.nextLesson.startsWith('/') ? quiz.nextLesson : `/script/lesson/vowels/${quiz.nextLesson}`}>
              <button className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10"></div>
          <Link href="/script/vowels">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-200">
          <div className="mb-6">
            <div className="text-3xl font-bold text-black mb-3">{quiz.question}</div>
            <p className="text-gray-600 mb-6 text-sm">{quiz.subQuestion}</p>
          </div>

          {quiz.type === "word-identification" ? (
            <div className="grid grid-cols-2 gap-3">
              {quiz.options.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="px-6 py-3 bg-[#ff9930] text-white rounded-md hover:bg-[#ff8800] transition-colors font-medium text-base shadow-md"
                >
                  {option.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              {quiz.options.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="px-8 py-3 bg-[#ff9930] text-white rounded-md hover:bg-[#ff8800] transition-colors font-medium text-base"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
