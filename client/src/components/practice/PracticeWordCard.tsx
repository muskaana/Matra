/**
 * PracticeWordCard Component
 * 
 * Displays a word with pronunciation buttons for practice exercises
 * Users choose which character/sound appears in the word
 * 
 * @param word - Hindi word to practice
 * @param transliteration - Romanized pronunciation
 * @param selectedAnswer - Currently selected character
 * @param onSelect - Callback when a character button is clicked
 * @param char1 - First character option
 * @param char2 - Second character option
 * @param onSpeak - Function to speak the word
 */

import { Volume2 } from "lucide-react";

interface PracticeWordCardProps {
  word: string;
  transliteration: string;
  selectedAnswer: string;
  onSelect: (char: string) => void;
  char1: string;
  char2: string;
  onSpeak: (text: string) => void;
}

export function PracticeWordCard({
  word,
  transliteration,
  selectedAnswer,
  onSelect,
  char1,
  char2,
  onSpeak
}: PracticeWordCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-4xl font-bold text-black mb-1">{word}</div>
          <p className="text-gray-400 italic text-sm">{transliteration}</p>
        </div>
        <button 
          onClick={() => onSpeak(word)}
          className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-3 hover:bg-orange-50 rounded-full"
          data-testid="button-speak-practice-word"
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => onSelect(char1)}
          className={`flex-1 py-3 rounded-xl border-2 text-2xl font-bold transition-all ${
            selectedAnswer === char1
              ? 'border-[#ff9930] bg-orange-50 text-[#ff9930]'
              : 'border-gray-200 hover:border-gray-300 text-gray-700'
          }`}
          data-testid="button-answer-1"
        >
          {char1}
        </button>
        <button
          onClick={() => onSelect(char2)}
          className={`flex-1 py-3 rounded-xl border-2 text-2xl font-bold transition-all ${
            selectedAnswer === char2
              ? 'border-[#ff9930] bg-orange-50 text-[#ff9930]'
              : 'border-gray-200 hover:border-gray-300 text-gray-700'
          }`}
          data-testid="button-answer-2"
        >
          {char2}
        </button>
      </div>
    </div>
  );
}
