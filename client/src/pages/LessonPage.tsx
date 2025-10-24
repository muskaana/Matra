import React from "react";
import { Link, useParams, useLocation } from "wouter";
import { Volume2, X, ChevronLeft, Apple, Clock, ArrowLeftRight, Salad, Cherry, CheckCircle, Leaf, HandHeart, Moon, Sparkles, Bird, Star, Shirt, ArrowUp, User, DollarSign, Hash, Users, Glasses, MoveRight, Droplet, Plus, UserCircle } from "lucide-react";

const lessonData: Record<string, any> = {
  "1": {
    title: "Lesson 1 : Vowels",
    character: "अ",
    transliteration: "a",
    sound: '"uh"',
    sampleWords: [
      { word: "अनार", transliteration: "anar", meaning: "Pomegranate", emoji: "🍎" },
      { word: "अभी", transliteration: "abhi", meaning: "Now", emoji: "⏰" },
      { word: "अलग", transliteration: "alag", meaning: "Different", emoji: "↔️" },
      { word: "अचार", transliteration: "achaar", meaning: "Pickle", emoji: "🥒" },
    ],
    sentence: "अbhi toh party shuru hui hai",
    returnToHome: true,
    lessonNumber: 1,
    pageNumber: 1,
  },
  "2": {
    title: "Lesson 2 : Vowels",
    character: "आ",
    transliteration: "aa",
    sound: '"aa"',
    sampleWords: [
      { word: "आम", transliteration: "aam", meaning: "Mango", emoji: "🥭" },
      { word: "आसान", transliteration: "aasan", meaning: "Easy", emoji: "✅" },
    ],
    sentence: "आराम से करो (Aaram se karo - Do it slowly)",
    returnToHome: true,
    lessonNumber: 2,
    pageNumber: 2,
  },
  "3": {
    title: "Lesson 3 : Vowels",
    character: "इ",
    transliteration: "i",
    sound: '"ee"',
    sampleWords: [
      { word: "इमली", transliteration: "imli", meaning: "Tamarind", emoji: "🌿" },
      { word: "इज्ज़त", transliteration: "izzat", meaning: "Respect", emoji: "🙏" },
    ],
    sentence: "इधर आओ (Idhar aao - Come here)",
    returnToHome: true,
    lessonNumber: 3,
    pageNumber: 3,
  },
  "4": {
    title: "Lesson 4 : Vowels",
    character: "ई",
    transliteration: "ee",
    sound: '"eee"',
    sampleWords: [
      { word: "ईद", transliteration: "eed", meaning: "Eid", emoji: "🌙" },
      { word: "ईमान", transliteration: "eeman", meaning: "Faith", emoji: "✨" },
    ],
    sentence: "ईश्वर है (Eeshwar hai - God exists)",
    returnToHome: true,
    lessonNumber: 4,
    pageNumber: 4,
  },
  "5": {
    title: "Lesson 5 : Vowels",
    character: "उ",
    transliteration: "u",
    sound: '"oo"',
    sampleWords: [
      { word: "उल्लू", transliteration: "ulloo", meaning: "Owl", emoji: "🦉" },
      { word: "उम्मीद", transliteration: "ummeed", meaning: "Hope", emoji: "⭐" },
    ],
    sentence: "उठो (Utho - Get up)",
    returnToHome: true,
    lessonNumber: 5,
    pageNumber: 5,
  },
  "6": {
    title: "Lesson 6 : Vowels",
    character: "ऊ",
    transliteration: "oo",
    sound: '"ooo"',
    sampleWords: [
      { word: "ऊन", transliteration: "oon", meaning: "Wool", emoji: "🧶" },
      { word: "ऊपर", transliteration: "oopar", meaning: "Above", emoji: "⬆️" },
    ],
    sentence: "ऊपर देखो (Oopar dekho - Look up)",
    returnToHome: true,
    lessonNumber: 6,
    pageNumber: 6,
  },
  "7": {
    title: "Lesson 7 : Vowels",
    character: "ऋ",
    transliteration: "ri",
    sound: '"ree"',
    sampleWords: [
      { word: "ऋषि", transliteration: "rishi", meaning: "Sage", emoji: "🧘" },
      { word: "ऋण", transliteration: "rin", meaning: "Debt", emoji: "💰" },
    ],
    sentence: "ऋषि महान थे (Rishi mahaan the - The sage was great)",
    returnToHome: true,
    lessonNumber: 7,
    pageNumber: 7,
  },
  "8": {
    title: "Lesson 8 : Vowels",
    character: "ए",
    transliteration: "e",
    sound: '"ay"',
    sampleWords: [
      { word: "एक", transliteration: "ek", meaning: "One", emoji: "1️⃣" },
      { word: "एहसान", transliteration: "ehsaan", meaning: "Favor", emoji: "🤝" },
    ],
    sentence: "एक बार और (Ek baar aur - One more time)",
    returnToHome: true,
    lessonNumber: 8,
    pageNumber: 8,
  },
  "9": {
    title: "Lesson 9 : Vowels",
    character: "ऐ",
    transliteration: "ai",
    sound: '"aa-ay"',
    sampleWords: [
      { word: "ऐनक", transliteration: "ainak", meaning: "Glasses", emoji: "👓" },
      { word: "ऐसा", transliteration: "aisa", meaning: "Like this", emoji: "👉" },
    ],
    sentence: "ऐसा मत करो (Aisa mat karo - Don't do it like this)",
    returnToHome: true,
    lessonNumber: 9,
    pageNumber: 9,
  },
  "10": {
    title: "Lesson 10 : Vowels",
    character: "ओ",
    transliteration: "o",
    sound: '"oh"',
    sampleWords: [
      { word: "ओखली", transliteration: "okhli", meaning: "Mortar", emoji: "🫚" },
      { word: "ओस", transliteration: "os", meaning: "Dew", emoji: "💧" },
    ],
    sentence: "ओ भाई (O bhai - Hey brother)",
    returnToHome: true,
    lessonNumber: 10,
    pageNumber: 10,
  },
  "11": {
    title: "Lesson 11 : Vowels",
    character: "औ",
    transliteration: "ao",
    sound: '"aa-oh"',
    sampleWords: [
      { word: "और", transliteration: "aur", meaning: "And/More", emoji: "➕" },
      { word: "औरत", transliteration: "aurat", meaning: "Woman", emoji: "👩" },
    ],
    sentence: "और क्या? (Aur kya? - What else?)",
    returnToHome: true,
    lessonNumber: 11,
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
    if (lesson.returnToHome && lesson.lessonNumber) {
      const currentProgress = parseInt(localStorage.getItem('vowelsProgress') || '0');
      if (lesson.lessonNumber > currentProgress) {
        localStorage.setItem('vowelsProgress', lesson.lessonNumber.toString());
      }
      setLocation('/script/vowels');
    } else if (lesson.nextLesson) {
      setLocation(`/script/lesson/vowels/${lesson.nextLesson}`);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/script/vowels">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
          <Link href="/script/vowels">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100">
          <div className="mb-8">
            <div className="text-9xl font-bold text-black mb-3">{lesson.character}</div>
            <p className="text-gray-400 text-sm mb-1">{lesson.transliteration}</p>
            <p className="text-gray-600 text-lg">{lesson.sound}</p>
          </div>

          {lesson.sampleWords && lesson.sampleWords.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <p className="text-sm text-gray-500 font-medium">Sample Word{lesson.sampleWords.length > 1 ? 's' : ''}</p>
                <button className="text-[#ff9930] hover:text-[#CF7B24] transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {lesson.sampleWords.map((sample: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                    {sample.emoji && (
                      <div className="flex-shrink-0 w-16 h-16 bg-[#ff9930] rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-4xl filter drop-shadow-sm">{sample.emoji}</span>
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <div className="text-3xl font-bold text-black mb-1">{sample.word}</div>
                      <p className="text-gray-400 italic text-sm">{sample.transliteration}</p>
                      <p className="text-gray-600 text-sm">{sample.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lesson.sentence && (
            <div className="mb-8 bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2 font-medium">Example Sentence:</p>
              <p className="text-gray-700 text-base italic">{lesson.sentence}</p>
            </div>
          )}

          <button 
            onClick={handleNext}
            className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
