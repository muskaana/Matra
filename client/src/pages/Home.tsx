import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Brain, LogIn, User } from "lucide-react";
import tigerHappy from '@assets/sitting-happy-tiger.jpg';
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Don't redirect while checking auth status
    if (isLoading) return;
    
    // If not authenticated, show landing page with login button
    if (!user) {
      return;
    }
    
    // User is authenticated, check placement status
    const placementCompleted = localStorage.getItem('placementCompleted');
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (placementCompleted) {
      // User has taken placement quiz, send to dashboard
      setLocation('/dashboard');
    } else if (hasVisited) {
      // User has visited but no placement, send to placement quiz
      setLocation('/placement');
    } else {
      // First authenticated visit, mark as visited then show landing page
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [setLocation, user, isLoading]);

  return (
    <div className="min-h-screen-safe bg-gradient-to-b from-orange-50 to-white flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-lg mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#ff9930]" data-testid="heading-logo">Matra</h2>
          {user ? (
            <Link href="/dashboard">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-medium rounded-full transition-colors shadow-sm" data-testid="button-dashboard">
                <User className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </Link>
          ) : (
            <a href="/api/login">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-medium rounded-full transition-colors shadow-sm" data-testid="button-login">
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Hero Section - Centered */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,153,48,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-lg mx-auto px-4 py-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 animate-fade-up leading-tight" data-testid="heading-hero">
              Reconnect with your
              <span className="block text-[#ff9930] mt-1">
                Hindi roots
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto mb-8 animate-fade-up leading-relaxed px-2" style={{ animationDelay: "0.1s" }} data-testid="text-subheading">
              Learn to read and write Devanagari script at your own pace.
            </p>

            {/* Tiger Mascot */}
            <div className="animate-bounce-subtle mb-8" data-testid="img-hero-tiger">
              <img 
                src={tigerHappy} 
                alt="Matra tiger mascot" 
                className="w-36 h-36 md:w-48 md:h-48 mx-auto drop-shadow-2xl"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {user ? (
                <Link href="/placement">
                  <button className="group inline-flex items-center justify-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs mx-auto" data-testid="button-take-placement">
                    Take Placement Quiz
                    <Brain className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              ) : (
                <a href="/api/login">
                  <button className="group inline-flex items-center justify-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs mx-auto" data-testid="button-take-placement">
                    Take Placement Quiz
                    <Brain className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
              )}
              <Link href="/script">
                <button className="group inline-flex items-center justify-center gap-2 bg-white border-2 border-[#ff9930] text-[#ff9930] hover:bg-orange-50 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs mx-auto" data-testid="button-start-learning">
                  Start from Beginning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
