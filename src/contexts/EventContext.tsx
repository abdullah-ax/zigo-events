import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define types
interface Guest {
  id: string;
  name: string;
  phone: string;
  status: 'confirmed' | 'pending';
}

interface Vendor {
  id: string;
  name: string;
  category: 'venue' | 'catering' | 'photography' | 'entertainment' | 'decoration';
  price: number;
  paymentStatus: 'pending' | 'deposited' | 'paid';
}

interface CompletedCategories {
  venue?: boolean;
  catering?: boolean;
  photography?: boolean;
  entertainment?: boolean;
  decoration?: boolean;
}

interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
  vendors?: Vendor[];
  guests?: Guest[];
  completedCategories: CompletedCategories;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => string;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  addVendorToEvent: (eventId: string, vendor: Omit<Vendor, 'id'>) => void;
  removeVendorFromEvent: (eventId: string, vendorId: string) => void;
  updateVendorPaymentStatus: (eventId: string, vendorId: string, status: 'pending' | 'deposited' | 'paid') => void;
  addGuestToEvent: (eventId: string, guest: Omit<Guest, 'id'>) => void;
  updateGuestStatus: (eventId: string, guestId: string, status: 'confirmed' | 'pending') => void;
  removeGuestFromEvent: (eventId: string, guestId: string) => void;
  markCategoryCompleted: (eventId: string, category: keyof CompletedCategories) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event-1",
      name: "Birthday Party",
      date: "2025-06-15",
      type: "birthday",
      completedCategories: {
        venue: true,
        catering: true
      },
      vendors: [
        {
          id: "vendor-1",
          name: "Cairo Gardens",
          category: "venue",
          price: 5000,
          paymentStatus: "deposited"
        },
        {
          id: "vendor-2",
          name: "Sweet Delights",
          category: "catering",
          price: 2500,
          paymentStatus: "pending"
        }
      ],
      guests: [
        {
          id: "guest-1",
          name: "Ahmed Hassan",
          phone: "+20 101 234 5678",
          status: "confirmed"
        },
        {
          id: "guest-2",
          name: "Sara Ali",
          phone: "+20 112 345 6789",
          status: "pending"
        }
      ]
    }
  ]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const id = uuidv4();
    setEvents([...events, { ...event, id }]);
    return id;
  };

  const updateEvent = (eventId: string, updates: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const addVendorToEvent = (eventId: string, vendor: Omit<Vendor, 'id'>) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const vendors = [...(event.vendors || []), { ...vendor, id: uuidv4() }];
        return { ...event, vendors };
      }
      return event;
    }));
  };

  const removeVendorFromEvent = (eventId: string, vendorId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId && event.vendors) {
        const vendors = event.vendors.filter(v => v.id !== vendorId);
        return { ...event, vendors };
      }
      return event;
    }));
  };

  const updateVendorPaymentStatus = (eventId: string, vendorId: string, status: 'pending' | 'deposited' | 'paid') => {
    setEvents(events.map(event => {
      if (event.id === eventId && event.vendors) {
        const vendors = event.vendors.map(v => 
          v.id === vendorId ? { ...v, paymentStatus: status } : v
        );
        return { ...event, vendors };
      }
      return event;
    }));
  };

  const addGuestToEvent = (eventId: string, guest: Omit<Guest, 'id'>) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const guests = [...(event.guests || []), { ...guest, id: uuidv4() }];
        return { ...event, guests };
      }
      return event;
    }));
  };

  const updateGuestStatus = (eventId: string, guestId: string, status: 'confirmed' | 'pending') => {
    setEvents(events.map(event => {
      if (event.id === eventId && event.guests) {
        const guests = event.guests.map(g => 
          g.id === guestId ? { ...g, status } : g
        );
        return { ...event, guests };
      }
      return event;
    }));
  };

  const removeGuestFromEvent = (eventId: string, guestId: string) => {
    setEvents(events.map(event => {
      if (event.id === eventId && event.guests) {
        const guests = event.guests.filter(g => g.id !== guestId);
        return { ...event, guests };
      }
      return event;
    }));
  };

  const markCategoryCompleted = (eventId: string, category: keyof CompletedCategories) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const completedCategories = {
          ...(event.completedCategories || {}),
          [category]: true
        };
        return { ...event, completedCategories };
      }
      return event;
    }));
  };

  return (
    <EventContext.Provider value={{
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      addVendorToEvent,
      removeVendorFromEvent,
      updateVendorPaymentStatus,
      addGuestToEvent,
      updateGuestStatus,
      removeGuestFromEvent,
      markCategoryCompleted
    }}>
      {children}
    </EventContext.Provider>
  );
};
