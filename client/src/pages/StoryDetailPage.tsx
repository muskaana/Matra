import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { storiesLibrary } from "@/data/stories/library";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

export default function StoryDetailPage() {
  const [, params] = useRoute("/stories/:id");
  const story = storiesLibrary.find(s => s.id === params?.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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
  const currentSentence = story.sentences[currentIndex];
  const isFirstSentence = currentIndex === 0;
  const isLastSentence = currentIndex === totalSentences - 1;

  const handlePrevious = () => {
    if (!isFirstSentence) {
      setCurrentIndex(currentIndex - 1);
      setShowHelp(false);
    }
  };

  const handleNext = () => {
    if (!isLastSentence) {
      setCurrentIndex(currentIndex + 1);
      setShowHelp(false);
    } else {
      setIsCompleted(true);
    }
  };

  const getRandomStory = () => {
    const otherStories = storiesLibrary.filter(s => s.id !== story.id);
    return otherStories[Math.floor(Math.random() * otherStories.length)];
  };

  if (isCompleted) {
    const randomStory = getRandomStory();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="w-full max-w-md mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                बहुत अच्छा!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Nice work! You completed the story.
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
                      <a 
                        className="flex items-center justify-center"
                        onClick={() => {
                          setCurrentIndex(0);
                          setShowHelp(false);
                          setIsCompleted(false);
                        }}
                      >
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
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                story.level === 'Beginner' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}
              data-testid={`badge-${story.level.toLowerCase()}`}
            >
              {story.level}
            </span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600" data-testid="text-progress">
              Sentence {currentIndex + 1} of {totalSentences}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalSentences) * 100}%` }}
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
            {isLastSentence ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
