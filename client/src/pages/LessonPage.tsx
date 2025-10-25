import React from "react";
import { Link, useParams, useLocation } from "wouter";
import { Volume2, X, ChevronLeft } from "lucide-react";

import pomegranateImg from '@assets/generated_images/Colorful_pomegranate_icon_illustration_81ade7f4.png';
import mangoImg from '@assets/generated_images/Colorful_mango_icon_illustration_7156411b.png';
import tamarindImg from '@assets/generated_images/Colorful_tamarind_icon_illustration_043a9b40.png';
import owlImg from '@assets/generated_images/Colorful_owl_icon_illustration_a9ea4e1a.png';
import clockImg from '@assets/generated_images/Colorful_clock_icon_illustration_5fb52ffc.png';
import moonImg from '@assets/generated_images/Colorful_moon_icon_illustration_15e2d22a.png';

const imageMap: Record<string, string> = {
  pomegranate: pomegranateImg,
  mango: mangoImg,
  tamarind: tamarindImg,
  owl: owlImg,
  clock: clockImg,
  moon: moonImg,
};

const lessonData: Record<string, any> = {
  "1": {
    title: "Lesson 1 : Vowels",
    character: "अ",
    transliteration: "a",
    sound: '"uh"',
    sampleWords: [
      { word: "अनार", transliteration: "anar", meaning: "Pomegranate", image: "pomegranate" },
      { word: "अभी", transliteration: "abhi", meaning: "Now", image: "clock" },
      { word: "अलग", transliteration: "alag", meaning: "Different", image: "clock" },
    ],
    sentence: "अbhi toh party shuru hui hai",
    nextLesson: "2",
    pageNumber: 1,
  },
  "2": {
    title: "Lesson 2 : Vowels",
    character: "आ",
    transliteration: "aa",
    sound: '"aa"',
    sampleWords: [
      { word: "आम", transliteration: "aam", meaning: "Mango", image: "mango" },
      { word: "आसान", transliteration: "aasan", meaning: "Easy", image: "mango" },
    ],
    sentence: "आराम से करो (Aaram se karo - Do it slowly)",
    nextLesson: "practice/1",
    pageNumber: 2,
  },
  "3": {
    title: "Lesson 3 : Vowels",
    character: "इ",
    transliteration: "i",
    sound: '"ee"',
    sampleWords: [
      { word: "इमली", transliteration: "imli", meaning: "Tamarind", image: "tamarind" },
      { word: "इज्ज़त", transliteration: "izzat", meaning: "Respect", image: "tamarind" },
    ],
    sentence: "इधर आओ (Idhar aao - Come here)",
    nextLesson: "4",
    pageNumber: 3,
  },
  "4": {
    title: "Lesson 4 : Vowels",
    character: "ई",
    transliteration: "ee",
    sound: '"eee"',
    sampleWords: [
      { word: "ईद", transliteration: "eed", meaning: "Eid", image: "moon" },
      { word: "ईमान", transliteration: "eeman", meaning: "Faith", image: "moon" },
    ],
    sentence: "ईश्वर है (Eeshwar hai - God exists)",
    nextLesson: "practice/2",
    pageNumber: 4,
  },
  "5": {
    title: "Lesson 5 : Vowels",
    character: "उ",
    transliteration: "u",
    sound: '"oo"',
    sampleWords: [
      { word: "उल्लू", transliteration: "ulloo", meaning: "Owl", image: "owl" },
      { word: "उम्मीद", transliteration: "ummeed", meaning: "Hope", image: "owl" },
    ],
    sentence: "उठो (Utho - Get up)",
    nextLesson: "6",
    pageNumber: 5,
  },
  "6": {
    title: "Lesson 6 : Vowels",
    character: "ऊ",
    transliteration: "oo",
    sound: '"ooo"',
    sampleWords: [
      { word: "ऊन", transliteration: "oon", meaning: "Wool", image: "owl" },
      { word: "ऊपर", transliteration: "oopar", meaning: "Above", image: "owl" },
    ],
    sentence: "ऊपर देखो (Oopar dekho - Look up)",
    nextLesson: "practice/3",
    pageNumber: 6,
  },
  "7": {
    title: "Lesson 7 : Vowels",
    character: "ऋ",
    transliteration: "ri",
    sound: '"ree"',
    sampleWords: [
      { word: "ऋषि", transliteration: "rishi", meaning: "Sage", image: "pomegranate" },
      { word: "ऋण", transliteration: "rin", meaning: "Debt", image: "pomegranate" },
    ],
    sentence: "ऋषि महान थे (Rishi mahaan the - The sage was great)",
    nextLesson: "8",
    pageNumber: 7,
  },
  "8": {
    title: "Lesson 8 : Vowels",
    character: "ए",
    transliteration: "e",
    sound: '"ay"',
    sampleWords: [
      { word: "एक", transliteration: "ek", meaning: "One", image: "mango" },
      { word: "एहसान", transliteration: "ehsaan", meaning: "Favor", image: "mango" },
    ],
    sentence: "एक बार और (Ek baar aur - One more time)",
    nextLesson: "9",
    pageNumber: 8,
  },
  "9": {
    title: "Lesson 9 : Vowels",
    character: "ऐ",
    transliteration: "ai",
    sound: '"aa-ay"',
    sampleWords: [
      { word: "ऐनक", transliteration: "ainak", meaning: "Glasses", image: "clock" },
      { word: "ऐसा", transliteration: "aisa", meaning: "Like this", image: "clock" },
    ],
    sentence: "ऐसा मत करो (Aisa mat karo - Don't do it like this)",
    nextLesson: "practice/4",
    pageNumber: 9,
  },
  "10": {
    title: "Lesson 10 : Vowels",
    character: "ओ",
    transliteration: "o",
    sound: '"oh"',
    sampleWords: [
      { word: "ओखली", transliteration: "okhli", meaning: "Mortar", image: "pomegranate" },
      { word: "ओस", transliteration: "os", meaning: "Dew", image: "pomegranate" },
    ],
    sentence: "ओ भाई (O bhai - Hey brother)",
    nextLesson: "11",
    pageNumber: 10,
  },
  "11": {
    title: "Lesson 11 : Vowels",
    character: "औ",
    transliteration: "ao",
    sound: '"aa-oh"',
    sampleWords: [
      { word: "और", transliteration: "aur", meaning: "And/More", image: "tamarind" },
      { word: "औरत", transliteration: "aurat", meaning: "Woman", image: "tamarind" },
    ],
    sentence: "और क्या? (Aur kya? - What else?)",
    nextLesson: "practice/5",
    pageNumber: 11,
  },
};

