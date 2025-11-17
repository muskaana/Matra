/**
 * ReadingContentPage Component
 * 
 * Shows reading content in Devanagari with tap-to-reveal help
 * Shows transliteration and meaning line by line
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Eye, EyeOff, MessageSquare, BookOpen, Film } from "lucide-react";
import { readingContent } from '../data/reading/content';

export default function ReadingContentPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const contentId = params.contentId as string;
  
  const content = readingContent.find(c => c.id === contentId);
  
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <p>Content not found</p>
      </div>
    );
  }

  const handleToggleLine = (index: number) => {
    const newRevealed = new Set(revealedLines);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealedLines(newRevealed);
  };

  const handleShowAll = () => {
    if (revealedLines.size === content.lines.length) {
      setRevealedLines(new Set());
    } else {
      setRevealedLines(new Set(content.lines.map((_, i) => i)));
    }
  };

  const allRevealed = revealedLines.size === content.lines.length;

  const handleContinue = () => {
    setLocation(`/reading/${contentId}/quiz`);
  };

  const getIcon = () => {
    if (content.type === "whatsapp") return <MessageSquare className="w-8 h-8 text-[#ff9930]" />;
    if (content.type === "paragraph") return <BookOpen className="w-8 h-8 text-[#ff9930]" />;
    return <Film className="w-8 h-8 text-[#ff9930]" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen px-4 py-4">
        {/* Header */}
        <div className="flex items-center mb-4 flex-shrink-0">
          <button 
            onClick={() => setLocation('/reading')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            {getIcon()}
            <div>
              <h1 className="text-xl font-bold text-black">{content.title}</h1>
              <p className="text-sm text-gray-600">{content.description}</p>
            </div>
          </div>
        </div>

        {/* Reading Content */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#ff9930]">
              {/* Content in Devanagari */}
              <div className="space-y-6 mb-6">
                {content.lines.map((line, index) => {
                  const isRevealed = revealedLines.has(index);
                  return (
                    <div 
                      key={index} 
                      className="border-b border-gray-200 pb-4 last:border-0 cursor-pointer"
                      onClick={() => handleToggleLine(index)}
                      data-testid={`line-${index}`}
                    >
                      <div className="text-3xl font-bold text-black mb-3 leading-relaxed">
                        {line.hindi}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        {isRevealed ? (
                          <><EyeOff className="w-4 h-4" /> Tap to hide</>
                        ) : (
                          <><Eye className="w-4 h-4" /> Tap to reveal</>
                        )}
                      </div>
                      
                      {isRevealed && (
                        <div className="bg-gradient-to-br from-[#ff9930] to-[#ff7730] rounded-xl p-4 text-white space-y-2 animate-slide-in-up">
                          <div className="text-lg font-semibold">
                            {line.transliteration}
                          </div>
                          <div className="text-base">
                            {line.meaning}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Show/Hide All Button */}
              <button
                onClick={handleShowAll}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                data-testid="button-toggle-all"
              >
                {allRevealed ? (
                  <>
                    <EyeOff className="w-5 h-5" />
                    Hide All Help
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    Show All Help
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors font-semibold text-lg shadow-lg"
            data-testid="button-continue"
          >
            Continue to Questions
          </button>
        </div>
      </div>
    </div>
  );
}
