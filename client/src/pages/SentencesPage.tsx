/**
 * SentencesPage Component
 * 
 * Shows 3 sentence sections: Family talk, Daily life, Identity & pride
 * Tracks progress and unlocks sections sequentially
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { sentenceSections } from '../data/sentences/beginner';

export default function SentencesPage() {
  const [, setLocation] = useLocation();
  const [sectionsCompleted, setSectionsCompleted] = useState<string[]>([]);

  useEffect(() => {
    const completed = localStorage.getItem('sentencesCompleted');
    if (completed) {
      setSectionsCompleted(JSON.parse(completed));
    }
  }, []);

  const isSectionCompleted = (sectionId: string) => sectionsCompleted.includes(sectionId);
  const isSectionUnlocked = (index: number) => {
    if (index === 0) return true;  // First section always unlocked
    return isSectionCompleted(sentenceSections[index - 1].id);
  };

  const allSectionsComplete = sentenceSections.every(section => isSectionCompleted(section.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col h-full px-4 py-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setLocation('/script')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-black">Sentences</h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-center">
          Practice reading complete Hindi sentences
        </p>

        {/* Sentence Sections */}
        <div className="flex-1 space-y-4">
          {sentenceSections.map((section, index) => {
            const completed = isSectionCompleted(section.id);
            const unlocked = isSectionUnlocked(index);

            const content = (
              <div 
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all ${
                  !unlocked 
                    ? 'border-gray-200 opacity-50 cursor-not-allowed' 
                    : completed
                    ? 'border-green-500 cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                    : 'border-[#ff9930] cursor-pointer hover:shadow-xl hover:scale-[1.02]'
                }`}
                data-testid={`card-section-${section.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold mb-1 ${!unlocked ? 'text-gray-400' : 'text-black'}`}>
                      {section.title}
                    </h2>
                    <p className={`text-sm ${!unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                      {section.description}
                    </p>
                  </div>
                  {completed && (
                    <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                  )}
                  {!unlocked && (
                    <Lock className="w-8 h-8 text-gray-400 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className={`text-sm font-medium ${!unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                    {section.sentences.length} sentences
                  </div>
                  {!unlocked && index > 0 && (
                    <div className="text-xs text-gray-400">
                      Complete {sentenceSections[index - 1].title} first
                    </div>
                  )}
                </div>
              </div>
            );

            return unlocked ? (
              <Link key={section.id} href={`/sentences/${section.id}/learn`}>
                {content}
              </Link>
            ) : (
              <div key={section.id}>{content}</div>
            );
          })}
        </div>

        {/* Completion Message */}
        {allSectionsComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mt-6 text-center shadow-lg animate-slide-in-up">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">Sentences Complete!</h3>
            <p className="text-white/90 text-sm">
              You can now read complete Hindi sentences!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
