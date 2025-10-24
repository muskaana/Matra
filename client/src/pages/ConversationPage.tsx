import React from "react";
import { Book, MessageSquare, FileText } from "lucide-react";
import { Link } from "wouter";

export default function ConversationPage() {
  const topics = [
    { id: 1, title: "Greetings" },
    { id: 2, title: "Jokes" },
    { id: 3, title: "Slang" },
    { id: 4, title: "Memes/References" },
    { id: 5, title: "Location" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-5">
        <div className="flex-1 flex flex-col">
          <div className="bg-[#ff9930] text-white px-5 py-3 rounded-t-lg font-semibold text-lg">
            Casual Conversation Skills
          </div>
          
          <div className="bg-white p-5 rounded-b-lg shadow-md flex-1 border-x border-b border-gray-200">
            <div className="space-y-2.5">
              {topics.map((topic, index) => (
                <button
                  key={topic.id}
                  className="w-full flex items-center gap-3 p-2.5 bg-white border-2 border-gray-200 rounded-full hover:border-[#ff9930] transition-colors shadow-sm"
                >
                  <div className="w-11 h-11 bg-[#ff9930] rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm">
                    {index + 1}
                  </div>
                  <span className="text-left font-medium text-black text-base">{topic.title}</span>
                </button>
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
            <button className="flex flex-col items-center text-white p-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <FileText className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-medium">Script</span>
            </button>
          </Link>
          <Link href="/conversation">
            <button className="flex flex-col items-center text-white p-1.5">
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span className="text-xs font-bold">Talk</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
