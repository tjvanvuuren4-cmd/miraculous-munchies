// Mock base44 client for development without API

const mockUser = {
  id: 'mock-user-id',
  email: 'user@example.com',
  name: 'Mock User'
};

const mockMenuItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 12.99,
    category: 'mains',
    image_url: null,
    available: true
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan',
    price: 8.99,
    category: 'mains',
    image_url: null,
    available: true
  },
  {
    id: '3',
    name: 'Spaghetti Carbonara',
    description: 'Pasta with eggs, cheese, pancetta, and black pepper',
    price: 14.99,
    category: 'mains',
    image_url: null,
    available: true
  },
   {
   id: '4',
   name: 'Lazanje Carbonara',
   description: 'Pasta with eggs, cheese, pancetta, and black pepper',
   price: 34.99,
   category: 'mains',
   image_url: null,
   available: true
},
   {
  id: '5',
  name: 'Chocolate Cake',
  description: 'Rich, moist chocolate cake with cocoa frosting',
  price: 24.99,
  category: 'birthday_cakes',
  image_url: null,
  available: true
},
{
  id: '6',
  name: 'Vanilla Cake',
  description: 'Classic vanilla cake with buttercream frosting',
  price: 22.99,
  category: 'birthday_cakes',
  image_url: '/src/images/2L Coke Zero.jpg',
  available: true
},
{
 id: '7',
name: '2L Coke Zero',
description: 'Coke Zero in 2L bottle',
price: 29.99,
category: 'beverages',
image_url: '/src/images/2L Coke Zero.jpg',
available: true
},

];

const mockReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Great food and service!',
    created_date: new Date().toISOString(),
    customer_name: 'John Doe'
  },
  {
    id: '2',
    rating: 4,
    comment: 'Good experience overall.',
    created_date: new Date().toISOString(),
    customer_name: 'Jane Smith'
  }
];

const mockOrders = [
  {
    id: '1',
    items: [
      { menu_item_id: '1', quantity: 2, price: 12.99 },
      { menu_item_id: '2', quantity: 1, price: 8.99 }
    ],
    total: 34.97,
    status: 'completed',
    created_date: new Date().toISOString()
  }
];

const mockReferrals = [];

const mockCustomRequests = [];

const createMockEntity = (data) => ({
  ...data,
  id: Math.random().toString(36).substr(2, 9),
  created_date: new Date().toISOString()
});

const base44 = {
  auth: {
    me: () => Promise.resolve(mockUser),
    logout: () => Promise.resolve(),
    redirectToLogin: () => {}
  },
  entities: {
    MenuItem: {
      list: () => Promise.resolve(mockMenuItems)
    },
    Review: {
      list: (order, limit) => Promise.resolve(mockReviews.slice(0, limit || 50)),
      create: (data) => Promise.resolve(createMockEntity(data))
    },
    Order: {
      list: (order, limit) => Promise.resolve(mockOrders.slice(0, limit || 50)),
      create: (data) => Promise.resolve(createMockEntity(data))
    },
    Referral: {
      list: () => Promise.resolve(mockReferrals),
      filter: () => Promise.resolve(mockReferrals),
      create: (data) => Promise.resolve(createMockEntity(data)),
      update: (id, data) => Promise.resolve({ ...mockReferrals.find(r => r.id === id), ...data })
    },
    CustomRequest: {
      create: (data) => Promise.resolve(createMockEntity(data))
    }
  }
};

export { base44 };