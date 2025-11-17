/**
 * LessonPage Component
 * 
 * Displays individual lessons for vowels, consonants, matras, and similar characters.
 * Shows the character, pronunciation, sample words with images, and example sentences.
 * Tracks progress through the lesson section and provides navigation to next lesson.
 * 
 * Flow:
 * 1. Load lesson data based on URL parameter
 * 2. Display character with pronunciation button
 * 3. Show sample words with images and audio
 * 4. Display example sentence (for non-matra lessons)
 * 5. Navigate to next lesson or practice exercise
 */

import { useParams, useLocation } from "wouter";
import { Volume2 } from "lucide-react";
import { MandalaPattern } from '../components/DecorativePattern';
import { 
  VOWEL_SECTIONS, 
  CONSONANT_SECTIONS, 
  MATRA_SECTIONS,
  SIMILAR_SECTIONS,
  getVowelSectionInfo,
  getConsonantSectionInfo,
  getMatraSectionInfo,
  getSimilarSectionInfo,
  calculateProgress as calcProgress
} from '../utils/sectionStructure';

import { allLessons } from '../data/lessons';
import { imageMap } from '../data/images';
import { NavigationHeader } from '../components/shared/NavigationHeader';
import { ProgressBar } from '../components/shared/ProgressBar';
import { SampleWordCard } from '../components/lesson/SampleWordCard';

