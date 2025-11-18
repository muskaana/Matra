/**
 * SentencesPage Component
 * 
 * Shows 3 sentence sections: Family talk, Daily life, Identity & pride
 * Tracks progress and unlocks sections sequentially
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { XCircle, Lock, CheckCircle2 } from "lucide-react";
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

  // Define icons for each section
  const sectionIcons = ['👨‍👩‍👧', '🌞', '🌟'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg flex items-center justify-between shadow-lg">
            <span>Level 4: Sentences</span>
            <button onClick={() => setLocation('/script')} data-testid="button-close">
              <XCircle className="w-5 h-5 hover:bg-white/20 rounded-full transition-colors" />
            </button>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200 flex flex-col justify-around">
            <div className="flex flex-col justify-around flex-1">
              {sentenceSections.map((section, index) => {
                const completed = isSectionCompleted(section.id);
                const unlocked = isSectionUnlocked(index);

                const content = (
                  <div className={`flex items-center gap-5 rounded-lg p-2 -m-2 transition-colors ${!unlocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'}`} data-testid={`card-section-${section.id}`}>
                    <div className="relative flex-shrink-0">
                      <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center text-white font-bold text-[40px] border-[3px] border-white shadow-md transition-colors ${!unlocked ? 'bg-gray-400' : completed ? 'bg-green-500 hover:bg-green-600' : 'bg-[#ff9930] hover:bg-[#CF7B24]'}`}>
                        {sectionIcons[index]}
                      </div>
                      {!unlocked && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Lock className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      {completed && (
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`leading-10 font-medium ${!unlocked ? 'text-gray-500' : 'text-black'} text-[28px]`}>
                        {section.title}
                      </span>
                      {!unlocked && index > 0 && (
                        <p className="text-sm text-gray-400 mt-1">Complete {sentenceSections[index - 1].title} first</p>
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
          </div>
        </div>

        {/* Completion Message */}
        {allSectionsComplete && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mt-6 text-center shadow-lg animate-slide-in-up">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">Level Complete!</h3>
            <p className="text-white/90 text-sm">
              You can now read complete Hindi sentences. Reading unlocked!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
