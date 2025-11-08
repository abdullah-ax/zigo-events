
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
  logoMode?: boolean;
}

const Header = ({
  title,
  showBackButton = false,
  onBack,
  rightAction,
  className,
  logoMode = false,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn("mobile-header", className)}>
      {showBackButton && (
        <button
          onClick={handleBack}
          className="mr-2 p-2 -ml-2 rounded-full hover:bg-primary-700"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {logoMode ? (
        <div className="flex items-center">
          <span className="text-2xl font-bold">ZIGO</span>
          <span className="ml-1 text-sm font-light">Event Planning</span>
        </div>
      ) : (
        <h1 className="text-xl font-bold flex-1">{title}</h1>
      )}
      
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
};

export default Header;