export default function LessonPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const location = useLocation()[0];
  const lessonId = params.id as string;
  const lesson = allLessons[lessonId];
  
  // Determine lesson type based on URL path
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');
  const isSimilar = location.includes('/similar/');

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Lesson not found</p>
      </div>
    );
  }

  // Determine the sections page URL for back navigation
  const backHref = isSimilar ? "/script/similar/sections" :
                   isMatra ? "/script/matra/sections" : 
                   isConsonant ? "/script/consonants/sections" : 
                   "/script/vowels/sections";

  // Navigate to next lesson or practice exercise
  const handleNext = () => {
    if (lesson.nextLesson) {
      let basePath = '/script/lesson/vowels/';
      if (isConsonant) basePath = '/script/lesson/consonants/';
      if (isMatra) basePath = '/script/lesson/matra/';
      if (isSimilar) basePath = '/script/lesson/similar/';
      setLocation(`${basePath}${lesson.nextLesson}`);
    }
  };

  // Calculate progress through the current section
  const progress = (() => {
    if (isSimilar) {
      const { section, lessonInSection } = getSimilarSectionInfo(lessonId);
      const sectionStructure = SIMILAR_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    } else if (isMatra) {
      const { section, lessonInSection } = getMatraSectionInfo(lessonId);
      const sectionStructure = MATRA_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    } else if (isConsonant) {
      const { section, lessonInSection } = getConsonantSectionInfo(lesson.pageNumber || 1);
      const sectionStructure = CONSONANT_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    } else {
      const { section, lessonInSection } = getVowelSectionInfo(lesson.pageNumber || 1);
      const sectionStructure = VOWEL_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    }
  })();

  // Text-to-speech function for Hindi pronunciation
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        const hindiVoice = voices.find(voice => 
          voice.lang.startsWith('hi') || 
          voice.lang === 'hi-IN' ||
          voice.name.toLowerCase().includes('hindi')
        );
        
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }
  };

  // Highlight character occurrences in text
  const highlightCharacter = (word: string, character: string) => {
    // Remove dotted circle placeholder (◌) if present
    const cleanChar = character.replace(/◌/g, '');
    const parts = word.split(cleanChar);
    if (parts.length === 1) return word;
    
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && <strong className="font-extrabold">{cleanChar}</strong>}
          </span>
        ))}
      </>
    );
  };

  // Parse sentence to extract Hindi, transliteration, and translation
  const parseSentence = (sentence: string) => {
    const match = sentence.match(/^(.*?)\s*\((.*?)\s*-\s*(.*?)\)$/);
    if (match) {
      return {
        hindi: match[1].trim(),
        transliteration: match[2].trim(),
        translation: match[3].trim()
      };
    }
    return {
      hindi: sentence,
      transliteration: '',
      translation: ''
    };
  };

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <NavigationHeader backHref={backHref} />
        
        <ProgressBar progress={progress} />

        <div className="bg-white rounded-2xl shadow-xl p-5 text-center border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden animate-slide-in-up relative">
          <MandalaPattern className="absolute top-2 right-2 w-12 h-12 opacity-20" color="#2E86AB" />
          
          {/* Character Display */}
          <div className="mb-4">
            {isMatra && lesson.character.includes('(') ? (
              <>
                <div className="flex flex-col items-center justify-center mb-2">
                  <div className="text-8xl font-bold text-black animate-slide-in-right">
                    {lesson.character.match(/◌[^\s(]+/)?.[0] || lesson.character.split('(')[0].trim()}
                  </div>
                  <div className="text-5xl font-bold text-gray-600 mt-2">
                    {lesson.character.match(/\(([^)]+)\)/)?.[1] || ''}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <button 
                    onClick={() => speak(lesson.character.match(/◌[^\s(]+/)?.[0] || lesson.character.split('(')[0].trim())}
                    className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-lg flex items-center gap-1 text-xs"
                    data-testid="button-speak-matra"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Matra</span>
                  </button>
                  <button 
                    onClick={() => speak(lesson.character.match(/\(([^)]+)\)/)?.[1] || lesson.character)}
                    className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-lg flex items-center gap-1 text-xs"
                    data-testid="button-speak-example"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Example</span>
                  </button>
                </div>
              </>
            ) : lesson.character.includes('(') ? (
              <>
                <div className="flex flex-col items-center justify-center mb-2">
                  <div className="text-8xl font-bold text-black animate-slide-in-right">
                    {lesson.character.split('(')[0].trim()}
                  </div>
                  <div className="text-4xl font-bold text-gray-600 mt-2">
                    {lesson.character.match(/\(([^)]+)\)/)?.[1] || ''}
                  </div>
                </div>
                <button 
                  onClick={() => speak(lesson.character.split('(')[0].trim())}
                  className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-full mb-2"
                  data-testid="button-speak-character"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="text-8xl font-bold text-black animate-slide-in-right">{lesson.character}</div>
                <button 
                  onClick={() => speak(lesson.character)}
                  className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-full"
                  data-testid="button-speak-character"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
            )}
            <p className="text-gray-400 text-sm mb-0.5">{lesson.transliteration}</p>
            <p className="text-gray-600 text-base">{lesson.sound}</p>
          </div>

          {/* Sample Words */}
          {lesson.sampleWords && lesson.sampleWords.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <p className="text-sm text-gray-500 font-medium">
                  Sample Word{lesson.sampleWords.length > 1 ? 's' : ''}
                </p>
              </div>

              <div className="space-y-2">
                {lesson.sampleWords.slice(0, 3).map((sample, index) => (
                  <SampleWordCard
                    key={index}
                    word={sample.word}
                    transliteration={sample.transliteration}
                    meaning={sample.meaning}
                    imageUrl={sample.image ? imageMap[sample.image] : null}
                    index={index}
                    onSpeak={speak}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Example Sentence */}
          {lesson.sentence && !isMatra && (
            <div className="mb-4 bg-orange-50 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500 font-medium">Example Sentence:</p>
                <button 
                  onClick={() => speak(parseSentence(lesson.sentence).hindi)}
                  className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-1 hover:bg-orange-100 rounded-full"
                  data-testid="button-speak-sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              {(() => {
                const parsed = parseSentence(lesson.sentence);
                return (
                  <div className="space-y-1">
                    <p className="text-gray-900 text-base font-semibold">
                      {highlightCharacter(parsed.hindi, lesson.character)}
                    </p>
                    {parsed.transliteration && (
                      <p className="text-gray-600 text-sm italic">{parsed.transliteration}</p>
                    )}
                    {parsed.translation && (
                      <p className="text-gray-500 text-xs">{parsed.translation}</p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          <button 
            onClick={handleNext}
            className="w-full py-3.5 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg btn-bounce"
            data-testid="button-continue"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
