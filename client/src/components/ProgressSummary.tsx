import { useState, useEffect } from 'react';
import { Star, Flame } from 'lucide-react';
import { getProgress } from '../lib/progress';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProgress';

export default function ProgressSummary() {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const [totalXP, setTotalXP] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  useEffect(() => {
    // For authenticated users, use database profile
    if (user && profile) {
      setTotalXP(profile.xp || 0);
      setCurrentStreak(profile.currentStreak || 0);
    } else if (!user) {
      // For unauthenticated users, use localStorage
      const progress = getProgress();
      setTotalXP(progress.totalXP);
      setCurrentStreak(progress.currentStreak);
    }
  }, [user, profile]);

  return (
    <div className="flex gap-3 mb-4" data-testid="progress-summary">
      <div className="flex-1 bg-white rounded-xl px-3 py-2 shadow-md border border-gray-200 flex items-center justify-center gap-2" data-testid="display-xp">
        <Star className="w-5 h-5 text-[#ff9930]" />
        <p className="text-base font-bold text-black">{totalXP}XP</p>
      </div>
      <div className="flex-1 bg-white rounded-xl px-3 py-2 shadow-md border border-gray-200 flex items-center justify-center gap-2" data-testid="display-streak">
        <Flame className="w-5 h-5 text-orange-500" />
        <p className="text-base font-bold text-black">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
      </div>
    </div>
  );
}
