import React, { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { X, ChevronLeft, Volume2 } from "lucide-react";
import tigerHappy from '@assets/generated_images/Bright_orange_tiger_mascot_transparent_d56bba83.png';
import { 
  VOWEL_SECTIONS, 
  CONSONANT_SECTIONS, 
  MATRA_SECTIONS,
  calculateProgress as calcProgress
} from '../utils/sectionStructure';

const practiceData: Record<string, any> = {
  "1": {
    title: "Practice: अ vs आ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "अ", sound: "uh" },
      { character: "आ", sound: "aa" },
    ],
    nextLesson: "quiz/1a",
    pageNumber: "Practice 1",
  },
  "2": {
    title: "Practice: इ vs ई",
    question: "Match the sound to the letter",
    pairs: [
      { character: "इ", sound: "ee" },
      { character: "ई", sound: "eee" },
    ],
    nextLesson: "quiz/2a",
    pageNumber: "Practice 2",
  },
  "3": {
    title: "Practice: उ vs ऊ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "उ", sound: "oo" },
      { character: "ऊ", sound: "ooo" },
    ],
    nextLesson: "quiz/3a",
    pageNumber: "Practice 3",
  },
  "4": {
    title: "Practice: ऋ, ए, ऐ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ऋ", sound: "ree" },
      { character: "ए", sound: "ay" },
      { character: "ऐ", sound: "ai" },
    ],
    nextLesson: "quiz/4a",
    pageNumber: "Practice 4",
  },
  "5": {
    title: "Practice: ओ vs औ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ओ", sound: "oh" },
      { character: "औ", sound: "aw" },
    ],
    nextLesson: "quiz/5a",
    pageNumber: "Practice 5",
  },
  "c1": {
    title: "Practice: क vs ख",
    question: "Match the sound to the letter",
    pairs: [
      { character: "क", sound: "ka" },
      { character: "ख", sound: "kha" },
    ],
    nextLesson: "quiz/c1a",
    pageNumber: "Practice C1",
  },
  "c2": {
    title: "Practice: ग vs घ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ग", sound: "ga" },
      { character: "घ", sound: "gha" },
    ],
    nextLesson: "quiz/c2a",
    pageNumber: "Practice C2",
  },
  "c3": {
    title: "Practice: च vs छ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "च", sound: "cha" },
      { character: "छ", sound: "chha" },
    ],
    nextLesson: "quiz/c3a",
    pageNumber: "Practice C3",
  },
  "c4": {
    title: "Practice: ज vs झ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ज", sound: "ja" },
      { character: "झ", sound: "jha" },
    ],
    nextLesson: "quiz/c4a",
    pageNumber: "Practice C4",
  },
  "c5": {
    title: "Practice: ट vs ठ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ट", sound: "ṭa" },
      { character: "ठ", sound: "ṭha" },
    ],
    nextLesson: "quiz/c5a",
    pageNumber: "Practice C5",
  },
  "c6": {
    title: "Practice: ड vs ढ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ड", sound: "ḍa" },
      { character: "ढ", sound: "ḍha" },
    ],
    nextLesson: "quiz/c6a",
    pageNumber: "Practice C6",
  },
  "c7": {
    title: "Practice: त vs थ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "त", sound: "ta" },
      { character: "थ", sound: "tha" },
    ],
    nextLesson: "quiz/c7a",
    pageNumber: "Practice C7",
  },
  "c8": {
    title: "Practice: द vs ध",
    question: "Match the sound to the letter",
    pairs: [
      { character: "द", sound: "da" },
      { character: "ध", sound: "dha" },
    ],
    nextLesson: "quiz/c8a",
    pageNumber: "Practice C8",
  },
  "c9": {
    title: "Practice: प vs फ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "प", sound: "pa" },
      { character: "फ", sound: "pha" },
    ],
    nextLesson: "quiz/c9a",
    pageNumber: "Practice C9",
  },
  "c10": {
    title: "Practice: ब vs भ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ब", sound: "ba" },
      { character: "भ", sound: "bha" },
    ],
    nextLesson: "quiz/c10a",
    pageNumber: "Practice C10",
  },
  "c11": {
    title: "Practice: न vs म",
    question: "Match the sound to the letter",
    pairs: [
      { character: "न", sound: "na" },
      { character: "म", sound: "ma" },
    ],
    nextLesson: "quiz/c11a",
    pageNumber: "Practice C11",
  },
  "c12": {
    title: "Practice: य vs र",
    question: "Match the sound to the letter",
    pairs: [
      { character: "य", sound: "ya" },
      { character: "र", sound: "ra" },
    ],
    nextLesson: "quiz/c12a",
    pageNumber: "Practice C12",
  },
  "c13": {
    title: "Practice: ल vs व",
    question: "Match the sound to the letter",
    pairs: [
      { character: "ल", sound: "la" },
      { character: "व", sound: "va" },
    ],
    nextLesson: "quiz/c13a",
    pageNumber: "Practice C13",
  },
  "c14": {
    title: "Practice: श vs ष",
    question: "Match the sound to the letter",
    pairs: [
      { character: "श", sound: "sha" },
      { character: "ष", sound: "ṣa" },
    ],
    nextLesson: "quiz/c14a",
    pageNumber: "Practice C14",
  },
  "c15": {
    title: "Practice: स vs ह",
    question: "Match the sound to the letter",
    pairs: [
      { character: "स", sound: "sa" },
      { character: "ह", sound: "ha" },
    ],
    nextLesson: "quiz/c15a",
    pageNumber: "Practice C15",
  },
  "c16": {
    title: "Practice: क्ष त्र ज्ञ",
    question: "Match the sound to the letter",
    pairs: [
      { character: "क्ष", sound: "kṣa" },
      { character: "त्र", sound: "tra" },
      { character: "ज्ञ", sound: "gya" },
    ],
    nextLesson: "quiz/c16a",
    pageNumber: "Practice C16",
  },
  "m1": {
    title: "Practice: ◌ा",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌ा (का)", sound: "aa" },
    ],
    nextLesson: "quiz/m1a",
    pageNumber: "Practice M1",
  },
  "m2": {
    title: "Practice: ◌ि vs ◌ी (short i vs long i)",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌ि (कि)", sound: "i (short)" },
      { character: "◌ी (की)", sound: "ee (long)" },
    ],
    nextLesson: "quiz/m2a",
    pageNumber: "Practice M2",
  },
  "m3": {
    title: "Practice: ◌ु vs ◌ू (short u vs long u)",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌ु (कु)", sound: "u (short)" },
      { character: "◌ू (कू)", sound: "oo (long)" },
    ],
    nextLesson: "quiz/m3a",
    pageNumber: "Practice M3",
  },
  "m4": {
    title: "Practice: ◌े vs ◌ै",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌े (के)", sound: "e" },
      { character: "◌ै (कै)", sound: "ai" },
    ],
    nextLesson: "quiz/m4a",
    pageNumber: "Practice M4",
  },
  "m5": {
    title: "Practice: ◌ो vs ◌ौ",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌ो (को)", sound: "o" },
      { character: "◌ौ (कौ)", sound: "ao" },
    ],
    nextLesson: "quiz/m5a",
    pageNumber: "Practice M5",
  },
  "m6": {
    title: "Practice: ◌ृ vs ◌ं",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌ृ (कृ)", sound: "ri" },
      { character: "◌ं (कं)", sound: "an" },
    ],
    nextLesson: "quiz/m6a",
    pageNumber: "Practice M6",
  },
  "m7": {
    title: "Practice: ◌ः vs ◌ँ (nasal marks)",
    question: "Match the sound to the matra",
    pairs: [
      { character: "◌ः (कः)", sound: "h" },
      { character: "◌ँ (कँ)", sound: "añ" },
    ],
    nextLesson: "quiz/m7a",
    pageNumber: "Practice M7",
  },
};

