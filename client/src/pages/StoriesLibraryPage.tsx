import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Book, ChevronRight, CheckCircle } from "lucide-react";
import { storiesLibrary } from "@/data/stories/library";
import BottomNav from "@/components/BottomNav";

export default function StoriesLibraryPage() {
  const [completedStories, setCompletedStories] = useState<string[]>([]);

  useEffect(() => {
    // Load completed stories from localStorage
    const completed = JSON.parse(localStorage.getItem('completedStories') || '[]');
    setCompletedStories(completed);
  }, []);

  const isCompleted = (storyId: string) => completedStories.includes(storyId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
      <div className="w-full max-w-md mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-8 h-8 text-[#ff9930]" />
            <h1 className="text-3xl font-bold text-gray-900">Story Library</h1>
          </div>
          <p className="text-gray-600">
            Practice reading with these mini-stories in Hindi
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-4">
          {storiesLibrary.map((story) => {
            const completed = isCompleted(story.id);
            
            return (
              <Link key={story.id} href={`/stories/${story.id}`} data-testid={`link-story-${story.id}`}>
                <div 
                  className={`bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer ${
                    completed ? 'border-green-200' : ''
                  }`}
                  data-testid={`story-${story.id}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {completed && (
                          <CheckCircle className="w-5 h-5 text-green-600" data-testid={`checkmark-${story.id}`} />
                        )}
                        <h3 className="text-xl font-bold text-gray-900">
                          {story.title}
                        </h3>
                        <span 
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                            story.level === 'Beginner' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                          title={story.level}
                          data-testid={`badge-level-${story.id}`}
                        >
                          {story.level === 'Beginner' ? 'B' : 'I'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {story.summaryEn}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
