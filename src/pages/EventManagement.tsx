
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wallet, Users, MessageSquare, CheckCircle, AlertCircle, 
  Calendar, CircleDollarSign, Image, Settings
} from 'lucide-react';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import { useEvent } from '@/contexts/EventContext';
import { formatCurrency } from '@/lib/utils';

const EventManagement = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events, updateVendorPaymentStatus, updateGuestStatus } = useEvent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <MobileAppLayout>
        <Header title="Event Management" showBackButton />
        <div className="text-center mt-10 p-4">
          <p className="text-gray-500 mb-4">Event not found</p>
          <Button onClick={() => navigate('/')}>Go Back to Events</Button>
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
    return vendor.paymentStatus === 'deposited' ? sum + vendor.price * 0.3 : sum;
  }, 0) || 0;
  
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
  
  const handleUpdateVendorStatus = (vendorId: string, status: 'pending' | 'deposited' | 'paid') => {
    updateVendorPaymentStatus(eventId!, vendorId, status);
  };
  
  const handleUpdateGuestStatus = (guestId: string, status: 'confirmed' | 'pending') => {
    updateGuestStatus(eventId!, guestId, status);
  };
  
  const handleChatWithVendors = () => {
    navigate(`/event/${eventId}/chat`);
  };
  
  const handleEditEvent = () => {
    navigate(`/create-event?edit=${eventId}`);
  };
  
  const handleAddVendors = () => {
    navigate(`/event/${eventId}/vendors`);
  };

  return (
    <MobileAppLayout>
      <Header title="Event Management" showBackButton />
      
      {/* Event summary card */}
      <Card className="mt-4 bg-white">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">{event.name}</CardTitle>
              <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleEditEvent}>
              <Settings className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="font-bold text-lg">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <p className="text-sm text-gray-500">Paid Amount</p>
              <p className="font-bold text-lg text-green-600">{formatCurrency(paidAmount + depositAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for different management sections */}
      <Tabs defaultValue="overview" className="mt-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Categories Complete:</span>
                  <span className="font-bold">{Object.values(event.completedCategories || {}).filter(Boolean).length}/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Vendors Confirmed:</span>
                  <span className="font-bold">{event.vendors?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests Confirmed:</span>
                  <span className="font-bold">{guestCounts.confirmed}/{guestCounts.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payments Complete:</span>
                  <span className="font-bold">
                    {event.vendors?.filter(v => v.paymentStatus === 'paid').length || 0}/{event.vendors?.length || 0}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button onClick={handleChatWithVendors} className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </Button>
                <Button variant="outline" onClick={handleAddVendors} className="flex-1">
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  Add Vendors
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => navigate(`/event/${eventId}`)}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Budget
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('guests')}>
                  <Users className="mr-2 h-4 w-4" />
                  Guests
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('vendors')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Vendors
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('payments')}>
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  Payments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vendor List</CardTitle>
            </CardHeader>
            <CardContent>
              {event.vendors && event.vendors.length > 0 ? (
                <div className="space-y-3">
                  {event.vendors.map(vendor => (
                    <div key={vendor.id} className="border p-3 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                            <img 
                              src={`https://source.unsplash.com/random/100x100?${vendor.category}`} 
                              alt={vendor.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Vendor';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{vendor.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{vendor.category}</p>
                          </div>
                        </div>
                        <p className="font-bold">{formatCurrency(vendor.price)}</p>
                      </div>
                      
                      <div className="flex mt-3 space-x-2">
                        <Button size="sm" onClick={handleChatWithVendors} className="flex-1">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          Chat
                        </Button>
                        <Button
                          size="sm"
                          variant={vendor.paymentStatus === 'paid' ? 'default' : 'outline'}
                          className={vendor.paymentStatus === 'paid' ? 'bg-green-500 text-white flex-1' : 'flex-1'}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          {vendor.paymentStatus === 'paid' ? 'Paid' : 'Mark Paid'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Image className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">No vendors added yet</p>
                  <Button onClick={handleAddVendors} className="mt-4">
                    Add Vendors
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Guests Tab */}
        <TabsContent value="guests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guest Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold">{guestCounts.total}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Confirmed</p>
                  <p className="text-xl font-bold text-green-600">{guestCounts.confirmed}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">{guestCounts.pending}</p>
                </div>
              </div>
              
              {event.guests && event.guests.length > 0 ? (
                <div className="space-y-2">
                  {event.guests.map(guest => (
                    <div key={guest.id} className="border p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{guest.name}</h3>
                        <p className="text-sm text-gray-500">{guest.phone}</p>
                      </div>
                      <Button
                        size="sm"
                        variant={guest.status === 'confirmed' ? 'default' : 'outline'}
                        className={guest.status === 'confirmed' ? 'bg-green-500' : ''}
                        onClick={() => handleUpdateGuestStatus(
                          guest.id, 
                          guest.status === 'confirmed' ? 'pending' : 'confirmed'
                        )}
                      >
                        {guest.status === 'confirmed' ? (
                          <>
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Confirmed
                          </>
                        ) : (
                          <>
                            <AlertCircle className="mr-1 h-4 w-4" />
                            Pending
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">No guests added yet</p>
                  <Button className="mt-4" onClick={() => navigate('/create-event?edit=' + eventId)}>
                    Add Guests
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-4">
                <span className="font-medium">Total Event Budget:</span>
                <span className="font-bold text-lg">{formatCurrency(totalBudget)}</span>
              </div>
              
              {event.vendors && event.vendors.length > 0 ? (
                <div className="space-y-3">
                  {event.vendors.map(vendor => (
                    <div key={vendor.id} className="border p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{vendor.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{vendor.category}</p>
                        </div>
                        <p className="font-bold">{formatCurrency(vendor.price)}</p>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          variant={vendor.paymentStatus === 'pending' ? 'default' : 'outline'}
                          className={vendor.paymentStatus === 'pending' ? 'bg-yellow-500 flex-1' : 'flex-1'}
                          onClick={() => handleUpdateVendorStatus(vendor.id, 'pending')}
                        >
                          <AlertCircle className="mr-1 h-4 w-4" />
                          Pending
                        </Button>
                        <Button
                          size="sm"
                          variant={vendor.paymentStatus === 'deposited' ? 'default' : 'outline'}
                          className={vendor.paymentStatus === 'deposited' ? 'bg-blue-500 flex-1' : 'flex-1'}
                          onClick={() => handleUpdateVendorStatus(vendor.id, 'deposited')}
                        >
                          <CircleDollarSign className="mr-1 h-4 w-4" />
                          Deposit
                        </Button>
                        <Button
                          size="sm"
                          variant={vendor.paymentStatus === 'paid' ? 'default' : 'outline'}
                          className={vendor.paymentStatus === 'paid' ? 'bg-green-500 flex-1' : 'flex-1'}
                          onClick={() => handleUpdateVendorStatus(vendor.id, 'paid')}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Paid
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Wallet className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">No vendors added yet</p>
                  <Button onClick={handleAddVendors} className="mt-4">
                    Add Vendors
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MobileAppLayout>
  );
};

export default EventManagement;
