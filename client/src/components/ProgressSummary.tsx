import { useState, useEffect } from 'react';
import { Star, Flame } from 'lucide-react';
import { getProgress } from '../lib/progress';

export default function ProgressSummary() {
  const [totalXP, setTotalXP] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);

  useEffect(() => {
    const progress = getProgress();
    setTotalXP(progress.totalXP);
    setCurrentStreak(progress.currentStreak);
  }, []);

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
