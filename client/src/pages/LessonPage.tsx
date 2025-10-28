import React from "react";
import { Link, useParams, useLocation } from "wouter";
import { Volume2, X, ChevronLeft } from "lucide-react";
import tigerMascot from '@assets/generated_images/Transparent_light_tiger_mascot_b3011079.png';

import pomegranateImg from '@assets/generated_images/Transparent_pomegranate_simple_icon_5f275640.png';
import mangoImg from '@assets/generated_images/Transparent_mango_simple_icon_3f4bb5ae.png';
import tamarindImg from '@assets/generated_images/Transparent_tamarind_simple_icon_bc7ac240.png';
import owlImg from '@assets/generated_images/Transparent_owl_simple_icon_c4344c73.png';
import clockImg from '@assets/generated_images/Transparent_clock_simple_icon_8993cc8c.png';
import moonImg from '@assets/generated_images/Transparent_moon_simple_icon_926a46c1.png';
import glassesImg from '@assets/generated_images/Transparent_glasses_simple_icon_6d44af79.png';
import woolImg from '@assets/generated_images/Transparent_wool_simple_icon_fb4c83dc.png';
import upArrowImg from '@assets/generated_images/Transparent_up_arrow_icon_9fb02afa.png';
import dewImg from '@assets/generated_images/Transparent_droplet_simple_icon_d13e8345.png';
import helpingHandsImg from '@assets/generated_images/Transparent_helping_hands_icon_63edad27.png';
import pointingImg from '@assets/generated_images/Transparent_pointing_finger_icon_56ede08d.png';
import easyImg from '@assets/generated_images/Transparent_checkmark_simple_icon_2c17ad47.png';
import respectImg from '@assets/generated_images/Transparent_heart_simple_icon_c0dd5782.png';
import hopeImg from '@assets/generated_images/Transparent_star_simple_icon_25eccd6c.png';
import sageImg from '@assets/generated_images/Transparent_sage_simple_icon_d97ac20c.png';
import moneyImg from '@assets/generated_images/Transparent_money_simple_icon_26adc104.png';
import oneImg from '@assets/generated_images/Transparent_number_one_icon_aafd53e3.png';
import faithImg from '@assets/generated_images/Transparent_faith_hands_icon_544b1e26.png';
import mortarImg from '@assets/generated_images/Transparent_mortar_pestle_icon_eecb1c96.png';
import plusImg from '@assets/generated_images/Transparent_plus_sign_icon_cf75231e.png';
import womanImg from '@assets/generated_images/Transparent_woman_simple_icon_8e788572.png';
import differentImg from '@assets/generated_images/Transparent_different_arrows_icon_9823fc49.png';

const imageMap: Record<string, string> = {
  pomegranate: pomegranateImg,
  mango: mangoImg,
  tamarind: tamarindImg,
  owl: owlImg,
  clock: clockImg,
  moon: moonImg,
  glasses: glassesImg,
  wool: woolImg,
  upArrow: upArrowImg,
  dew: dewImg,
  helpingHands: helpingHandsImg,
  pointing: pointingImg,
  easy: easyImg,
  respect: respectImg,
  hope: hopeImg,
  sage: sageImg,
  money: moneyImg,
  one: oneImg,
  faith: faithImg,
  mortar: mortarImg,
  plus: plusImg,
  woman: womanImg,
  different: differentImg,
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
      { word: "अलग", transliteration: "alag", meaning: "Different", image: "different" },
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
      { word: "आसान", transliteration: "aasan", meaning: "Easy", image: "easy" },
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
      { word: "इज्ज़त", transliteration: "izzat", meaning: "Respect", image: "respect" },
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
      { word: "ईमान", transliteration: "eeman", meaning: "Faith", image: "faith" },
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
      { word: "उम्मीद", transliteration: "ummeed", meaning: "Hope", image: "hope" },
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
      { word: "ऊन", transliteration: "oon", meaning: "Wool", image: "wool" },
      { word: "ऊपर", transliteration: "oopar", meaning: "Above", image: "upArrow" },
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
      { word: "ऋषि", transliteration: "rishi", meaning: "Sage", image: "sage" },
      { word: "ऋण", transliteration: "rin", meaning: "Debt", image: "money" },
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
      { word: "एक", transliteration: "ek", meaning: "One", image: "one" },
      { word: "एहसान", transliteration: "ehsaan", meaning: "Favor", image: "helpingHands" },
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
      { word: "ऐनक", transliteration: "ainak", meaning: "Glasses", image: "glasses" },
      { word: "ऐसा", transliteration: "aisa", meaning: "Like this", image: "pointing" },
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
      { word: "ओखली", transliteration: "okhli", meaning: "Mortar", image: "mortar" },
      { word: "ओस", transliteration: "os", meaning: "Dew", image: "dew" },
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
      { word: "और", transliteration: "aur", meaning: "And/More", image: "plus" },
      { word: "औरत", transliteration: "aurat", meaning: "Woman", image: "woman" },
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
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
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

        <div className="bg-white rounded-2xl shadow-xl p-5 text-center border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-2 right-2 w-12 h-12 opacity-60">
            <img src={tigerMascot} alt="Tiger mascot" className="w-full h-full object-contain" />
          </div>
          
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
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-md p-1">
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
