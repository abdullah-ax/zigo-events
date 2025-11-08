
import React from 'react';
import { Calendar, Home, Users, Wallet, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Events', path: '/' },
    { icon: Users, label: 'Vendors', path: '/vendors' },
    { icon: Calendar, label: 'Create', path: '/create-event' },
    { icon: Wallet, label: 'Budget', path: '/budget' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <div className="mobile-navigation">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={cn(
            "nav-item",
            location.pathname === item.path && "active"
          )}
        >
          <item.icon size={24} />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