export default function LessonPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const lessonId = params.id as string;
  const lesson = lessonData[lessonId];

  if (!lesson) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Lesson not found</p></div>;
  }

  const handleNext = () => {
    if (lesson.nextLesson) {
      setLocation(`/script/lesson/vowels/${lesson.nextLesson}`);
    }
  };

  return (
    <div className="h-screen bg-white px-4 py-4 flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <Link href="/script/vowels/sections">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
          <Link href="/script/vowels/sections">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5 text-center border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden">
          <div className="mb-4">
            <div className="text-8xl font-bold text-black mb-2">{lesson.character}</div>
            <p className="text-gray-400 text-sm mb-0.5">{lesson.transliteration}</p>
            <p className="text-gray-600 text-base">{lesson.sound}</p>
          </div>

          {lesson.sampleWords && lesson.sampleWords.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <p className="text-sm text-gray-500 font-medium">Sample Word{lesson.sampleWords.length > 1 ? 's' : ''}</p>
                <button className="text-[#ff9930] hover:text-[#CF7B24] transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {lesson.sampleWords.slice(0, 3).map((sample: any, index: number) => {
                  const imageUrl = sample.image ? imageMap[sample.image] : null;
                  return (
                    <div key={index} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                      {imageUrl && (
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-lg bg-white p-1">
                          <img src={imageUrl} alt={sample.meaning} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div className="flex-1 text-left">
                        <div className="text-2xl font-bold text-black mb-0.5">{sample.word}</div>
                        <p className="text-gray-400 italic text-xs">{sample.transliteration}</p>
                        <p className="text-gray-600 text-xs">{sample.meaning}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {lesson.sentence && (
            <div className="mb-4 bg-orange-50 rounded-xl p-3">
              <p className="text-xs text-gray-500 mb-1 font-medium">Example Sentence:</p>
              <p className="text-gray-700 text-sm italic">{lesson.sentence}</p>
            </div>
          )}

          <button 
            onClick={handleNext}
            className="w-full py-3.5 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
