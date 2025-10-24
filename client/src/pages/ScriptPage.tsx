import React from "react";
import { Link } from "wouter";
import { Book, MessageSquare, FileText } from "lucide-react";

export default function ScriptPage() {
  const levels = [
    { id: 1, title: "The Characters", href: "/script/vowels" },
    { id: 2, title: "Beginner Words" },
    { id: 3, title: "Advanced Words" },
    { id: 4, title: "Sentences" },
    { id: 5, title: "Reading" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-[#ff9930] text-white px-6 py-3.5 rounded-t-xl font-semibold text-lg">
            Hindi (Devanagari) Script
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-lg flex-1 border-x border-b border-gray-200">
            <div className="space-y-[22px]">
              {levels.map((level, index) => (
                <Link key={level.id} href={level.href || "#"}>
                  <div className="flex items-center gap-5 cursor-pointer">
                    <div className="w-[68px] h-[68px] bg-[#F7941D] rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 border-[3px] border-white shadow-md">
                      {index + 1}
                    </div>
                    <span className="text-[20px] leading-6 font-medium text-black">
                      {level.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-around items-center bg-[#ff9930] hover:bg-[#CF7B24] transition-colors rounded-xl mt-6 py-3 shadow-lg">
          <Link href="/reading">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 transition-opacity">
              <Book className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Read</span>
            </button>
          </Link>
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-2">
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Script</span>
            </button>
          </Link>
          <Link href="/conversation">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 transition-opacity">
              <MessageSquare className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Talk</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
