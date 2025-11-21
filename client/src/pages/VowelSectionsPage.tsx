import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, Check } from "lucide-react";
import tigerPlayful from '@assets/crouching-playful-tiger.jpg';
import { RangoliPattern, MandalaPattern, HalfRangoliPattern, QuarterRangoliPattern } from '../components/DecorativePattern';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useUserProgress';

export default function VowelSectionsPage() {
  const [completedSections, setCompletedSections] = useState(0);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { progress, isLoading } = useProgress();
  
  const sections = [
    { id: 1, name: "Section 1", startLesson: "1" },
    { id: 2, name: "Section 2", startLesson: "3" },
    { id: 3, name: "Section 3", startLesson: "5" },
    { id: 4, name: "Section 4", startLesson: "7" },
    { id: 5, name: "Section 5", startLesson: "10" },
  ];

  // Calculate completed sections from database or localStorage
  const calculatedCompletedSections = useMemo(() => {
    if (user && progress) {
      // For authenticated users, use database data
      const vowelLessons = progress.filter(
        (p) => p.category === 'vowels' && p.type === 'lesson' && p.completed
      );
      
      // Get all completed lesson IDs
      const completedLessonIds = vowelLessons.map((p) => p.lessonId);
      
      // Count how many sections are completed
      let completed = 0;
      for (const section of sections) {
        if (completedLessonIds.includes(section.startLesson)) {
          completed = section.id;
        }
      }
      
      return completed;
    } else if (!user) {
      // For unauthenticated users, fall back to localStorage
      return parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
    }
    
    return 0;
  }, [user, progress]);
  
  useEffect(() => {
    setCompletedSections(calculatedCompletedSections);
  }, [calculatedCompletedSections, location]);
  
  const handleReset = () => {
    localStorage.setItem('vowelsQuizzesCompleted', '0');
    setCompletedSections(0);
  };
  
  const handleRedoSection = () => {
    if (selectedSection) {
      setShowCompletedModal(false);
      setLocation(`/script/lesson/vowels/${selectedSection.startLesson}`);
    }
  };
  
  const handleSectionClick = (section: any, isCompleted: boolean, e: React.MouseEvent) => {
    if (isCompleted) {
      e.preventDefault();
      setSelectedSection(section);
      setShowCompletedModal(true);
    }
  };

  // Show loading state for authenticated users while fetching data
  if (user && isLoading) {
    return (
      <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-white shadow-lg">
          <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 flex-shrink-0">
            <div className="bg-gradient-to-r from-[#ff9930] to-[#FFD700] text-white px-6 py-4 rounded-xl font-semibold text-2xl flex items-center justify-between">
              <span>Vowels</span>
              <Link href="/script/vowels">
                <button className="p-2 hover:bg-[#CF7B24] rounded-full transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9930] mb-4"></div>
              <p className="text-gray-600">Loading your progress...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-white shadow-lg">
        <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#FFD700] text-white px-6 py-4 rounded-xl font-semibold text-2xl flex items-center justify-between">
            <span>Vowels</span>
            <Link href="/script/vowels">
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
          
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = section.id <= completedSections;
            const isUnlocked = section.id <= completedSections + 1;
            
            return (
              <div key={section.id} className="relative w-full min-h-[100px]">
                {isUnlocked ? (
                  <Link href={`/script/lesson/vowels/${section.startLesson}`} onClick={(e) => handleSectionClick(section, isCompleted, e)}>
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
                  <Link href={`/script/lesson/vowels/${nextIncompleteSection.startLesson}`}>
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
