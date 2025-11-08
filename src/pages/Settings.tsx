
import React from 'react';
import { ChevronRight, User, CreditCard, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const settingItems = [
    { 
      icon: User, 
      label: 'Account Information',
      description: 'Update your personal details'
    },
    { 
      icon: CreditCard, 
      label: 'Payment Methods',
      description: 'Add or remove payment methods'
    },
    { 
      icon: Bell, 
      label: 'Notifications',
      description: 'Manage notification preferences'
    },
    { 
      icon: Shield, 
      label: 'Privacy & Security',
      description: 'Manage your privacy settings'
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support',
      description: 'Get help with using the app'
    }
  ];

  return (
    <MobileAppLayout>
      <Header title="Settings" />
      
      {/* Profile Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm mt-4 flex items-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Profile" />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="font-bold text-lg">Ahmed Hassan</h2>
          <p className="text-sm text-gray-500">ahmed.hassan@example.com</p>
          <Button variant="link" className="p-0 h-auto text-sm text-primary">
            Edit Profile
          </Button>
        </div>
      </div>
      
      {/* Settings Options */}
      <div className="bg-white rounded-lg shadow-sm mt-4 overflow-hidden">
        {settingItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto py-3 px-4"
            >
              <div className="flex items-center w-full">
                <div className="bg-primary/10 p-2 rounded-full">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-left">{item.label}</p>
                  <p className="text-xs text-gray-500 text-left">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>
            {index < settingItems.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
      
      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full mt-4 text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
      
      {/* App Info */}
      <div className="mt-10 text-center text-xs text-gray-500">
        <p>ZIGO Event Planning</p>
        <p>Version 1.0.0</p>
        <p className="mt-1">© 2025 ZIGO. All rights reserved.</p>
      </div>
    </MobileAppLayout>
  );
};

export default Settings;
