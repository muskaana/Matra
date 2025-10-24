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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-4 pt-6">
        <h1 className="text-lg font-light text-gray-400 mb-6 text-center">Script Levels Home Page</h1>
        
        <div className="flex-1 flex flex-col">
          <div className="bg-[#ff9930] text-white px-4 py-3 rounded-t-lg font-medium">
            Hindi (Devanagari) Script
          </div>
          
          <div className="bg-white p-6 rounded-b-lg shadow-md flex-1">
            <div className="space-y-4">
              {levels.map((level, index) => (
                <Link key={level.id} href={level.href || "#"}>
                  <div className="flex items-center gap-4 cursor-pointer group p-1">
                    <div className="w-16 h-16 bg-[#ff9930] rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:bg-[#ff8800] transition-colors flex-shrink-0 shadow-md">
                      {index + 1}
                    </div>
                    <span className="text-lg font-medium text-black group-hover:text-[#ff9930] transition-colors">
                      {level.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-around items-center bg-[#ff9930] rounded-lg mt-4 py-3 shadow-md">
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
