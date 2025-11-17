import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, Check } from "lucide-react";
import tigerExcited from '@assets/generated_images/Excited_jumping_tiger_transparent_3fe7af96.png';
import { RangoliPattern, MandalaPattern } from '../components/DecorativePattern';

export default function NumbersSectionsPage() {
  const [completedSections, setCompletedSections] = useState(0);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const completed = parseInt(localStorage.getItem('numbersQuizzesCompleted') || '0');
    setCompletedSections(completed);
  }, []);
  
  const handleRedoSection = () => {
    if (selectedSection) {
      setShowCompletedModal(false);
      setLocation(`/script/lesson/numbers/${selectedSection.startLesson}`);
    }
  };
  
  const handleSectionClick = (section: any, isCompleted: boolean, e: React.MouseEvent) => {
    if (isCompleted) {
      e.preventDefault();
      setSelectedSection(section);
      setShowCompletedModal(true);
    }
  };
  
  const sections = [
    { id: 1, name: "Section 1: Numbers ०-④", startLesson: "n0" },
    { id: 2, name: "Section 2: Numbers ⑤-⑨", startLesson: "n5" },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-white shadow-lg">
        <div className="sticky top-0 z-10 bg-white px-6 pt-6 pb-4 flex-shrink-0">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#FFD700] text-white px-6 py-4 rounded-xl font-semibold text-2xl flex items-center justify-between">
            <span>Numbers</span>
            <Link href="/script">
              <button className="p-2 hover:bg-[#CF7B24] rounded-full transition-colors" data-testid="button-back">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-8 py-8 px-6 overflow-y-auto relative">
          <RangoliPattern className="absolute top-4 left-4 w-16 h-16 opacity-30" color="#ff9930" />
          <MandalaPattern className="absolute top-4 right-4 w-16 h-16 opacity-30" color="#2E86AB" />
          <RangoliPattern className="absolute bottom-32 left-4 w-12 h-12 opacity-25" color="#138808" />
          
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = section.id <= completedSections;
            const isUnlocked = section.id <= completedSections + 1;
            
            return (
              <div key={section.id} className="relative w-full min-h-[100px]">
                {isUnlocked ? (
                  <Link href={`/script/lesson/numbers/${section.startLesson}`} onClick={(e) => handleSectionClick(section, isCompleted, e)}>
                    <button
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-lg border-4 transition-all btn-bounce ${
                        isCompleted 
                          ? 'bg-green-500 hover:bg-green-600 border-green-300' 
                          : 'bg-[#ff9930] hover:bg-[#CF7B24] border-white'
                      } ${isEven ? 'ml-8' : 'ml-auto mr-8'}`}
                      data-testid={`button-section-${section.id}`}
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
                    data-testid={`button-section-${section.id}-locked`}
                  >
                    {section.id}
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-lg">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            );
          })}
          
          <div className="absolute bottom-16 right-12 w-32 h-32 opacity-85 animate-bounce-subtle" style={{ transform: 'rotate(-5deg)' }}>
            <img src={tigerExcited} alt="Excited tiger" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
      
      {showCompletedModal && selectedSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-slide-in-up">
            <h2 className="text-2xl font-bold text-black mb-2">Section Complete!</h2>
            <p className="text-gray-600 mb-6">
              You've already completed {selectedSection.name}. Would you like to redo this section?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCompletedModal(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                data-testid="button-cancel-redo"
              >
                Cancel
              </button>
              <button
                onClick={handleRedoSection}
                className="flex-1 py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold"
                data-testid="button-redo-section"
              >
                Redo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
