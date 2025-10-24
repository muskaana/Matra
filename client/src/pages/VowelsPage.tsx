import React from "react";
import { Link } from "wouter";
import { Book, MessageSquare, FileText } from "lucide-react";

export default function VowelsPage() {
  const lessons = [
    { id: 1, title: "Vowels", href: "/script/lesson/vowels/1" },
    { id: 2, title: "Consonants" },
    { id: 3, title: "Matra (Vowel Symbols)" },
    { id: 4, title: "म, त, थ" },
    { id: 5, title: "Numbers" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-5">
        <div className="space-y-2.5 mb-4 flex-1">
          {lessons.map((lesson, index) => (
            <Link key={lesson.id} href={lesson.href || "#"}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow border border-gray-200">
                <div className="w-11 h-11 bg-[#ff9930] rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
                  {index + 1}
                </div>
                <span className="font-medium text-black text-base">{lesson.title}</span>
              </div>
            </Link>
          ))}
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
