import React from "react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Matra</h1>
        
        <div className="space-y-4 flex-1">
          <Link href="/reading">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-[#ff9930]">
              <h2 className="text-lg font-semibold text-black mb-1">Reading Practice</h2>
              <p className="text-sm text-gray-500">Practice reading Hindi texts</p>
            </div>
          </Link>
          
          <Link href="/conversation">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-[#ff9930]">
              <h2 className="text-lg font-semibold text-black mb-1">Conversation Skills</h2>
              <p className="text-sm text-gray-500">Learn casual conversation topics</p>
            </div>
          </Link>
          
          <Link href="/script">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-[#ff9930]">
              <h2 className="text-lg font-semibold text-black mb-1">Script Levels</h2>
              <p className="text-sm text-gray-500">Master Devanagari script</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
