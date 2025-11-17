import { QuizMap } from '../types';

export const numberQuizzes: QuizMap = {
  // Section 1 Quizzes (०-४)
  "n1a": {
    "title": "Quiz 1 : Numbers ०-④",
    "char1": "०-४",
    "char2": "0-4",
    "subQuestion": "Which Devanagari digit represents 'two' (दो)?",
    "type": "sound",
    "options": [
      { "text": "१", "correct": false },
      { "text": "२", "correct": true },
      { "text": "३", "correct": false },
      { "text": "४", "correct": false }
    ],
    "nextLesson": "n1b",
    "pageNumber": "Quiz 1a"
  },
  "n1b": {
    "title": "Quiz 1 : Numbers ०-④",
    "char1": "०-४",
    "char2": "0-4",
    "subQuestion": "What is the Hindi word for ४?",
    "type": "sound",
    "options": [
      { "text": "दो (Do)", "correct": false },
      { "text": "तीन (Teen)", "correct": false },
      { "text": "चार (Chaar)", "correct": true },
      { "text": "शून्य (Shunya)", "correct": false }
    ],
    "nextLesson": "n1c",
    "pageNumber": "Quiz 1b"
  },
  "n1c": {
    "title": "Quiz 1 : Numbers ०-④",
    "char1": "०-४",
    "char2": "0-4",
    "subQuestion": "Which digit represents 'एक' (one)?",
    "type": "sound",
    "options": [
      { "text": "०", "correct": false },
      { "text": "१", "correct": true },
      { "text": "२", "correct": false },
      { "text": "३", "correct": false }
    ],
    "nextLesson": "n1d",
    "pageNumber": "Quiz 1c"
  },
  "n1d": {
    "title": "Quiz 1 : Numbers ०-④",
    "char1": "०-४",
    "char2": "0-4",
    "subQuestion": "Which Devanagari digit represents 'three' (तीन)?",
    "type": "sound",
    "options": [
      { "text": "१", "correct": false },
      { "text": "२", "correct": false },
      { "text": "३", "correct": true },
      { "text": "४", "correct": false }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 1d"
  },
  
  // Section 2 Quizzes (५-९)
  "n2a": {
    "title": "Quiz 2 : Numbers ⑤-⑨",
    "char1": "५-९",
    "char2": "5-9",
    "subQuestion": "Which Devanagari digit represents 'six' (छह)?",
    "type": "sound",
    "options": [
      { "text": "५", "correct": false },
      { "text": "६", "correct": true },
      { "text": "७", "correct": false },
      { "text": "८", "correct": false }
    ],
    "nextLesson": "n2b",
    "pageNumber": "Quiz 2a"
  },
  "n2b": {
    "title": "Quiz 2 : Numbers ⑤-⑨",
    "char1": "५-९",
    "char2": "5-9",
    "subQuestion": "What is the Hindi word for ९?",
    "type": "sound",
    "options": [
      { "text": "सात (Saat)", "correct": false },
      { "text": "आठ (Aath)", "correct": false },
      { "text": "नौ (Nau)", "correct": true },
      { "text": "छह (Chhah)", "correct": false }
    ],
    "nextLesson": "n2c",
    "pageNumber": "Quiz 2b"
  },
  "n2c": {
    "title": "Quiz 2 : Numbers ⑤-⑨",
    "char1": "५-९",
    "char2": "5-9",
    "subQuestion": "Which digit represents 'पाँच' (five)?",
    "type": "sound",
    "options": [
      { "text": "४", "correct": false },
      { "text": "५", "correct": true },
      { "text": "६", "correct": false },
      { "text": "७", "correct": false }
    ],
    "nextLesson": "n2d",
    "pageNumber": "Quiz 2c"
  },
  "n2d": {
    "title": "Quiz 2 : Numbers ⑤-⑨",
    "char1": "५-९",
    "char2": "5-9",
    "subQuestion": "Which Devanagari digit represents 'eight' (आठ)?",
    "type": "sound",
    "options": [
      { "text": "६", "correct": false },
      { "text": "७", "correct": false },
      { "text": "८", "correct": true },
      { "text": "९", "correct": false }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 2d"
  }
};
