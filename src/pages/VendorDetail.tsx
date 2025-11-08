
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Star, Clock, ArrowLeft, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockVendors } from '@/data/mock-data';
import MobileAppLayout from '@/components/MobileAppLayout';
import { formatCurrency } from '@/lib/utils';

const VendorDetail = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const vendor = mockVendors.find(v => v.id === vendorId);
  
  if (!vendor) {
    return (
      <MobileAppLayout>
        <div className="text-center mt-10">
          <p>Vendor not found</p>
          <Button onClick={() => navigate('/vendors')} className="mt-4">
            Back to Vendors
          </Button>
        </div>
      </MobileAppLayout>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? vendor.portfolioImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === vendor.portfolioImages.length - 1 ? 0 : prev + 1
    );
  };
  
  return (
    <MobileAppLayout hideNavigation>
      {/* Image Gallery with Back Button */}
      <div className="relative h-64 bg-black">
        <img
          src={vendor.portfolioImages[currentImageIndex]}
          alt={vendor.name}
          className="w-full h-full object-cover opacity-95"
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-black/50 text-white rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        {/* Image navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white rounded-full"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex space-x-1">
            {vendor.portfolioImages.map((_, index) => (
              <div 
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 text-white rounded-full"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Vendor Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold text-2xl">{vendor.name}</h1>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium ml-1">{vendor.rating}</span>
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-gray-500 capitalize">{vendor.category}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-xl">{formatCurrency(vendor.price.base)}</div>
            <div className="text-xs text-gray-500">Starting from</div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-700">{vendor.description}</p>
        
        {/* Availability */}
        <Card className="p-4 mt-6">
          <div className="flex items-center mb-3">
            <Calendar className="text-primary mr-2" />
            <h2 className="font-bold">Availability</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {vendor.availability.map((date) => (
              <div key={date} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            ))}
          </div>
        </Card>
        
        {/* Reviews */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <MessageSquare className="text-primary mr-2" />
              <h2 className="font-bold">Reviews</h2>
            </div>
            <span className="text-sm text-gray-500">{vendor.reviews.length} reviews</span>
          </div>
          
          <div className="space-y-4">
            {vendor.reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{review.author}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-8 mb-6">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Check Dates
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </div>
      </div>
    </MobileAppLayout>
  );
};

export default VendorDetail;
