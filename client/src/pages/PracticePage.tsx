/**
 * PracticePage Component
 * 
 * Provides practice exercises to reinforce character recognition
 * Shows character-sound pairs that students need to match and remember
 * Simpler than quizzes - just displays pairs for study before taking the quiz
 * 
 * Flow:
 * 1. Display character-sound pairs for the section
 * 2. Mark as completed when viewed
 * 3. Navigate to quiz or next lesson
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { X, ChevronLeft } from "lucide-react";
import tigerHappy from '@assets/generated_images/Bright_orange_tiger_mascot_transparent_d56bba83.png';
import { 
  VOWEL_SECTIONS, 
  CONSONANT_SECTIONS, 
  MATRA_SECTIONS,
  SIMILAR_SECTIONS,
  calculateProgress as calcProgress
} from '../utils/sectionStructure';

import { allPractice } from '../data/practice';
import { NavigationHeader } from '../components/shared/NavigationHeader';
import { ProgressBar } from '../components/shared/ProgressBar';

export default function PracticePage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const location = useLocation()[0];
  const practiceId = params.id as string;
  const practice = allPractice[practiceId];
  const [completed, setCompleted] = useState(false);
  
  // Determine practice type based on URL path
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');
  const isSimilar = location.includes('/similar/');

  if (!practice) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Practice not found</p>
      </div>
    );
  }

  // Determine the sections page URL for back navigation
  const backHref = isSimilar ? "/script/similar/sections" :
                   isMatra ? "/script/matra/sections" : 
                   isConsonant ? "/script/consonants/sections" : 
                   "/script/vowels/sections";

  // Calculate progress through the section
  const progress = (() => {
    if (isSimilar) {
      const sectionNumber = parseInt(practiceId.replace('s', ''));
      const sectionStructure = SIMILAR_SECTIONS[sectionNumber - 1];
      return calcProgress('practice', sectionStructure, 1);
    } else if (isMatra) {
      const sectionNumber = parseInt(practiceId.replace('m', ''));
      const sectionStructure = MATRA_SECTIONS[sectionNumber - 1];
      return calcProgress('practice', sectionStructure, 1);
    } else if (isConsonant) {
      const sectionNumber = parseInt(practiceId.replace('c', ''));
      const sectionStructure = CONSONANT_SECTIONS[sectionNumber - 1];
      return calcProgress('practice', sectionStructure, 1);
    } else {
      const sectionNumber = parseInt(practiceId);
      const sectionStructure = VOWEL_SECTIONS[sectionNumber - 1];
      return calcProgress('practice', sectionStructure, 1);
    }
  })();

  // Handle navigation to quiz
  const handleContinue = () => {
    setCompleted(true);
    
    setTimeout(() => {
      let basePath = '/script/lesson/vowels/';
      if (isConsonant) basePath = '/script/lesson/consonants/';
      if (isMatra) basePath = '/script/lesson/matra/';
      if (isSimilar) basePath = '/script/lesson/similar/';
      
      setLocation(`${basePath}${practice.nextLesson}`);
    }, 200);
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <NavigationHeader backHref={backHref} />
        
        <ProgressBar progress={progress} />

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden animate-slide-in-up relative">
          <div>
            <div className="mb-6 flex justify-center">
              <img 
                src={tigerHappy} 
                alt="Happy tiger" 
                className="w-24 h-24 object-contain animate-bounce-slow" 
              />
            </div>
            
            <h2 className="text-2xl font-bold text-black mb-2">{practice.title}</h2>
            <p className="text-gray-600 mb-6">Study these character-sound pairs</p>

            <div className="space-y-4 mb-8">
              {practice.pairs.map((pair: any, index: number) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-5 border-2 border-orange-200 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-6xl font-bold text-black">
                      {pair.character}
                    </div>
                    <div className="text-gray-400 text-2xl">→</div>
                    <div className="text-2xl font-semibold text-gray-700">
                      {pair.sound}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong className="text-[#ff9930]">Tip:</strong> Take a moment to study these pairs. You'll be quizzed on them next!
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className={`w-full py-4 rounded-xl text-white text-lg font-semibold shadow-lg transition-all ${
              completed 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-[#ff9930] hover:bg-[#CF7B24]'
            }`}
            data-testid="button-continue"
          >
            {completed ? '✓ Continue to Quiz' : 'Continue to Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
}
