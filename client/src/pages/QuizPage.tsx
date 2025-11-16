import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { X, ChevronLeft } from "lucide-react";
import confetti from 'canvas-confetti';
import tigerThinking from '@assets/generated_images/Thinking_tiger_transparent_d7773890.png';
import tigerWaving from '@assets/generated_images/Waving_tiger_transparent_9a08bf58.png';
import { 
  VOWEL_SECTIONS, 
  CONSONANT_SECTIONS, 
  MATRA_SECTIONS,
  SIMILAR_SECTIONS,
  calculateProgress as calcProgress
} from '../utils/sectionStructure';

const encouragingMessages = [
  "शाबाश! (Shaabash!)",
  "बहुत अच्छे! (Bahut acche!)",
  "कमाल है! (Kamaal hai!)",
  "Fantastic!",
  "Excellent!",
  "Amazing work!",
  "You're doing great!",
  "Perfect!",
];

const getRandomMessage = () => {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
};

const formatOptionLabel = (quizType: string, option: any, mode: 'quiz' | 'results') => {
  if (quizType === 'word') {
    if (mode === 'quiz') {
      return option.hindi;
    } else {
      return `${option.hindi} (${option.transliteration})`;
    }
  } else {
    return option.text;
  }
};

const quizData: Record<string, any> = {
  "1a": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "What is अ?",
    type: "sound",
    options: [
      { text: "uh", correct: true },
      { text: "aa", correct: false },
    ],
    pageNumber: "Quiz 1a",
    nextLesson: "1b",
  },
  "1b": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "What is आ?",
    type: "sound",
    options: [
      { text: "uh", correct: false },
      { text: "aa", correct: true },
    ],
    pageNumber: "Quiz 1b",
    nextLesson: "1c",
  },
  "1c": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "Which word starts with a short 'a' sound?",
    type: "word",
    options: [
      { hindi: "आम", transliteration: "Aam", correct: false },
      { hindi: "अनार", transliteration: "Anar", correct: true },
      { hindi: "इमली", transliteration: "Imli", correct: false },
      { hindi: "अभी", transliteration: "Abhi", correct: true },
    ],
    pageNumber: "Quiz 1c",
    nextLesson: "1d",
  },
  "1d": {
    title: "Quiz 1 : Vowels",
    char1: "अ",
    char2: "आ",
    subQuestion: "Which word starts with a long 'a' sound?",
    type: "word",
    options: [
      { hindi: "आम", transliteration: "Aam", correct: true },
      { hindi: "अनार", transliteration: "Anar", correct: false },
      { hindi: "अलग", transliteration: "Alag", correct: false },
      { hindi: "अभी", transliteration: "Abhi", correct: false },
    ],
    pageNumber: "1d",
    nextLesson: "/script/vowels/sections",
  },
  "2a": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "What is इ?",
    type: "sound",
    options: [
      { text: "ee", correct: true },
      { text: "eee", correct: false },
    ],
    pageNumber: "Quiz 2a",
    nextLesson: "2b",
  },
  "2b": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "What is ई?",
    type: "sound",
    options: [
      { text: "ee", correct: false },
      { text: "eee", correct: true },
    ],
    pageNumber: "Quiz 2b",
    nextLesson: "2c",
  },
  "2c": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "Which word starts with a short 'i' sound?",
    type: "word",
    options: [
      { hindi: "इंडिया", transliteration: "India", correct: true },
      { hindi: "ईद", transliteration: "Eed", correct: false },
      { hindi: "इज्ज़त", transliteration: "Izzat", correct: true },
      { hindi: "अनार", transliteration: "Anar", correct: false },
    ],
    pageNumber: "Quiz 2c",
    nextLesson: "2d",
  },
  "2d": {
    title: "Quiz 2 : Vowels",
    char1: "इ",
    char2: "ई",
    subQuestion: "Which word starts with a long 'i' sound?",
    type: "word",
    options: [
      { hindi: "इंडिया", transliteration: "India", correct: false },
      { hindi: "ईद", transliteration: "Eed", correct: true },
      { hindi: "इज्ज़त", transliteration: "Izzat", correct: false },
      { hindi: "अभी", transliteration: "Abhi", correct: false },
    ],
    pageNumber: "Quiz 2d",
    nextLesson: "/script/vowels/sections",
  },
  "3a": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "What is उ?",
    type: "sound",
    options: [
      { text: "oo", correct: true },
      { text: "ooo", correct: false },
    ],
    pageNumber: "Quiz 3a",
    nextLesson: "3b",
  },
  "3b": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "What is ऊ?",
    type: "sound",
    options: [
      { text: "oo", correct: false },
      { text: "ooo", correct: true },
    ],
    pageNumber: "Quiz 3b",
    nextLesson: "3c",
  },
  "3c": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "Which word starts with a short 'u' sound?",
    type: "word",
    options: [
      { hindi: "उल्लू", transliteration: "Ullu", correct: true },
      { hindi: "ऊंचा", transliteration: "Ooncha", correct: false },
      { hindi: "उम्मीद", transliteration: "Ummeed", correct: true },
      { hindi: "ईद", transliteration: "Eed", correct: false },
    ],
    pageNumber: "Quiz 3c",
    nextLesson: "3d",
  },
  "3d": {
    title: "Quiz 3 : Vowels",
    char1: "उ",
    char2: "ऊ",
    subQuestion: "Which word starts with a long 'u' sound?",
    type: "word",
    options: [
      { hindi: "उल्लू", transliteration: "Ullu", correct: false },
      { hindi: "ऊंचा", transliteration: "Ooncha", correct: true },
      { hindi: "उम्मीद", transliteration: "Ummeed", correct: false },
      { hindi: "इंडिया", transliteration: "India", correct: false },
    ],
    pageNumber: "Quiz 3d",
    nextLesson: "/script/vowels/sections",
  },
  "4a": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "What is ए?",
    type: "sound",
    options: [
      { text: "ay", correct: true },
      { text: "ai", correct: false },
    ],
    pageNumber: "Quiz 4a",
    nextLesson: "4b",
  },
  "4b": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "What is ऐ?",
    type: "sound",
    options: [
      { text: "ay", correct: false },
      { text: "ai", correct: true },
    ],
    pageNumber: "Quiz 4b",
    nextLesson: "4c",
  },
  "4c": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "Which word starts with an 'e' sound?",
    type: "word",
    options: [
      { hindi: "एक", transliteration: "Ek", correct: true },
      { hindi: "ऐनक", transliteration: "Ainak", correct: false },
      { hindi: "एहसान", transliteration: "Ehsaan", correct: true },
      { hindi: "अलग", transliteration: "Alag", correct: false },
    ],
    pageNumber: "Quiz 4c",
    nextLesson: "4d",
  },
  "4d": {
    title: "Quiz 4 : Vowels",
    char1: "ए",
    char2: "ऐ",
    subQuestion: "Which word starts with an 'ai' sound?",
    type: "word",
    options: [
      { hindi: "एक", transliteration: "Ek", correct: false },
      { hindi: "ऐनक", transliteration: "Ainak", correct: true },
      { hindi: "एहसान", transliteration: "Ehsaan", correct: false },
      { hindi: "उम्मीद", transliteration: "Ummeed", correct: false },
    ],
    pageNumber: "Quiz 4d",
    nextLesson: "/script/vowels/sections",
  },
  "5a": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "What is ओ?",
    type: "sound",
    options: [
      { text: "oh", correct: true },
      { text: "aw", correct: false },
    ],
    pageNumber: "Quiz 5a",
    nextLesson: "5b",
  },
  "5b": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "What is औ?",
    type: "sound",
    options: [
      { text: "oh", correct: false },
      { text: "aw", correct: true },
    ],
    pageNumber: "Quiz 5b",
    nextLesson: "5c",
  },
  "5c": {
    title: "Quiz 5 : Vowels",
    char1: "अं",
    char2: "अः",
    subQuestion: "What is अं?",
    type: "sound",
    options: [
      { text: "an", correct: true },
      { text: "ah", correct: false },
    ],
    pageNumber: "Quiz 5c",
    nextLesson: "5d",
  },
  "5d": {
    title: "Quiz 5 : Vowels",
    char1: "अं",
    char2: "अः",
    subQuestion: "What is अः?",
    type: "sound",
    options: [
      { text: "an", correct: false },
      { text: "ah", correct: true },
    ],
    pageNumber: "Quiz 5d",
    nextLesson: "5e",
  },
  "5e": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "Which word starts with an 'o' sound?",
    type: "word",
    options: [
      { hindi: "ओम", transliteration: "Om", correct: true },
      { hindi: "औरत", transliteration: "Aurat", correct: false },
      { hindi: "ओखली", transliteration: "Okhli", correct: true },
      { hindi: "ऐनक", transliteration: "Ainak", correct: false },
    ],
    pageNumber: "Quiz 5e",
    nextLesson: "5f",
  },
  "5f": {
    title: "Quiz 5 : Vowels",
    char1: "ओ",
    char2: "औ",
    subQuestion: "Which word starts with an 'aw' sound?",
    type: "word",
    options: [
      { hindi: "कल", transliteration: "Kal", correct: false },
      { hindi: "औरत", transliteration: "Aurat", correct: true },
      { hindi: "ओखली", transliteration: "Okhli", correct: false },
      { hindi: "ओम", transliteration: "Om", correct: false },
    ],
    pageNumber: "5f",
    nextLesson: "/script/vowels/sections",
  },
  "c1a": {
    title: "Quiz 1 : Consonants",
    char1: "क",
    char2: "ख",
    subQuestion: "What is क?",
    type: "sound",
    options: [
      { text: "ka", correct: true },
      { text: "kha", correct: false },
    ],
    pageNumber: "Quiz C1a",
    nextLesson: "c1b",
  },
  "c1b": {
    title: "Quiz 1 : Consonants",
    char1: "क",
    char2: "ख",
    subQuestion: "What is ख?",
    type: "sound",
    options: [
      { text: "ka", correct: false },
      { text: "kha", correct: true },
    ],
    pageNumber: "Quiz C1b",
    nextLesson: "c1c",
  },
  "c1c": {
    title: "Quiz 1 : Consonants",
    char1: "क",
    char2: "ख",
    subQuestion: "Which word starts with क?",
    type: "word",
    options: [
      { hindi: "किताब", transliteration: "Kitaab", correct: true },
      { hindi: "खिलाड़ी", transliteration: "Khilaadi", correct: false },
      { hindi: "कमल", transliteration: "Kamal", correct: true },
      { hindi: "घर", transliteration: "Ghar", correct: false },
    ],
    pageNumber: "Quiz C1c",
    nextLesson: "c1d",
  },
  "c1d": {
    title: "Quiz 1 : Consonants",
    char1: "क",
    char2: "ख",
    subQuestion: "Which word starts with ख?",
    type: "word",
    options: [
      { hindi: "किताब", transliteration: "Kitaab", correct: false },
      { hindi: "खिलाड़ी", transliteration: "Khilaadi", correct: true },
      { hindi: "कमल", transliteration: "Kamal", correct: false },
      { hindi: "काम", transliteration: "Kam", correct: false },
    ],
    pageNumber: "Quiz C1d",
    nextLesson: "/script/consonants/sections",
  },
  "c2a": {
    title: "Quiz 2 : Consonants",
    char1: "ग",
    char2: "घ",
    subQuestion: "What is ग?",
    type: "sound",
    options: [
      { text: "ga", correct: true },
      { text: "gha", correct: false },
    ],
    pageNumber: "Quiz C2a",
    nextLesson: "c2b",
  },
  "c2b": {
    title: "Quiz 2 : Consonants",
    char1: "ग",
    char2: "घ",
    subQuestion: "Which word starts with घ?",
    type: "word",
    options: [
      { hindi: "गमला", transliteration: "Gamla", correct: false },
      { hindi: "घर", transliteration: "Ghar", correct: true },
      { hindi: "गाना", transliteration: "Gaana", correct: false },
      { hindi: "घड़ी", transliteration: "Ghadi", correct: true },
    ],
    pageNumber: "Quiz C2b",
    nextLesson: "/script/consonants/sections",
  },
  "c3a": {
    title: "Quiz 3 : Consonants",
    char1: "च",
    char2: "छ",
    subQuestion: "What is च?",
    type: "sound",
    options: [
      { text: "cha", correct: true },
      { text: "chha", correct: false },
    ],
    pageNumber: "Quiz C3a",
    nextLesson: "c3b",
  },
  "c3b": {
    title: "Quiz 3 : Consonants",
    char1: "च",
    char2: "छ",
    subQuestion: "Which word starts with छ?",
    type: "word",
    options: [
      { hindi: "चाय", transliteration: "Chaay", correct: false },
      { hindi: "छाता", transliteration: "Chhaata", correct: true },
      { hindi: "चाबी", transliteration: "Chaabi", correct: false },
      { hindi: "छोटा", transliteration: "Chhota", correct: true },
    ],
    pageNumber: "Quiz C3b",
    nextLesson: "/script/consonants/sections",
  },
  "c4a": {
    title: "Quiz 4 : Consonants",
    char1: "ज",
    char2: "झ",
    subQuestion: "What is ज?",
    type: "sound",
    options: [
      { text: "ja", correct: true },
      { text: "jha", correct: false },
    ],
    pageNumber: "Quiz C4a",
    nextLesson: "c4b",
  },
  "c4b": {
    title: "Quiz 4 : Consonants",
    char1: "ज",
    char2: "झ",
    subQuestion: "Which word starts with झ?",
    type: "word",
    options: [
      { hindi: "जहाज़", transliteration: "Jahaaz", correct: false },
      { hindi: "झंडा", transliteration: "Jhanda", correct: true },
      { hindi: "जंगल", transliteration: "Jangal", correct: false },
      { hindi: "झरना", transliteration: "Jharna", correct: true },
    ],
    pageNumber: "Quiz C4b",
    nextLesson: "/script/consonants/sections",
  },
  "c5a": {
    title: "Quiz 5 : Consonants",
    char1: "ट",
    char2: "ठ",
    subQuestion: "What is ट?",
    type: "sound",
    options: [
      { text: "ṭa", correct: true },
      { text: "ṭha", correct: false },
    ],
    pageNumber: "Quiz C5a",
    nextLesson: "c5b",
  },
  "c5b": {
    title: "Quiz 5 : Consonants",
    char1: "ट",
    char2: "ठ",
    subQuestion: "Which word starts with ठ?",
    type: "word",
    options: [
      { hindi: "टमाटर", transliteration: "Tamaatar", correct: false },
      { hindi: "ठंडा", transliteration: "Thanda", correct: true },
      { hindi: "टोपी", transliteration: "Topi", correct: false },
      { hindi: "ठीक", transliteration: "Theek", correct: true },
    ],
    pageNumber: "Quiz C5b",
    nextLesson: "/script/consonants/sections",
  },
  "c6a": {
    title: "Quiz 6 : Consonants",
    char1: "ड",
    char2: "ढ",
    subQuestion: "What is ड?",
    type: "sound",
    options: [
      { text: "ḍa", correct: true },
      { text: "ḍha", correct: false },
    ],
    pageNumber: "Quiz C6a",
    nextLesson: "c6b",
  },
  "c6b": {
    title: "Quiz 6 : Consonants",
    char1: "ड",
    char2: "ढ",
    subQuestion: "Which word starts with ढ?",
    type: "word",
    options: [
      { hindi: "डमरू", transliteration: "Damru", correct: false },
      { hindi: "ढोल", transliteration: "Dhol", correct: true },
      { hindi: "दाल", transliteration: "Daal", correct: false },
      { hindi: "ढक्कन", transliteration: "Dhakkan", correct: true },
    ],
    pageNumber: "Quiz C6b",
    nextLesson: "/script/consonants/sections",
  },
  "c7a": {
    title: "Quiz 7 : Consonants",
    char1: "त",
    char2: "थ",
    subQuestion: "What is त?",
    type: "sound",
    options: [
      { text: "ta", correct: true },
      { text: "tha", correct: false },
    ],
    pageNumber: "Quiz C7a",
    nextLesson: "c7b",
  },
  "c7b": {
    title: "Quiz 7 : Consonants",
    char1: "त",
    char2: "थ",
    subQuestion: "Which word starts with थ?",
    type: "word",
    options: [
      { hindi: "तरबूज़", transliteration: "Tarbooz", correct: false },
      { hindi: "थाली", transliteration: "Thaali", correct: true },
      { hindi: "ताला", transliteration: "Taala", correct: false },
      { hindi: "थैला", transliteration: "Thaila", correct: true },
    ],
    pageNumber: "Quiz C7b",
    nextLesson: "/script/consonants/sections",
  },
  "c8a": {
    title: "Quiz 8 : Consonants",
    char1: "द",
    char2: "ध",
    subQuestion: "What is द?",
    type: "sound",
    options: [
      { text: "da", correct: true },
      { text: "dha", correct: false },
    ],
    pageNumber: "Quiz C8a",
    nextLesson: "c8b",
  },
  "c8b": {
    title: "Quiz 8 : Consonants",
    char1: "द",
    char2: "ध",
    subQuestion: "Which word starts with ध?",
    type: "word",
    options: [
      { hindi: "दरवाज़ा", transliteration: "Darwaza", correct: false },
      { hindi: "धान", transliteration: "Dhaan", correct: true },
      { hindi: "दूध", transliteration: "Doodh", correct: false },
      { hindi: "धूप", transliteration: "Dhoop", correct: true },
    ],
    pageNumber: "Quiz C8b",
    nextLesson: "/script/consonants/sections",
  },
  "c9a": {
    title: "Quiz 9 : Consonants",
    char1: "प",
    char2: "फ",
    subQuestion: "What is प?",
    type: "sound",
    options: [
      { text: "pa", correct: true },
      { text: "pha", correct: false },
    ],
    pageNumber: "Quiz C9a",
    nextLesson: "c9b",
  },
  "c9b": {
    title: "Quiz 9 : Consonants",
    char1: "प",
    char2: "फ",
    subQuestion: "Which word starts with फ?",
    type: "word",
    options: [
      { hindi: "पानी", transliteration: "Paani", correct: false },
      { hindi: "फल", transliteration: "Phal", correct: true },
      { hindi: "पत्ता", transliteration: "Patta", correct: false },
      { hindi: "फूल", transliteration: "Phool", correct: true },
    ],
    pageNumber: "Quiz C9b",
    nextLesson: "/script/consonants/sections",
  },
  "c10a": {
    title: "Quiz 10 : Consonants",
    char1: "ब",
    char2: "भ",
    subQuestion: "What is ब?",
    type: "sound",
    options: [
      { text: "ba", correct: true },
      { text: "bha", correct: false },
    ],
    pageNumber: "Quiz C10a",
    nextLesson: "c10b",
  },
  "c10b": {
    title: "Quiz 10 : Consonants",
    char1: "ब",
    char2: "भ",
    subQuestion: "Which word starts with भ?",
    type: "word",
    options: [
      { hindi: "बंदर", transliteration: "Bandar", correct: false },
      { hindi: "भालू", transliteration: "Bhaalu", correct: true },
      { hindi: "बाल", transliteration: "Baal", correct: false },
      { hindi: "भाई", transliteration: "Bhai", correct: true },
    ],
    pageNumber: "Quiz C10b",
    nextLesson: "/script/consonants/sections",
  },
  "c11a": {
    title: "Quiz 11 : Consonants",
    char1: "न",
    char2: "म",
    subQuestion: "What is न?",
    type: "sound",
    options: [
      { text: "na", correct: true },
      { text: "ma", correct: false },
    ],
    pageNumber: "Quiz C11a",
    nextLesson: "c11b",
  },
  "c11b": {
    title: "Quiz 11 : Consonants",
    char1: "न",
    char2: "म",
    subQuestion: "Which word starts with म?",
    type: "word",
    options: [
      { hindi: "नमक", transliteration: "Namak", correct: false },
      { hindi: "मकान", transliteration: "Makaan", correct: true },
      { hindi: "नाक", transliteration: "Naak", correct: false },
      { hindi: "माँ", transliteration: "Maa", correct: true },
    ],
    pageNumber: "Quiz C11b",
    nextLesson: "/script/consonants/sections",
  },
  "c12a": {
    title: "Quiz 12 : Consonants",
    char1: "य",
    char2: "र",
    subQuestion: "What is य?",
    type: "sound",
    options: [
      { text: "ya", correct: true },
      { text: "ra", correct: false },
    ],
    pageNumber: "Quiz C12a",
    nextLesson: "c12b",
  },
  "c12b": {
    title: "Quiz 12 : Consonants",
    char1: "य",
    char2: "र",
    subQuestion: "Which word starts with र?",
    type: "word",
    options: [
      { hindi: "यात्रा", transliteration: "Yaatra", correct: false },
      { hindi: "रोटी", transliteration: "Roti", correct: true },
      { hindi: "याद", transliteration: "Yaad", correct: false },
      { hindi: "राजा", transliteration: "Raja", correct: true },
    ],
    pageNumber: "Quiz C12b",
    nextLesson: "/script/consonants/sections",
  },
  "c13a": {
    title: "Quiz 13 : Consonants",
    char1: "ल",
    char2: "व",
    subQuestion: "What is ल?",
    type: "sound",
    options: [
      { text: "la", correct: true },
      { text: "va", correct: false },
    ],
    pageNumber: "Quiz C13a",
    nextLesson: "c13b",
  },
  "c13b": {
    title: "Quiz 13 : Consonants",
    char1: "ल",
    char2: "व",
    subQuestion: "Which word starts with व?",
    type: "word",
    options: [
      { hindi: "लड़का", transliteration: "Ladka", correct: false },
      { hindi: "वृक्ष", transliteration: "Vriksh", correct: true },
      { hindi: "लाल", transliteration: "Laal", correct: false },
      { hindi: "वर्षा", transliteration: "Varsha", correct: true },
    ],
    pageNumber: "Quiz C13b",
    nextLesson: "/script/consonants/sections",
  },
  "c14a": {
    title: "Quiz 14 : Consonants",
    char1: "श",
    char2: "ष",
    subQuestion: "What is श?",
    type: "sound",
    options: [
      { text: "sha", correct: true },
      { text: "ṣa", correct: false },
    ],
    pageNumber: "Quiz C14a",
    nextLesson: "c14b",
  },
  "c14b": {
    title: "Quiz 14 : Consonants",
    char1: "श",
    char2: "ष",
    subQuestion: "Which word starts with ष?",
    type: "word",
    options: [
      { hindi: "शेर", transliteration: "Sher", correct: false },
      { hindi: "षड्यंत्र", transliteration: "Shadyantra", correct: true },
      { hindi: "शांति", transliteration: "Shanti", correct: false },
      { hindi: "षट्कोण", transliteration: "Shatkona", correct: true },
    ],
    pageNumber: "Quiz C14b",
    nextLesson: "/script/consonants/sections",
  },
  "c15a": {
    title: "Quiz 15 : Consonants",
    char1: "स",
    char2: "ह",
    subQuestion: "What is स?",
    type: "sound",
    options: [
      { text: "sa", correct: true },
      { text: "ha", correct: false },
    ],
    pageNumber: "Quiz C15a",
    nextLesson: "c15b",
  },
  "c15b": {
    title: "Quiz 15 : Consonants",
    char1: "स",
    char2: "ह",
    subQuestion: "Which word starts with ह?",
    type: "word",
    options: [
      { hindi: "सूरज", transliteration: "Sooraj", correct: false },
      { hindi: "हाथी", transliteration: "Haathi", correct: true },
      { hindi: "सेब", transliteration: "Seb", correct: false },
      { hindi: "हवा", transliteration: "Hawa", correct: true },
    ],
    pageNumber: "Quiz C15b",
    nextLesson: "/script/consonants/sections",
  },
  "c16a": {
    title: "Quiz 16 : Consonants",
    char1: "क्ष",
    char2: "त्र",
    subQuestion: "What is क्ष?",
    type: "sound",
    options: [
      { text: "kṣa", correct: true },
      { text: "tra", correct: false },
      { text: "gya", correct: false },
    ],
    pageNumber: "Quiz C16a",
    nextLesson: "c16b",
  },
  "c16b": {
    title: "Quiz 16 : Consonants",
    char1: "त्र",
    char2: "ज्ञ",
    subQuestion: "Which word starts with ज्ञ?",
    type: "word",
    options: [
      { hindi: "क्षमता", transliteration: "Kshamata", correct: false },
      { hindi: "त्रिकोण", transliteration: "Trikon", correct: false },
      { hindi: "ज्ञान", transliteration: "Gyaan", correct: true },
      { hindi: "विज्ञान", transliteration: "Vigyaan", correct: false },
    ],
    pageNumber: "Quiz C16b",
    nextLesson: "/script/consonants/sections",
  },
  "m1a": {
    title: "Quiz 1 : Matra",
    char1: "◌ा",
    char2: "",
    subQuestion: "What sound does ◌ा make?",
    type: "sound",
    options: [
      { text: "aa", correct: true },
      { text: "a", correct: false },
      { text: "i", correct: false },
    ],
    pageNumber: "Quiz M1a",
    nextLesson: "m1b",
  },
  "m1b": {
    title: "Quiz 1 : Matra",
    char1: "◌ा",
    char2: "",
    subQuestion: "Which syllable uses ◌ा?",
    type: "sound",
    options: [
      { text: "का", correct: true },
      { text: "क", correct: false },
    ],
    pageNumber: "Quiz M1b",
    nextLesson: "m1c",
  },
  "m1c": {
    title: "Quiz 1 : Matra",
    char1: "◌ा",
    char2: "",
    subQuestion: "Which words use the 'aa' sound? (Select all)",
    type: "word",
    options: [
      { hindi: "राम", transliteration: "Raam", correct: true },
      { hindi: "नाम", transliteration: "Naam", correct: true },
      { hindi: "कब", transliteration: "Kab", correct: false },
      { hindi: "घर", transliteration: "Ghar", correct: false },
    ],
    pageNumber: "Quiz M1c",
    nextLesson: "m1d",
  },
  "m1d": {
    title: "Quiz 1 : Matra",
    char1: "◌ा",
    char2: "",
    subQuestion: "What syllable makes the sound 'maa'?",
    type: "sound",
    options: [
      { text: "मा", correct: true },
      { text: "म", correct: false },
      { text: "मि", correct: false },
    ],
    pageNumber: "Quiz M1d",
    nextLesson: "/script/matra/sections",
  },
  "m2a": {
    title: "Quiz 2 : Matra (Short i vs Long i)",
    char1: "◌ि",
    char2: "◌ी",
    subQuestion: "What is ◌ि?",
    type: "sound",
    options: [
      { text: "i", correct: true },
      { text: "ee", correct: false },
    ],
    pageNumber: "Quiz M2a",
    nextLesson: "m2b",
  },
  "m2b": {
    title: "Quiz 2 : Matra (Short i vs Long i)",
    char1: "◌ि",
    char2: "◌ी",
    subQuestion: "What is ◌ी?",
    type: "sound",
    options: [
      { text: "i", correct: false },
      { text: "ee", correct: true },
    ],
    pageNumber: "Quiz M2b",
    nextLesson: "m2c",
  },
  "m2c": {
    title: "Quiz 2 : Matra (Short i vs Long i)",
    char1: "◌ि",
    char2: "◌ी",
    subQuestion: "Which syllable makes the short sound?",
    type: "sound",
    options: [
      { text: "कि", correct: true },
      { text: "की", correct: false },
    ],
    pageNumber: "Quiz M2c",
    nextLesson: "m2d",
  },
  "m2d": {
    title: "Quiz 2 : Matra (Short i vs Long i)",
    char1: "◌ि",
    char2: "◌ी",
    subQuestion: "Which words use the long 'i' sound? (Select all)",
    type: "word",
    options: [
      { hindi: "चाबी", transliteration: "Chaabi", correct: true },
      { hindi: "दीप", transliteration: "Deep", correct: true },
      { hindi: "मिठाई", transliteration: "Mithai", correct: false },
      { hindi: "दिल", transliteration: "Dil", correct: false },
    ],
    pageNumber: "Quiz M2d",
    nextLesson: "/script/matra/sections",
  },
  "m3a": {
    title: "Quiz 3 : Matra (Short u vs Long u)",
    char1: "◌ु",
    char2: "◌ू",
    subQuestion: "What is ◌ु?",
    type: "sound",
    options: [
      { text: "u", correct: true },
      { text: "oo", correct: false },
    ],
    pageNumber: "Quiz M3a",
    nextLesson: "m3b",
  },
  "m3b": {
    title: "Quiz 3 : Matra (Short u vs Long u)",
    char1: "◌ु",
    char2: "◌ू",
    subQuestion: "What is ◌ू?",
    type: "sound",
    options: [
      { text: "u", correct: false },
      { text: "oo", correct: true },
    ],
    pageNumber: "Quiz M3b",
    nextLesson: "m3c",
  },
  "m3c": {
    title: "Quiz 3 : Matra (Short u vs Long u)",
    char1: "◌ु",
    char2: "◌ू",
    subQuestion: "Which syllable makes the short sound?",
    type: "sound",
    options: [
      { text: "कु", correct: true },
      { text: "कू", correct: false },
    ],
    pageNumber: "Quiz M3c",
    nextLesson: "m3d",
  },
  "m3d": {
    title: "Quiz 3 : Matra (Short u vs Long u)",
    char1: "◌ु",
    char2: "◌ू",
    subQuestion: "Which words use the long 'u' sound? (Select all)",
    type: "word",
    options: [
      { hindi: "सूई", transliteration: "Sui", correct: true },
      { hindi: "झूला", transliteration: "Jhoola", correct: true },
      { hindi: "कुछ", transliteration: "Kuch", correct: false },
      { hindi: "गुड़", transliteration: "Gur", correct: false },
    ],
    pageNumber: "Quiz M3d",
    nextLesson: "/script/matra/sections",
  },
  "m4a": {
    title: "Quiz 4 : Matra (e vs ai)",
    char1: "◌े",
    char2: "◌ै",
    subQuestion: "What is ◌े?",
    type: "sound",
    options: [
      { text: "e", correct: true },
      { text: "ai", correct: false },
    ],
    pageNumber: "Quiz M4a",
    nextLesson: "m4b",
  },
  "m4b": {
    title: "Quiz 4 : Matra (e vs ai)",
    char1: "◌े",
    char2: "◌ै",
    subQuestion: "What is ◌ै?",
    type: "sound",
    options: [
      { text: "e", correct: false },
      { text: "ai", correct: true },
    ],
    pageNumber: "Quiz M4b",
    nextLesson: "m4c",
  },
  "m4c": {
    title: "Quiz 4 : Matra (e vs ai)",
    char1: "◌े",
    char2: "◌ै",
    subQuestion: "Which syllable makes the sound 'ke'?",
    type: "sound",
    options: [
      { text: "के", correct: true },
      { text: "कै", correct: false },
    ],
    pageNumber: "Quiz M4c",
    nextLesson: "m4d",
  },
  "m4d": {
    title: "Quiz 4 : Matra (e vs ai)",
    char1: "◌े",
    char2: "◌ै",
    subQuestion: "Which words use the 'ai' sound? (Select all)",
    type: "word",
    options: [
      { hindi: "मैला", transliteration: "Maila", correct: true },
      { hindi: "ऐनक", transliteration: "Ainak", correct: true },
      { hindi: "देव", transliteration: "Dev", correct: false },
      { hindi: "नेल", transliteration: "Nail", correct: false },
    ],
    pageNumber: "Quiz M4d",
    nextLesson: "/script/matra/sections",
  },
  "m5a": {
    title: "Quiz 5 : Matra (o vs ao)",
    char1: "◌ो",
    char2: "◌ौ",
    subQuestion: "What is ◌ो?",
    type: "sound",
    options: [
      { text: "o", correct: true },
      { text: "ao", correct: false },
    ],
    pageNumber: "Quiz M5a",
    nextLesson: "m5b",
  },
  "m5b": {
    title: "Quiz 5 : Matra (o vs ao)",
    char1: "◌ो",
    char2: "◌ौ",
    subQuestion: "What is ◌ौ?",
    type: "sound",
    options: [
      { text: "o", correct: false },
      { text: "ao", correct: true },
    ],
    pageNumber: "Quiz M5b",
    nextLesson: "m5c",
  },
  "m5c": {
    title: "Quiz 5 : Matra (o vs ao)",
    char1: "◌ो",
    char2: "◌ौ",
    subQuestion: "Which syllable makes the sound 'ko'?",
    type: "sound",
    options: [
      { text: "को", correct: true },
      { text: "कौ", correct: false },
    ],
    pageNumber: "Quiz M5c",
    nextLesson: "m5d",
  },
  "m5d": {
    title: "Quiz 5 : Matra (o vs ao)",
    char1: "◌ो",
    char2: "◌ौ",
    subQuestion: "Which words use the 'ao' sound? (Select all)",
    type: "word",
    options: [
      { hindi: "कौआ", transliteration: "Kauaa", correct: true },
      { hindi: "दौड़", transliteration: "Daud", correct: true },
      { hindi: "मोती", transliteration: "Moti", correct: false },
      { hindi: "सोना", transliteration: "Sona", correct: false },
    ],
    pageNumber: "Quiz M5d",
    nextLesson: "/script/matra/sections",
  },
  "m6a": {
    title: "Quiz 6 : Matra (ri vs an)",
    char1: "◌ृ",
    char2: "◌ं",
    subQuestion: "What is ◌ृ?",
    type: "sound",
    options: [
      { text: "ri", correct: true },
      { text: "an", correct: false },
    ],
    pageNumber: "Quiz M6a",
    nextLesson: "m6b",
  },
  "m6b": {
    title: "Quiz 6 : Matra (ri vs an)",
    char1: "◌ृ",
    char2: "◌ं",
    subQuestion: "What is ◌ं?",
    type: "sound",
    options: [
      { text: "ri", correct: false },
      { text: "an", correct: true },
    ],
    pageNumber: "Quiz M6b",
    nextLesson: "m6c",
  },
  "m6c": {
    title: "Quiz 6 : Matra (ri vs an)",
    char1: "◌ृ",
    char2: "◌ं",
    subQuestion: "Which syllable makes the sound 'kri'?",
    type: "sound",
    options: [
      { text: "कृ", correct: true },
      { text: "कं", correct: false },
    ],
    pageNumber: "Quiz M6c",
    nextLesson: "m6d",
  },
  "m6d": {
    title: "Quiz 6 : Matra (ri vs an)",
    char1: "◌ृ",
    char2: "◌ं",
    subQuestion: "Which words use the nasal 'an' sound? (Select all)",
    type: "word",
    options: [
      { hindi: "संगीत", transliteration: "Sangeet", correct: true },
      { hindi: "अंगूर", transliteration: "Angoor", correct: true },
      { hindi: "कृपा", transliteration: "Kripa", correct: false },
    ],
    pageNumber: "Quiz M6d",
    nextLesson: "/script/matra/sections",
  },
  "m7a": {
    title: "Quiz 7 : Matra (h vs añ)",
    char1: "◌ः",
    char2: "◌ँ",
    subQuestion: "What is ◌ः?",
    type: "sound",
    options: [
      { text: "h", correct: true },
      { text: "añ", correct: false },
    ],
    pageNumber: "Quiz M7a",
    nextLesson: "m7b",
  },
  "m7b": {
    title: "Quiz 7 : Matra (h vs añ)",
    char1: "◌ः",
    char2: "◌ँ",
    subQuestion: "What is ◌ँ?",
    type: "sound",
    options: [
      { text: "h", correct: false },
      { text: "añ", correct: true },
    ],
    pageNumber: "Quiz M7b",
    nextLesson: "m7c",
  },
  "m7c": {
    title: "Quiz 7 : Matra (h vs añ)",
    char1: "◌ः",
    char2: "◌ँ",
    subQuestion: "Which syllable makes the sound 'kah' (with visarga)?",
    type: "sound",
    options: [
      { text: "कः", correct: true },
      { text: "कँ", correct: false },
    ],
    pageNumber: "Quiz M7c",
    nextLesson: "m7d",
  },
  "m7d": {
    title: "Quiz 7 : Matra (h vs añ)",
    char1: "◌ः",
    char2: "◌ँ",
    subQuestion: "Which words use the nasalized vowel? (Select all)",
    type: "word",
    options: [
      { hindi: "अँधेरा", transliteration: "Andhera", correct: true },
      { hindi: "साँप", transliteration: "Saap", correct: true },
      { hindi: "दुःख", transliteration: "Dukh", correct: false },
    ],
    pageNumber: "Quiz M7d",
    nextLesson: "/script/matra/sections",
  },
  "s1a": {
    title: "Quiz 1 : न vs ण",
    char1: "न",
    char2: "ण",
    subQuestion: "What is न?",
    type: "sound",
    options: [
      { text: "na (dental)", correct: true },
      { text: "ṇa (retroflex)", correct: false },
    ],
    pageNumber: "Quiz S1a",
    nextLesson: "s1b",
  },
  "s1b": {
    title: "Quiz 1 : न vs ण",
    char1: "न",
    char2: "ण",
    subQuestion: "What is ण?",
    type: "sound",
    options: [
      { text: "na (dental)", correct: false },
      { text: "ṇa (retroflex)", correct: true },
    ],
    pageNumber: "Quiz S1b",
    nextLesson: "s1c",
  },
  "s1c": {
    title: "Quiz 1 : न vs ण",
    char1: "न",
    char2: "ण",
    subQuestion: "Which word uses the dental 'na' sound?",
    type: "word",
    options: [
      { hindi: "नदी", transliteration: "Nadee", correct: true },
      { hindi: "कण", transliteration: "Kaṇ", correct: false },
    ],
    pageNumber: "Quiz S1c",
    nextLesson: "s1d",
  },
  "s1d": {
    title: "Quiz 1 : न vs ण",
    char1: "न",
    char2: "ण",
    subQuestion: "Which word uses the retroflex 'ṇa' sound?",
    type: "word",
    options: [
      { hindi: "नया", transliteration: "Naya", correct: false },
      { hindi: "गुण", transliteration: "Guṇ", correct: true },
    ],
    pageNumber: "Quiz S1d",
    nextLesson: "/script/similar/sections",
  },
  "s2a": {
    title: "Quiz 2 : ज्ञ vs ग",
    char1: "ज्ञ",
    char2: "ग",
    subQuestion: "What is ज्ञ?",
    type: "sound",
    options: [
      { text: "gya/jña", correct: true },
      { text: "ga", correct: false },
    ],
    pageNumber: "Quiz S2a",
    nextLesson: "s2b",
  },
  "s2b": {
    title: "Quiz 2 : ज्ञ vs ग",
    char1: "ज्ञ",
    char2: "ग",
    subQuestion: "What is ग?",
    type: "sound",
    options: [
      { text: "gya/jña", correct: false },
      { text: "ga", correct: true },
    ],
    pageNumber: "Quiz S2b",
    nextLesson: "s2c",
  },
  "s2c": {
    title: "Quiz 2 : ज्ञ vs ग",
    char1: "ज्ञ",
    char2: "ग",
    subQuestion: "Which word uses the 'gya' sound?",
    type: "word",
    options: [
      { hindi: "ज्ञान", transliteration: "Gyaan", correct: true },
      { hindi: "गाना", transliteration: "Gaana", correct: false },
    ],
    pageNumber: "Quiz S2c",
    nextLesson: "s2d",
  },
  "s2d": {
    title: "Quiz 2 : ज्ञ vs ग",
    char1: "ज्ञ",
    char2: "ग",
    subQuestion: "Which word uses the simple 'ga' sound?",
    type: "word",
    options: [
      { hindi: "विज्ञान", transliteration: "Vigyaan", correct: false },
      { hindi: "गमला", transliteration: "Gamlaa", correct: true },
    ],
    pageNumber: "Quiz S2d",
    nextLesson: "/script/similar/sections",
  },
  "s3a": {
    title: "Quiz 3 : ऋ vs री",
    char1: "ऋ",
    char2: "री",
    subQuestion: "What is ऋ?",
    type: "sound",
    options: [
      { text: "ṛi (vowel)", correct: true },
      { text: "rī (ra + ◌ी)", correct: false },
    ],
    pageNumber: "Quiz S3a",
    nextLesson: "s3b",
  },
  "s3b": {
    title: "Quiz 3 : ऋ vs री",
    char1: "ऋ",
    char2: "री",
    subQuestion: "What is री?",
    type: "sound",
    options: [
      { text: "ṛi (vowel)", correct: false },
      { text: "rī (ra + ◌ी)", correct: true },
    ],
    pageNumber: "Quiz S3b",
    nextLesson: "s3c",
  },
  "s3c": {
    title: "Quiz 3 : ऋ vs री",
    char1: "ऋ",
    char2: "री",
    subQuestion: "Which word uses the vowel ऋ?",
    type: "word",
    options: [
      { hindi: "ऋषि", transliteration: "Ṛṣi", correct: true },
      { hindi: "रीत", transliteration: "Reet", correct: false },
    ],
    pageNumber: "Quiz S3c",
    nextLesson: "s3d",
  },
  "s3d": {
    title: "Quiz 3 : ऋ vs री",
    char1: "ऋ",
    char2: "री",
    subQuestion: "Which word uses री (ra + ◌ी)?",
    type: "word",
    options: [
      { hindi: "ऋतु", transliteration: "Ṛtu", correct: false },
      { hindi: "रीति", transliteration: "Reeti", correct: true },
    ],
    pageNumber: "Quiz S3d",
    nextLesson: "/script/similar/sections",
  },
  "s4a": {
    title: "Quiz 4 : स, श, ष",
    char1: "स",
    char2: "श",
    subQuestion: "What is स?",
    type: "sound",
    options: [
      { text: "sa (dental)", correct: true },
      { text: "sha (palatal)", correct: false },
      { text: "ṣa (retroflex)", correct: false },
    ],
    pageNumber: "Quiz S4a",
    nextLesson: "s4b",
  },
  "s4b": {
    title: "Quiz 4 : स, श, ष",
    char1: "श",
    char2: "ष",
    subQuestion: "What is श?",
    type: "sound",
    options: [
      { text: "sa (dental)", correct: false },
      { text: "sha (palatal)", correct: true },
      { text: "ṣa (retroflex)", correct: false },
    ],
    pageNumber: "Quiz S4b",
    nextLesson: "s4c",
  },
  "s4c": {
    title: "Quiz 4 : स, श, ष",
    char1: "स",
    char2: "श",
    subQuestion: "Which word uses स (sa)?",
    type: "word",
    options: [
      { hindi: "सफर", transliteration: "Safar", correct: true },
      { hindi: "शक्ति", transliteration: "Shakti", correct: false },
      { hindi: "षड्यंत्र", transliteration: "Ṣaḍyantra", correct: false },
    ],
    pageNumber: "Quiz S4c",
    nextLesson: "s4d",
  },
  "s4d": {
    title: "Quiz 4 : स, श, ष",
    char1: "श",
    char2: "ष",
    subQuestion: "Which word uses श (sha)?",
    type: "word",
    options: [
      { hindi: "सच", transliteration: "Sach", correct: false },
      { hindi: "शांति", transliteration: "Shaanti", correct: true },
      { hindi: "विष", transliteration: "Viṣ", correct: false },
    ],
    pageNumber: "Quiz S4d",
    nextLesson: "/script/similar/sections",
  },
  "s5a": {
    title: "Quiz 5 : ं vs ँ",
    char1: "ं",
    char2: "ँ",
    subQuestion: "What is ं?",
    type: "sound",
    options: [
      { text: "ṁ (anusvara)", correct: true },
      { text: "̃ (chandrabindu)", correct: false },
    ],
    pageNumber: "Quiz S5a",
    nextLesson: "s5b",
  },
  "s5b": {
    title: "Quiz 5 : ं vs ँ",
    char1: "ं",
    char2: "ँ",
    subQuestion: "What is ँ?",
    type: "sound",
    options: [
      { text: "ṁ (anusvara)", correct: false },
      { text: "̃ (chandrabindu)", correct: true },
    ],
    pageNumber: "Quiz S5b",
    nextLesson: "s5c",
  },
  "s5c": {
    title: "Quiz 5 : ं vs ँ",
    char1: "ं",
    char2: "ँ",
    subQuestion: "Which word uses the anusvara (ं)?",
    type: "word",
    options: [
      { hindi: "संघ", transliteration: "Sangh", correct: true },
      { hindi: "माँ", transliteration: "Maa", correct: false },
    ],
    pageNumber: "Quiz S5c",
    nextLesson: "s5d",
  },
  "s5d": {
    title: "Quiz 5 : ं vs ँ",
    char1: "ं",
    char2: "ँ",
    subQuestion: "Which word uses the chandrabindu (ँ)?",
    type: "word",
    options: [
      { hindi: "हिंदी", transliteration: "Hindi", correct: false },
      { hindi: "चाँद", transliteration: "Chaand", correct: true },
    ],
    pageNumber: "Quiz S5d",
    nextLesson: "/script/similar/sections",
  },
};

