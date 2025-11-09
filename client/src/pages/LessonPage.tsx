import React from "react";
import { Link, useParams, useLocation } from "wouter";
import { Volume2, X, ChevronLeft } from "lucide-react";
import { MandalaPattern } from '../components/DecorativePattern';
import { 
  VOWEL_SECTIONS, 
  CONSONANT_SECTIONS, 
  MATRA_SECTIONS,
  getVowelSectionInfo,
  getConsonantSectionInfo,
  getMatraSectionInfo,
  calculateProgress as calcProgress
} from '../utils/sectionStructure';

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
      { word: "इंडिया", transliteration: "india", meaning: "India", image: "different" },
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
      { word: "ईंट", transliteration: "eent", meaning: "Brick", image: "different" },
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
      { word: "ऊंचा", transliteration: "ooncha", meaning: "Tall/High", image: "upArrow" },
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
      { word: "एक्टर", transliteration: "actor", meaning: "Actor", image: "woman" },
    ],
    sentence: "एक बार और (Ek baar aur - One more time)",
    nextLesson: "9",
    pageNumber: 8,
  },
  "9": {
    title: "Lesson 9 : Vowels",
    character: "ऐ",
    transliteration: "ai",
    sound: '"ai" (like "e" in bet)',
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
      { word: "ओके", transliteration: "okay", meaning: "Okay", image: "easy" },
      { word: "ओर", transliteration: "or", meaning: "Side/Direction", image: "pointing" },
    ],
    sentence: "ओ भाई (O bhai - Hey brother)",
    nextLesson: "11",
    pageNumber: 10,
  },
  "11": {
    title: "Lesson 11 : Vowels",
    character: "औ",
    transliteration: "ao",
    sound: '"aw"',
    sampleWords: [
      { word: "और", transliteration: "aur", meaning: "And/More", image: "plus" },
      { word: "औरत", transliteration: "aurat", meaning: "Woman", image: "woman" },
    ],
    sentence: "और क्या? (Aur kya? - What else?)",
    nextLesson: "practice/5",
    pageNumber: 11,
  },
  "c1": {
    title: "Lesson 1 : Consonants",
    character: "क",
    transliteration: "ka",
    sound: '"k" as in kite',
    sampleWords: [
      { word: "कल", transliteration: "kal", meaning: "Tomorrow", image: "clock" },
      { word: "कम", transliteration: "kam", meaning: "Less", image: "easy" },
    ],
    sentence: "कल आना (Kal aana - Come tomorrow)",
    nextLesson: "c2",
    pageNumber: 1,
  },
  "c2": {
    title: "Lesson 2 : Consonants",
    character: "ख",
    transliteration: "kha",
    sound: '"kh"',
    sampleWords: [
      { word: "खिलाड़ी", transliteration: "khilaadi", meaning: "Player", image: "respect" },
      { word: "खाना", transliteration: "khaana", meaning: "Food", image: "mango" },
    ],
    sentence: "खाना स्वादिष्ट है (Khaana swadisht hai - The food is delicious)",
    nextLesson: "practice/c1",
    pageNumber: 2,
  },
  "c3": {
    title: "Lesson 3 : Consonants",
    character: "ग",
    transliteration: "ga",
    sound: '"g"',
    sampleWords: [
      { word: "गाड़ी", transliteration: "gaadi", meaning: "Car", image: "different" },
      { word: "गाना", transliteration: "gaana", meaning: "Song", image: "easy" },
    ],
    sentence: "वह गाना गा रहा है (Vah gaana ga raha hai - He is singing)",
    nextLesson: "c4",
    pageNumber: 3,
  },
  "c4": {
    title: "Lesson 4 : Consonants",
    character: "घ",
    transliteration: "gha",
    sound: '"gh"',
    sampleWords: [
      { word: "घर", transliteration: "ghar", meaning: "House", image: "respect" },
      { word: "घड़ी", transliteration: "ghadi", meaning: "Clock", image: "clock" },
    ],
    sentence: "यह मेरा घर है (Yah mera ghar hai - This is my house)",
    nextLesson: "practice/c2",
    pageNumber: 4,
  },
  "c5": {
    title: "Lesson 5 : Consonants",
    character: "च",
    transliteration: "cha",
    sound: '"ch"',
    sampleWords: [
      { word: "चाय", transliteration: "chaay", meaning: "Tea", image: "mango" },
      { word: "चाबी", transliteration: "chaabi", meaning: "Key", image: "different" },
    ],
    sentence: "मुझे चाय पसंद है (Mujhe chaay pasand hai - I like tea)",
    nextLesson: "c6",
    pageNumber: 5,
  },
  "c6": {
    title: "Lesson 6 : Consonants",
    character: "छ",
    transliteration: "chha",
    sound: '"chh"',
    sampleWords: [
      { word: "छाता", transliteration: "chhaata", meaning: "Umbrella", image: "upArrow" },
      { word: "छोटा", transliteration: "chhota", meaning: "Small", image: "easy" },
    ],
    sentence: "वह छोटा लड़का है (Vah chhota ladka hai - He is a small boy)",
    nextLesson: "practice/c3",
    pageNumber: 6,
  },
  "c7": {
    title: "Lesson 7 : Consonants",
    character: "ज",
    transliteration: "ja",
    sound: '"j"',
    sampleWords: [
      { word: "जहाज़", transliteration: "jahaaz", meaning: "Ship", image: "different" },
      { word: "जंगल", transliteration: "jangal", meaning: "Forest", image: "hope" },
    ],
    sentence: "जंगल में जानवर रहते हैं (Jangal mein jaanwar rahte hain - Animals live in forest)",
    nextLesson: "c8",
    pageNumber: 7,
  },
  "c8": {
    title: "Lesson 8 : Consonants",
    character: "झ",
    transliteration: "jha",
    sound: '"jh"',
    sampleWords: [
      { word: "झंडा", transliteration: "jhanda", meaning: "Flag", image: "respect" },
      { word: "झरना", transliteration: "jharna", meaning: "Waterfall", image: "dew" },
    ],
    sentence: "झरना सुंदर है (Jharna sundar hai - The waterfall is beautiful)",
    nextLesson: "practice/c4",
    pageNumber: 8,
  },
  "c9": {
    title: "Lesson 9 : Consonants",
    character: "ट",
    transliteration: "ṭa",
    sound: '"t" (retroflex)',
    sampleWords: [
      { word: "टमाटर", transliteration: "tamaatar", meaning: "Tomato", image: "pomegranate" },
      { word: "टोपी", transliteration: "topi", meaning: "Hat", image: "glasses" },
    ],
    sentence: "टमाटर लाल है (Tamaatar laal hai - The tomato is red)",
    nextLesson: "c10",
    pageNumber: 9,
  },
  "c10": {
    title: "Lesson 10 : Consonants",
    character: "ठ",
    transliteration: "ṭha",
    sound: '"th" (aspirated)',
    sampleWords: [
      { word: "ठंडा", transliteration: "thanda", meaning: "Cold", image: "dew" },
      { word: "ठीक", transliteration: "theek", meaning: "Okay", image: "respect" },
    ],
    sentence: "पानी ठंडा है (Paani thanda hai - The water is cold)",
    nextLesson: "practice/c5",
    pageNumber: 10,
  },
  "c11": {
    title: "Lesson 11 : Consonants",
    character: "ड",
    transliteration: "ḍa",
    sound: '"d" (retroflex)',
    sampleWords: [
      { word: "डॉक्टर", transliteration: "doctor", meaning: "Doctor", image: "respect" },
      { word: "डर", transliteration: "dar", meaning: "Fear", image: "different" },
    ],
    sentence: "डॉक्टर अच्छे हैं (Doctor acche hain - The doctor is good)",
    nextLesson: "c12",
    pageNumber: 11,
  },
  "c12": {
    title: "Lesson 12 : Consonants",
    character: "ढ",
    transliteration: "ḍha",
    sound: '"dh" (retroflex)',
    sampleWords: [
      { word: "ढोल", transliteration: "dhol", meaning: "Drum", image: "different" },
      { word: "ढक्कन", transliteration: "dhakkan", meaning: "Lid", image: "glasses" },
    ],
    sentence: "ढोल की आवाज़ तेज़ है (Dhol ki aavaaz tez hai - The drum is loud)",
    nextLesson: "practice/c6",
    pageNumber: 12,
  },
  "c13": {
    title: "Lesson 13 : Consonants",
    character: "त",
    transliteration: "ta",
    sound: '"t" (dental)',
    sampleWords: [
      { word: "तरबूज", transliteration: "tarbooz", meaning: "Watermelon", image: "pomegranate" },
      { word: "ताला", transliteration: "taala", meaning: "Lock", image: "different" },
    ],
    sentence: "तरबूज मीठा है (Tarbooz meetha hai - The watermelon is sweet)",
    nextLesson: "c14",
    pageNumber: 13,
  },
  "c14": {
    title: "Lesson 14 : Consonants",
    character: "थ",
    transliteration: "tha",
    sound: '"th" (dental)',
    sampleWords: [
      { word: "थाली", transliteration: "thaali", meaning: "Plate", image: "mortar" },
      { word: "थक", transliteration: "thak", meaning: "Tired", image: "different" },
    ],
    sentence: "थाली में खाना है (Thaali mein khaana hai - Food is on the plate)",
    nextLesson: "practice/c7",
    pageNumber: 14,
  },
  "c15": {
    title: "Lesson 15 : Consonants",
    character: "द",
    transliteration: "da",
    sound: '"d"',
    sampleWords: [
      { word: "दरवाज़ा", transliteration: "darwaza", meaning: "Door", image: "different" },
      { word: "दूध", transliteration: "doodh", meaning: "Milk", image: "mango" },
    ],
    sentence: "दरवाज़ा खोलो (Darwaza kholo - Open the door)",
    nextLesson: "c16",
    pageNumber: 15,
  },
  "c16": {
    title: "Lesson 16 : Consonants",
    character: "ध",
    transliteration: "dha",
    sound: '"dh"',
    sampleWords: [
      { word: "धोना", transliteration: "dhona", meaning: "To wash", image: "dew" },
      { word: "धूप", transliteration: "dhoop", meaning: "Sunlight", image: "moon" },
    ],
    sentence: "हाथ धोना है (Haath dhona hai - Need to wash hands)",
    nextLesson: "practice/c8",
    pageNumber: 16,
  },
  "c17": {
    title: "Lesson 17 : Consonants",
    character: "प",
    transliteration: "pa",
    sound: '"p"',
    sampleWords: [
      { word: "पानी", transliteration: "paani", meaning: "Water", image: "dew" },
      { word: "पत्ता", transliteration: "patta", meaning: "Leaf", image: "hope" },
    ],
    sentence: "पानी पी लो (Paani pee lo - Drink water)",
    nextLesson: "c18",
    pageNumber: 17,
  },
  "c18": {
    title: "Lesson 18 : Consonants",
    character: "फ",
    transliteration: "pha",
    sound: '"ph/f"',
    sampleWords: [
      { word: "फल", transliteration: "phal", meaning: "Fruit", image: "pomegranate" },
      { word: "फूल", transliteration: "phool", meaning: "Flower", image: "hope" },
    ],
    sentence: "फल सेहतमंद है (Phal sehatmand hai - Fruit is healthy)",
    nextLesson: "practice/c9",
    pageNumber: 18,
  },
  "c19": {
    title: "Lesson 19 : Consonants",
    character: "ब",
    transliteration: "ba",
    sound: '"b"',
    sampleWords: [
      { word: "बंदर", transliteration: "bandar", meaning: "Monkey", image: "owl" },
      { word: "बाल", transliteration: "baal", meaning: "Hair", image: "wool" },
    ],
    sentence: "बंदर पेड़ पर है (Bandar ped par hai - Monkey is on the tree)",
    nextLesson: "c20",
    pageNumber: 19,
  },
  "c20": {
    title: "Lesson 20 : Consonants",
    character: "भ",
    transliteration: "bha",
    sound: '"bh"',
    sampleWords: [
      { word: "भालू", transliteration: "bhaalu", meaning: "Bear", image: "owl" },
      { word: "भाई", transliteration: "bhai", meaning: "Brother", image: "respect" },
    ],
    sentence: "भालू बड़ा है (Bhaalu bada hai - The bear is big)",
    nextLesson: "practice/c10",
    pageNumber: 20,
  },
  "c21": {
    title: "Lesson 21 : Consonants",
    character: "न",
    transliteration: "na",
    sound: '"n"',
    sampleWords: [
      { word: "नमक", transliteration: "namak", meaning: "Salt", image: "different" },
      { word: "नाक", transliteration: "naak", meaning: "Nose", image: "pointing" },
    ],
    sentence: "नमक ज़रूरी है (Namak zaroori hai - Salt is essential)",
    nextLesson: "c22",
    pageNumber: 21,
  },
  "c22": {
    title: "Lesson 22 : Consonants",
    character: "म",
    transliteration: "ma",
    sound: '"m"',
    sampleWords: [
      { word: "मकान", transliteration: "makaan", meaning: "House", image: "respect" },
      { word: "माँ", transliteration: "maa", meaning: "Mother", image: "woman" },
    ],
    sentence: "यह मेरा मकान है (Yah mera makaan hai - This is my house)",
    nextLesson: "practice/c11",
    pageNumber: 22,
  },
  "c23": {
    title: "Lesson 23 : Consonants",
    character: "य",
    transliteration: "ya",
    sound: '"y"',
    sampleWords: [
      { word: "यात्रा", transliteration: "yaatra", meaning: "Journey", image: "different" },
      { word: "याद", transliteration: "yaad", meaning: "Memory", image: "hope" },
    ],
    sentence: "यात्रा लंबी थी (Yaatra lambi thi - The journey was long)",
    nextLesson: "c24",
    pageNumber: 23,
  },
  "c24": {
    title: "Lesson 24 : Consonants",
    character: "र",
    transliteration: "ra",
    sound: '"r"',
    sampleWords: [
      { word: "रोटी", transliteration: "roti", meaning: "Bread", image: "different" },
      { word: "राजा", transliteration: "raja", meaning: "King", image: "respect" },
    ],
    sentence: "रोटी तैयार है (Roti taiyaar hai - The bread is ready)",
    nextLesson: "practice/c12",
    pageNumber: 24,
  },
  "c25": {
    title: "Lesson 25 : Consonants",
    character: "ल",
    transliteration: "la",
    sound: '"l"',
    sampleWords: [
      { word: "लड़का", transliteration: "ladka", meaning: "Boy", image: "respect" },
      { word: "लाल", transliteration: "laal", meaning: "Red", image: "pomegranate" },
    ],
    sentence: "लड़का पढ़ रहा है (Ladka padh raha hai - The boy is studying)",
    nextLesson: "c26",
    pageNumber: 25,
  },
  "c26": {
    title: "Lesson 26 : Consonants",
    character: "व",
    transliteration: "va",
    sound: '"v/w"',
    sampleWords: [
      { word: "वृक्ष", transliteration: "vriksh", meaning: "Tree", image: "hope" },
      { word: "वर्षा", transliteration: "varsha", meaning: "Rain", image: "dew" },
    ],
    sentence: "वृक्ष हरा है (Vriksh hara hai - The tree is green)",
    nextLesson: "practice/c13",
    pageNumber: 26,
  },
  "c27": {
    title: "Lesson 27 : Consonants",
    character: "श",
    transliteration: "sha",
    sound: '"sh"',
    sampleWords: [
      { word: "शेर", transliteration: "sher", meaning: "Lion", image: "owl" },
      { word: "शांति", transliteration: "shanti", meaning: "Peace", image: "hope" },
    ],
    sentence: "शेर जंगल में है (Sher jangal mein hai - The lion is in the forest)",
    nextLesson: "c28",
    pageNumber: 27,
  },
  "c28": {
    title: "Lesson 28 : Consonants",
    character: "ष",
    transliteration: "ṣa",
    sound: '"sh" (retroflex)',
    sampleWords: [
      { word: "षड्यंत्र", transliteration: "shadyantra", meaning: "Conspiracy", image: "different" },
      { word: "षट्कोण", transliteration: "shatkona", meaning: "Hexagon", image: "glasses" },
    ],
    sentence: "षट्कोण में छह भुजाएँ हैं (Shatkona mein chhah bhujaen hain - Hexagon has six sides)",
    nextLesson: "practice/c14",
    pageNumber: 28,
  },
  "c29": {
    title: "Lesson 29 : Consonants",
    character: "स",
    transliteration: "sa",
    sound: '"s"',
    sampleWords: [
      { word: "सूरज", transliteration: "sooraj", meaning: "Sun", image: "moon" },
      { word: "सेब", transliteration: "seb", meaning: "Apple", image: "pomegranate" },
    ],
    sentence: "सूरज उगा है (Sooraj uga hai - The sun has risen)",
    nextLesson: "c30",
    pageNumber: 29,
  },
  "c30": {
    title: "Lesson 30 : Consonants",
    character: "ह",
    transliteration: "ha",
    sound: '"h"',
    sampleWords: [
      { word: "हाथी", transliteration: "haathi", meaning: "Elephant", image: "owl" },
      { word: "हवा", transliteration: "hawa", meaning: "Wind", image: "upArrow" },
    ],
    sentence: "हाथी बड़ा है (Haathi bada hai - The elephant is big)",
    nextLesson: "practice/c15",
    pageNumber: 30,
  },
  "c31": {
    title: "Lesson 31 : Consonants",
    character: "क्ष",
    transliteration: "kṣa",
    sound: '"ksha"',
    sampleWords: [
      { word: "क्षमता", transliteration: "kshamata", meaning: "Ability", image: "respect" },
      { word: "क्षमा", transliteration: "kshama", meaning: "Forgiveness", image: "hope" },
    ],
    sentence: "उसमें क्षमता है (Usmein kshamata hai - He has ability)",
    nextLesson: "c32",
    pageNumber: 31,
  },
  "c32": {
    title: "Lesson 32 : Consonants",
    character: "त्र",
    transliteration: "tra",
    sound: '"tra"',
    sampleWords: [
      { word: "त्रिकोण", transliteration: "trikon", meaning: "Triangle", image: "glasses" },
      { word: "त्योहार", transliteration: "tyohaar", meaning: "Festival", image: "hope" },
    ],
    sentence: "त्रिकोण के तीन भुजाएँ हैं (Trikon ke teen bhujaen hain - Triangle has three sides)",
    nextLesson: "c33",
    pageNumber: 32,
  },
  "c33": {
    title: "Lesson 33 : Consonants",
    character: "ज्ञ",
    transliteration: "gya",
    sound: '"gya"',
    sampleWords: [
      { word: "ज्ञान", transliteration: "gyaan", meaning: "Knowledge", image: "respect" },
      { word: "विज्ञान", transliteration: "vigyaan", meaning: "Science", image: "hope" },
    ],
    sentence: "ज्ञान महत्वपूर्ण है (Gyaan mahatvpoorn hai - Knowledge is important)",
    nextLesson: "practice/c16",
    pageNumber: 33,
  },
  "m1": {
    title: "Lesson 1 : Matra",
    character: "◌ा (का)",
    transliteration: "aa",
    sound: '"aa"',
    sampleWords: [
      { word: "राम", transliteration: "Raam", meaning: "Ram", image: "sage" },
      { word: "नाम", transliteration: "Naam", meaning: "Name", image: "pointing" },
    ],
    sentence: "मेरा नाम राहुल है (Mera naam Rahul hai - My name is Rahul)",
    nextLesson: "practice/m1",
    pageNumber: 1,
  },
  "m2": {
    title: "Lesson 2 : Matra",
    character: "◌ि (कि)",
    transliteration: "i",
    sound: '"i" (short "ee")',
    sampleWords: [
      { word: "मिठाई", transliteration: "Mithai", meaning: "Sweet", image: "respect" },
      { word: "दिल", transliteration: "Dil", meaning: "Heart", image: "love" },
    ],
    sentence: "मुझे मिठाई चाहिए (Mujhe mithai chahiye - I want sweets)",
    nextLesson: "m3",
    pageNumber: 2,
  },
  "m3": {
    title: "Lesson 3 : Matra",
    character: "◌ी (की)",
    transliteration: "ee",
    sound: '"ee" (long)',
    sampleWords: [
      { word: "चाबी", transliteration: "Chaabi", meaning: "Key", image: "helpingHands" },
      { word: "दीप", transliteration: "Deep", meaning: "Lamp", image: "hope" },
    ],
    sentence: "चाबी मेज़ पर है (Chaabi mez par hai - The key is on the table)",
    nextLesson: "practice/m2",
    pageNumber: 3,
  },
  "m4": {
    title: "Lesson 4 : Matra",
    character: "◌ु (कु)",
    transliteration: "u",
    sound: '"oo" (short)',
    sampleWords: [
      { word: "कुछ", transliteration: "Kuch", meaning: "Something", image: "pointing" },
      { word: "गुड़", transliteration: "Gur", meaning: "Jaggery", image: "pomegranate" },
    ],
    sentence: "मुझे कुछ चाहिए (Mujhe kuch chahiye - I want something)",
    nextLesson: "m5",
    pageNumber: 4,
  },
  "m5": {
    title: "Lesson 5 : Matra",
    character: "◌ू (कू)",
    transliteration: "oo",
    sound: '"ooo" (long)',
    sampleWords: [
      { word: "सूई", transliteration: "Sui", meaning: "Needle", image: "helpingHands" },
      { word: "झूला", transliteration: "Jhoola", meaning: "Swing", image: "hope" },
    ],
    sentence: "बच्चे झूला झूल रहे हैं (Bacche jhoola jhool rahe hain - The children are swinging)",
    nextLesson: "practice/m3",
    pageNumber: 5,
  },
  "m6": {
    title: "Lesson 6 : Matra",
    character: "◌ृ (कृ)",
    transliteration: "ri",
    sound: '"ree"',
    sampleWords: [
      { word: "कृपा", transliteration: "Kripa", meaning: "Blessing", image: "faith" },
    ],
    sentence: "भगवान की कृपा है (Bhagwan ki kripa hai - It's God's blessing)",
    nextLesson: "m11",
    pageNumber: 6,
  },
  "m7": {
    title: "Lesson 7 : Matra",
    character: "◌े (के)",
    transliteration: "e",
    sound: '"ay"',
    sampleWords: [
      { word: "देव", transliteration: "Dev", meaning: "God", image: "faith" },
      { word: "नेल", transliteration: "Nail", meaning: "Nail", image: "helpingHands" },
    ],
    sentence: "देव मंदिर में हैं (Dev mandir mein hain - The god is in the temple)",
    nextLesson: "m8",
    pageNumber: 7,
  },
  "m8": {
    title: "Lesson 8 : Matra",
    character: "◌ै (कै)",
    transliteration: "ai",
    sound: '"ah-ay"',
    sampleWords: [
      { word: "मैला", transliteration: "Maila", meaning: "Dirty", image: "dew" },
      { word: "ऐनक", transliteration: "Ainak", meaning: "Glasses", image: "glasses" },
    ],
    sentence: "मेरी ऐनक नई है (Meri ainak nayi hai - My glasses are new)",
    nextLesson: "practice/m4",
    pageNumber: 8,
  },
  "m9": {
    title: "Lesson 9 : Matra",
    character: "◌ो (को)",
    transliteration: "o",
    sound: '"oh"',
    sampleWords: [
      { word: "मोती", transliteration: "Moti", meaning: "Pearl", image: "hope" },
      { word: "सोना", transliteration: "Sona", meaning: "Gold", image: "money" },
    ],
    sentence: "सोना महँगा है (Sona mahanga hai - Gold is expensive)",
    nextLesson: "m10",
    pageNumber: 9,
  },
  "m10": {
    title: "Lesson 10 : Matra",
    character: "◌ौ (कौ)",
    transliteration: "ao",
    sound: '"ah-oh"',
    sampleWords: [
      { word: "कौआ", transliteration: "Kauaa", meaning: "Crow", image: "owl" },
      { word: "दौड़", transliteration: "Daud", meaning: "Race", image: "upArrow" },
    ],
    sentence: "कौआ उड़ गया (Kauaa ud gaya - The crow flew away)",
    nextLesson: "practice/m5",
    pageNumber: 10,
  },
  "m11": {
    title: "Lesson 11 : Matra",
    character: "◌ं (कं)",
    transliteration: "an",
    sound: '"nasal n"',
    sampleWords: [
      { word: "संगीत", transliteration: "Sangeet", meaning: "Music", image: "hope" },
      { word: "अंगूर", transliteration: "Angoor", meaning: "Grapes", image: "pomegranate" },
    ],
    sentence: "संगीत अच्छा है (Sangeet accha hai - The music is good)",
    nextLesson: "practice/m6",
    pageNumber: 11,
  },
  "m12": {
    title: "Lesson 12 : Matra",
    character: "◌ः (कः)",
    transliteration: "h",
    sound: '"visarga h"',
    sampleWords: [
      { word: "दुःख", transliteration: "Dukh", meaning: "Sorrow", image: "hope" },
    ],
    sentence: "दुःख और सुख जीवन का भाग हैं (Dukh aur sukh jeevan ka bhaag hain - Joy and sorrow are part of life)",
    nextLesson: "m13",
    pageNumber: 12,
  },
  "m13": {
    title: "Lesson 13 : Matra",
    character: "◌ँ (कँ)",
    transliteration: "añ",
    sound: '"nasalized vowel"',
    sampleWords: [
      { word: "अँधेरा", transliteration: "Andhera", meaning: "Darkness", image: "moon" },
      { word: "साँप", transliteration: "Saap", meaning: "Snake", image: "wool" },
    ],
    sentence: "साँप पेड़ पर है (Saap ped par hai - The snake is on the tree)",
    nextLesson: "practice/m7",
    pageNumber: 13,
  },
};

