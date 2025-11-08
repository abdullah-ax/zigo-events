
export const mockVendors = [
  {
    id: "v1",
    name: "Cairo Palace",
    description: "Luxury venue with stunning Nile views",
    category: "venue",
    rating: 4.8,
    price: {
      base: 8000,
      range: [8000, 15000]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?egypt,venue,1",
      "https://source.unsplash.com/random/600x400?egypt,venue,2",
      "https://source.unsplash.com/random/600x400?egypt,venue,3"
    ],
    reviews: [
      { id: "r1", author: "Mohamed", rating: 5, text: "Amazing venue, very professional staff!" },
      { id: "r2", author: "Laila", rating: 4.5, text: "Beautiful place, slightly expensive but worth it" }
    ],
    availability: ["2025-05-24", "2025-05-25", "2025-06-01", "2025-06-02"]
  },
  {
    id: "v2",
    name: "Nile Gardens",
    description: "Beautiful outdoor venue with gardens",
    category: "venue",
    rating: 4.5,
    price: {
      base: 5000,
      range: [5000, 9000]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?garden,venue,1",
      "https://source.unsplash.com/random/600x400?garden,venue,2",
      "https://source.unsplash.com/random/600x400?garden,venue,3"
    ],
    reviews: [
      { id: "r3", author: "Ahmed", rating: 4.5, text: "Beautiful gardens and great service" },
      { id: "r4", author: "Fatma", rating: 4.0, text: "Lovely atmosphere but limited indoor options" }
    ],
    availability: ["2025-05-22", "2025-05-29", "2025-06-05", "2025-06-12"]
  },
  {
    id: "v3",
    name: "Royal Feast",
    description: "Premium catering service for all events",
    category: "catering",
    rating: 4.9,
    price: {
      base: 3500,
      range: [3500, 7000]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?food,catering,1",
      "https://source.unsplash.com/random/600x400?food,catering,2",
      "https://source.unsplash.com/random/600x400?food,catering,3"
    ],
    reviews: [
      { id: "r5", author: "Omar", rating: 5, text: "The food was incredible, our guests loved it!" },
      { id: "r6", author: "Noor", rating: 4.8, text: "Excellent variety and presentation" }
    ],
    availability: ["2025-05-20", "2025-05-21", "2025-05-22", "2025-05-23"]
  },
  {
    id: "v4",
    name: "Alexandria Lens",
    description: "Award-winning photography service",
    category: "photography",
    rating: 4.7,
    price: {
      base: 2500,
      range: [2500, 4500]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?wedding,photography,1",
      "https://source.unsplash.com/random/600x400?wedding,photography,2",
      "https://source.unsplash.com/random/600x400?wedding,photography,3"
    ],
    reviews: [
      { id: "r7", author: "Leila", rating: 4.7, text: "Captured our special day beautifully" },
      { id: "r8", author: "Karim", rating: 4.5, text: "Professional and creative team" }
    ],
    availability: ["2025-05-25", "2025-05-26", "2025-06-01", "2025-06-07"]
  },
  {
    id: "v5",
    name: "Pharaoh's Band",
    description: "Traditional and modern music ensemble",
    category: "entertainment",
    rating: 4.6,
    price: {
      base: 3000,
      range: [3000, 5000]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?band,music,1",
      "https://source.unsplash.com/random/600x400?band,music,2", 
      "https://source.unsplash.com/random/600x400?band,music,3"
    ],
    reviews: [
      { id: "r9", author: "Hossam", rating: 4.6, text: "Great music selection and energy" },
      { id: "r10", author: "Yasmin", rating: 4.5, text: "Everyone was dancing all night!" }
    ],
    availability: ["2025-05-23", "2025-05-30", "2025-06-06", "2025-06-13"]
  },
  {
    id: "v6",
    name: "Magic Hatim",
    description: "Egypt's premier magician and entertainer",
    category: "entertainment",
    rating: 4.8,
    price: {
      base: 2000,
      range: [2000, 3500]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?magician,entertainment,1",
      "https://source.unsplash.com/random/600x400?magician,entertainment,2",
      "https://source.unsplash.com/random/600x400?magician,entertainment,3"
    ],
    reviews: [
      { id: "r11", author: "Samira", rating: 5, text: "Absolutely amazing tricks, impressed everyone!" },
      { id: "r12", author: "Tarek", rating: 4.7, text: "Very entertaining and professional" }
    ],
    availability: ["2025-05-24", "2025-05-25", "2025-06-01", "2025-06-08"]
  },
  {
    id: "v7",
    name: "Desert Rose Decor",
    description: "Elegant decorations for all occasions",
    category: "decoration",
    rating: 4.7,
    price: {
      base: 1800,
      range: [1800, 4000]
    },
    portfolioImages: [
      "https://source.unsplash.com/random/600x400?decoration,event,1",
      "https://source.unsplash.com/random/600x400?decoration,event,2",
      "https://source.unsplash.com/random/600x400?decoration,event,3"
    ],
    reviews: [
      { id: "r13", author: "Dina", rating: 4.8, text: "The decorations exceeded our expectations!" },
      { id: "r14", author: "Amr", rating: 4.5, text: "Beautiful setups and attention to detail" }
    ],
    availability: ["2025-05-20", "2025-05-21", "2025-05-27", "2025-05-28"]
  }
];

export const mockEvents = [
  {
    id: "e1",
    name: "Anniversary Celebration",
    date: "2025-06-15",
    type: "anniversary",
    completedCategories: {
      venue: true,
      catering: true
    },
    vendors: [
      {
        id: "v1",
        name: "Cairo Palace",
        category: "venue",
        price: 8000,
        paymentStatus: "deposited"
      },
      {
        id: "v3",
        name: "Royal Feast",
        category: "catering",
        price: 3500,
        paymentStatus: "pending"
      }
    ],
    guests: [
      {
        id: "g1",
        name: "Ahmed Hassan",
        phone: "+20 101 234 5678",
        status: "confirmed"
      },
      {
        id: "g2",
        name: "Sara Ali",
        phone: "+20 112 345 6789",
        status: "pending"
      }
    ]
  }
];