export default function QuizPage() {
  const params = useParams();
  const location = useLocation()[0];
  const [, setLocation] = useLocation();
  const quizId = params.id as string;
  const quiz = quizData[quizId];
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const currentQuizIdRef = useRef(quizId);
  
  const isConsonant = location.includes('/consonants/');
  const isMatra = location.includes('/matra/');
  const isSimilar = location.includes('/similar/');

  // Reset state when quiz changes
  useEffect(() => {
    if (currentQuizIdRef.current !== quizId) {
      setSelectedAnswer(null);
      setShowFeedback(false);
      currentQuizIdRef.current = quizId;
    }
  }, [quizId]);

  if (!quiz) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><p>Quiz not found</p></div>;
  }

  // Calculate progress based on quiz question position
  const progress = (() => {
    // Extract quiz letter (a, b, c, d, e, f) from quizId
    const quizLetter = quizId.match(/[a-f]$/)?.[0] || 'a';
    const questionNumber = quizLetter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    
    if (isSimilar) {
      const sectionNumber = parseInt(quizId.replace(/[abcdef]/g, '').replace(/s/g, ''));
      const sectionStructure = SIMILAR_SECTIONS[sectionNumber - 1];
      return calcProgress('quiz', sectionStructure, questionNumber);
    } else if (isMatra) {
      const sectionNumber = parseInt(quizId.replace(/[abcdef]/g, '').replace(/m/g, ''));
      const sectionStructure = MATRA_SECTIONS[sectionNumber - 1];
      return calcProgress('quiz', sectionStructure, questionNumber);
    } else if (isConsonant) {
      const sectionNumber = parseInt(quizId.replace(/[abcdef]/g, '').replace(/c/g, ''));
      const sectionStructure = CONSONANT_SECTIONS[sectionNumber - 1];
      return calcProgress('quiz', sectionStructure, questionNumber);
    } else {
      const sectionNumber = parseInt(quizId.replace(/[abcdef]/g, ''));
      const sectionStructure = VOWEL_SECTIONS[sectionNumber - 1];
      return calcProgress('quiz', sectionStructure, questionNumber);
    }
  })();

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    // Trigger confetti if correct answer with Indian flag colors
    if (quiz.options[index].correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9930', '#138808', '#FFFFFF', '#2E86AB', '#FFD700']
      });
    }
  };

  const handleExitClick = () => {
    setShowExitConfirmation(true);
  };

  const handleConfirmExit = () => {
    const exitPath = isSimilar ? "/script/similar/sections" : (isMatra ? "/script/matra/sections" : (isConsonant ? "/script/consonants/sections" : "/script/vowels/sections"));
    setLocation(exitPath);
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  const handleNext = () => {
    if (isCorrect) {
      // Mark quiz as completed only if answer is correct
      let storageKey = 'vowelsQuizzesCompleted';
      let sectionsPath = '/script/vowels/sections';
      let totalSections = 5;
      
      if (isConsonant) {
        storageKey = 'consonantsQuizzesCompleted';
        sectionsPath = '/script/consonants/sections';
        totalSections = 16;
      } else if (isMatra) {
        storageKey = 'matraQuizzesCompleted';
        sectionsPath = '/script/matra/sections';
        totalSections = 7;
      } else if (isSimilar) {
        storageKey = 'similarQuizzesCompleted';
        sectionsPath = '/script/similar/sections';
        totalSections = 5;
      }
      
      if (quiz.nextLesson === sectionsPath || quiz.nextLesson === sectionsPath.replace('/sections', '')) {
        const currentQuizzes = parseInt(localStorage.getItem(storageKey) || '0');
        const sectionNumber = parseInt(quizId.replace(/[abcdef]/g, '').replace(/[cms]/g, ''));
        if (sectionNumber > currentQuizzes) {
          localStorage.setItem(storageKey, sectionNumber.toString());
        }
        
        // Check if all sections are complete
        if (sectionNumber >= totalSections) {
          setLocation('/script');
          return;
        }
      }
      
      // Navigate to next quiz/page
      if (typeof quiz.nextLesson === 'string' && quiz.nextLesson.startsWith('/')) {
        setLocation(quiz.nextLesson);
      } else {
        let basePath = '/script/lesson/vowels/quiz/';
        if (isConsonant) basePath = '/script/lesson/consonants/quiz/';
        if (isMatra) basePath = '/script/lesson/matra/quiz/';
        if (isSimilar) basePath = '/script/lesson/similar/quiz/';
        setLocation(`${basePath}${quiz.nextLesson}`);
      }
    } else {
      // If incorrect, go back to the quiz to try again
      setShowFeedback(false);
      setSelectedAnswer(null);
    }
  };

  const isCorrect = selectedAnswer !== null && quiz.options[selectedAnswer].correct;

  // Only show feedback if we're still on the same quiz that was answered
  if (showFeedback && currentQuizIdRef.current === quizId && selectedAnswer !== null) {
    const correctAnswerIndex = quiz.options.findIndex((opt: any) => opt.correct);
    const correctAnswerText = formatOptionLabel(quiz.type, quiz.options[correctAnswerIndex], 'results');
    const selectedAnswerText = selectedAnswer !== null ? formatOptionLabel(quiz.type, quiz.options[selectedAnswer], 'results') : '';

    return (
      <div className="h-screen bg-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <button onClick={() => setShowFeedback(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button onClick={handleExitClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-exit">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
            <div 
              className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl text-center border border-gray-100 flex-1 flex flex-col overflow-hidden relative animate-slide-in-up">
            <div className="absolute bottom-16 right-8 w-20 h-20 opacity-75 animate-bounce-subtle" style={{ transform: 'rotate(10deg)' }}>
              <img src={tigerThinking} alt="Thinking tiger" className="w-full h-full object-contain" />
            </div>
            
            <div className="px-8 pt-8 pb-4 flex-shrink-0">
              <h2 className="text-2xl font-bold text-black mb-4">{quiz.title}</h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-5xl font-bold text-black">{quiz.char1}</span>
                <span className="text-xl font-semibold text-gray-500">vs</span>
                <span className="text-5xl font-bold text-black">{quiz.char2}</span>
              </div>
              <p className="text-gray-600 text-base">{quiz.subQuestion}</p>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 overflow-y-auto">
              <div className={`text-3xl font-bold mb-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {isCorrect ? "✓ CORRECT" : "✗ INCORRECT"}
              </div>
              
              {isCorrect && (
                <p className="text-xl font-semibold bg-gradient-to-r from-[#ff9930] to-[#FFD700] bg-clip-text text-transparent mb-4">{getRandomMessage()}</p>
              )}

              {!isCorrect && (
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700 mb-2">You selected: <span className="font-bold text-red-600">{selectedAnswerText}</span></p>
                  <p className="text-sm text-gray-700">Correct answer: <span className="font-bold text-green-600">{correctAnswerText}</span></p>
                </div>
              )}

              {isCorrect && (
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-700">Your answer: <span className="font-bold text-green-600">{selectedAnswerText}</span></p>
                </div>
              )}
            </div>

            <div className="px-8 pb-8 pt-4 flex-shrink-0">
              <button 
                onClick={handleNext}
                className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg btn-bounce"
              >
                {isCorrect ? "Next" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="w-10"></div>
          <button onClick={handleExitClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors" data-testid="button-exit">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col relative animate-slide-in-up">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 opacity-70 animate-wiggle" style={{ transform: 'rotate(-12deg)' }}>
            <img src={tigerWaving} alt="Waving tiger" className="w-full h-full object-contain" />
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-8">{quiz.title}</h2>
            
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-7xl font-bold text-black">{quiz.char1}</span>
              <span className="text-2xl font-semibold text-gray-500">vs</span>
              <span className="text-7xl font-bold text-black">{quiz.char2}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-8">
              <p className="text-xl text-black mb-4" data-testid="text-question">{quiz.subQuestion}</p>
            </div>

            <div className={`gap-4 mb-4 ${quiz.type === 'sound' ? 'flex justify-center' : 'grid grid-cols-2'}`}>
              {quiz.options.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="px-4 py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-medium text-base shadow-lg btn-bounce whitespace-nowrap overflow-hidden text-ellipsis"
                  data-testid={`button-answer-${index}`}
                >
                  {formatOptionLabel(quiz.type, option, 'quiz')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-slide-in-up">
            <h3 className="text-xl font-bold text-black mb-3">Exit Quiz?</h3>
            <p className="text-gray-600 mb-6">
              If you exit now, your progress in this quiz will be reset and you'll need to start over.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelExit}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                data-testid="button-cancel-exit"
              >
                Stay
              </button>
              <button
                onClick={handleConfirmExit}
                className="flex-1 px-6 py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-medium"
                data-testid="button-confirm-exit"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
