import { Star, Flame } from 'lucide-react';
import { getProgress } from '../lib/progress';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProgress';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProgressSummary() {
  const { user } = useAuth();
  const { profile, isLoading } = useUserProfile();

  // For authenticated users, use database profile directly
  let totalXP = 0;
  let currentStreak = 0;

  if (user) {
    // Use database values
    totalXP = profile?.xp || 0;
    currentStreak = profile?.currentStreak || 0;
  } else {
    // For unauthenticated users, use localStorage
    const progress = getProgress();
    totalXP = progress.totalXP;
    currentStreak = progress.currentStreak;
  }

  // Show loading state for authenticated users
  if (user && isLoading) {
    return (
      <div className="flex gap-3 mb-4" data-testid="progress-summary">
        <Skeleton className="flex-1 h-[52px] rounded-xl" />
        <Skeleton className="flex-1 h-[52px] rounded-xl" />
      </div>
    );
  }

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
