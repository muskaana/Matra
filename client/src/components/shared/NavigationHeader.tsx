/**
 * NavigationHeader Component
 * 
 * Provides consistent back and close navigation buttons
 * Used at the top of lesson, quiz, and practice pages
 * 
 * @param backHref - URL to navigate to when back button is clicked
 */

import { Link } from "wouter";
import { ChevronLeft, X } from "lucide-react";

interface NavigationHeaderProps {
  backHref: string;
}

export function NavigationHeader({ backHref }: NavigationHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-2 flex-shrink-0">
      <Link href={backHref}>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="button-back"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      </Link>
      <Link href={backHref}>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          data-testid="button-close"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </Link>
    </div>
  );
}
