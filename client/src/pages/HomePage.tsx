import React from "react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-6 pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Matra</h1>
        
        <div className="space-y-3 flex-1">
          <Link href="/reading">
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-[#ff9930]">
              <h2 className="text-lg font-semibold text-black mb-0.5">Reading Practice</h2>
              <p className="text-sm text-gray-500">Practice reading Hindi texts</p>
            </div>
          </Link>
          
          <Link href="/conversation">
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-[#ff9930]">
              <h2 className="text-lg font-semibold text-black mb-0.5">Conversation Skills</h2>
              <p className="text-sm text-gray-500">Learn casual conversation topics</p>
            </div>
          </Link>
          
          <Link href="/script">
            <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-[#ff9930]">
              <h2 className="text-lg font-semibold text-black mb-0.5">Script Levels</h2>
              <p className="text-sm text-gray-500">Master Devanagari script</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
