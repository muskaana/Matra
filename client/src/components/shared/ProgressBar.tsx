/**
 * ProgressBar Component
 * 
 * Displays a visual progress indicator showing completion percentage
 * Used across lessons, quizzes, and practice exercises
 * 
 * @param progress - Percentage completed (0-100)
 */

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4 flex-shrink-0">
      <div 
        className="bg-[#ff9930] h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
        data-testid="progress-bar-fill"
      />
    </div>
  );
}
