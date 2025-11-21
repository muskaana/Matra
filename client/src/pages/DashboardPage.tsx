/**
 * DashboardPage Component
 * 
 * Shows returning users their progress and where to continue
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";
import tigerWaving from '@assets/sitting-happy-tiger.jpg';

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const [currentStage, setCurrentStage] = useState<string>("Getting Started");
  const [continueHref, setContinueHref] = useState<string>("/script/vowels");
  const [placementLevel, setPlacementLevel] = useState<string>("");

  useEffect(() => {
    // Get all progress
    const vowels = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
    const consonants = parseInt(localStorage.getItem('consonantsQuizzesCompleted') || '0');
    const matra = parseInt(localStorage.getItem('matraQuizzesCompleted') || '0');
    const similar = parseInt(localStorage.getItem('similarQuizzesCompleted') || '0');
    
    const beginnerWords = localStorage.getItem('beginnerWordsCompleted');
    const beginnerWordsCount = beginnerWords ? JSON.parse(beginnerWords).length : 0;
    
    const advancedWords = localStorage.getItem('advancedWordsCompleted');
    const advancedWordsCount = advancedWords ? JSON.parse(advancedWords).length : 0;
    
    const sentences = localStorage.getItem('sentencesCompleted');
    const sentencesCount = sentences ? JSON.parse(sentences).length : 0;
    
    const reading = localStorage.getItem('readingCompleted');
    const readingCount = reading ? JSON.parse(reading).length : 0;
    
    const placement = localStorage.getItem('placementLevel') || "";
    setPlacementLevel(placement);

    // Determine current stage and where to continue
    const totalVowels = 5;
    const totalConsonants = 16;
    const totalMatra = 7;
    const totalSimilar = 5;
    const totalBeginnerPacks = 5;
    const totalAdvancedPacks = 4;
    const totalSentenceSections = 4;
    const totalReadingPieces = 14;

    const allCharactersComplete = vowels >= totalVowels && 
                                   consonants >= totalConsonants && 
                                   matra >= totalMatra && 
                                   similar >= totalSimilar;
    
    const beginnerWordsComplete = beginnerWordsCount >= totalBeginnerPacks;
    const advancedWordsComplete = advancedWordsCount >= totalAdvancedPacks;
    const sentencesComplete = sentencesCount >= totalSentenceSections;
    const readingComplete = readingCount >= totalReadingPieces;

    // Determine stage and continue location
    if (readingComplete && sentencesComplete && advancedWordsComplete && beginnerWordsComplete && allCharactersComplete) {
      setCurrentStage("All Caught Up!");
      setContinueHref("/script");
    } else if (sentencesComplete && advancedWordsComplete && beginnerWordsComplete && allCharactersComplete) {
      setCurrentStage("Reading Practice");
      setContinueHref("/reading");
    } else if (advancedWordsComplete && beginnerWordsComplete && allCharactersComplete) {
      setCurrentStage("Sentences");
      setContinueHref("/sentences");
    } else if (beginnerWordsComplete && allCharactersComplete) {
      setCurrentStage("Advanced Words");
      setContinueHref("/words/advanced");
    } else if (allCharactersComplete) {
      setCurrentStage("Beginner Words");
      setContinueHref("/words/beginner");
    } else {
      // Still working on characters - figure out which section (check in order)
      if (vowels < totalVowels) {
        setCurrentStage("The Characters - Vowels");
        setContinueHref("/script/vowels/sections");
      } else if (consonants < totalConsonants) {
        setCurrentStage("The Characters - Consonants");
        setContinueHref("/script/consonants/sections");
      } else if (matra < totalMatra) {
        setCurrentStage("The Characters - Matra");
        setContinueHref("/script/matra/sections");
      } else if (similar < totalSimilar) {
        setCurrentStage("The Characters - Similar");
        setContinueHref("/script/similar/sections");
      } else {
        // Fallback - should not happen but just in case
        setCurrentStage("The Characters");
        setContinueHref("/script/vowels");
      }
    }
  }, []);

  const handleContinue = () => {
    setLocation(continueHref);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen px-4 py-8 justify-center">
        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 animate-fade-in">
          {/* Tiger Mascot */}
          <img 
            src={tigerWaving} 
            alt="Waving tiger" 
            className="w-32 h-32 mx-auto object-contain mb-6" 
          />

          {/* Welcome Message */}
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome back!
          </h1>

          {/* Placement Level */}
          {placementLevel && (
            <div className="inline-flex items-center gap-2 bg-orange-100 text-[#ff9930] px-3 py-1.5 rounded-full text-sm font-medium mb-4">
              <CheckCircle2 className="w-4 h-4" />
              {placementLevel}
            </div>
          )}

          {/* Current Stage */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg mb-2">
              You're working on
            </p>
            <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-3 rounded-xl font-bold text-xl">
              {currentStage}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="group w-full inline-flex items-center justify-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            data-testid="button-continue-learning"
          >
            Continue Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* View All Levels */}
          <button
            onClick={() => setLocation('/script')}
            className="w-full mt-3 text-gray-600 hover:text-[#ff9930] font-medium py-2 transition-colors"
            data-testid="button-view-all"
          >
            View All Levels
          </button>
        </div>
      </div>
    </div>
  );
}
