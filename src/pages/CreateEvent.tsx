
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { useEvent } from '@/contexts/EventContext';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';

const eventTypes = [
  { id: 'wedding', label: 'Wedding' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'other', label: 'Other' }
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addEvent, events, updateEvent } = useEvent();
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  
  // Check if we're in edit mode
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
    
    if (editId) {
      setIsEditing(true);
      setEditEventId(editId);
      
      // Find the event and populate form
      const eventToEdit = events.find(e => e.id === editId);
      if (eventToEdit) {
        setEventName(eventToEdit.name);
        setEventType(eventToEdit.type);
        setDate(new Date(eventToEdit.date));
      }
    }
  }, [location.search, events]);
  
  const handleSaveEvent = () => {
    if (!eventName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an event name",
        variant: "destructive",
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditing && editEventId) {
      // Update existing event
      updateEvent(editEventId, {
        name: eventName,
        type: eventType,
        date: date.toISOString(),
      });
      
      toast({
        title: "Success",
        description: "Event updated successfully!",
      });
      
      navigate(`/event/${editEventId}`);
    } else {
      // Create new event
      const eventId = addEvent({
        name: eventName,
        type: eventType,
        date: date.toISOString(),
        completedCategories: {}
      });
      
      toast({
        title: "Success",
        description: "Event created successfully!",
      });
      
      // Navigate to the services selection page
      navigate(`/event/${eventId}/vendors`);
    }
  };
  
  return (
    <MobileAppLayout>
      <Header title={isEditing ? "Edit Event" : "Create Event"} showBackButton />
      
      <div className="space-y-6 mt-4">
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-3">Event Details</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Event Name</Label>
              <Input
                id="event-name"
                placeholder="Enter event name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Event Type</Label>
              <RadioGroup value={eventType} onValueChange={setEventType}>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <Label htmlFor={type.id}>{type.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>
        
        <Button onClick={handleSaveEvent} className="w-full">
          {isEditing ? "Update Event" : "Create Event"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </MobileAppLayout>
  );
};

export default CreateEvent;
