/**
 * SampleWordCard Component
 * 
 * Displays a sample word with its image, transliteration, meaning, and pronunciation
 * Used within lesson pages to show vocabulary examples
 * 
 * @param word - Hindi word
 * @param transliteration - Romanized transliteration  
 * @param meaning - English meaning
 * @param imageUrl - URL to word illustration
 * @param index - Card index for test IDs
 * @param onSpeak - Function to speak the word
 */

import { Volume2 } from "lucide-react";

interface SampleWordCardProps {
  word: string;
  transliteration: string;
  meaning: string;
  imageUrl: string | null;
  index: number;
  onSpeak: (text: string) => void;
}

export function SampleWordCard({ 
  word, 
  transliteration, 
  meaning, 
  imageUrl, 
  index,
  onSpeak 
}: SampleWordCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
      {imageUrl && (
        <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-md p-1">
          <img 
            src={imageUrl} 
            alt={meaning} 
            className="w-full h-full object-contain" 
          />
        </div>
      )}
      <div className="flex-1 text-left">
        <div className="text-2xl font-bold text-black mb-0.5">
          {word}
        </div>
        <p className="text-gray-400 italic text-xs">{transliteration}</p>
        <p className="text-gray-600 text-xs">{meaning}</p>
      </div>
      <button 
        onClick={() => onSpeak(word)}
        className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-full flex-shrink-0"
        data-testid={`button-speak-word-${index}`}
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
}
