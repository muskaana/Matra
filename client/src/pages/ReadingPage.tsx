import React from "react";
import { Book, MessageSquare, FileText } from "lucide-react";
import { Link } from "wouter";

export default function ReadingPage() {
  const readings = [
    { id: 1, title: "Title" },
    { id: 2, title: "Title" },
    { id: 3, title: "Title" },
    { id: 4, title: "Title" },
    { id: 5, title: "Title" },
    { id: 6, title: "Title" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-4 pt-6">
        <h1 className="text-lg font-light text-gray-400 mb-6 text-center">Reading Home Page</h1>
        
        <div className="flex-1 flex flex-col">
          <div className="bg-[#ff9930] text-white px-4 py-3 rounded-t-lg font-medium">
            Reading Practice
          </div>
          
          <div className="bg-white p-6 rounded-b-lg shadow-md flex-1">
            <div className="grid grid-cols-2 gap-4">
              {readings.map((reading) => (
                <div key={reading.id} className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-[#ff9930] rounded-lg shadow-md"></div>
                  <span className="text-sm font-medium text-black">{reading.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-around items-center bg-[#ff9930] rounded-lg mt-4 py-3 shadow-md">
          <Link href="/reading">
            <button className="flex flex-col items-center text-white p-2">
              <Book className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Read</span>
            </button>
          </Link>
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 transition-opacity">
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">Script</span>
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
