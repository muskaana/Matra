import { Link } from 'wouter';
import { Brain } from 'lucide-react';

interface SmartReviewSlotProps {
  reviewCount: number;
}

export default function SmartReviewSlot({ reviewCount }: SmartReviewSlotProps) {
  const showReview = reviewCount > 0;

  if (!showReview) {
    return null;
  }

  return (
    <Link href="/review">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 mb-4 shadow-lg border-2 border-white hover:from-purple-600 hover:to-purple-700 transition-all cursor-pointer h-[88px] flex items-center" data-testid="button-review-banner">
        <div className="flex items-center gap-3 w-full">
          <div className="bg-white/20 rounded-full p-2">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-sm">Smart Review Ready!</h3>
            <p className="text-white/90 text-xs">{reviewCount} {reviewCount === 1 ? 'item' : 'items'} need practice</p>
          </div>
          <div className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {reviewCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
