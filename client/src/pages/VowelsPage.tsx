import React from "react";
import { Link } from "wouter";
import { Book, MessageSquare, FileText, XCircle } from "lucide-react";

export default function VowelsPage() {
  const lessons = [
    { id: 1, title: "Vowels", href: "/script/lesson/vowels/1", icon: "अ", progress: 30 },
    { id: 2, title: "Consonants", icon: "क" },
    { id: 3, title: "Matra (Vowel Symbols)", icon: "्ा" },
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
          
          <div className="bg-white px-8 py-6 rounded-b-xl shadow-lg flex-1 border-x border-b border-gray-200">
            <div className="space-y-6">
              {lessons.map((lesson) => (
                <Link key={lesson.id} href={lesson.href || "#"}>
                  <div className="flex items-center gap-5 cursor-pointer group">
                    <div className="relative flex-shrink-0">
                      {lesson.progress !== undefined && (
                        <svg className="absolute inset-0 w-[70px] h-[70px] -rotate-90">
                          <circle
                            cx="35"
                            cy="35"
                            r="32"
                            fill="none"
                            stroke="#FFE5CC"
                            strokeWidth="3"
                          />
                          <circle
                            cx="35"
                            cy="35"
                            r="32"
                            fill="none"
                            stroke="#ff9930"
                            strokeWidth="3"
                            strokeDasharray={`${lesson.progress * 2.01} ${200 - lesson.progress * 2.01}`}
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      <div className="w-[70px] h-[70px] bg-[#ff9930] rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:bg-[#ff8800] transition-colors shadow-lg">
                        {lesson.icon}
                      </div>
                    </div>
                    <span className="text-xl font-normal text-black group-hover:text-[#ff9930] transition-colors">
                      {lesson.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-[#ff9930] rounded-lg mt-4 py-2.5 shadow-md">
          <Link href="/reading">
            <button className="flex flex-col items-center text-white p-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <Book className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Read</span>
            </button>
          </Link>
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-1.5">
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-bold">Script</span>
            </button>
          </Link>
          <Link href="/conversation">
            <button className="flex flex-col items-center text-white p-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Talk</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
