/**
 * ContinueButton Component
 * 
 * A reusable primary action button for navigation
 * Used to continue to next lesson, quiz, or practice exercise
 * 
 * @param onClick - Function to call when button is clicked
 * @param text - Button label text (default: "Continue")
 * @param disabled - Whether button is disabled
 */

interface ContinueButtonProps {
  onClick: () => void;
  text?: string;
  disabled?: boolean;
}

export function ContinueButton({ onClick, text = "Continue", disabled = false }: ContinueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 bg-[#ff9930] hover:bg-[#CF7B24] text-white rounded-full font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      data-testid="button-continue"
    >
      {text}
    </button>
  );
}
