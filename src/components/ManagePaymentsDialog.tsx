
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, CheckCircle, AlertCircle, CircleDollarSign } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface ManagePaymentsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const ManagePaymentsDialog: React.FC<ManagePaymentsDialogProps> = ({ isOpen, onClose, eventId }) => {
  const { events, updateVendorPaymentStatus } = useEvent();
  const navigate = useNavigate();
  const event = events.find(e => e.id === eventId);
  
  const handleUpdatePaymentStatus = (vendorId: string, status: 'pending' | 'deposited' | 'paid') => {
    updateVendorPaymentStatus(eventId, vendorId, status);
  };
  
  const handleChatWithVendor = () => {
    navigate(`/event/${eventId}/chat`);
    onClose();
  };
  
  if (!event) return null;
  
  // Make sure vendors array exists
  const vendors = event.vendors || [];
  const totalCost = vendors.reduce((sum, vendor) => sum + vendor.price, 0);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Payments</DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded-md">
            <span className="font-medium">Total Budget:</span>
            <span className="font-bold text-lg">{formatCurrency(totalCost || 0)}</span>
          </div>
          
          <div className="space-y-4">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <div key={vendor.id} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-medium">{vendor.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{vendor.category}</p>
                    </div>
                    <p className="font-bold">{formatCurrency(vendor.price)}</p>
                  </div>
                  
                  <div className="flex space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant={vendor.paymentStatus === 'pending' ? 'default' : 'outline'}
                      className={vendor.paymentStatus === 'pending' ? 'bg-yellow-500' : ''}
                      onClick={() => handleUpdatePaymentStatus(vendor.id, 'pending')}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={vendor.paymentStatus === 'deposited' ? 'default' : 'outline'}
                      className={vendor.paymentStatus === 'deposited' ? 'bg-blue-500' : ''}
                      onClick={() => handleUpdatePaymentStatus(vendor.id, 'deposited')}
                    >
                      <CircleDollarSign className="h-4 w-4 mr-1" />
                      Deposited
                    </Button>
                    <Button
                      size="sm"
                      variant={vendor.paymentStatus === 'paid' ? 'default' : 'outline'}
                      className={vendor.paymentStatus === 'paid' ? 'bg-green-500' : ''}
                      onClick={() => handleUpdatePaymentStatus(vendor.id, 'paid')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Paid
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-2">No vendors added yet</p>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleChatWithVendor} className="sm:order-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with Vendors
          </Button>
          <Button onClick={onClose} className="sm:order-2">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManagePaymentsDialog;
