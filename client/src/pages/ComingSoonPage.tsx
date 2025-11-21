import { useLocation } from "wouter";
import { ArrowLeft, Sparkles } from "lucide-react";
import tigerExcited from '@assets/generated_images/Excited_jumping_tiger_transparent_3fe7af96.png';

export default function ComingSoonPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col pb-24">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4 py-6 justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="mb-6">
            <img 
              src={tigerExcited} 
              alt="Excited tiger" 
              className="w-32 h-32 mx-auto object-contain animate-bounce-subtle" 
            />
          </div>
          
          <div className="mb-4">
            <Sparkles className="w-12 h-12 text-[#ff9930] mx-auto mb-4" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Coming Soon!</h1>
          <p className="text-gray-600 text-lg mb-6">
            We're working hard to bring you this exciting new feature. Stay tuned!
          </p>

          <button
            onClick={() => setLocation('/script')}
            className="w-full py-3 bg-[#ff9930] text-white rounded-xl hover:bg-[#CF7B24] transition-colors text-lg font-semibold shadow-lg flex items-center justify-center gap-2"
            data-testid="button-back-to-script"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Script
          </button>
        </div>
      </div>
    </div>
  );
}
