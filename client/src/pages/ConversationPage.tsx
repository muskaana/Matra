/**
 * ConversationPage Component
 * 
 * Simple MVP for Talk tab with scripted conversation snippets
 * Features tap-to-reveal transliteration/meaning and optional speech synthesis
 */

import { useState } from "react";
import { Book, MessageSquare, FileText, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "wouter";
import { conversations } from '../data/conversations';

export default function ConversationPage() {
  const [expandedConversations, setExpandedConversations] = useState<string[]>([]);
  const [revealedLines, setRevealedLines] = useState<Set<string>>(new Set());
  const [speakingLine, setSpeakingLine] = useState<string | null>(null);

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
    if ('speechSynthesis' in window) {
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
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
                                <div className="mt-2 space-y-1 animate-slide-in-up">
                                  <p className="text-sm text-gray-700 italic">
                                    {line.transliteration}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {line.meaning}
                                  </p>
                                </div>
                              )}

                              {/* Speak Button */}
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
        
        {/* Footer Navigation */}
        <div className="flex justify-around items-center bg-gradient-to-r from-[#ff9930] to-[#ff7730] rounded-xl mt-6 py-3 shadow-lg">
          <Link href="/reading">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 hover:bg-[#CF7B24] rounded-lg transition-all" data-testid="button-nav-read">
              <Book className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Read</span>
            </button>
          </Link>
          <Link href="/script">
            <button className="flex flex-col items-center text-white p-2 opacity-70 hover:opacity-100 hover:bg-[#CF7B24] rounded-lg transition-all" data-testid="button-nav-script">
              <FileText className="w-6 h-6 mb-1" />
              <span className="text-sm font-medium">Script</span>
            </button>
          </Link>
          <Link href="/conversation">
            <button className="flex flex-col items-center text-white p-2 hover:bg-[#CF7B24] rounded-lg transition-all" data-testid="button-nav-talk">
              <MessageSquare className="w-6 h-6 mb-1" />
              <span className="text-sm font-bold">Talk</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
