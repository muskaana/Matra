import React, { useMemo } from "react";
import { Link } from "wouter";
import { XCircle, Lock } from "lucide-react";
import ProgressSummary from '../components/ProgressSummary';
import SmartReviewSlot from '../components/SmartReviewSlot';
import BottomNav from '../components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useUserProgress';

export default function VowelsPage() {
  const { user } = useAuth();
  const { progress } = useProgress();
  
  const totalVowels = 5;
  const totalConsonants = 16;
  const totalMatra = 7;
  const totalSimilar = 5;
  const totalNumbers = 4;
  
  // For authenticated users, use database progress; for guests, use localStorage
  const vowelsCompleted = useMemo(() => {
    if (user && progress) {
      return progress.filter(p => p.category === 'vowels' && p.type === 'lesson' && p.completed).length;
    }
    return parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
  }, [user, progress]);
  
  const consonantsCompleted = useMemo(() => {
    if (user && progress) {
      return progress.filter(p => p.category === 'consonants' && p.type === 'lesson' && p.completed).length;
    }
    return parseInt(localStorage.getItem('consonantsQuizzesCompleted') || '0');
  }, [user, progress]);
  
  const matraCompleted = useMemo(() => {
    if (user && progress) {
      return progress.filter(p => p.category === 'matra' && p.type === 'lesson' && p.completed).length;
    }
    return parseInt(localStorage.getItem('matraQuizzesCompleted') || '0');
  }, [user, progress]);
  
  const similarCompleted = useMemo(() => {
    if (user && progress) {
      return progress.filter(p => p.category === 'similar' && p.type === 'lesson' && p.completed).length;
    }
    return parseInt(localStorage.getItem('similarQuizzesCompleted') || '0');
  }, [user, progress]);
  
  const numbersCompleted = useMemo(() => {
    if (user && progress) {
      return progress.filter(p => p.category === 'numbers' && p.type === 'lesson' && p.completed).length;
    }
    return parseInt(localStorage.getItem('numbersQuizzesCompleted') || '0');
  }, [user, progress]);
  
  const vowelsProgress = Math.round((vowelsCompleted / totalVowels) * 100);
  const consonantsProgress = Math.round((consonantsCompleted / totalConsonants) * 100);
  const matraProgress = Math.round((matraCompleted / totalMatra) * 100);
  const similarProgress = Math.round((similarCompleted / totalSimilar) * 100);
  const numbersProgress = Math.round((numbersCompleted / totalNumbers) * 100);
  
  const isVowelsComplete = vowelsCompleted >= totalVowels;
  const isConsonantsComplete = consonantsCompleted >= totalConsonants;
  const isMatraComplete = matraCompleted >= totalMatra;
  const isSimilarComplete = similarCompleted >= totalSimilar;

  const lessons = [
    { id: 1, title: "Vowels", href: `/script/vowels/sections`, icon: "अ", progress: vowelsProgress, locked: false },
    { id: 2, title: "Consonants", href: `/script/consonants/sections`, icon: "क", progress: consonantsProgress, locked: !isVowelsComplete, lockReason: !isVowelsComplete ? "Complete Vowels" : "" },
    { id: 3, title: "Matra (Vowel Symbols)", href: `/script/matra/sections`, icon: "ा", progress: matraProgress, locked: !isConsonantsComplete, lockReason: !isConsonantsComplete ? "Complete Consonants" : "" },
    { id: 4, title: "Similar Characters", href: `/script/similar/sections`, icon: "स", progress: similarProgress, locked: !isMatraComplete, lockReason: !isMatraComplete ? "Complete Matra" : "" },
    { id: 5, title: "Numbers", href: `/script/numbers/sections`, icon: "१", progress: numbersProgress, locked: !isSimilarComplete, lockReason: !isSimilarComplete ? "Complete Similar Characters" : "" },
  ];

  return (
    <div className="min-h-screen-safe bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6 pb-nav">
        <ProgressSummary />
        <SmartReviewSlot reviewCount={0} />
        
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
                      <span className={`leading-8 font-medium ${lesson.locked ? 'text-gray-500' : 'text-black'} ${lesson.title.split(' ').length >= 2 ? 'text-[22px]' : 'text-[28px]'}`}>
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
        
        {/* Bottom Navigation - Fixed */}
        <BottomNav />
      </div>
    </div>
  );
}
