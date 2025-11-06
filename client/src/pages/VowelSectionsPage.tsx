import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Check } from "lucide-react";
import tigerExcited from '@assets/generated_images/Excited_jumping_tiger_transparent_3fe7af96.png';
import { RangoliPattern, MandalaPattern } from '../components/DecorativePattern';

export default function VowelSectionsPage() {
  const [completedSections, setCompletedSections] = useState(0);
  
  useEffect(() => {
    const completed = parseInt(localStorage.getItem('vowelsQuizzesCompleted') || '0');
    setCompletedSections(completed);
  }, []);
  
  const sections = [
    { id: 1, name: "Section 1", startLesson: "1" },
    { id: 2, name: "Section 2", startLesson: "3" },
    { id: 3, name: "Section 3", startLesson: "5" },
    { id: 4, name: "Section 4", startLesson: "7" },
    { id: 5, name: "Section 5", startLesson: "10" },
  ];

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-white shadow-lg">
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
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
          <RangoliPattern className="absolute top-4 left-4 w-16 h-16 opacity-30" color="#ff9930" />
          <MandalaPattern className="absolute top-4 right-4 w-16 h-16 opacity-30" color="#2E86AB" />
          <RangoliPattern className="absolute bottom-32 left-4 w-12 h-12 opacity-25" color="#138808" />
          
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = section.id <= completedSections;
            
            return (
              <div key={section.id} className="relative w-full min-h-[100px]">
                <Link href={`/script/lesson/vowels/${section.startLesson}`}>
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
          
          <div className="absolute bottom-16 right-12 w-32 h-32 opacity-85 animate-bounce-subtle" style={{ transform: 'rotate(-5deg)' }}>
            <img src={tigerExcited} alt="Excited tiger" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