export default function LessonPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const location = useLocation()[0];
  const lessonId = params.id as string;
  const lesson = lessonData[lessonId];
  
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');

  if (!lesson) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Lesson not found</p></div>;
  }

  const handleNext = () => {
    if (lesson.nextLesson) {
      let basePath = '/script/lesson/vowels/';
      if (isConsonant) basePath = '/script/lesson/consonants/';
      if (isMatra) basePath = '/script/lesson/matra/';
      setLocation(`${basePath}${lesson.nextLesson}`);
    }
  };

  const highlightCharacter = (word: string, character: string) => {
    const parts = word.split(character);
    if (parts.length === 1) return word;
    
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && <strong className="font-extrabold">{character}</strong>}
          </span>
        ))}
      </>
    );
  };

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

  // Calculate progress based on lesson position using centralized structure
  const progress = (() => {
    if (isMatra) {
      const { section, lessonInSection } = getMatraSectionInfo(lessonId);
      const sectionStructure = MATRA_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    } else if (isConsonant) {
      const { section, lessonInSection } = getConsonantSectionInfo(lesson.pageNumber);
      const sectionStructure = CONSONANT_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    } else {
      const { section, lessonInSection } = getVowelSectionInfo(lesson.pageNumber);
      const sectionStructure = VOWEL_SECTIONS[section - 1];
      return calcProgress('lesson', sectionStructure, lessonInSection);
    }
  })();

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      
      // Wait for voices to load and select a Hindi voice
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
      
      // Check if voices are already loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoice();
      } else {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = setVoice;
      }
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <Link href={isMatra ? "/script/matra/sections" : (isConsonant ? "/script/consonants/sections" : "/script/vowels/sections")}>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
          <Link href={isMatra ? "/script/matra/sections" : (isConsonant ? "/script/consonants/sections" : "/script/vowels/sections")}>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </Link>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-5 text-center border border-gray-100 flex-1 flex flex-col justify-between overflow-hidden animate-slide-in-up relative">
          <MandalaPattern className="absolute top-2 right-2 w-12 h-12 opacity-20" color="#2E86AB" />
          
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

          {lesson.sampleWords && lesson.sampleWords.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <p className="text-sm text-gray-500 font-medium">Sample Word{lesson.sampleWords.length > 1 ? 's' : ''}</p>
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
                        <div className="text-2xl font-bold text-black mb-0.5">
                          {sample.word}
                        </div>
                        <p className="text-gray-400 italic text-xs">{sample.transliteration}</p>
                        <p className="text-gray-600 text-xs">{sample.meaning}</p>
                      </div>
                      <button 
                        onClick={() => speak(sample.word)}
                        className="text-[#ff9930] hover:text-[#CF7B24] transition-colors p-2 hover:bg-orange-50 rounded-full flex-shrink-0"
                        data-testid={`button-speak-word-${index}`}
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
                    <p className="text-gray-900 text-base font-semibold">{highlightCharacter(parsed.hindi, lesson.character)}</p>
                    {parsed.transliteration && <p className="text-gray-600 text-sm italic">{parsed.transliteration}</p>}
                    {parsed.translation && <p className="text-gray-500 text-xs">{parsed.translation}</p>}
                  </div>
                );
              })()}
            </div>
          )}

          <button 
            onClick={handleNext}
            className="w-full py-3.5 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg btn-bounce"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
