/**
 * PlacementQuizPage Component
 * 
 * Assesses user's Hindi knowledge and comfort level
 * Routes them to appropriate starting point in Script track
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import tigerWaving from '@assets/generated_images/Waving_tiger_transparent_9a08bf58.png';

interface Question {
  id: string;
  question: string;
  options: { text: string; value: number }[];
}

const questions: Question[] = [
  {
    id: "reading",
    question: "Can you read Devanagari script (the Hindi alphabet)?",
    options: [
      { text: "Yes, I can read it fluently", value: 4 },
      { text: "I can read it slowly", value: 3 },
      { text: "I know a few letters", value: 2 },
      { text: "I can't read it at all", value: 1 }
    ]
  },
  {
    id: "understanding",
    question: "How well do you understand spoken Hindi?",
    options: [
      { text: "I understand most conversations", value: 4 },
      { text: "I understand basic phrases", value: 3 },
      { text: "I understand a few words", value: 2 },
      { text: "I don't understand much", value: 1 }
    ]
  },
  {
    id: "speaking",
    question: "How comfortable are you speaking Hindi?",
    options: [
      { text: "Very comfortable, I speak regularly", value: 4 },
      { text: "Somewhat comfortable with simple phrases", value: 3 },
      { text: "I know a few words but rarely speak", value: 2 },
      { text: "Not comfortable at all", value: 1 }
    ]
  },
  {
    id: "experience",
    question: "Have you studied Hindi before?",
    options: [
      { text: "Yes, I've taken formal classes", value: 4 },
      { text: "I've learned from family", value: 3 },
      { text: "I've tried learning on my own", value: 2 },
      { text: "No, I'm completely new", value: 1 }
    ]
  },
  {
    id: "confidence",
    question: "How do you feel about your Hindi?",
    options: [
      { text: "Proud and confident", value: 4 },
      { text: "Want to improve but positive", value: 3 },
      { text: "Wish I knew more", value: 2 },
      { text: "Feel disconnected or embarrassed", value: 1 }
    ]
  }
];

export default function PlacementQuizPage() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate placement level
      const totalScore = Object.values(newAnswers).reduce((sum, val) => sum + val, 0);
      const avgScore = totalScore / questions.length;

      let placementLevel: string;
      let startPath: string;
      
      if (avgScore >= 3.5) {
        // High proficiency - can read, understand, speak
        placementLevel = "Script Confident";
        startPath = "/words/beginner"; // Skip to words
      } else if (avgScore >= 2.5) {
        // Medium proficiency - some reading/speaking ability
        placementLevel = "Script Learner";
        startPath = "/script/vowels"; // Start from beginning but they'll progress fast
      } else {
        // Beginner - need to learn from scratch
        placementLevel = "Script Beginner";
        startPath = "/script/vowels";
      }

      // Save to localStorage
      localStorage.setItem('placementLevel', placementLevel);
      localStorage.setItem('placementScore', avgScore.toString());
      localStorage.setItem('placementCompleted', 'true');

      setShowResults(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Navigate after showing results
      setTimeout(() => {
        setLocation(startPath);
      }, 3000);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Results Screen
  if (showResults) {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const avgScore = totalScore / questions.length;
    const placementLevel = localStorage.getItem('placementLevel') || "Script Beginner";

    return (
      <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
          <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col justify-center relative animate-slide-in-up">
            <div className="mb-8">
              <CheckCircle2 className="w-16 h-16 text-[#ff9930] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-black mb-4">Placement Complete!</h2>
              <img 
                src={tigerWaving} 
                alt="Waving tiger" 
                className="w-32 h-32 mx-auto object-contain mb-6" 
              />
              <div className="text-4xl font-bold text-[#ff9930] mb-4">
                {placementLevel}
              </div>
              <p className="text-gray-600 text-lg mb-4">
                {avgScore >= 3.5 && "You have a strong foundation! We'll start you with vocabulary building."}
                {avgScore >= 2.5 && avgScore < 3.5 && "You have some Hindi knowledge! We'll start from the basics to build a solid foundation."}
                {avgScore < 2.5 && "Welcome! We'll start from the very beginning and build your Hindi skills step by step."}
              </p>
              <p className="text-sm text-gray-500 italic">
                Starting your journey in 3 seconds...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        <div className="text-center mb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-black mb-2">Placement Quiz</h1>
          <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 flex-shrink-0">
          <div 
            className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center border border-gray-100 flex-1 flex flex-col relative animate-slide-in-up">
          <div className="mb-8">
            <div className="text-2xl font-bold text-black mb-8">
              {currentQuestion.question}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.value)}
                  className="px-6 py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-medium text-lg shadow-lg btn-bounce"
                  data-testid={`button-option-${index}`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
