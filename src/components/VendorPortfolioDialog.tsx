
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Calendar, MessageSquare } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { MockVendor } from '@/types';

interface VendorPortfolioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: MockVendor | null;
}

const VendorPortfolioDialog: React.FC<VendorPortfolioDialogProps> = ({ isOpen, onClose, vendor }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!vendor) return null;
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? vendor.portfolioImages.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === vendor.portfolioImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleViewDetails = () => {
    navigate(`/vendor/${vendor.id}`);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative h-56 bg-black">
          {vendor.portfolioImages && vendor.portfolioImages.length > 0 && (
            <img
              src={vendor.portfolioImages[currentImageIndex]}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Image navigation */}
          {vendor.portfolioImages && vendor.portfolioImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white rounded-full"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white rounded-full"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {vendor.portfolioImages.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4">
          <DialogHeader>
            <DialogTitle className="text-xl">{vendor.name}</DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center mt-2 mb-3">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="font-medium ml-1 text-sm">{vendor.rating}</span>
            <span className="text-gray-500 mx-1 text-sm">•</span>
            <span className="text-gray-500 capitalize text-sm">{vendor.category}</span>
            <div className="ml-auto font-bold">{formatCurrency(vendor.price?.base || 0)}</div>
          </div>
          
          {vendor.description && (
            <p className="text-sm text-gray-700 mt-2 mb-4 line-clamp-3">{vendor.description}</p>
          )}
          
          {/* Reviews section */}
          {vendor.reviews && vendor.reviews.length > 0 && (
            <div className="mt-3 mb-4">
              <h3 className="font-medium text-sm mb-2">Latest Review</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">{vendor.reviews[0].author}</p>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="text-sm">{vendor.reviews[0].rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-1 text-sm">{vendor.reviews[0].text}</p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Check Availability
          </Button>
          <Button className="flex-1" onClick={handleViewDetails}>
            <MessageSquare className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VendorPortfolioDialog;
