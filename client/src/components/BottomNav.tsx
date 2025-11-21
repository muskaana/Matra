import { Link, useLocation } from "wouter";
import { FileText, MessageSquare, Book, User } from "lucide-react";

export default function BottomNav() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path || location.startsWith(path);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="w-full max-w-sm mx-auto px-6 py-3">
        <div className="flex justify-around items-center">
          <Link href="/script">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/script') || isActive('/words') || isActive('/sentences') || isActive('/review')
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-script"
            >
              <FileText className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/script') || isActive('/words') || isActive('/sentences') || isActive('/review') ? 'font-bold' : 'font-medium'}`}>Script</span>
            </button>
          </Link>
          
          {/* Talk tab - Always clickable, shows coming soon */}
          <Link href="/conversation">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/conversation') 
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-talk"
            >
              <MessageSquare className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/conversation') ? 'font-bold' : 'font-medium'}`}>Talk</span>
            </button>
          </Link>
          
          {/* Read tab - Always unlocked */}
          <Link href="/reading">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/reading') || isActive('/stories')
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-read"
            >
              <Book className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/reading') || isActive('/stories') ? 'font-bold' : 'font-medium'}`}>Read</span>
            </button>
          </Link>
          
          <Link href="/profile">
            <button 
              className={`flex flex-col items-center p-2 transition-all ${
                isActive('/profile') 
                  ? 'text-[#ff9930]' 
                  : 'text-gray-600 hover:text-[#ff9930]'
              }`} 
              data-testid="button-nav-profile"
            >
              <User className="w-6 h-6 mb-1" />
              <span className={`text-xs ${isActive('/profile') ? 'font-bold' : 'font-medium'}`}>Profile</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
