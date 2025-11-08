
import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { mockVendors } from '@/data/mock-data';

// Categorize vendors
const vendorCategories = [
  { id: 'all', name: 'All' },
  { id: 'venue', name: 'Venues' },
  { id: 'catering', name: 'Catering' },
  { id: 'photography', name: 'Photography' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'decoration', name: 'Decoration' }
];

const Vendors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter vendors by category and search term
  const filteredVendors = mockVendors.filter(vendor => {
    const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MobileAppLayout>
      <Header title="Browse Vendors" logoMode />
      
      {/* Search bar */}
      <div className="sticky top-16 z-40 bg-[#F8FAFC] pt-4 pb-2">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search vendors..."
            className="pl-10 bg-white border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-1 top-1"
          >
            <Filter className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        
        {/* Category tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
          {vendorCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`py-1 px-3 h-8 rounded-full flex-shrink-0 ${
                selectedCategory === category.id 
                  ? "bg-primary text-white" 
                  : "bg-white text-gray-700 border-gray-200"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Vendors grid - Talabat style */}
      <div className="mt-2 pb-4">
        {filteredVendors.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No vendors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img 
                    src={vendor.portfolioImages[0]} 
                    alt={vendor.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs ml-1 text-white font-medium">{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-bold text-primary">
                    {formatCurrency(vendor.price.base)}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-sm">{vendor.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{vendor.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileAppLayout>
  );
};

export default Vendors;
