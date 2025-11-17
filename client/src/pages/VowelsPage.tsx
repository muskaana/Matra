import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, MessageSquare, FileText, XCircle, Lock } from "lucide-react";

export default function VowelsPage() {
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
  
  const vowelsProgress = Math.round((vowelsCompleted / totalVowels) * 100);
  const consonantsProgress = Math.round((consonantsCompleted / totalConsonants) * 100);
  const matraProgress = Math.round((matraCompleted / totalMatra) * 100);
  
  const isVowelsComplete = vowelsCompleted >= totalVowels;
  const isConsonantsComplete = consonantsCompleted >= totalConsonants;
  const isMatraComplete = matraCompleted >= totalMatra;
  const allCharactersComplete = isVowelsComplete && isConsonantsComplete && isMatraComplete;
  
  const [similarCompleted, setSimilarCompleted] = useState<number>(0);
  const [numbersCompleted, setNumbersCompleted] = useState<number>(0);
  const totalSimilar = 5;
  const totalNumbers = 4;
  const similarProgress = Math.round((similarCompleted / totalSimilar) * 100);
  const numbersProgress = Math.round((numbersCompleted / totalNumbers) * 100);
  
  useEffect(() => {
    const similar = localStorage.getItem('similarQuizzesCompleted');
    const numbers = localStorage.getItem('numbersQuizzesCompleted');
    if (similar) setSimilarCompleted(parseInt(similar));
    if (numbers) setNumbersCompleted(parseInt(numbers));
  }, []);

  const lessons = [
    { id: 1, title: "Vowels", href: `/script/vowels/sections`, icon: "अ", progress: vowelsProgress, locked: false },
    { id: 2, title: "Consonants", href: `/script/consonants/sections`, icon: "क", progress: consonantsProgress, locked: !isVowelsComplete, lockReason: !isVowelsComplete ? "Complete Vowels" : "" },
    { id: 3, title: "Matra (Vowel Symbols)", href: `/script/matra/sections`, icon: "ा", progress: matraProgress, locked: !isConsonantsComplete, lockReason: !isConsonantsComplete ? "Complete Consonants" : "" },
    { id: 4, title: "Similar Characters", href: `/script/similar/sections`, icon: "स", progress: similarProgress, locked: false },
    { id: 5, title: "Numbers", href: `/script/numbers/sections`, icon: "१", progress: numbersProgress, locked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg flex items-center justify-between shadow-lg">
            <span>Level 1: The Characters</span>
            <Link href="/script">
              <XCircle className="w-5 h-5 hover:bg-white/20 rounded-full transition-colors" />
            </Link>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200 flex flex-col justify-around">
            <div className="flex flex-col justify-around flex-1">
              {lessons.map((lesson) => {
                const content = (
                  <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors ${lesson.locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`} data-testid={`button-${lesson.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="relative flex-shrink-0">
                      {lesson.progress !== undefined && !lesson.locked && (
                        <svg className="absolute -inset-[3px] w-[86px] h-[86px] -rotate-90">
                          <circle
                            cx="43"
                            cy="43"
                            r="40"
                            fill="none"
                            stroke="#FFE5CC"
                            strokeWidth="2"
                            strokeDasharray="1 6"
                          />
                          <circle
                            cx="43"
                            cy="43"
                            r="40"
                            fill="none"
                            stroke="#ff9930"
                            strokeWidth="2"
                            strokeDasharray={`${lesson.progress * 2.51} ${251 - lesson.progress * 2.51}`}
                          />
                        </svg>
                      )}
                      <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-[34px] border-[3px] border-white shadow-md transition-colors ${lesson.locked ? 'bg-gray-400' : 'bg-[#ff9930] hover:bg-[#CF7B24]'}`}>
                        {lesson.icon}
                      </div>
                      {lesson.locked && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Lock className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`leading-10 font-medium ${lesson.locked ? 'text-gray-500' : 'text-black'} ${lesson.title.split(' ').length >= 2 ? 'text-[28px]' : 'text-[36px]'}`}>
                        {lesson.title}
                      </span>
                      {lesson.locked && lesson.lockReason && (
                        <p className="text-sm text-gray-400 mt-1">{lesson.lockReason}</p>
                      )}
                    </div>
                  </div>
                );
                
                return lesson.locked ? (
                  <div key={lesson.id}>{content}</div>
                ) : (
                  <Link key={lesson.id} href={lesson.href || "#"}>{content}</Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center bg-gradient-to-r from-[#ff9930] to-[#ff7730] rounded-xl mt-6 py-3 shadow-xl border-2 border-white">
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
