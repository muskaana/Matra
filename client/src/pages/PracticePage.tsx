import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { Book, MessageSquare, FileText } from "lucide-react";

const practiceData: Record<string, any> = {
  "1": {
    title: "Practice: अ vs आ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "अ", sound: "uh" },
      { character: "आ", sound: "aa" },
    ],
    nextLesson: "quiz/1",
    pageNumber: "Practice 1",
  },
  "2": {
    title: "Practice: इ vs ई",
    question: "Match the sound to the letter",
    pairs: [
      { character: "इ", sound: "ee" },
      { character: "ई", sound: "eee" },
    ],
    nextLesson: "quiz/2",
    pageNumber: "Practice 2",
  },
  "3": {
    title: "Practice: उ vs ऊ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "उ", sound: "oo" },
      { character: "ऊ", sound: "ooo" },
    ],
    nextLesson: "quiz/3",
    pageNumber: "Practice 3",
  },
  "4": {
    title: "Practice: ए vs ऐ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ए", sound: "ay" },
      { character: "ऐ", sound: "ah-ay" },
    ],
    nextLesson: "quiz/4",
    pageNumber: "Practice 4",
  },
  "5": {
    title: "Practice: ओ vs औ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ओ", sound: "oh" },
      { character: "औ", sound: "ah-oh" },
    ],
    nextLesson: "quiz/5",
    pageNumber: "Practice 5",
  },
};

export default function PracticePage() {
  const params = useParams();
  const practiceId = params.id as string;
  const practice = practiceData[practiceId];
  const [completed, setCompleted] = useState(false);

  if (!practice) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Practice not found</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm mx-auto pt-4">
        <div className="text-center mb-3">
          <p className="text-xs text-gray-400 mb-0.5">1.1 {practice.pageNumber}</p>
          <h2 className="text-sm font-medium text-gray-500">{practice.title}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-base text-gray-700 mb-6">{practice.question}</p>

          <div className="space-y-3 mb-6">
            {practice.pairs.map((pair: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-4">
                <div className="text-4xl font-bold text-black">{pair.character}</div>
                <div className="text-base text-gray-600 italic">"{pair.sound}"</div>
              </div>
            ))}
          </div>

          {!completed && (
            <button
              onClick={() => setCompleted(true)}
              className="px-8 py-2.5 bg-[#ff9930] text-white rounded-md hover:bg-[#ff8800] transition-colors font-medium text-sm"
            >
              I understand
            </button>
          )}

          {completed && (
            <Link href={`/script/lesson/vowels/${practice.nextLesson}`}>
              <button className="px-8 py-2.5 bg-[#ff9930] text-white rounded-md hover:bg-[#ff8800] transition-colors font-medium text-sm">
                Continue to Quiz
              </button>
            </Link>
          )}
        </div>

        <div className="flex justify-around items-center bg-[#ff9930] rounded-md mt-4 py-2">
          <Link href="/reading">
            <button className="flex flex-col items-center text-white p-1.5 opacity-70">
              <Book className="w-5 h-5 mb-0.5" />
              <span className="text-xs">Read</span>
            </button>
          </Link>
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-1.5">
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-semibold">Script</span>
            </button>
          </Link>
          <Link href="/conversation">
            <button className="flex flex-col items-center text-white p-1.5 opacity-70">
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span className="text-xs">Talk</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
