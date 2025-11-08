
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MobileAppLayout from '@/components/MobileAppLayout';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, ImageIcon, PlusCircle } from 'lucide-react';
import { useEvent } from '@/contexts/EventContext';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { events } = useEvent();
  const event = events.find(e => e.id === eventId);
  
  const [selectedVendor, setSelectedVendor] = useState('Sweet Delish Cakes');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'vendor', text: 'Hello! How can I help you today?', time: '10:30 AM', vendorName: 'Sweet Delish Cakes' },
    { id: 2, sender: 'user', text: 'Hi, I have a question about custom cake designs for my event.', time: '10:32 AM', vendorName: 'Sweet Delish Cakes' },
    { id: 3, sender: 'vendor', text: 'Of course! We specialize in custom cakes. What theme or flavor are you interested in?', time: '10:33 AM', vendorName: 'Sweet Delish Cakes' },
    { id: 4, sender: 'vendor', text: 'We offer chocolate, vanilla, red velvet, and our popular Egyptian specialty - basbousa cake.', time: '10:34 AM', vendorName: 'Sweet Delish Cakes' },
    { id: 5, sender: 'user', text: 'The basbousa cake sounds interesting! Can you show me some examples?', time: '10:36 AM', vendorName: 'Sweet Delish Cakes' },
    { id: 6, sender: 'vendor', text: 'Certainly! Here are some of our recent basbousa cake designs. We can customize colors and decorations to match your event theme.', time: '10:38 AM', image: 'https://source.unsplash.com/random/800x600/?cake,egyptian', vendorName: 'Sweet Delish Cakes' },
  ]);
  
  // Filter messages by selected vendor
  const filteredMessages = messages.filter(msg => msg.vendorName === selectedVendor);
  
  // Cake vendor options
  const cakeVendors = [
    {
      id: 'cake-1',
      name: 'Sweet Delish Cakes',
      image: 'https://source.unsplash.com/random/100x100/?cake,logo',
      category: 'catering',
      specialty: 'Custom wedding cakes'
    },
    {
      id: 'cake-2',
      name: 'Cairo Confections',
      image: 'https://source.unsplash.com/random/100x100/?bakery,logo',
      category: 'catering',
      specialty: 'French pastries'
    },
    {
      id: 'cake-3',
      name: 'Pyramid Patisserie',
      image: 'https://source.unsplash.com/random/100x100/?pastry,logo',
      category: 'catering',
      specialty: 'Traditional Egyptian sweets'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      vendorName: selectedVendor
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Simulate vendor response
    setTimeout(() => {
      const vendorResponse = {
        id: Date.now() + 1,
        sender: 'vendor',
        text: 'Thank you for your inquiry! I\'ll get back to you with more details shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        vendorName: selectedVendor
      };
      
      setMessages(prev => [...prev, vendorResponse]);
    }, 1000);
  };
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [filteredMessages]);
  
  if (!event) {
    return (
      <MobileAppLayout>
        <Header title="Chat" showBackButton />
        <div className="text-center mt-10">
          <p>Event not found</p>
        </div>
      </MobileAppLayout>
    );
  }
  
  return (
    <MobileAppLayout>
      <Header title={`Chat with ${selectedVendor}`} showBackButton />
      
      {/* Vendor selection horizontal scroll */}
      <div className="sticky top-16 bg-white z-10 pt-2 pb-2 border-b">
        <div className="flex overflow-x-auto space-x-2 px-4 pb-2">
          {cakeVendors.map((vendor) => (
            <Button
              key={vendor.id}
              variant={selectedVendor === vendor.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedVendor(vendor.name)}
              className="flex-shrink-0"
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={vendor.image} />
                <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {vendor.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col h-full pb-16">
        {/* Chat messages */}
        <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {msg.image && (
                  <div className="mb-2">
                    <img 
                      src={msg.image} 
                      alt="Shared cake design" 
                      className="rounded-md w-full h-auto"
                      onClick={() => window.open(msg.image, '_blank')}
                    />
                  </div>
                )}
                <p>{msg.text}</p>
                <p className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} text-right mt-1`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Portfolio quick access */}
        {selectedVendor && (
          <div className="px-4 py-2 border-t">
            <p className="text-sm font-medium mb-2">Cake Portfolio</p>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="h-16 w-16 rounded-md bg-cover bg-center flex-shrink-0 cursor-pointer"
                  style={{ backgroundImage: `url(https://source.unsplash.com/random/300x300/?cake,wedding,${i})` }}
                  onClick={() => {
                    // Add the image to the chat
                    const newImageMessage = {
                      id: Date.now(),
                      sender: 'user',
                      text: 'I like this design. Can we discuss something similar?',
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      image: `https://source.unsplash.com/random/800x600/?cake,wedding,${i}`,
                      vendorName: selectedVendor
                    };
                    setMessages([...messages, newImageMessage]);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Message input */}
        <div className="border-t bg-white p-2 fixed bottom-0 left-0 right-0">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 mx-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={message.trim() === ''}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </MobileAppLayout>
  );
};

export default ChatPage;
