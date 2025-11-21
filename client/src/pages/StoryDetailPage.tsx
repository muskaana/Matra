import { useRoute, Link } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { storiesLibrary } from "@/data/stories/library";
import BottomNav from "@/components/BottomNav";

export default function StoryDetailPage() {
  const [, params] = useRoute("/stories/:id");
  const story = storiesLibrary.find(s => s.id === params?.id);

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
              <h1 className="text-3xl font-bold text-gray-900">{story.title}</h1>
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
          <p className="text-gray-600">{story.summaryEn}</p>
        </div>

        {/* Story Sentences */}
        <div className="space-y-6">
          {story.sentences.map((sentence, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              data-testid={`sentence-${index}`}
            >
              {/* Hindi Text */}
              <p className="text-2xl font-bold text-gray-900 mb-3 leading-relaxed">
                {sentence.hi}
              </p>
              
              {/* Transliteration */}
              <p className="text-lg text-gray-600 mb-2 italic">
                {sentence.translit}
              </p>
              
              {/* English Translation */}
              <p className="text-base text-gray-700 border-t border-gray-200 pt-3">
                {sentence.en}
              </p>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        <div className="mt-8 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            बहुत अच्छा! (Great job!)
          </p>
          <p className="text-gray-700">
            You completed this story!
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
