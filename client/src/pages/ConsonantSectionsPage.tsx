import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, Check } from "lucide-react";
import tigerPlayful from '@assets/crouching-playful-tiger.jpg';
import { RangoliPattern, MandalaPattern, HalfRangoliPattern, QuarterRangoliPattern } from '../components/DecorativePattern';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useUserProgress';

export default function ConsonantSectionsPage() {
  const [completedSections, setCompletedSections] = useState(0);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [location, setLocation] = useLocation();
  
  const { user, isAuthenticated } = useAuth();
  const { progress, isLoading } = useProgress();
  
  const sections = [
    { id: 1, name: "क vs ख", startLesson: "c1" },
    { id: 2, name: "ग vs घ", startLesson: "c3" },
    { id: 3, name: "च vs छ", startLesson: "c5" },
    { id: 4, name: "ज vs झ", startLesson: "c7" },
    { id: 5, name: "ट vs ठ", startLesson: "c9" },
    { id: 6, name: "ड vs ढ", startLesson: "c11" },
    { id: 7, name: "त vs थ", startLesson: "c13" },
    { id: 8, name: "द vs ध", startLesson: "c15" },
    { id: 9, name: "प vs फ", startLesson: "c17" },
    { id: 10, name: "ब vs भ", startLesson: "c19" },
    { id: 11, name: "न vs म", startLesson: "c21" },
    { id: 12, name: "य vs र", startLesson: "c23" },
    { id: 13, name: "ल vs व", startLesson: "c25" },
    { id: 14, name: "श vs ष", startLesson: "c27" },
    { id: 15, name: "स vs ह", startLesson: "c29" },
    { id: 16, name: "क्ष त्र ज्ञ", startLesson: "c31" },
  ];
  
  useEffect(() => {
    if (isAuthenticated && progress) {
      // For authenticated users, count completed sections from database using sectionId
      const completedLessons = progress.filter(
        p => p.category === 'consonants' && p.type === 'lesson' && p.completed
      );
      // Get unique section IDs and find consecutive completed sections
      const completedSectionIds = completedLessons.map(p => p.sectionId).filter(Boolean);
      let maxCompleted = 0;
      for (const section of sections) {
        if (completedSectionIds.includes(section.id.toString())) {
          maxCompleted = section.id;
        } else {
          // Stop at first incomplete section to enforce linear progression
          break;
        }
      }
      setCompletedSections(maxCompleted);
    } else if (!isAuthenticated) {
      // For unauthenticated users, fall back to localStorage
      const completed = parseInt(localStorage.getItem('consonantsQuizzesCompleted') || '0');
      setCompletedSections(completed);
    }
  }, [isAuthenticated, progress, location]);
  
  const handleRedoSection = () => {
    if (selectedSection) {
      setShowCompletedModal(false);
      setLocation(`/script/lesson/consonants/${selectedSection.startLesson}`);
    }
  };
  
  const handleSectionClick = (section: any, isCompleted: boolean, e: React.MouseEvent) => {
    if (isCompleted) {
      e.preventDefault();
      setSelectedSection(section);
      setShowCompletedModal(true);
    }
  };

  return (
    <div className="h-screen-safe bg-gradient-to-b from-orange-50 to-white flex flex-col pb-nav">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-white shadow-lg">
        <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#FFD700] text-white px-6 py-4 rounded-xl font-semibold text-2xl flex items-center justify-between">
            <span>Consonants</span>
            <Link href="/script/consonants">
              <button className="p-2 hover:bg-[#CF7B24] rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-8 py-8 px-6 overflow-y-auto relative">
          {/* Decorative patterns - positioned to not overlap with content */}
          <RangoliPattern className="absolute top-4 left-4 w-16 h-16 opacity-20 -z-10 pointer-events-none" color="#ff9930" />
          <MandalaPattern className="absolute top-4 right-4 w-16 h-16 opacity-20 -z-10 pointer-events-none" color="#2E86AB" />
          
          {/* Loading state for authenticated users */}
          {isAuthenticated && isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9930]"></div>
            </div>
          ) : null}
          
          {(!isAuthenticated || !isLoading) && sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = section.id <= completedSections;
            const isUnlocked = section.id <= completedSections + 1;
            
            return (
              <div key={section.id} className="relative w-full min-h-[100px]">
                {isUnlocked ? (
                  <Link href={`/script/lesson/consonants/${section.startLesson}`} onClick={(e) => handleSectionClick(section, isCompleted, e)}>
                    <button
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-lg border-4 transition-all btn-bounce ${
                        isCompleted 
                          ? 'bg-green-500 hover:bg-green-600 border-green-300' 
                          : 'bg-[#ff9930] hover:bg-[#CF7B24] border-white'
                      } ${isEven ? 'ml-8' : 'ml-auto mr-8'}`}
                    >
                      {section.id}
                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-lg">
                          <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center text-gray-400 font-bold text-5xl shadow-lg border-4 bg-gray-300 border-gray-400 cursor-not-allowed opacity-50 ${isEven ? 'ml-8' : 'ml-auto mr-8'}`}
                  >
                    {section.id}
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-lg">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                )}
                
                {index < sections.length - 1 && (
                  <div
                    className="absolute border-t-2 border-gray-400"
                    style={{
                      width: '180px',
                      top: '80px',
                      left: isEven ? '110px' : 'auto',
                      right: isEven ? 'auto' : '110px',
                      transform: isEven ? 'rotate(25deg)' : 'rotate(-25deg)',
                      transformOrigin: isEven ? 'left center' : 'right center',
                    }}
                  />
                )}
              </div>
            );
          })}
          
          <div className="mt-8 flex justify-center">
            <img src={tigerPlayful} alt="Playful tiger" className="w-32 h-32 object-contain opacity-85 animate-bounce-subtle" style={{ transform: 'rotate(-5deg)' }} />
          </div>
        </div>
      </div>
      
      {showCompletedModal && selectedSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-in-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Section Completed!</h3>
              <p className="text-gray-600">You have completed this lesson. Continue to the next section or redo this one.</p>
            </div>
            
            <div className="space-y-3">
              {(() => {
                const nextIncompleteSection = sections.find(s => s.id > completedSections);
                return nextIncompleteSection && (
                  <Link href={`/script/lesson/consonants/${nextIncompleteSection.startLesson}`}>
                    <button 
                      onClick={() => setShowCompletedModal(false)}
                      className="w-full py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold btn-bounce"
                    >
                      Continue to Next Section
                    </button>
                  </Link>
                );
              })()}
              
              <button 
                onClick={handleRedoSection}
                className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold btn-bounce"
              >
                Redo This Lesson
              </button>
              
              <button 
                onClick={() => setShowCompletedModal(false)}
                className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
