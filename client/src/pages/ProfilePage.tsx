import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { Star, Flame, Trophy, TrendingUp, Calendar, Award, User } from "lucide-react";
import { getProgress } from '../lib/progress';
import { getItemsDueForReview } from '../utils/smartReview';
import BottomNav from '../components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile, useProgress, useWordProgress, useSentenceProgress, useReviewItems } from '@/hooks/useUserProgress';
import { Skeleton } from '@/components/ui/skeleton';
import { beginnerWordPacks } from '@/data/words/beginner';
import { advancedWordPacks } from '@/data/words/advanced';

export default function ProfilePage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  // Fetch data from database when authenticated
  const { profile, isLoading: isLoadingProfile } = useUserProfile();
  const { progress, isLoading: isLoadingProgress } = useProgress();
  const { wordProgress, isLoading: isLoadingWords } = useWordProgress();
  const { sentenceProgress, isLoading: isLoadingSentences } = useSentenceProgress();
  const { reviewItems, isLoading: isLoadingReview } = useReviewItems();
  
  // State for localStorage fallback (when not authenticated)
  const [localXP, setLocalXP] = useState<number>(0);
  const [localStreak, setLocalStreak] = useState<number>(0);
  const [localReviewCount, setLocalReviewCount] = useState<number>(0);
  const [localVowels, setLocalVowels] = useState<number>(0);
  const [localConsonants, setLocalConsonants] = useState<number>(0);
  const [localMatra, setLocalMatra] = useState<number>(0);
  const [localSimilar, setLocalSimilar] = useState<number>(0);
  const [localBeginnerWords, setLocalBeginnerWords] = useState<number>(0);
  const [localAdvancedWords, setLocalAdvancedWords] = useState<number>(0);
  const [localSentences, setLocalSentences] = useState<number>(0);
  const [localPlacementLevel, setLocalPlacementLevel] = useState<string>('');
  
  // Get user's name from email (extract part before @)
  const userEmail = (user as any)?.email || '';
  const userName = userEmail 
    ? userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1)
    : 'Your Profile';

  const totalVowels = 5;
  const totalConsonants = 16;
  const totalMatra = 7;
  const totalSimilar = 5;
  const totalBeginnerPacks = 5;
  const totalAdvancedPacks = 4;
  const totalSentenceSections = 4;

  // Load localStorage data when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      // Load progress data
      const progressData = getProgress();
      setLocalXP(progressData.totalXP);
      setLocalStreak(progressData.currentStreak);

      // Load review count
      const dueItems = getItemsDueForReview();
      setLocalReviewCount(dueItems.length);

      // Load completion data
      const vowels = localStorage.getItem('vowelsQuizzesCompleted');
      const consonants = localStorage.getItem('consonantsQuizzesCompleted');
      const matra = localStorage.getItem('matraQuizzesCompleted');
      const similar = localStorage.getItem('similarQuizzesCompleted');
      const beginnerWords = localStorage.getItem('beginnerWordsCompleted');
      const advancedWords = localStorage.getItem('advancedWordsCompleted');
      const sentences = localStorage.getItem('sentencesCompleted');
      const placement = localStorage.getItem('placementLevel');

      if (vowels) setLocalVowels(parseInt(vowels));
      if (consonants) setLocalConsonants(parseInt(consonants));
      if (matra) setLocalMatra(parseInt(matra));
      if (similar) setLocalSimilar(parseInt(similar));
      if (beginnerWords) {
        const packsCompleted = JSON.parse(beginnerWords);
        setLocalBeginnerWords(packsCompleted.length);
      }
      if (advancedWords) {
        const packsCompleted = JSON.parse(advancedWords);
        setLocalAdvancedWords(packsCompleted.length);
      }
      if (sentences) {
        const sectionsCompleted = JSON.parse(sentences);
        setLocalSentences(sectionsCompleted.length);
      }
      if (placement) setLocalPlacementLevel(placement);
    }
  }, [isAuthenticated]);

  // Calculate counts from database data
  const vowelsCompleted = useMemo(() => {
    if (!isAuthenticated) return localVowels;
    if (!progress) return 0;
    return progress.filter(p => p.category === 'vowels' && p.completed && p.type === 'lesson').length;
  }, [isAuthenticated, progress, localVowels]);

  const consonantsCompleted = useMemo(() => {
    if (!isAuthenticated) return localConsonants;
    if (!progress) return 0;
    return progress.filter(p => p.category === 'consonants' && p.completed && p.type === 'lesson').length;
  }, [isAuthenticated, progress, localConsonants]);

  const matraCompleted = useMemo(() => {
    if (!isAuthenticated) return localMatra;
    if (!progress) return 0;
    return progress.filter(p => p.category === 'matra' && p.completed && p.type === 'lesson').length;
  }, [isAuthenticated, progress, localMatra]);

  const similarCompleted = useMemo(() => {
    if (!isAuthenticated) return localSimilar;
    if (!progress) return 0;
    return progress.filter(p => p.category === 'similar' && p.completed && p.type === 'lesson').length;
  }, [isAuthenticated, progress, localSimilar]);

  const beginnerWordsCompleted = useMemo(() => {
    if (!isAuthenticated) return localBeginnerWords;
    if (!wordProgress) return 0;
    const masteredWords = wordProgress.filter(w => w.level === 'beginner' && w.mastered);
    // Count packs with at least one mastered word (handles hyphenated IDs)
    return beginnerWordPacks.filter((pack: any) => 
      masteredWords.some((w: any) => w.wordId.startsWith(pack.id + '-'))
    ).length;
  }, [isAuthenticated, wordProgress, localBeginnerWords]);

  const advancedWordsCompleted = useMemo(() => {
    if (!isAuthenticated) return localAdvancedWords;
    if (!wordProgress) return 0;
    const masteredWords = wordProgress.filter(w => w.level === 'advanced' && w.mastered);
    // Count packs with at least one mastered word (handles hyphenated IDs)
    return advancedWordPacks.filter((pack: any) => 
      masteredWords.some((w: any) => w.wordId.startsWith(pack.id + '-'))
    ).length;
  }, [isAuthenticated, wordProgress, localAdvancedWords]);

  const sentencesCompleted = useMemo(() => {
    if (!isAuthenticated) return localSentences;
    if (!sentenceProgress) return 0;
    // Count unique completed sentence sections
    const uniqueSections = new Set(sentenceProgress.filter(s => s.mastered).map(s => s.theme || s.sentenceId.split('-')[0]));
    return uniqueSections.size;
  }, [isAuthenticated, sentenceProgress, localSentences]);

  // Get values from database or localStorage
  const totalXP = isAuthenticated ? (profile?.xp || 0) : localXP;
  const currentStreak = isAuthenticated ? (profile?.currentStreak || 0) : localStreak;
  const placementLevel = isAuthenticated ? (profile?.placementLevel || '') : localPlacementLevel;
  const reviewCount = isAuthenticated ? (reviewItems?.filter(item => {
    if (!item.nextReviewDate) return false;
    return new Date(item.nextReviewDate) <= new Date();
  }).length || 0) : localReviewCount;

  // Loading state
  const isLoading = isAuthenticated && (isLoadingProfile || isLoadingProgress || isLoadingWords || isLoadingSentences || isLoadingReview);

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
    <div className="min-h-screen-safe bg-gradient-to-b from-orange-50 to-white flex flex-col">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col px-6 py-6 pb-nav">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ff9930] to-[#ff7730] text-white px-6 py-8 rounded-xl shadow-xl mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#ff9930]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-username">
                {userName || 'Your Profile'}
              </h1>
              {placementLevel && (
                <p className="text-sm opacity-90" data-testid="text-placement-level">{placementLevel}</p>
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
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold text-black">{totalXP}</p>
            )}
          </div>

          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <p className="text-xs text-gray-500 font-medium">Current Streak</p>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <p className="text-2xl font-bold text-black">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
            )}
          </div>

          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <p className="text-xs text-gray-500 font-medium">Characters</p>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold text-black">{totalCharacters}/{maxCharacters}</p>
            )}
          </div>

          <div className="bg-white rounded-xl px-4 py-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <p className="text-xs text-gray-500 font-medium">Review Items</p>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p className="text-2xl font-bold text-black">{reviewCount}</p>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#ff9930]" />
            Learning Progress
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
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
