/**
 * ConversationPage Component
 * 
 * Simple MVP for Talk tab with scripted conversation snippets
 * Features tap-to-reveal transliteration/meaning and optional speech synthesis
 */

import { useState, useEffect } from "react";
import { Volume2, ChevronDown, ChevronUp } from "lucide-react";
import { conversations } from '../data/conversations';
import BottomNav from '../components/BottomNav';

export default function ConversationPage() {
  const [expandedConversations, setExpandedConversations] = useState<string[]>([]);
  const [revealedLines, setRevealedLines] = useState<Set<string>>(new Set());
  const [speakingLine, setSpeakingLine] = useState<string | null>(null);
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
  
  // Check if speech synthesis is available
  const isSpeechAvailable = 'speechSynthesis' in window;

  useEffect(() => {
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

  const toggleConversation = (conversationId: string) => {
    setExpandedConversations(prev => 
      prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId]
    );
  };

  const toggleLineReveal = (lineKey: string) => {
    setRevealedLines(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lineKey)) {
        newSet.delete(lineKey);
      } else {
        newSet.add(lineKey);
      }
      return newSet;
    });
  };

  const speakHindi = (hindi: string, lineKey: string) => {
    // Use Web Speech API for text-to-speech
    if (!isSpeechAvailable) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(hindi);
    utterance.lang = 'hi-IN'; // Hindi language
    utterance.rate = 0.8; // Slightly slower for learning
    
    setSpeakingLine(lineKey);
    
    utterance.onend = () => {
      setSpeakingLine(null);
    };
    
    utterance.onerror = () => {
      setSpeakingLine(null);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col pb-24">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6">
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-4 rounded-t-xl font-bold text-lg shadow-lg">
            Talk: Conversation Practice
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl shadow-xl flex-1 border-x border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-6 italic">
              Tap any sentence to see transliteration and meaning. Use the speaker button to hear it pronounced.
            </p>

            <div className="space-y-4">
              {conversations.map((conversation) => {
                const isExpanded = expandedConversations.includes(conversation.id);
                
                return (
                  <div key={conversation.id} className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md">
                    {/* Conversation Header */}
                    <button
                      onClick={() => toggleConversation(conversation.id)}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-white hover:from-orange-100 hover:to-orange-50 transition-colors"
                      data-testid={`button-conversation-${conversation.id}`}
                    >
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-black text-lg">{conversation.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{conversation.context}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#ff9930] flex-shrink-0 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#ff9930] flex-shrink-0 ml-2" />
                      )}
                    </button>

                    {/* Conversation Lines */}
                    {isExpanded && (
                      <div className="p-4 bg-white space-y-4 border-t-2 border-gray-100">
                        {conversation.lines.map((line, index) => {
                          const lineKey = `${conversation.id}-${index}`;
                          const isRevealed = revealedLines.has(lineKey);
                          const isSpeaking = speakingLine === lineKey;
                          
                          return (
                            <div 
                              key={lineKey}
                              className="border-l-4 border-[#ff9930] pl-4 py-2"
                            >
                              {/* Hindi Text - Clickable */}
                              <button
                                onClick={() => toggleLineReveal(lineKey)}
                                className="w-full text-left group"
                                data-testid={`button-line-${lineKey}`}
                              >
                                <div className="text-2xl text-black font-medium mb-2 group-hover:text-[#ff9930] transition-colors">
                                  {line.hindi}
                                </div>
                              </button>

                              {/* Revealed Content */}
                              {isRevealed && (
                                <div className="mt-2 space-y-1 animate-slide-in-up" data-testid={`revealed-${lineKey}`}>
                                  <p className="text-sm text-gray-700 italic" data-testid={`transliteration-${lineKey}`}>
                                    {line.transliteration}
                                  </p>
                                  <p className="text-sm text-gray-600" data-testid={`meaning-${lineKey}`}>
                                    {line.meaning}
                                  </p>
                                </div>
                              )}

                              {/* Speak Button */}
                              {isSpeechAvailable ? (
                                <button
                                  onClick={() => speakHindi(line.hindi, lineKey)}
                                  disabled={isSpeaking}
                                  className={`mt-2 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                    isSpeaking
                                      ? 'bg-[#ff9930] text-white'
                                      : 'bg-orange-100 text-[#ff9930] hover:bg-orange-200'
                                  }`}
                                  data-testid={`button-speak-${lineKey}`}
                                >
                                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                                  {isSpeaking ? 'Speaking...' : 'Repeat after this'}
                                </button>
                              ) : (
                                <p className="mt-2 text-xs text-gray-500 italic">
                                  (Audio not available in this browser)
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
      </div>

      {/* Bottom Navigation - Fixed */}
      <BottomNav 
        allCharactersComplete={allCharactersComplete}
        isSentencesComplete={isSentencesComplete}
      />
    </div>
  );
}
