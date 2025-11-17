/**
 * QuizQuestionCard Component
 * 
 * Renders a quiz question with multiple choice options
 * Handles both single and multi-select questions
 * Shows different UI for sound-based and word-based questions
 * 
 * @param question - Question text to display
 * @param type - Question type (sound, word, syllable)
 * @param options - Array of answer options
 * @param selectedAnswers - Currently selected answer indices
 * @param onSelectAnswer - Callback when an answer is selected
 * @param isMultiSelect - Whether multiple answers can be selected
 */

interface QuizOption {
  text?: string;
  hindi?: string;
  transliteration?: string;
  correct: boolean;
}

interface QuizQuestionCardProps {
  question: string;
  type: "sound" | "word" | "syllable";
  options: QuizOption[];
  selectedAnswers: number[];
  onSelectAnswer: (index: number) => void;
  isMultiSelect: boolean;
}

export function QuizQuestionCard({
  question,
  type,
  options,
  selectedAnswers,
  onSelectAnswer,
  isMultiSelect
}: QuizQuestionCardProps) {
  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-xl font-bold text-center mb-6">{question}</h2>
      
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswers.includes(index);
          
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-[#ff9930] bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              data-testid={`quiz-option-${index}`}
            >
              {type === "word" ? (
                <div className="flex flex-col">
                  <span className="text-3xl font-bold mb-1">{option.hindi}</span>
                  <span className="text-sm text-gray-500 italic">{option.transliteration}</span>
                </div>
              ) : type === "syllable" ? (
                <span className="text-4xl font-bold">{option.hindi}</span>
              ) : (
                <span className="text-lg">{option.text}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
