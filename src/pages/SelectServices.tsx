
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useEvent } from '@/contexts/EventContext';
import { mockVendors } from '@/data/mock-data';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import { formatCurrency } from '@/lib/utils';

const categories = [
  { id: 'venue', name: 'Venue' },
  { id: 'catering', name: 'Catering' },
  { id: 'photography', name: 'Photography' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'decoration', name: 'Decoration' }
];

const SelectServices = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { events, addVendorToEvent, markCategoryCompleted } = useEvent();
  const [activeTab, setActiveTab] = useState('venue');
  const [selectedVendors, setSelectedVendors] = useState<Record<string, string>>({});
  const [personalVendors, setPersonalVendors] = useState<Record<string, boolean>>({});
  
  const event = events.find(e => e.id === eventId);
  
  if (!event || !eventId) {
    return (
      <MobileAppLayout>
        <Header title="Select Services" showBackButton />
        <div className="text-center mt-10">
          <p>Event not found</p>
        </div>
      </MobileAppLayout>
    );
  }
  
  // Get vendors for current category
  const categoryVendors = mockVendors.filter(vendor => vendor.category === activeTab);
  
  // Handle vendor selection
  const handleSelectVendor = (vendorId: string) => {
    setSelectedVendors({
      ...selectedVendors,
      [activeTab]: vendorId
    });
    
    setPersonalVendors({
      ...personalVendors,
      [activeTab]: false
    });
    
    toast({
      title: "Vendor selected",
      description: "This vendor has been added to your event",
    });
  };
  
  // Handle using personal vendor
  const handleUsePersonalVendor = () => {
    setPersonalVendors({
      ...personalVendors,
      [activeTab]: true
    });
    
    setSelectedVendors({
      ...selectedVendors,
      [activeTab]: ''
    });
    
    toast({
      title: "Personal vendor selected",
      description: "You've chosen to use your own vendor for this category",
    });
  };
  
  // Handle skipping a category
  const handleSkipCategory = () => {
    markCategoryCompleted(eventId, activeTab as keyof CompletedCategories);
    
    // Move to next category
    const currentIndex = categories.findIndex(c => c.id === activeTab);
    const nextCategory = categories[currentIndex + 1];
    
    if (nextCategory) {
      setActiveTab(nextCategory.id);
    } else {
      // If this was the last category, go to budget overview
      finishSelection();
    }
  };
  
  // Handle moving to next category
  const handleNextCategory = () => {
    // Add selected vendor to event
    if (selectedVendors[activeTab]) {
      const vendor = mockVendors.find(v => v.id === selectedVendors[activeTab]);
      if (vendor) {
        addVendorToEvent(eventId, {
          name: vendor.name,
          category: vendor.category as keyof CompletedCategories,
          price: vendor.price.base,
          paymentStatus: 'pending'
        });
      }
    }
    
    // Mark category as completed
    markCategoryCompleted(eventId, activeTab as keyof CompletedCategories);
    
    // Move to next category
    const currentIndex = categories.findIndex(c => c.id === activeTab);
    const nextCategory = categories[currentIndex + 1];
    
    if (nextCategory) {
      setActiveTab(nextCategory.id);
    } else {
      // If this was the last category, go to budget overview
      finishSelection();
    }
  };
  
  // Finish the selection process and navigate to budget overview
  const finishSelection = () => {
    navigate(`/event/${eventId}`);
  };
  
  // Check if the current category is selected or skipped
  const isCategoryHandled = (categoryId: string) => {
    return !!selectedVendors[categoryId] || !!personalVendors[categoryId] || 
      (event.completedCategories && event.completedCategories[categoryId as keyof typeof event.completedCategories]);
  };
  
  return (
    <MobileAppLayout>
      <Header 
        title="Select Services" 
        showBackButton 
        onBack={() => navigate(`/event/${eventId}`)}
      />
      
      {/* Category progress */}
      <div className="bg-gray-50 p-4">
        <div className="flex justify-between mb-2">
          <p className="text-sm font-medium">Categories</p>
          <p className="text-sm text-primary font-medium">
            {categories.filter(c => isCategoryHandled(c.id)).length}/{categories.length}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {categories.map((category) => {
            const isComplete = isCategoryHandled(category.id);
            const isActive = activeTab === category.id;
            
            return (
              <div 
                key={category.id} 
                className={`text-center ${isActive ? 'text-primary' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <div className={`
                  mx-auto h-3 w-3 rounded-full mb-1
                  ${isComplete ? 'bg-primary' : 'bg-gray-200'}
                  ${isActive ? 'ring-2 ring-primary ring-offset-2' : ''}
                `}></div>
                <p className="text-[10px] truncate">{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Vendor selection */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold capitalize">{category.name}</h3>
              <Button variant="ghost" size="sm" onClick={handleSkipCategory}>
                Skip <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {categoryVendors.map((vendor) => {
                const isSelected = selectedVendors[activeTab] === vendor.id;
                
                return (
                  <Card 
                    key={vendor.id} 
                    className={`overflow-hidden transition-all ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={vendor.portfolioImages[0]} 
                        alt={vendor.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-bold">
                        {formatCurrency(vendor.price.base)}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{vendor.name}</h4>
                          <p className="text-gray-500 text-sm">{vendor.description}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="font-medium">{vendor.rating}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-3"
                        variant={isSelected ? "secondary" : "default"}
                        onClick={() => handleSelectVendor(vendor.id)}
                      >
                        {isSelected ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Selected
                          </>
                        ) : (
                          'Select'
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
              
              <Card className={`p-4 ${personalVendors[activeTab] ? 'ring-2 ring-primary' : ''}`}>
                <h4 className="font-medium">Using Your Own {category.name}</h4>
                <p className="text-gray-500 text-sm">
                  If you already have a {category.name.toLowerCase()} in mind, you can skip this selection.
                </p>
                
                <Button 
                  variant={personalVendors[activeTab] ? "secondary" : "outline"}
                  className="mt-3 w-full"
                  onClick={handleUsePersonalVendor}
                >
                  {personalVendors[activeTab] ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Using Own {category.name}
                    </>
                  ) : (
                    `Use My Own ${category.name}`
                  )}
                </Button>
              </Card>
            </div>
            
            <Button 
              className="w-full"
              onClick={handleNextCategory}
              disabled={!selectedVendors[activeTab] && !personalVendors[activeTab]}
            >
              {categories.findIndex(c => c.id === activeTab) === categories.length - 1 ? 
                'Finish' : 'Next Category'}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </MobileAppLayout>
  );
};

export default SelectServices;
