/**
 * ReadingPage Component
 * 
 * Shows reading practice content organized by type
 * WhatsApp messages, Paragraphs, and Bollywood captions
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, MessageSquare as MessageSquareIcon, BookOpen, Film, CheckCircle2 } from "lucide-react";
import { readingContent } from '../data/reading/content';
import BottomNav from '../components/BottomNav';

export default function ReadingPage() {
  const [, setLocation] = useLocation();
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [vowelsCompleted, setVowelsCompleted] = useState<number>(0);
  const [consonantsCompleted, setConsonantsCompleted] = useState<number>(0);
  const [matraCompleted, setMatraCompleted] = useState<number>(0);
  const [similarCompleted, setSimilarCompleted] = useState<number>(0);
  const [sentencesCompleted, setSentencesCompleted] = useState<number>(0);

  const totalVowels = 5;
  const totalConsonants = 16;
  const totalMatra = 7;
  const totalSimilar = 5;
  const totalSentenceSections = 3;

  useEffect(() => {
    const completed = localStorage.getItem('readingCompleted');
    if (completed) {
      setCompletedItems(JSON.parse(completed));
    }

    // Load completion data to determine unlock states
    const vowels = localStorage.getItem('vowelsQuizzesCompleted');
    const consonants = localStorage.getItem('consonantsQuizzesCompleted');
    const matra = localStorage.getItem('matraQuizzesCompleted');
    const similar = localStorage.getItem('similarQuizzesCompleted');
    const sentences = localStorage.getItem('sentencesCompleted');

    if (vowels) setVowelsCompleted(parseInt(vowels));
    if (consonants) setConsonantsCompleted(parseInt(consonants));
    if (matra) setMatraCompleted(parseInt(matra));
    if (similar) setSimilarCompleted(parseInt(similar));
    if (sentences) {
      const sectionsCompleted = JSON.parse(sentences);
      setSentencesCompleted(sectionsCompleted.length);
    }
  }, []);

  const allCharactersComplete = vowelsCompleted >= totalVowels && 
    consonantsCompleted >= totalConsonants && 
    matraCompleted >= totalMatra && 
    similarCompleted >= totalSimilar;

  const isSentencesComplete = sentencesCompleted >= totalSentenceSections;

  const whatsappContent = readingContent.filter(c => c.type === "whatsapp");
  const paragraphContent = readingContent.filter(c => c.type === "paragraph");
  const bollywoodContent = readingContent.filter(c => c.type === "bollywood");

  const isCompleted = (id: string) => completedItems.includes(id);

  const renderContentCard = (content: typeof readingContent[0]) => {
    const completed = isCompleted(content.id);
    
    return (
      <Link key={content.id} href={`/reading/${content.id}`}>
        <div className={`bg-white rounded-xl shadow-lg p-4 border-2 transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
          completed ? 'border-green-500' : 'border-gray-200'
        }`} data-testid={`card-reading-${content.id}`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-black text-lg flex-1">{content.title}</h3>
            {completed && <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />}
          </div>
          <p className="text-sm text-gray-600">{content.description}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col pb-24">
      <div className="w-full max-w-md mx-auto flex flex-col min-h-screen px-4 py-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setLocation('/script')} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-black">Reading Practice</h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-center text-sm">
          Practice reading Hindi in different contexts. This is practice, not a test!
        </p>

        {/* WhatsApp Messages Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquareIcon className="w-6 h-6 text-[#ff9930]" />
            <h2 className="text-xl font-bold text-black">WhatsApp Messages</h2>
          </div>
          <div className="space-y-3">
            {whatsappContent.map(content => renderContentCard(content))}
          </div>
        </div>

        {/* Paragraphs Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-6 h-6 text-[#ff9930]" />
            <h2 className="text-xl font-bold text-black">Short Stories</h2>
          </div>
          <div className="space-y-3">
            {paragraphContent.map(content => renderContentCard(content))}
          </div>
        </div>

        {/* Bollywood Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Film className="w-6 h-6 text-[#ff9930]" />
            <h2 className="text-xl font-bold text-black">Bollywood Vibes</h2>
          </div>
          <div className="space-y-3">
            {bollywoodContent.map(content => renderContentCard(content))}
          </div>
        </div>

        {/* Completion Message */}
        {completedItems.length === readingContent.length && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-center shadow-lg animate-slide-in-up mb-6">
            <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-3" />
            <h3 className="text-white font-bold text-xl mb-2">All Reading Complete!</h3>
            <p className="text-white/90 text-sm">
              Great job practicing your Hindi reading! 📚
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation - Fixed */}
      <BottomNav 
        allCharactersComplete={allCharactersComplete}
        isSentencesComplete={isSentencesComplete}
      />
    </div>
  );
}
