import { QuizMap } from '../types';

export const numberQuizzes: QuizMap = {
  // Section 1 Quizzes (०-२)
  "n1a": {
    "title": "Numbers Quiz",
    "char1": "०-२",
    "char2": "0-2",
    "subQuestion": "Which Devanagari digit represents 'two' (दो)?",
    "type": "sound",
    "options": [
      { "text": "०", "correct": false },
      { "text": "१", "correct": false },
      { "text": "२", "correct": true }
    ],
    "nextLesson": "n1b",
    "pageNumber": "Quiz 1a"
  },
  "n1b": {
    "title": "Numbers Quiz",
    "char1": "०-२",
    "char2": "0-2",
    "subQuestion": "Which digit represents 'एक' (one)?",
    "type": "sound",
    "options": [
      { "text": "०", "correct": false },
      { "text": "१", "correct": true },
      { "text": "२", "correct": false }
    ],
    "nextLesson": "n1c",
    "pageNumber": "Quiz 1b"
  },
  "n1c": {
    "title": "Numbers Quiz",
    "char1": "०-२",
    "char2": "0-2",
    "subQuestion": "What is the Hindi word for ०?",
    "type": "sound",
    "options": [
      { "text": "शून्य (Shunya)", "correct": true },
      { "text": "एक (Ek)", "correct": false },
      { "text": "दो (Do)", "correct": false }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 1c"
  },
  
  // Section 2 Quizzes (३-५)
  "n2a": {
    "title": "Numbers Quiz",
    "char1": "३-५",
    "char2": "3-5",
    "subQuestion": "Which Devanagari digit represents 'four' (चार)?",
    "type": "sound",
    "options": [
      { "text": "३", "correct": false },
      { "text": "४", "correct": true },
      { "text": "५", "correct": false }
    ],
    "nextLesson": "n2b",
    "pageNumber": "Quiz 2a"
  },
  "n2b": {
    "title": "Numbers Quiz",
    "char1": "३-५",
    "char2": "3-5",
    "subQuestion": "What is the Hindi word for ५?",
    "type": "sound",
    "options": [
      { "text": "तीन (Teen)", "correct": false },
      { "text": "चार (Chaar)", "correct": false },
      { "text": "पाँच (Paanch)", "correct": true }
    ],
    "nextLesson": "n2c",
    "pageNumber": "Quiz 2b"
  },
  "n2c": {
    "title": "Numbers Quiz",
    "char1": "३-५",
    "char2": "3-5",
    "subQuestion": "Which digit represents 'तीन' (three)?",
    "type": "sound",
    "options": [
      { "text": "३", "correct": true },
      { "text": "४", "correct": false },
      { "text": "५", "correct": false }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 2c"
  },

  // Section 3 Quizzes (६-८)
  "n3a": {
    "title": "Numbers Quiz",
    "char1": "६-८",
    "char2": "6-8",
    "subQuestion": "Which Devanagari digit represents 'seven' (सात)?",
    "type": "sound",
    "options": [
      { "text": "६", "correct": false },
      { "text": "७", "correct": true },
      { "text": "८", "correct": false }
    ],
    "nextLesson": "n3b",
    "pageNumber": "Quiz 3a"
  },
  "n3b": {
    "title": "Numbers Quiz",
    "char1": "६-८",
    "char2": "6-8",
    "subQuestion": "What is the Hindi word for ६?",
    "type": "sound",
    "options": [
      { "text": "छह (Chhah)", "correct": true },
      { "text": "सात (Saat)", "correct": false },
      { "text": "आठ (Aath)", "correct": false }
    ],
    "nextLesson": "n3c",
    "pageNumber": "Quiz 3b"
  },
  "n3c": {
    "title": "Numbers Quiz",
    "char1": "६-८",
    "char2": "6-8",
    "subQuestion": "Which digit represents 'आठ' (eight)?",
    "type": "sound",
    "options": [
      { "text": "६", "correct": false },
      { "text": "७", "correct": false },
      { "text": "८", "correct": true }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 3c"
  },

  // Section 4 Quizzes (९)
  "n4a": {
    "title": "Numbers Quiz",
    "char1": "९",
    "char2": "9",
    "subQuestion": "Which Devanagari digit represents 'nine' (नौ)?",
    "type": "sound",
    "options": [
      { "text": "६", "correct": false },
      { "text": "७", "correct": false },
      { "text": "८", "correct": false },
      { "text": "९", "correct": true }
    ],
    "nextLesson": "n4b",
    "pageNumber": "Quiz 4a"
  },
  "n4b": {
    "title": "Numbers Quiz",
    "char1": "९",
    "char2": "9",
    "subQuestion": "What is the Hindi word for ९?",
    "type": "sound",
    "options": [
      { "text": "सात (Saat)", "correct": false },
      { "text": "आठ (Aath)", "correct": false },
      { "text": "नौ (Nau)", "correct": true }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 4b"
  }
};
