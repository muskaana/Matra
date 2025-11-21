import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Sparkles, BookOpen, Brain, Trophy, Instagram, Twitter, Mail, LogIn, User } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Top Navigation Bar */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,153,48,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-lg mx-auto px-4 pt-8 pb-12 md:pt-16 md:pb-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#ff9930] rounded-full px-3 py-1.5 mb-4 animate-fade-in shadow-sm" data-testid="badge-heritage">
              <Sparkles className="w-3.5 h-3.5 text-[#ff9930]" />
              <span className="text-xs font-medium text-gray-700">For Hindi heritage speakers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 animate-fade-up leading-tight" style={{ animationDelay: "0.1s" }} data-testid="heading-hero">
              Reconnect with your
              <span className="block text-[#ff9930] mt-1">
                Hindi roots
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto mb-6 animate-fade-up leading-relaxed px-2" style={{ animationDelay: "0.2s" }} data-testid="text-subheading">
              Learn to read and write Devanagari script at your own pace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/placement">
                <button className="group inline-flex items-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs mx-auto" data-testid="button-take-placement">
                  Take Placement Quiz
                  <Brain className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/script">
                <button className="group inline-flex items-center gap-2 bg-white border-2 border-[#ff9930] text-[#ff9930] hover:bg-orange-50 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full max-w-xs mx-auto" data-testid="button-start-learning">
                  Start from Beginning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Tiger Mascot */}
            <div className="animate-bounce-subtle" data-testid="img-hero-tiger">
              <img 
                src={tigerHappy} 
                alt="Matra tiger mascot" 
                className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" data-testid="heading-who-for">
              Is Matra for you?
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto" data-testid="text-who-for-subtitle">
              Built for heritage speakers who grew up hearing Hindi but never learned to read or write it.
            </p>
          </div>

          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-xl border-2 border-orange-100 hover:border-[#ff9930] transition-all duration-300" data-testid="card-who-heritage">
              <div className="w-10 h-10 bg-[#ff9930] rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Heritage Speakers</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You understand Hindi but can't read or write it.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-xl border-2 border-orange-100 hover:border-[#ff9930] transition-all duration-300" data-testid="card-who-busy">
              <div className="w-10 h-10 bg-[#ff9930] rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Busy Learners</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Quick, bite-sized lessons that fit your schedule.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-5 rounded-xl border-2 border-orange-100 hover:border-[#ff9930] transition-all duration-300" data-testid="card-who-connect">
              <div className="w-10 h-10 bg-[#ff9930] rounded-full flex items-center justify-center mb-3">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cultural Connection</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Read texts, understand lyrics, reconnect with heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" data-testid="heading-how-works">
              How it works
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto" data-testid="text-how-works-subtitle">
              Your journey from zero to reading Hindi
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {/* Step 1 */}
            <div className="flex gap-3 items-start" data-testid="step-learn-characters">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#ff9930] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  1
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">Learn the characters</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Start with vowels, consonants, and matra symbols. Each comes with pronunciation and sample words.
                </p>
                <div className="inline-flex items-center gap-2 bg-orange-100 text-[#ff9930] px-2.5 py-1 rounded-full text-xs font-medium">
                  <span>69 lessons</span>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-start pl-6">
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#ff9930] to-orange-200"></div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3 items-start" data-testid="step-practice">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#ff9930] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  2
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">Practice with exercises</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Test your knowledge with quizzes. Get instant feedback and track your progress.
                </p>
                <div className="inline-flex items-center gap-2 bg-orange-100 text-[#ff9930] px-2.5 py-1 rounded-full text-xs font-medium">
                  <span>33 practice sets • 104 quizzes</span>
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-start pl-6">
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#ff9930] to-orange-200"></div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3 items-start" data-testid="step-read">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#ff9930] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  3
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">Start reading & talking</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Master the script, then unlock reading and conversation practice.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>You did it!</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link href="/script">
              <button className="group inline-flex items-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" data-testid="button-start-journey">
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-8 md:space-y-0 mb-6">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#ff9930]" data-testid="heading-footer-brand">Matra</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Learn Devanagari script and reconnect with your heritage.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 text-sm" data-testid="heading-footer-links">Learn</h4>
              <ul className="space-y-1.5">
                <li>
                  <Link href="/script" className="text-sm text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-script">
                    Start Learning
                  </Link>
                </li>
                <li>
                  <Link href="/script/vowels" className="text-sm text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-vowels">
                    Vowels
                  </Link>
                </li>
                <li>
                  <Link href="/script/consonants" className="text-sm text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-consonants">
                    Consonants
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-sm" data-testid="heading-footer-contact">Connect</h4>
              <div className="space-y-2">
                <a href="mailto:hello@matra.app" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-email">
                  <Mail className="w-4 h-4" />
                  <span>hello@matra.app</span>
                </a>
                <a href="https://instagram.com/matraapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-instagram">
                  <Instagram className="w-4 h-4" />
                  <span>@matraapp</span>
                </a>
                <a href="https://twitter.com/matraapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-twitter">
                  <Twitter className="w-4 h-4" />
                  <span>@matraapp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-xs">
            <p data-testid="text-footer-copyright">
              © {new Date().getFullYear()} Matra. Made with ❤️ for heritage speakers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
