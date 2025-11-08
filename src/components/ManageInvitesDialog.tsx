
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneIcon, Plus, Trash2, UserIcon, CheckCircle, Clock } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';

interface ManageInvitesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const ManageInvitesDialog: React.FC<ManageInvitesDialogProps> = ({ isOpen, onClose, eventId }) => {
  const { events, addGuestToEvent, removeGuestFromEvent, updateGuestStatus } = useEvent();
  const event = events.find(e => e.id === eventId);
  
  const [newGuest, setNewGuest] = useState({ name: '', phone: '' });
  
  const handleAddGuest = () => {
    if (newGuest.name.trim() === '' || newGuest.phone.trim() === '') return;
    
    addGuestToEvent(eventId, {
      name: newGuest.name,
      phone: newGuest.phone,
      status: 'pending'
    });
    
    setNewGuest({ name: '', phone: '' });
  };
  
  const handleUpdateStatus = (guestId: string, status: 'confirmed' | 'pending') => {
    updateGuestStatus(eventId, guestId, status);
  };
  
  const handleRemoveGuest = (guestId: string) => {
    removeGuestFromEvent(eventId, guestId);
  };
  
  if (!event) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Guest List</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <Label htmlFor="name">Guest Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                placeholder="Enter guest name"
                className="pl-9"
                value={newGuest.name}
                onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="Enter phone number"
                className="pl-9"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
              />
            </div>
          </div>
          
          <Button 
            onClick={handleAddGuest}
            className="w-full"
            disabled={newGuest.name.trim() === '' || newGuest.phone.trim() === ''}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>
        
        <div className="max-h-[200px] overflow-auto space-y-3">
          {event.guests && event.guests.length > 0 ? (
            event.guests.map((guest) => (
              <div key={guest.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{guest.name}</p>
                  <p className="text-sm text-gray-500">{guest.phone}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 ${guest.status === 'confirmed' ? 'text-green-500' : 'text-gray-400'}`}
                    onClick={() => handleUpdateStatus(guest.id, 'confirmed')}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 ${guest.status === 'pending' ? 'text-amber-500' : 'text-gray-400'}`}
                    onClick={() => handleUpdateStatus(guest.id, 'pending')}
                  >
                    <Clock className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 text-red-500"
                    onClick={() => handleRemoveGuest(guest.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No guests added yet</p>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInvitesDialog;
