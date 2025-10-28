import React, { useState } from "react";
import { Link, useParams } from "wouter";
import { X, ChevronLeft } from "lucide-react";
import tigerHappy from '@assets/generated_images/Bright_orange_tiger_mascot_transparent_d56bba83.png';

const practiceData: Record<string, any> = {
  "1": {
    title: "Practice: अ vs आ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "अ", sound: "uh" },
      { character: "आ", sound: "aa" },
    ],
    nextLesson: "quiz/1a",
    pageNumber: "Practice 1",
  },
  "2": {
    title: "Practice: इ vs ई",
    question: "Match the sound to the letter",
    pairs: [
      { character: "इ", sound: "ee" },
      { character: "ई", sound: "eee" },
    ],
    nextLesson: "quiz/2a",
    pageNumber: "Practice 2",
  },
  "3": {
    title: "Practice: उ vs ऊ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "उ", sound: "oo" },
      { character: "ऊ", sound: "ooo" },
    ],
    nextLesson: "quiz/3a",
    pageNumber: "Practice 3",
  },
  "4": {
    title: "Practice: ऋ, ए, ऐ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ऋ", sound: "ree" },
      { character: "ए", sound: "ay" },
      { character: "ऐ", sound: "aa-ay" },
    ],
    nextLesson: "quiz/4a",
    pageNumber: "Practice 4",
  },
  "5": {
    title: "Practice: ओ vs औ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ओ", sound: "oh" },
      { character: "औ", sound: "aa-oh" },
    ],
    nextLesson: "quiz/5a",
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
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <Link href="/script/vowels/sections">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <Link href="/script/vowels/sections">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-5 text-center border border-gray-200 flex flex-col overflow-y-auto relative animate-slide-in-up">
          <div className="absolute bottom-24 left-6 w-16 h-16 opacity-45 animate-bounce-subtle" style={{ transform: 'rotate(8deg)' }}>
            <img src={tigerHappy} alt="Happy tiger" className="w-full h-full object-contain" />
          </div>
          
          <p className="text-base text-gray-700 mb-6">{practice.question}</p>

          <div className="space-y-3 mb-6">
            {practice.pairs.map((pair: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-4">
                <div className="text-4xl font-bold text-black">{pair.character}</div>
                <div className="text-base text-gray-600 italic">"{pair.sound}"</div>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            {!completed && (
              <button
                onClick={() => setCompleted(true)}
                className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg btn-bounce"
              >
                I understand
              </button>
            )}

            {completed && (
              <Link href={`/script/lesson/vowels/${practice.nextLesson}`}>
                <button className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg btn-bounce">
                  Continue to Quiz
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