export default function PracticePage() {
  const params = useParams();
  const location = useLocation()[0];
  const practiceId = params.id as string;
  const practice = practiceData[practiceId];
  const [completed, setCompleted] = useState(false);
  
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');

  if (!practice) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Practice not found</p></div>;
  }

  // Calculate progress - practice comes after all lessons in a section
  const progress = (() => {
    if (isMatra) {
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

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <Link href={isMatra ? "/script/matra/sections" : (isConsonant ? "/script/consonants/sections" : "/script/vowels/sections")}>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <Link href={isMatra ? "/script/matra/sections" : (isConsonant ? "/script/consonants/sections" : "/script/vowels/sections")}>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-md p-5 text-center border border-gray-200 flex flex-col overflow-y-auto relative animate-slide-in-up">
          <div className="absolute bottom-32 right-6 w-16 h-16 opacity-70 animate-bounce-subtle" style={{ transform: 'rotate(8deg)' }}>
            <img src={tigerHappy} alt="Happy tiger" className="w-full h-full object-contain" />
          </div>
          
          <p className="text-base text-gray-700 mb-6">{practice.question}</p>

          <div className="space-y-3 mb-6">
            {practice.pairs.map((pair: any, index: number) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-black" data-testid={`text-character-${index}`}>{pair.character}</div>
                  <button 
                    onClick={() => speak(pair.character.replace(/[()◌]/g, ''))}
                    className="p-2 bg-[#ff9930] hover:bg-[#CF7B24] rounded-full transition-colors"
                    data-testid={`button-audio-${index}`}
                    aria-label={`Listen to ${pair.character}`}
                  >
                    <Volume2 className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="text-base text-gray-600 italic" data-testid={`text-sound-${index}`}>"{pair.sound}"</div>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            {!completed && (
              <button
                onClick={() => setCompleted(true)}
                className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg btn-bounce"
              >
                I understand
              </button>
            )}

            {completed && (
              <Link href={`/script/lesson/${isMatra ? 'matra' : (isConsonant ? 'consonants' : 'vowels')}/${practice.nextLesson}`}>
                <button className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg btn-bounce">
                  Continue to Quiz
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
