
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Users, MessageSquare, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import ManageInvitesDialog from '@/components/ManageInvitesDialog';
import ManagePaymentsDialog from '@/components/ManagePaymentsDialog';
import { useEvent } from '@/contexts/EventContext';
import { formatCurrency } from '@/lib/utils';

const BudgetOverview = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useEvent();
  const [activeTab, setActiveTab] = useState('budget');
  const [isInvitesDialogOpen, setIsInvitesDialogOpen] = useState(false);
  const [isPaymentsDialogOpen, setIsPaymentsDialogOpen] = useState(false);
  
  const event = events.find(e => e.id === eventId) || events[0];
  
  if (!event) {
    return (
      <MobileAppLayout>
        <Header title="Budget Overview" showBackButton />
        <div className="text-center mt-10">
          <p>Event not found</p>
        </div>
      </MobileAppLayout>
    );
  }
  
  // Calculate budget stats
  const totalBudget = event.vendors?.reduce((sum, vendor) => sum + vendor.price, 0) || 0;
  const paidAmount = event.vendors?.reduce((sum, vendor) => {
    return vendor.paymentStatus === 'paid' ? sum + vendor.price : sum;
  }, 0) || 0;
  const depositAmount = event.vendors?.reduce((sum, vendor) => {
    return vendor.paymentStatus === 'deposited' ? sum + vendor.price * 0.3 : 0;
  }, 0) || 0;
  const remainingAmount = totalBudget - paidAmount - depositAmount;
  const progressPercentage = totalBudget > 0 ? ((paidAmount + depositAmount) / totalBudget) * 100 : 0;
  
  // Format date for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Count guests by status
  const guestCounts = {
    confirmed: event.guests?.filter(g => g.status === 'confirmed').length || 0,
    pending: event.guests?.filter(g => g.status === 'pending').length || 0,
    total: event.guests?.length || 0
  };

  return (
    <MobileAppLayout>
      <Header title={event.name} showBackButton />
      
      {/* Event summary card */}
      <Card className="mt-4 p-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">{event.name}</h2>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-primary border-primary">
            Edit
          </Button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Event Budget</span>
            <span className="font-medium">{formatCurrency(totalBudget)}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>
              Paid: {formatCurrency(paidAmount + depositAmount)}
            </span>
            <span>
              Remaining: {formatCurrency(remainingAmount)}
            </span>
          </div>
        </div>
      </Card>
      
      {/* Tabs for Budget and Guests */}
      <Tabs defaultValue="budget" className="mt-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="budget" className="space-y-4">
          {/* Vendor Categories */}
          {['venue', 'catering', 'photography', 'entertainment', 'decoration'].map(category => {
            const categoryVendors = event.vendors?.filter(v => v.category === category) || [];
            const categoryTotal = categoryVendors.reduce((sum, v) => sum + v.price, 0);
            
            // Skip categories with no vendors if the budget tab is active
            if (categoryVendors.length === 0 && activeTab === 'budget') return null;
            
            return (
              <Card key={category} className="overflow-hidden">
                <div className="bg-gray-50 p-3 flex justify-between items-center">
                  <h3 className="font-medium capitalize">{category}</h3>
                  <span className="text-sm font-bold">{formatCurrency(categoryTotal)}</span>
                </div>
                
                {categoryVendors.length > 0 ? (
                  <div className="divide-y">
                    {categoryVendors.map(vendor => {
                      const paymentStatus = vendor.paymentStatus;
                      let statusColor = 'text-gray-500';
                      let StatusIcon = AlertCircle;
                      
                      if (paymentStatus === 'deposited') {
                        statusColor = 'text-yellow-500';
                        StatusIcon = AlertCircle;
                      } else if (paymentStatus === 'paid') {
                        statusColor = 'text-green-500';
                        StatusIcon = CheckCircle;
                      }
                      
                      return (
                        <div key={vendor.id} className="p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                              <img 
                                src={`https://source.unsplash.com/random/100x100?${category}`}
                                alt={vendor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{vendor.name}</p>
                              <div className={`flex items-center text-xs ${statusColor}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                <span className="capitalize">{paymentStatus}</span>
                              </div>
                            </div>
                          </div>
                          <span className="font-bold">{formatCurrency(vendor.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <p>No vendors selected for this category</p>
                    <Button
                      variant="link"
                      className="text-primary p-0 h-auto mt-1"
                      onClick={() => {/* Navigate to vendor selection for this category */}}
                    >
                      Add a vendor
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
          
          {/* Action Buttons for Budget Tab */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button 
              onClick={() => setIsPaymentsDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Manage Payments
            </Button>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => {/* Navigate to chat with vendors */}}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Vendors
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="guests" className="space-y-4">
          {/* Guest Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 text-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold">{guestCounts.total}</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-sm text-gray-500">Confirmed</p>
              <p className="text-2xl font-bold text-green-500">{guestCounts.confirmed}</p>
            </Card>
            <Card className="p-3 text-center">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-500">{guestCounts.pending}</p>
            </Card>
          </div>
          
          {/* Guest List */}
          <Card className="overflow-hidden">
            <div className="bg-gray-50 p-3">
              <h3 className="font-medium">Guest List</h3>
            </div>
            
            {event.guests && event.guests.length > 0 ? (
              <div className="divide-y">
                {event.guests.map(guest => (
                  <div key={guest.id} className="p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <p className="text-xs text-gray-500">{guest.phone}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      guest.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {guest.status}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No guests added yet</p>
              </div>
            )}
          </Card>
          
          {/* Action Button for Guests Tab */}
          <Button 
            onClick={() => setIsInvitesDialogOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Manage Guest List
          </Button>
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <ManageInvitesDialog 
        isOpen={isInvitesDialogOpen} 
        onClose={() => setIsInvitesDialogOpen(false)} 
        eventId={event.id}
      />
      
      <ManagePaymentsDialog 
        isOpen={isPaymentsDialogOpen} 
        onClose={() => setIsPaymentsDialogOpen(false)} 
        eventId={event.id}
      />
    </MobileAppLayout>
  );
};

export default BudgetOverview;
