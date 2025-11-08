
import React from 'react';
import BottomNavigation from './BottomNavigation';
import { cn } from '@/lib/utils';

interface MobileAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  hideNavigation?: boolean;
}

const MobileAppLayout = ({ 
  children, 
  className,
  hideNavigation = false
}: MobileAppLayoutProps) => {
  return (
    <div className="mobile-app">
      <div className={cn("mobile-content", className)}>
        {children}
      </div>
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default MobileAppLayout;
