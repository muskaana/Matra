import React from "react";
import { Link, useParams } from "wouter";
import { Volume2, X, ChevronLeft, Apple, Clock, ArrowLeftRight, Salad, Cherry, CheckCircle, Leaf, HandHeart, Moon, Sparkles, Bird, Star, Shirt, ArrowUp, User, DollarSign, Hash, Users, Glasses, MoveRight, Droplet, Plus, UserCircle } from "lucide-react";

const lessonData: Record<string, any> = {
  "1": {
    title: "Lesson 1 : Vowels",
    character: "अ",
    transliteration: "a",
    sound: '"uh"',
    sampleWords: [
      { word: "अनार", transliteration: "anar", meaning: "Pomegranate", icon: "Apple" },
      { word: "अभी", transliteration: "abhi", meaning: "Now", icon: "Clock" },
      { word: "अलग", transliteration: "alag", meaning: "Different", icon: "ArrowLeftRight" },
      { word: "अचार", transliteration: "achaar", meaning: "Pickle", icon: "Salad" },
    ],
    sentence: "अbhi toh party shuru hui hai",
    nextLesson: "2",
    pageNumber: 1,
  },
  "2": {
    title: "Lesson 1 : Vowels",
    character: "आ",
    transliteration: "aa",
    sound: '"aa"',
    sampleWords: [
      { word: "आम", transliteration: "aam", meaning: "Mango", icon: "Cherry" },
      { word: "आसान", transliteration: "aasan", meaning: "Easy", icon: "CheckCircle" },
    ],
    sentence: "आराम से करो (Aaram se karo - Do it slowly)",
    nextLesson: "practice/1",
    pageNumber: 2,
  },
  "3": {
    title: "Lesson 1 : Vowels",
    character: "इ",
    transliteration: "i",
    sound: '"ee"',
    sampleWords: [
      { word: "इमली", transliteration: "imli", meaning: "Tamarind", icon: "Leaf" },
      { word: "इज्ज़त", transliteration: "izzat", meaning: "Respect", icon: "HandHeart" },
    ],
    sentence: "इधर आओ (Idhar aao - Come here)",
    nextLesson: "4",
    pageNumber: 3,
  },
  "4": {
    title: "Lesson 1 : Vowels",
    character: "ई",
    transliteration: "ee",
    sound: '"eee"',
    sampleWords: [
      { word: "ईद", transliteration: "eed", meaning: "Eid", icon: "Moon" },
      { word: "ईमान", transliteration: "eeman", meaning: "Faith", icon: "Sparkles" },
    ],
    sentence: "ईश्वर है (Eeshwar hai - God exists)",
    nextLesson: "practice/2",
    pageNumber: 4,
  },
  "5": {
    title: "Lesson 1 : Vowels",
    character: "उ",
    transliteration: "u",
    sound: '"oo"',
    sampleWords: [
      { word: "उल्लू", transliteration: "ulloo", meaning: "Owl", icon: "Bird" },
      { word: "उम्मीद", transliteration: "ummeed", meaning: "Hope", icon: "Star" },
    ],
    sentence: "उठो (Utho - Get up)",
    nextLesson: "6",
    pageNumber: 5,
  },
  "6": {
    title: "Lesson 1 : Vowels",
    character: "ऊ",
    transliteration: "oo",
    sound: '"ooo"',
    sampleWords: [
      { word: "ऊन", transliteration: "oon", meaning: "Wool", icon: "Shirt" },
      { word: "ऊपर", transliteration: "oopar", meaning: "Above", icon: "ArrowUp" },
    ],
    sentence: "ऊपर देखो (Oopar dekho - Look up)",
    nextLesson: "practice/3",
    pageNumber: 6,
  },
  "7": {
    title: "Lesson 1 : Vowels",
    character: "ऋ",
    transliteration: "ri",
    sound: '"ree"',
    sampleWords: [
      { word: "ऋषि", transliteration: "rishi", meaning: "Sage", icon: "User" },
      { word: "ऋण", transliteration: "rin", meaning: "Debt", icon: "DollarSign" },
    ],
    sentence: "ऋषि महान थे (Rishi mahaan the - The sage was great)",
    nextLesson: "8",
    pageNumber: 7,
  },
  "8": {
    title: "Lesson 1 : Vowels",
    character: "ए",
    transliteration: "e",
    sound: '"ay"',
    sampleWords: [
      { word: "एक", transliteration: "ek", meaning: "One", icon: "Hash" },
      { word: "एहसान", transliteration: "ehsaan", meaning: "Favor", icon: "Users" },
    ],
    sentence: "एक बार और (Ek baar aur - One more time)",
    nextLesson: "9",
    pageNumber: 8,
  },
  "9": {
    title: "Lesson 1 : Vowels",
    character: "ऐ",
    transliteration: "ai",
    sound: '"aa-ay"',
    sampleWords: [
      { word: "ऐनक", transliteration: "ainak", meaning: "Glasses", icon: "Glasses" },
      { word: "ऐसा", transliteration: "aisa", meaning: "Like this", icon: "MoveRight" },
    ],
    sentence: "ऐसा मत करो (Aisa mat karo - Don't do it like this)",
    nextLesson: "practice/4",
    pageNumber: 9,
  },
  "10": {
    title: "Lesson 1 : Vowels",
    character: "ओ",
    transliteration: "o",
    sound: '"oh"',
    sampleWords: [
      { word: "ओखली", transliteration: "okhli", meaning: "Mortar", icon: "Salad" },
      { word: "ओस", transliteration: "os", meaning: "Dew", icon: "Droplet" },
    ],
    sentence: "ओ भाई (O bhai - Hey brother)",
    nextLesson: "11",
    pageNumber: 10,
  },
  "11": {
    title: "Lesson 1 : Vowels",
    character: "औ",
    transliteration: "ao",
    sound: '"aa-oh"',
    sampleWords: [
      { word: "और", transliteration: "aur", meaning: "And/More", icon: "Plus" },
      { word: "औरत", transliteration: "aurat", meaning: "Woman", icon: "UserCircle" },
    ],
    sentence: "और क्या? (Aur kya? - What else?)",
    nextLesson: "practice/5",
    pageNumber: 11,
  },
};

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const lesson = lessonData[lessonId];

  if (!lesson) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Lesson not found</p></div>;
  }

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/script/vowels">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <Link href="/script/vowels">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 text-center border border-gray-200">
          <div className="mb-6">
            <div className="text-8xl font-bold text-black mb-2">{lesson.character}</div>
            <p className="text-gray-400 text-xs mb-0.5">{lesson.transliteration}</p>
            <p className="text-gray-600 text-base">{lesson.sound}</p>
          </div>

          {lesson.sampleWords && lesson.sampleWords.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <p className="text-xs text-gray-500">Sample Word{lesson.sampleWords.length > 1 ? 's' : ''}</p>
                <button className="text-[#ff9930]">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {lesson.sampleWords.map((sample: any, index: number) => {
                  const IconComponent = sample.icon ? {
                    Apple, Clock, ArrowLeftRight, Salad, Cherry, CheckCircle, Leaf, HandHeart,
                    Moon, Sparkles, Bird, Star, Shirt, ArrowUp, User, DollarSign, Hash,
                    Users, Glasses, MoveRight, Droplet, Plus, UserCircle
                  }[sample.icon] : null;
                  
                  return (
                    <div key={index} className="bg-gray-50 rounded-md p-3 flex items-center gap-3">
                      {IconComponent && (
                        <div className="flex-shrink-0 w-10 h-10 bg-[#ff9930] rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
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
            <div className="mb-6 bg-orange-50 rounded-md p-3">
              <p className="text-xs text-gray-500 mb-1">Example Sentence:</p>
              <p className="text-gray-700 text-sm italic">{lesson.sentence}</p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <Link href={`/script/lesson/vowels/${lesson.nextLesson}`}>
              <button className="w-full py-3 bg-[#ff9930] text-white rounded-md hover:bg-[#ff8800] transition-colors text-base font-semibold shadow-md">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
