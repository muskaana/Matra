import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Lock, Brain, CheckCircle2, Flame, Star } from "lucide-react";
import { getItemsDueForReview } from '../utils/smartReview';
import { getProgress } from '../lib/progress';
import BottomNav from '../components/BottomNav';

export default function ScriptPage() {
  const [vowelsCompleted, setVowelsCompleted] = useState<number>(0);
  const [consonantsCompleted, setConsonantsCompleted] = useState<number>(0);
  const [matraCompleted, setMatraCompleted] = useState<number>(0);
  const [similarCompleted, setSimilarCompleted] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [beginnerWordsCompleted, setBeginnerWordsCompleted] = useState<number>(0);
  const [advancedWordsCompleted, setAdvancedWordsCompleted] = useState<number>(0);
  const [sentencesCompleted, setSentencesCompleted] = useState<number>(0);
  const [readingIntroComplete, setReadingIntroComplete] = useState(false);
  const [totalXP, setTotalXP] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const totalVowels = 5;
  const totalConsonants = 16;
  const totalMatra = 7;
  const totalSimilar = 5;
  const totalBeginnerPacks = 4; // 1 intro + 3 packs
  const totalAdvancedPacks = 3;
  const totalSentenceSections = 3;
  
  useEffect(() => {
    const vowels = localStorage.getItem('vowelsQuizzesCompleted');
    const consonants = localStorage.getItem('consonantsQuizzesCompleted');
    const matra = localStorage.getItem('matraQuizzesCompleted');
    const similar = localStorage.getItem('similarQuizzesCompleted');
    const beginnerWords = localStorage.getItem('beginnerWordsCompleted');
    const advancedWords = localStorage.getItem('advancedWordsCompleted');
    const sentences = localStorage.getItem('sentencesCompleted');
    const readingIntro = localStorage.getItem('readingInstructionsViewed');
    
    if (vowels) setVowelsCompleted(parseInt(vowels));
    if (consonants) setConsonantsCompleted(parseInt(consonants));
    if (matra) setMatraCompleted(parseInt(matra));
    if (similar) setSimilarCompleted(parseInt(similar));
    
    let beginnerCount = 0;
    if (readingIntro === 'true') {
      setReadingIntroComplete(true);
      beginnerCount = 1; // Count the intro lesson
    }
    if (beginnerWords) {
      const packsCompleted = JSON.parse(beginnerWords);
      beginnerCount += packsCompleted.length;
    }
    setBeginnerWordsCompleted(beginnerCount);
    
    if (advancedWords) {
      const packsCompleted = JSON.parse(advancedWords);
      setAdvancedWordsCompleted(packsCompleted.length);
    }
    if (sentences) {
      const sectionsCompleted = JSON.parse(sentences);
      setSentencesCompleted(sectionsCompleted.length);
    }
    
    // Load review count
    const dueItems = getItemsDueForReview();
    setReviewCount(dueItems.length);
    
    // Load XP and streak
    const progress = getProgress();
    setTotalXP(progress.totalXP);
    setCurrentStreak(progress.currentStreak);
  }, []);
  
  const isVowelsComplete = vowelsCompleted >= totalVowels;
  const isConsonantsComplete = consonantsCompleted >= totalConsonants;
  const isMatraComplete = matraCompleted >= totalMatra;
  const isSimilarComplete = similarCompleted >= totalSimilar;
  const allCharactersComplete = isVowelsComplete && isConsonantsComplete && isMatraComplete && isSimilarComplete;
  const isBeginnerWordsComplete = beginnerWordsCompleted >= totalBeginnerPacks;
  const isAdvancedWordsComplete = advancedWordsCompleted >= totalAdvancedPacks;
  const isSentencesComplete = sentencesCompleted >= totalSentenceSections;
  
  const levels = [
    { id: 1, title: "The Characters", href: "/script/vowels", locked: false, progress: `${vowelsCompleted + consonantsCompleted + matraCompleted + similarCompleted}/${totalVowels + totalConsonants + totalMatra + totalSimilar}`, completed: allCharactersComplete },
    { id: 2, title: "Beginner Words", href: "/words/beginner", locked: !allCharactersComplete, lockReason: !allCharactersComplete ? "Complete The Characters" : "", progress: `${beginnerWordsCompleted}/${totalBeginnerPacks}`, completed: isBeginnerWordsComplete },
    { id: 3, title: "Advanced Words", href: "/words/advanced", locked: !isBeginnerWordsComplete, lockReason: !isBeginnerWordsComplete ? "Complete Beginner Words" : "", progress: `${advancedWordsCompleted}/${totalAdvancedPacks}`, completed: isAdvancedWordsComplete },
    { id: 4, title: "Sentences", href: "/sentences", locked: !isAdvancedWordsComplete, lockReason: !isAdvancedWordsComplete ? "Complete Advanced Words" : "", progress: `${sentencesCompleted}/${totalSentenceSections}`, completed: isSentencesComplete },
    { id: 5, title: "Reading", href: "/reading", locked: !isSentencesComplete, lockReason: !isSentencesComplete ? "Complete Sentences" : "" },
  ];
  
  const showReview = reviewCount > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        {/* XP and Streak Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-white rounded-xl px-3 py-2 shadow-md border border-gray-200 flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-[#ff9930]" />
            <p className="text-base font-bold text-black">{totalXP}XP</p>
          </div>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 shadow-md border border-gray-200 flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <p className="text-base font-bold text-black">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg shadow-lg">
            Hindi (Devanagari) Script
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200 flex flex-col justify-around">
            <div className="flex flex-col justify-around flex-1">
              {levels.map((level, index) => {
                const content = (
                  <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors ${level.locked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`} data-testid={`button-level-${level.id}`}>
                    <div className="relative flex-shrink-0">
                      <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-3xl border-[3px] border-white shadow-md transition-colors ${level.locked ? 'bg-gray-400' : level.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-[#ff9930] hover:bg-[#CF7B24]'}`}>
                        {index + 1}
                      </div>
                      {level.locked && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Lock className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      {level.completed && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
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
                      {!level.locked && level.progress && (
                        <p className="text-sm text-gray-500 mt-1">{level.progress} completed</p>
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
        
        {/* Smart Review Banner */}
        {showReview && (
          <Link href="/review">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 mb-4 shadow-lg border-2 border-white hover:from-purple-600 hover:to-purple-700 transition-all cursor-pointer" data-testid="button-review-banner">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm">Smart Review Ready!</h3>
                  <p className="text-white/90 text-xs">{reviewCount} {reviewCount === 1 ? 'item' : 'items'} need practice</p>
                </div>
                <div className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {reviewCount}
                </div>
              </div>
            </div>
          </Link>
        )}
        
        {/* Bottom Navigation - Fixed */}
        <BottomNav 
          allCharactersComplete={allCharactersComplete}
          isSentencesComplete={isSentencesComplete}
        />
      </div>
    </div>
  );
}
