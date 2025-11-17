import { QuizMap } from '../types';

export const numberQuizzes: QuizMap = {
  "n1a": {
    "title": "Quiz 1 : Numbers",
    "char1": "०-९",
    "char2": "0-9",
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
    "title": "Quiz 1 : Numbers",
    "char1": "०-९",
    "char2": "0-9",
    "subQuestion": "What is the Hindi word for ६?",
    "type": "sound",
    "options": [
      { "text": "पाँच (Paanch)", "correct": false },
      { "text": "छह (Chhah)", "correct": true },
      { "text": "सात (Saat)", "correct": false },
      { "text": "आठ (Aath)", "correct": false }
    ],
    "nextLesson": "n1c",
    "pageNumber": "Quiz 1b"
  },
  "n1c": {
    "title": "Quiz 1 : Numbers",
    "char1": "०-९",
    "char2": "0-9",
    "subQuestion": "Which digit represents 'नौ' (nine)?",
    "type": "sound",
    "options": [
      { "text": "६", "correct": false },
      { "text": "७", "correct": false },
      { "text": "८", "correct": false },
      { "text": "९", "correct": true }
    ],
    "nextLesson": "n1d",
    "pageNumber": "Quiz 1c"
  },
  "n1d": {
    "title": "Quiz 1 : Numbers",
    "char1": "०-९",
    "char2": "0-9",
    "subQuestion": "Which Devanagari digit represents 'four' (चार)?",
    "type": "sound",
    "options": [
      { "text": "२", "correct": false },
      { "text": "३", "correct": false },
      { "text": "४", "correct": true },
      { "text": "५", "correct": false }
    ],
    "nextLesson": "/script/numbers/sections",
    "pageNumber": "Quiz 1d"
  }
};
