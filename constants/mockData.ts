export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    neighborhood: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: {
    beds: number;
    baths: number;
    area: number; // in sq ft
    yearBuilt: number;
  };
  amenities: string[];
  nearbyPlaces: string[]; // Icons like 🏥, 🏫, 🚌
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  isFeatured: boolean;
  isNew: boolean;
}

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment with City View',
    description: 'Luxurious apartment with panoramic city views, modern finishes, and premium amenities. Perfect for professionals or small families looking for comfort and convenience in the heart of the city.',
    price: 450000,
    location: {
      city: 'Lahore',
      neighborhood: 'Gulberg',
      coordinates: {
        latitude: 31.5204,
        longitude: 74.3587,
      },
    },
    features: {
      beds: 3,
      baths: 2,
      area: 1800,
      yearBuilt: 2020,
    },
    amenities: ['Gym', 'Pool', 'Security', 'Parking', 'Elevator'],
    nearbyPlaces: ['🏥', '🏫', '🚌', '🛒'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    agent: {
      id: 'a1',
      name: 'Sarah Ahmed',
      phone: '+92 300 1234567',
      email: 'sarah@zengo.com',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    isFeatured: true,
    isNew: false,
  },
  {
    id: '2',
    title: 'Spacious Family Villa',
    description: 'Beautiful family villa with garden, modern kitchen, and spacious living areas. Located in a quiet, family-friendly neighborhood with easy access to schools and parks.',
    price: 850000,
    location: {
      city: 'Islamabad',
      neighborhood: 'F-7',
      coordinates: {
        latitude: 33.7294,
        longitude: 73.0931,
      },
    },
    features: {
      beds: 5,
      baths: 4,
      area: 4200,
      yearBuilt: 2018,
    },
    amenities: ['Garden', 'Smart Home', 'Security', 'Parking', 'Swimming Pool'],
    nearbyPlaces: ['🏫', '🏞️', '🛒', '🏥'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    agent: {
      id: 'a2',
      name: 'Ali Khan',
      phone: '+92 333 9876543',
      email: 'ali@zengo.com',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    isFeatured: true,
    isNew: true,
  },
  {
    id: '3',
    title: 'Luxury Penthouse with Terrace',
    description: 'Exclusive penthouse with private terrace, high-end finishes, and breathtaking views. Features include floor-to-ceiling windows, custom kitchen, and smart home technology.',
    price: 1200000,
    location: {
      city: 'Karachi',
      neighborhood: 'Clifton',
      coordinates: {
        latitude: 24.8278,
        longitude: 67.0311,
      },
    },
    features: {
      beds: 4,
      baths: 4.5,
      area: 3800,
      yearBuilt: 2022,
    },
    amenities: ['Terrace', 'Smart Home', 'Concierge', 'Gym', 'Spa', 'Wine Cellar'],
    nearbyPlaces: ['🏖️', '🛒', '🏥', '🍽️'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7f34b5063c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    agent: {
      id: 'a3',
      name: 'Fatima Zaidi',
      phone: '+92 321 5678901',
      email: 'fatima@zengo.com',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    isFeatured: false,
    isNew: true,
  },
  {
    id: '4',
    title: 'Modern Townhouse Near Park',
    description: 'Contemporary townhouse with open floor plan, high ceilings, and premium finishes. Located in a vibrant neighborhood with easy access to parks, restaurants, and shopping.',
    price: 580000,
    location: {
      city: 'Lahore',
      neighborhood: 'DHA Phase 5',
      coordinates: {
        latitude: 31.4697,
        longitude: 74.4184,
      },
    },
    features: {
      beds: 3,
      baths: 3.5,
      area: 2400,
      yearBuilt: 2019,
    },
    amenities: ['Rooftop Deck', 'Garage', 'Security', 'Community Pool'],
    nearbyPlaces: ['🏞️', '🍽️', '🛒', '🚌'],
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    agent: {
      id: 'a1',
      name: 'Sarah Ahmed',
      phone: '+92 300 1234567',
      email: 'sarah@zengo.com',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    isFeatured: false,
    isNew: false,
  },
  {
    id: '5',
    title: 'Cozy Studio in City Center',
    description: 'Stylish studio apartment in the heart of the city. Perfect for young professionals or investors looking for a high-demand rental property with excellent amenities.',
    price: 220000,
    location: {
      city: 'Islamabad',
      neighborhood: 'Blue Area',
      coordinates: {
        latitude: 33.7156,
        longitude: 73.0707,
      },
    },
    features: {
      beds: 1,
      baths: 1,
      area: 650,
      yearBuilt: 2021,
    },
    amenities: ['Gym', 'Rooftop Lounge', 'Security', 'Laundry'],
    nearbyPlaces: ['🍽️', '🚌', '🏢', '🛒'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1536858974309-9852449e7834?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    agent: {
      id: 'a2',
      name: 'Ali Khan',
      phone: '+92 333 9876543',
      email: 'ali@zengo.com',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    isFeatured: true,
    isNew: false,
  },
  {
    id: '6',
    title: 'Riverside Cottage with Garden',
    description: 'Charming cottage with beautiful garden and river views. Features include exposed beams, fireplace, and updated kitchen. Perfect for those seeking tranquility close to the city.',
    price: 380000,
    location: {
      city: 'Murree',
      neighborhood: 'Kashmir Point',
      coordinates: {
        latitude: 33.9042,
        longitude: 73.3903,
      },
    },
    features: {
      beds: 2,
      baths: 2,
      area: 1500,
      yearBuilt: 2015,
    },
    amenities: ['Garden', 'Fireplace', 'River View', 'Parking'],
    nearbyPlaces: ['🏞️', '🍽️', '🚌', '🏥'],
    images: [
      'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    agent: {
      id: 'a3',
      name: 'Fatima Zaidi',
      phone: '+92 321 5678901',
      email: 'fatima@zengo.com',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    isFeatured: false,
    isNew: true,
  },
];

export const FILTER_OPTIONS = {
  propertyTypes: ['Apartment', 'House', 'Villa', 'Penthouse', 'Townhouse', 'Studio'],
  priceRanges: [
    { label: 'Under $300k', min: 0, max: 300000 },
    { label: '$300k - $500k', min: 300000, max: 500000 },
    { label: '$500k - $800k', min: 500000, max: 800000 },
    { label: '$800k - $1M', min: 800000, max: 1000000 },
    { label: 'Over $1M', min: 1000000, max: null },
  ],
  beds: [1, 2, 3, 4, '5+'],
  baths: [1, 2, 3, '4+'],
  cities: ['Lahore', 'Islamabad', 'Karachi', 'Murree', 'Faisalabad', 'Peshawar'],
};

export const AGENTS = [
  {
    id: 'a1',
    name: 'Sarah Ahmed',
    phone: '+92 300 1234567',
    email: 'sarah@zengo.com',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    properties: 12,
    rating: 4.8,
    specialization: 'Luxury Properties',
    experience: 8,
  },
  {
    id: 'a2',
    name: 'Ali Khan',
    phone: '+92 333 9876543',
    email: 'ali@zengo.com',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    properties: 15,
    rating: 4.6,
    specialization: 'Residential Homes',
    experience: 5,
  },
  {
    id: 'a3',
    name: 'Fatima Zaidi',
    phone: '+92 321 5678901',
    email: 'fatima@zengo.com',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    properties: 9,
    rating: 4.9,
    specialization: 'Commercial Properties',
    experience: 10,
  },
];