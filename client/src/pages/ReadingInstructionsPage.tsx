/**
 * ReadingInstructionsPage Component
 * 
 * Introductory lesson explaining how to read Hindi words
 * Covers syllable structure, matras, and half consonants
 */

import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

export default function ReadingInstructionsPage() {
  const [, setLocation] = useLocation();

  const markAsRead = () => {
    localStorage.setItem('readingInstructionsViewed', 'true');
    setLocation('/words/beginner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex flex-col px-6 py-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setLocation('/words/beginner')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-black flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-[#ff9930]" />
            How to Read Hindi Words
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 mb-6">
          {/* Introduction */}
          <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-[#ff9930]">
            <p className="text-gray-700 leading-relaxed">
              Now that you know the script, let's learn how to combine letters into words! 
              This quick guide will help you start reading.
            </p>
          </div>

          {/* Section 1: Syllable Structure */}
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <span className="text-2xl">1️⃣</span>
              Syllable Structure
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                Each consonant has an inherent <strong>अ (a)</strong> sound built in.
              </p>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ff9930]">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">क</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">ka (not just "k")</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">म</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">ma</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">न</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">na</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Matras */}
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <span className="text-2xl">2️⃣</span>
              Matras (Vowel Marks)
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                Matras change the vowel sound. They attach to consonants:
              </p>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ff9930]">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">कि</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">ki</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">की</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">kee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">कु</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">ku</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-black">का</span>
                    <span className="text-gray-600">=</span>
                    <span className="text-lg text-gray-700">kaa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Simple Words */}
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <span className="text-2xl">3️⃣</span>
              Reading Simple Words
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                Blend consonants together to form words:
              </p>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ff9930]">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-black">नम</span>
                      <span className="text-gray-600">=</span>
                      <span className="text-lg text-gray-700">na + ma = <strong>nam</strong> (bow)</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-black">दम</span>
                      <span className="text-gray-600">=</span>
                      <span className="text-lg text-gray-700">da + ma = <strong>dam</strong> (breath)</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-black">घर</span>
                      <span className="text-gray-600">=</span>
                      <span className="text-lg text-gray-700">gha + ra = <strong>ghar</strong> (home)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Half Consonants */}
          <div className="bg-white rounded-xl p-5 shadow-md">
            <h2 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <span className="text-2xl">4️⃣</span>
              Half Consonants (Advanced)
            </h2>
            <div className="space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                Sometimes consonants cluster together. A halant (्) removes the inherent "a":
              </p>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-[#ff9930]">
                <div className="space-y-3">
                  <div>
                    <div className="text-3xl font-bold text-black mb-1">स्कूल</div>
                    <div className="text-sm text-gray-600">
                      स् + कू + ल = <strong>skool</strong> (school)
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-black mb-1">क्लास</div>
                    <div className="text-sm text-gray-600">
                      क् + ला + स = <strong>klaas</strong> (class)
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 italic mt-2">
                    Don't worry! You'll practice these naturally as you learn words.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 shadow-md">
            <h3 className="text-white font-bold text-lg mb-2">🎯 Tips for Success</h3>
            <ul className="text-white/90 text-sm space-y-2">
              <li>• Read syllable by syllable, then blend them together</li>
              <li>• Practice with flashcards to recognize words quickly</li>
              <li>• Say words out loud to improve pronunciation</li>
              <li>• Don't rush—accuracy first, speed will come!</li>
            </ul>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={markAsRead}
          className="w-full bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          data-testid="button-continue"
        >
          Start Learning Words
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
