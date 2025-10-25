import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, MessageSquare, FileText, XCircle } from "lucide-react";

export default function VowelsPage() {
  const [completedQuizzes, setCompletedQuizzes] = useState<number>(0);
  const totalQuizzes = 5;
  
  useEffect(() => {
    const saved = localStorage.getItem('vowelsQuizzesCompleted');
    if (saved) {
      setCompletedQuizzes(parseInt(saved));
    }
  }, []);
  
  const progress = Math.round((completedQuizzes / totalQuizzes) * 100);
  
  const getNextLesson = () => {
    if (completedQuizzes === 0) return 1;
    if (completedQuizzes === 1) return 3;
    if (completedQuizzes === 2) return 5;
    if (completedQuizzes === 3) return 7;
    if (completedQuizzes === 4) return 10;
    return 1;
  };
  
  const lessons = [
    { id: 1, title: "Vowels", href: `/script/vowels/sections`, icon: "अ", progress: progress },
    { id: 2, title: "Consonants", icon: "क" },
    { id: 3, title: "Matra (Vowel Symbols)", icon: "ा" },
    { id: 4, title: "स, श, घ?", icon: "स" },
    { id: 5, title: "Numbers", icon: "१" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-[#ff9930] text-white px-6 py-3.5 rounded-t-xl font-semibold text-lg flex items-center justify-between">
            <span>Level 1: The Characters</span>
            <Link href="/script">
              <XCircle className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-lg flex-1 border-x border-b border-gray-200">
            <div className="space-y-[22px]">
              {lessons.map((lesson) => (
                <Link key={lesson.id} href={lesson.href || "#"}>
                  <div className="flex items-center gap-5 cursor-pointer">
                    <div className="relative flex-shrink-0">
                      {lesson.progress !== undefined && (
                        <svg className="absolute -inset-[3px] w-[74px] h-[74px] -rotate-90">
                          <circle
                            cx="37"
                            cy="37"
                            r="35"
                            fill="none"
                            stroke="#FFE5CC"
                            strokeWidth="2"
                            strokeDasharray="1 6"
                          />
                          <circle
                            cx="37"
                            cy="37"
                            r="35"
                            fill="none"
                            stroke="#ff9930"
                            strokeWidth="2"
                            strokeDasharray={`${lesson.progress * 2.2} ${220 - lesson.progress * 2.2}`}
                          />
                        </svg>
                      )}
                      <div className="w-[68px] h-[68px] bg-[#ff9930] rounded-full flex items-center justify-center text-white font-bold text-[30px] border-[3px] border-white shadow-md">
                        {lesson.icon}
                      </div>
                    </div>
                    <span className="text-[20px] leading-6 font-medium text-black">
                      {lesson.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-[#ff9930] rounded-xl mt-6 py-3 shadow-lg">
          <Link href="/reading">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 hover:bg-[#CF7B24] rounded-lg transition-all">
              <Book className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Read</span>
            </button>
          </Link>
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-2 hover:bg-[#CF7B24] rounded-lg transition-all">
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Script</span>
            </button>
          </Link>
          <Link href="/conversation">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 hover:bg-[#CF7B24] rounded-lg transition-all">
              <MessageSquare className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Talk</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
