import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Eye, EyeOff, Check, X } from "lucide-react";
import { storiesLibrary } from "@/data/stories/library";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

type Phase = 'reading' | 'quiz' | 'results' | 'completed';

export default function StoryDetailPage() {
  const [, params] = useRoute("/stories/:id");
  const story = storiesLibrary.find(s => s.id === params?.id);
  
  const [phase, setPhase] = useState<Phase>('reading');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    // Reset state when story changes
    setPhase('reading');
    setCurrentSentenceIndex(0);
    setShowHelp(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
  }, [story?.id]);

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <Link href="/reading">
            <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer" data-testid="link-back">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Stories</span>
            </a>
          </Link>
          <div className="text-center py-12">
            <p className="text-gray-600" data-testid="text-story-not-found">Story not found</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const totalSentences = story.sentences.length;
  const currentSentence = story.sentences[currentSentenceIndex];
  const isFirstSentence = currentSentenceIndex === 0;
  const isLastSentence = currentSentenceIndex === totalSentences - 1;
  
  const totalQuestions = story.comprehensionQuestions.length;
  const currentQuestion = story.comprehensionQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handlePrevious = () => {
    if (!isFirstSentence) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
      setShowHelp(false);
    }
  };

  const handleNext = () => {
    if (!isLastSentence) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setShowHelp(false);
    } else {
      setPhase('quiz');
    }
  };

  const handleQuizAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    
    if (isLastQuestion) {
      setPhase('results');
      // Mark story as completed in localStorage
      const completedStories = JSON.parse(localStorage.getItem('completedStories') || '[]');
      if (!completedStories.includes(story.id)) {
        completedStories.push(story.id);
        localStorage.setItem('completedStories', JSON.stringify(completedStories));
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const getScore = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === story.comprehensionQuestions[index].correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const getRandomStory = () => {
    const otherStories = storiesLibrary.filter(s => s.id !== story.id);
    return otherStories[Math.floor(Math.random() * otherStories.length)];
  };

  // RESULTS PHASE
  if (phase === 'results') {
    const score = getScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {percentage >= 70 ? '🎉' : '💪'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {percentage >= 70 ? 'बहुत बढ़िया!' : 'अच्छी कोशिश!'}
              </h2>
              <p className="text-xl text-gray-700 mb-2">
                You got {score} out of {totalQuestions} correct
              </p>
              <p className="text-gray-600">
                {percentage >= 70 
                  ? "Great comprehension! You understood the story well." 
                  : "Keep practicing! Reading more stories will help you improve."}
              </p>
            </div>

            {/* Question Results */}
            <div className="space-y-4 mb-6">
              {story.comprehensionQuestions.map((q, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === q.correctIndex;
                
                return (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                    data-testid={`result-${index}`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {isCorrect ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="font-semibold text-gray-900">{q.question}</p>
                    </div>
                    <p className="text-sm text-gray-700 ml-7">
                      {isCorrect ? 'Correct! ' : `Your answer: ${q.options[userAnswer]}. `}
                      Correct answer: {q.options[q.correctIndex]}
                    </p>
                  </div>
                );
              })}
            </div>

            <Button
              className="w-full bg-[#ff9930] hover:bg-[#ff8800] text-white"
              onClick={() => setPhase('completed')}
              data-testid="button-continue-to-completion"
            >
              Continue
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // COMPLETED PHASE
  if (phase === 'completed') {
    const randomStory = getRandomStory();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Story Completed!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                This story is now marked as complete.
              </p>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#ff9930] hover:bg-[#ff8800] text-white"
                  asChild
                >
                  <Link href="/reading" data-testid="link-back-to-stories">
                    <a className="flex items-center justify-center">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Story Library
                    </a>
                  </Link>
                </Button>
                
                {randomStory && (
                  <Button 
                    variant="outline"
                    className="w-full border-[#ff9930] text-[#ff9930] hover:bg-orange-50"
                    asChild
                  >
                    <Link href={`/stories/${randomStory.id}`} data-testid="link-start-another">
                      <a className="flex items-center justify-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Another Story
                      </a>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // QUIZ PHASE
  if (phase === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <Link href="/reading">
            <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer" data-testid="link-back">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Stories</span>
            </a>
          </Link>

          {/* Quiz Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8 text-[#ff9930]" />
              <h1 className="text-2xl font-bold text-gray-900">Comprehension Check</h1>
            </div>
            <p className="text-gray-600">Let's see how well you understood the story!</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600" data-testid="text-quiz-progress">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                data-testid="quiz-progress-bar"
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
            <p className="text-xl font-bold text-gray-900 mb-6" data-testid="text-question">
              {currentQuestion.question}
            </p>
            
            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-[#ff9930] bg-orange-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  data-testid={`option-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-[#ff9930] bg-[#ff9930]'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-[#ff9930] hover:bg-[#ff8800] text-white"
            onClick={handleQuizAnswer}
            disabled={selectedAnswer === null}
            data-testid="button-submit-answer"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // READING PHASE (default)
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
      <div className="w-full max-w-md mx-auto px-6 py-6">
        {/* Back Button */}
        <Link href="/reading">
          <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 cursor-pointer" data-testid="link-back">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Stories</span>
          </a>
        </Link>

        {/* Story Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#ff9930]" />
              <h1 className="text-2xl font-bold text-gray-900">{story.title}</h1>
            </div>
            <span 
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                story.level === 'Beginner' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}
              title={story.level}
              data-testid={`badge-${story.level.toLowerCase()}`}
            >
              {story.level === 'Beginner' ? 'B' : 'I'}
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600" data-testid="text-progress">
              Sentence {currentSentenceIndex + 1} of {totalSentences}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSentenceIndex + 1) / totalSentences) * 100}%` }}
              data-testid="progress-bar"
            />
          </div>
        </div>

        {/* Current Sentence */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
          {/* Hindi Text */}
          <p className="text-3xl font-bold text-gray-900 mb-4 leading-relaxed text-center" data-testid="text-hindi">
            {currentSentence.hi}
          </p>
          
          {/* Help Toggle Button */}
          <Button
            variant="outline"
            className="w-full mb-4 border-[#ff9930] text-[#ff9930] hover:bg-orange-50"
            onClick={() => setShowHelp(!showHelp)}
            data-testid="button-toggle-help"
          >
            {showHelp ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Help
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Show Help
              </>
            )}
          </Button>

          {/* Help Content */}
          {showHelp && (
            <div className="space-y-3 pt-4 border-t border-gray-200" data-testid="help-content">
              {/* Transliteration */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Transliteration</p>
                <p className="text-lg text-gray-700 italic" data-testid="text-transliteration">
                  {currentSentence.translit}
                </p>
              </div>
              
              {/* English Translation */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">English</p>
                <p className="text-base text-gray-800" data-testid="text-english">
                  {currentSentence.en}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handlePrevious}
            disabled={isFirstSentence}
            data-testid="button-previous"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            className="flex-1 bg-[#ff9930] hover:bg-[#ff8800] text-white"
            onClick={handleNext}
            data-testid="button-next"
          >
            {isLastSentence ? 'Start Quiz' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
