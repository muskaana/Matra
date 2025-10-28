import React from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function VowelSectionsPage() {
  const sections = [
    { id: 1, name: "Section 1", startLesson: "1" },
    { id: 2, name: "Section 2", startLesson: "3" },
    { id: 3, name: "Section 3", startLesson: "5" },
    { id: 4, name: "Section 4", startLesson: "7" },
    { id: 5, name: "Section 5", startLesson: "10" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-6 py-6 bg-white shadow-lg">
        <div className="bg-[#ff9930] text-white px-6 py-4 rounded-xl font-semibold text-2xl mb-6 flex items-center justify-between">
          <span>Vowels</span>
          <Link href="/script/vowels">
            <button className="p-2 hover:bg-[#CF7B24] rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </Link>
        </div>

        <div className="flex-1 flex flex-col gap-8 py-8 overflow-y-auto">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div key={section.id} className="relative w-full min-h-[100px]">
                <Link href={`/script/lesson/vowels/${section.startLesson}`}>
                  <button
                    className={`w-24 h-24 bg-[#ff9930] hover:bg-[#CF7B24] rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-lg border-4 border-white transition-all ${
                      isEven ? 'ml-8' : 'ml-auto mr-8'
                    }`}
                  >
                    {section.id}
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
        </div>
      </div>
    </div>
  );
}
