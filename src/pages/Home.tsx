
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, Wallet, MessageSquare, Trash, Settings } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import ManageInvitesDialog from '@/components/ManageInvitesDialog';
import ManagePaymentsDialog from '@/components/ManagePaymentsDialog';
import { formatCurrency } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { Event, Vendor } from '@/types';

const Home = () => {
  const navigate = useNavigate();
  const { events, deleteEvent } = useEvent();
  const [isInvitesDialogOpen, setIsInvitesDialogOpen] = useState(false);
  const [isPaymentsDialogOpen, setIsPaymentsDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleViewEvent = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/create-event?edit=${eventId}`);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
      toast({
        title: "Event deleted",
        description: "Your event has been deleted successfully."
      });
    }
  };

  const handleManageInvites = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsInvitesDialogOpen(true);
  };

  const handleManagePayments = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsPaymentsDialogOpen(true);
  };

  const handleViewVendors = (eventId: string) => {
    navigate(`/event/${eventId}/vendors`);
  };

  const handleChat = (eventId: string) => {
    navigate(`/event/${eventId}/chat`);
  };
  
  const handleManageEvent = (eventId: string) => {
    navigate(`/event/${eventId}/manage`);
  };

  // Calculate event statistics
  const calculateCompletedCategories = (event: Event) => {
    if (!event.completedCategories) return 0;
    return Object.values(event.completedCategories).filter(Boolean).length;
  };

  const calculateTotalBudget = (event: Event) => {
    if (!event.vendors || event.vendors.length === 0) return 0;
    return event.vendors.reduce((sum: number, vendor: Vendor) => sum + vendor.price, 0);
  };

  return (
    <MobileAppLayout>
      <Header title="ZIGO Events" logoMode />
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button 
          onClick={handleCreateEvent}
          className="bg-primary hover:bg-primary/90 text-white h-14"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Create Event
        </Button>
        <Button 
          onClick={() => navigate('/vendors')}
          variant="outline" 
          className="border-primary text-primary hover:bg-primary/10 h-14"
        >
          <Users className="w-5 h-5 mr-2" />
          Browse Vendors
        </Button>
      </div>

      {/* Your Events Section */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">Your Events</h2>
        
        {events.length === 0 ? (
          <Card className="p-6 text-center bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">You don't have any events yet</p>
            <Button onClick={handleCreateEvent} className="bg-secondary hover:bg-secondary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Event
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                <div 
                  className="bg-primary h-3"
                  style={{ 
                    background: `linear-gradient(to right, #1E3A8A ${calculateCompletedCategories(event) * 20}%, #e2e8f0 0%)` 
                  }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          day: 'numeric', 
                          month: 'short', 
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">
                        {calculateCompletedCategories(event)}/5 Categories
                      </p>
                      <p className="text-sm font-bold">
                        {formatCurrency(calculateTotalBudget(event))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2 h-auto flex-col text-xs font-normal"
                      onClick={() => handleManageEvent(event.id)}
                    >
                      <Settings className="h-4 w-4 mb-1" />
                      Manage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2 h-auto flex-col text-xs font-normal"
                      onClick={() => handleManageInvites(event.id)}
                    >
                      <Users className="h-4 w-4 mb-1" />
                      Guests
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2 h-auto flex-col text-xs font-normal"
                      onClick={() => handleManagePayments(event.id)}
                    >
                      <Wallet className="h-4 w-4 mb-1" />
                      Payments
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2 h-auto flex-col text-xs font-normal"
                      onClick={() => handleChat(event.id)}
                    >
                      <MessageSquare className="h-4 w-4 mb-1" />
                      Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="p-2 h-auto flex-col text-xs font-normal bg-red-50 hover:bg-red-100"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash className="h-4 w-4 mb-1 text-red-500" />
                      Delete
                    </Button>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditEvent(event.id)}
                      className="text-primary border-primary"
                    >
                      Edit Event Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Trending Vendors Section - Talabat style */}
      <div className="mt-6 mb-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Trending Vendors</h2>
          <Button 
            variant="link" 
            className="text-primary p-0 h-auto"
            onClick={() => navigate('/vendors')}
          >
            View All
          </Button>
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-3">
          {[1, 2, 3, 4].map((index) => {
            const vendorTypes = ['Photography', 'Venue', 'Entertainment', 'Catering'];
            const vendorNames = ['Cairo Moments', 'Nile Palace', 'Magic Nights', 'Royal Feast'];
            
            return (
              <div key={index} className="flex-shrink-0 w-40">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className="h-28 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(https://source.unsplash.com/random/300x200?egypt,event,${vendorTypes[index-1].toLowerCase()})` 
                    }}
                  />
                  <div className="p-2">
                    <p className="text-xs text-gray-500">{vendorTypes[index-1]}</p>
                    <p className="font-medium text-sm truncate">{vendorNames[index-1]}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xs">★</span>
                        ))}
                      </div>
                      <span className="text-xs ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dialogs */}
      <ManageInvitesDialog 
        isOpen={isInvitesDialogOpen} 
        onClose={() => setIsInvitesDialogOpen(false)} 
        eventId={selectedEventId || ''}
      />
      
      <ManagePaymentsDialog 
        isOpen={isPaymentsDialogOpen} 
        onClose={() => setIsPaymentsDialogOpen(false)} 
        eventId={selectedEventId || ''}
      />
    </MobileAppLayout>
  );
};

export default Home;
