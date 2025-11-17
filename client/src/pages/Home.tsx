import { Link } from "wouter";
import { ArrowRight, Sparkles, BookOpen, Brain, Trophy, Instagram, Twitter, Mail } from "lucide-react";
import tigerWaving from '@assets/generated_images/Waving_tiger_transparent_9a08bf58.png';
import tigerExcited from '@assets/generated_images/Excited_jumping_tiger_transparent_3fe7af96.png';
import tigerThinking from '@assets/generated_images/Thinking_tiger_transparent_d7773890.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,153,48,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-20 md:pt-20 md:pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#ff9930] rounded-full px-4 py-2 mb-6 animate-fade-in shadow-sm" data-testid="badge-heritage">
              <Sparkles className="w-4 h-4 text-[#ff9930]" />
              <span className="text-sm font-medium text-gray-700">Made for Hindi heritage speakers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }} data-testid="heading-hero">
              Reconnect with your
              <span className="block text-[#ff9930] mt-2">
                Hindi roots
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-up leading-relaxed" style={{ animationDelay: "0.2s" }} data-testid="text-subheading">
              Learn to read and write Devanagari script at your own pace. 
              Built for Gen Z and millennials who want to bridge the gap with their heritage.
            </p>

            {/* CTA Button */}
            <Link href="/script">
              <button className="group inline-flex items-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-up" style={{ animationDelay: "0.3s" }} data-testid="button-start-learning">
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Tiger Mascot */}
            <div className="mt-12 animate-bounce-subtle" data-testid="img-hero-tiger">
              <img 
                src={tigerWaving} 
                alt="Matra tiger mascot" 
                className="w-40 h-40 md:w-56 md:h-56 mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-who-for">
              Is Matra for you?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-testid="text-who-for-subtitle">
              We built this for Hindi heritage speakers who grew up hearing the language but never learned to read or write it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 hover:border-[#ff9930] transition-all duration-300 hover:shadow-lg" data-testid="card-who-heritage">
              <div className="w-12 h-12 bg-[#ff9930] rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Heritage Speakers</h3>
              <p className="text-gray-600 leading-relaxed">
                You grew up hearing Hindi at home, understand conversations, but can't read or write. Sound familiar?
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 hover:border-[#ff9930] transition-all duration-300 hover:shadow-lg" data-testid="card-who-busy">
              <div className="w-12 h-12 bg-[#ff9930] rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Busy Learners</h3>
              <p className="text-gray-600 leading-relaxed">
                You want to learn but don't have time for traditional classes. Quick, bite-sized lessons that fit your schedule.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 hover:border-[#ff9930] transition-all duration-300 hover:shadow-lg" data-testid="card-who-connect">
              <div className="w-12 h-12 bg-[#ff9930] rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cultural Connection</h3>
              <p className="text-gray-600 leading-relaxed">
                You want to read texts from your parents, understand song lyrics, or reconnect with your Indian heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="heading-how-works">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-testid="text-how-works-subtitle">
              A simple, step-by-step journey from zero to reading full Hindi text
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start" data-testid="step-learn-characters">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#ff9930] text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Learn the characters</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Start with vowels (स्वर), then consonants (व्यंजन), and matra symbols. Each character comes with clear pronunciation, sample words, and native speaker audio.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-[#ff9930] px-3 py-1 rounded-full text-sm font-medium">
                      <span>69 lessons total</span>
                    </div>
                  </div>
                  <img src={tigerThinking} alt="Learning" className="w-24 h-24 flex-shrink-0 hidden md:block" />
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#ff9930] to-orange-200"></div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start" data-testid="step-practice">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#ff9930] text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Practice with exercises</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Test your knowledge with interactive practice exercises and quizzes. Get instant feedback and track your progress through each section.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-[#ff9930] px-3 py-1 rounded-full text-sm font-medium">
                      <span>33 practice sets • 104 quizzes</span>
                    </div>
                  </div>
                  <img src={tigerExcited} alt="Practice" className="w-24 h-24 flex-shrink-0 hidden md:block" />
                </div>
              </div>
            </div>

            {/* Connector Line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#ff9930] to-orange-200"></div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start" data-testid="step-read">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#ff9930] text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Start reading & talking</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Once you master the script, unlock reading comprehension and conversational practice. Read real Hindi text and hold basic conversations.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <Trophy className="w-4 h-4" />
                      <span>You did it!</span>
                    </div>
                  </div>
                  <img src={tigerWaving} alt="Success" className="w-24 h-24 flex-shrink-0 hidden md:block" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/script">
              <button className="group inline-flex items-center gap-2 bg-[#ff9930] hover:bg-[#CF7B24] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" data-testid="button-start-journey">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-3 text-[#ff9930]" data-testid="heading-footer-brand">Matra</h3>
              <p className="text-gray-400 leading-relaxed">
                Learn Hindi Devanagari script and reconnect with your heritage. Built with love for heritage speakers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-footer-links">Learn</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/script">
                    <a className="text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-script">
                      Start Learning
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/script/vowels">
                    <a className="text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-vowels">
                      Vowels
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/script/consonants">
                    <a className="text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-consonants">
                      Consonants
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/script/matra">
                    <a className="text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-matra">
                      Matra Symbols
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4" data-testid="heading-footer-contact">Connect</h4>
              <div className="space-y-3">
                <a href="mailto:hello@matra.app" className="flex items-center gap-2 text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-email">
                  <Mail className="w-5 h-5" />
                  <span>hello@matra.app</span>
                </a>
                <a href="https://instagram.com/matraapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-instagram">
                  <Instagram className="w-5 h-5" />
                  <span>@matraapp</span>
                </a>
                <a href="https://twitter.com/matraapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-[#ff9930] transition-colors" data-testid="link-footer-twitter">
                  <Twitter className="w-5 h-5" />
                  <span>@matraapp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p data-testid="text-footer-copyright">
              © {new Date().getFullYear()} Matra. Made with ❤️ for heritage speakers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
