import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, MessageSquare, FileText, Lock } from "lucide-react";

export default function ScriptPage() {
  const [vowelsCompleted, setVowelsCompleted] = useState<number>(0);
  const [consonantsCompleted, setConsonantsCompleted] = useState<number>(0);
  const [matraCompleted, setMatraCompleted] = useState<number>(0);
  const totalVowels = 5;
  const totalConsonants = 16;
  const totalMatra = 7;
  
  useEffect(() => {
    const vowels = localStorage.getItem('vowelsQuizzesCompleted');
    const consonants = localStorage.getItem('consonantsQuizzesCompleted');
    const matra = localStorage.getItem('matraQuizzesCompleted');
    
    if (vowels) setVowelsCompleted(parseInt(vowels));
    if (consonants) setConsonantsCompleted(parseInt(consonants));
    if (matra) setMatraCompleted(parseInt(matra));
  }, []);
  
  const isVowelsComplete = vowelsCompleted >= totalVowels;
  const isConsonantsComplete = consonantsCompleted >= totalConsonants;
  const isMatraComplete = matraCompleted >= totalMatra;
  const allCharactersComplete = isVowelsComplete && isConsonantsComplete && isMatraComplete;
  
  const levels = [
    { id: 1, title: "The Characters", href: "/script/vowels", locked: false },
    { id: 2, title: "Beginner Words", locked: !allCharactersComplete, lockReason: !allCharactersComplete ? "Complete The Characters" : "" },
    { id: 3, title: "Advanced Words", locked: true, lockReason: "In development" },
    { id: 4, title: "Sentences", locked: true, lockReason: "In development" },
    { id: 5, title: "Reading", href: "/reading", locked: !allCharactersComplete, lockReason: !allCharactersComplete ? "Complete The Characters" : "" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-[#ff9930] text-white px-6 py-3.5 rounded-t-xl font-semibold text-lg">
            Hindi (Devanagari) Script
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-lg flex-1 border-x border-b border-gray-200 flex flex-col justify-around">
            <div className="flex flex-col justify-around flex-1">
              {levels.map((level, index) => {
                const content = (
                  <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors ${level.locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`} data-testid={`button-level-${level.id}`}>
                    <div className="relative flex-shrink-0">
                      <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-3xl border-[3px] border-white shadow-md transition-colors ${level.locked ? 'bg-gray-400' : 'bg-[#ff9930] hover:bg-[#CF7B24]'}`}>
                        {index + 1}
                      </div>
                      {level.locked && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Lock className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`leading-10 font-medium ${level.locked ? 'text-gray-500' : 'text-black'} ${level.title.split(' ').length >= 2 ? 'text-[28px]' : 'text-[36px]'}`}>
                        {level.title}
                      </span>
                      {level.locked && level.lockReason && (
                        <p className="text-sm text-gray-400 mt-1">{level.lockReason}</p>
                      )}
                    </div>
                  </div>
                );
                
                return level.locked ? (
                  <div key={level.id}>{content}</div>
                ) : (
                  <Link key={level.id} href={level.href || "#"}>{content}</Link>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="flex justify-around items-center bg-[#ff9930] rounded-xl mt-6 py-3 shadow-lg">
          {allCharactersComplete ? (
            <Link href="/reading">
              <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 hover:bg-[#CF7B24] rounded-lg transition-all" data-testid="button-read">
                <Book className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Read</span>
              </button>
            </Link>
          ) : (
            <button className="flex flex-col items-center text-white p-2 opacity-30 cursor-not-allowed rounded-lg" data-testid="button-read-locked" title="Complete all character lessons first">
              <Lock className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Read</span>
            </button>
          )}
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-2 hover:bg-[#CF7B24] rounded-lg transition-all" data-testid="button-script">
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-sm font-bold">Script</span>
            </button>
          </Link>
          {allCharactersComplete ? (
            <Link href="/conversation">
              <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 hover:bg-[#CF7B24] rounded-lg transition-all" data-testid="button-talk">
                <MessageSquare className="w-6 h-6 mb-1" />
                <span className="text-sm font-medium">Talk</span>
              </button>
            </Link>
          ) : (
            <button className="flex flex-col items-center text-white p-2 opacity-30 cursor-not-allowed rounded-lg" data-testid="button-talk-locked" title="Complete all character lessons first">
              <Lock className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Talk</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
