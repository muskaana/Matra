import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Star, Flame, Trophy, TrendingUp, Calendar, Award, User } from "lucide-react";
import { getProgress } from '../lib/progress';
import { getItemsDueForReview } from '../utils/smartReview';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const [totalXP, setTotalXP] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [vowelsCompleted, setVowelsCompleted] = useState<number>(0);
  const [consonantsCompleted, setConsonantsCompleted] = useState<number>(0);
  const [matraCompleted, setMatraCompleted] = useState<number>(0);
  const [similarCompleted, setSimilarCompleted] = useState<number>(0);
  const [beginnerWordsCompleted, setBeginnerWordsCompleted] = useState<number>(0);
  const [advancedWordsCompleted, setAdvancedWordsCompleted] = useState<number>(0);
  const [sentencesCompleted, setSentencesCompleted] = useState<number>(0);
  const [placementLevel, setPlacementLevel] = useState<string>('');

  const totalVowels = 5;
  const totalConsonants = 16;
  const totalMatra = 7;
  const totalSimilar = 5;
  const totalBeginnerPacks = 5;
  const totalAdvancedPacks = 5;
  const totalSentenceSections = 30;

  useEffect(() => {
    // Load progress data
    const progress = getProgress();
    setTotalXP(progress.totalXP);
    setCurrentStreak(progress.currentStreak);

    // Load review count
    const dueItems = getItemsDueForReview();
    setReviewCount(dueItems.length);

    // Load completion data
    const vowels = localStorage.getItem('vowelsQuizzesCompleted');
    const consonants = localStorage.getItem('consonantsQuizzesCompleted');
    const matra = localStorage.getItem('matraQuizzesCompleted');
    const similar = localStorage.getItem('similarQuizzesCompleted');
    const beginnerWords = localStorage.getItem('beginnerWordsCompleted');
    const advancedWords = localStorage.getItem('advancedWordsCompleted');
    const sentences = localStorage.getItem('sentencesCompleted');
    const placement = localStorage.getItem('placementLevel');

    if (vowels) setVowelsCompleted(parseInt(vowels));
    if (consonants) setConsonantsCompleted(parseInt(consonants));
    if (matra) setMatraCompleted(parseInt(matra));
    if (similar) setSimilarCompleted(parseInt(similar));
    if (beginnerWords) {
      const packsCompleted = JSON.parse(beginnerWords);
      setBeginnerWordsCompleted(packsCompleted.length);
    }
    if (advancedWords) {
      const packsCompleted = JSON.parse(advancedWords);
      setAdvancedWordsCompleted(packsCompleted.length);
    }
    if (sentences) {
      const sectionsCompleted = JSON.parse(sentences);
      setSentencesCompleted(sectionsCompleted.length);
    }
    if (placement) setPlacementLevel(placement);
  }, []);

  const totalCharacters = vowelsCompleted + consonantsCompleted + matraCompleted + similarCompleted;
  const maxCharacters = totalVowels + totalConsonants + totalMatra + totalSimilar;
  const charactersProgress = Math.round((totalCharacters / maxCharacters) * 100);

  const totalWords = beginnerWordsCompleted + advancedWordsCompleted;
  const maxWords = totalBeginnerPacks + totalAdvancedPacks;
  const wordsProgress = Math.round((totalWords / maxWords) * 100);

  const sentencesProgress = Math.round((sentencesCompleted / totalSentenceSections) * 100);

  const allCharactersComplete = vowelsCompleted >= totalVowels && 
    consonantsCompleted >= totalConsonants && 
    matraCompleted >= totalMatra && 
    similarCompleted >= totalSimilar;

  const isSentencesComplete = sentencesCompleted >= totalSentenceSections;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-8 rounded-xl shadow-xl mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#ff9930]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Your Profile</h1>
              {placementLevel && (
                <p className="text-sm opacity-90">{placementLevel}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-[#ff9930]" />
              <p className="text-xs text-gray-500 font-medium">Total XP</p>
            </div>
            <p className="text-2xl font-bold text-black">{totalXP}</p>
          </div>

          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <p className="text-xs text-gray-500 font-medium">Current Streak</p>
            </div>
            <p className="text-2xl font-bold text-black">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
          </div>

          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-xs text-gray-500 font-medium">Characters</p>
            </div>
            <p className="text-2xl font-bold text-black">{totalCharacters}/{maxCharacters}</p>
          </div>

          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <p className="text-xs text-gray-500 font-medium">Review Items</p>
            </div>
            <p className="text-2xl font-bold text-black">{reviewCount}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#ff9930]" />
            Learning Progress
          </h2>

          {/* Characters Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Characters</span>
              <span className="text-sm font-bold text-[#ff9930]">{totalCharacters}/{maxCharacters}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] h-3 rounded-full transition-all"
                style={{ width: `${charactersProgress}%` }}
              />
            </div>
          </div>

          {/* Words Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Words</span>
              <span className="text-sm font-bold text-[#ff9930]">{totalWords}/{maxWords}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] h-3 rounded-full transition-all"
                style={{ width: `${wordsProgress}%` }}
              />
            </div>
          </div>

          {/* Sentences Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Sentences</span>
              <span className="text-sm font-bold text-[#ff9930]">{sentencesCompleted}/{totalSentenceSections}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] h-3 rounded-full transition-all"
                style={{ width: `${sentencesProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ff9930]" />
            Achievements
          </h2>

          <div className="space-y-3">
            {/* First Character */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${totalCharacters > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${totalCharacters > 0 ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className="text-white text-xl">🎯</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-black">First Steps</p>
                <p className="text-xs text-gray-600">Complete your first character section</p>
              </div>
            </div>

            {/* Script Master */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${allCharactersComplete ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${allCharactersComplete ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className="text-white text-xl">📝</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-black">Script Master</p>
                <p className="text-xs text-gray-600">Complete all character lessons</p>
              </div>
            </div>

            {/* Word Wizard */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${totalWords >= maxWords ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${totalWords >= maxWords ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className="text-white text-xl">📚</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-black">Word Wizard</p>
                <p className="text-xs text-gray-600">Complete all word lessons</p>
              </div>
            </div>

            {/* Sentence Guru */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${isSentencesComplete ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSentencesComplete ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className="text-white text-xl">💬</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-black">Sentence Guru</p>
                <p className="text-xs text-gray-600">Complete all sentence lessons</p>
              </div>
            </div>

            {/* Streak Keeper */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${currentStreak >= 7 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStreak >= 7 ? 'bg-green-500' : 'bg-gray-300'}`}>
                <span className="text-white text-xl">🔥</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-black">Streak Keeper</p>
                <p className="text-xs text-gray-600">Maintain a 7-day learning streak</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <BottomNav />
    </div>
  );
}
