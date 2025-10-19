// localStorage utilities for ReelDeal e-commerce

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  specifications?: string[];
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: User['address'];
  paymentMethod: string;
}

// Initialize default products
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'OceanMaster Pro Spinning Rod',
    category: 'Rods & Reels',
    price: 149.99,
    description: 'The OceanMaster Pro is designed for the serious angler. With its lightweight graphite composite construction and sensitive tip, you\'ll feel every nibble. Perfect for both freshwater and saltwater fishing.',
    image: 'product-rod',
    specifications: ['Length: 7ft', 'Material: Graphite Composite', 'Action: Medium-Fast', 'Line Weight: 8-17lb'],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Pro Series Lure Collection',
    category: 'Lures & Baits',
    price: 34.99,
    description: 'Premium collection of versatile fishing lures designed to attract a wide variety of fish species. Features realistic patterns and proven action.',
    image: 'product-lures',
    specifications: ['Set of 12 lures', 'Assorted colors', 'Freshwater & Saltwater', 'Treble hooks included'],
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Professional Tackle Box',
    category: 'Tackle & Gear',
    price: 79.99,
    description: 'Organize your fishing gear with this professional-grade tackle box. Features multiple compartments and durable waterproof construction.',
    image: 'product-tackle',
    specifications: ['Waterproof', '6 compartments', 'Rust-resistant latches', 'Dimensions: 14x8x7 inches'],
    inStock: true,
    rating: 4.7,
    reviews: 67
  },
  {
    id: '4',
    name: 'Angler Pro Fishing Jacket',
    category: 'Apparel',
    price: 129.99,
    description: 'Stay comfortable on the water with this premium fishing jacket. Waterproof, breathable, and packed with pockets for all your gear.',
    image: 'product-apparel',
    specifications: ['Waterproof & Breathable', 'Multiple pockets', 'Sizes: S-XXL', 'UV Protection'],
    inStock: true,
    rating: 4.5,
    reviews: 52
  },
  {
    id: '5',
    name: 'SeaCast Elite Spinning Reel',
    category: 'Rods & Reels',
    price: 89.99,
    description: 'Smooth, powerful, and built to last. This spinning reel features a precision drag system and corrosion-resistant construction.',
    image: 'product-rod',
    specifications: ['Ball Bearings: 10+1', 'Gear Ratio: 5.2:1', 'Line Capacity: 200yds/10lb', 'Anti-reverse'],
    inStock: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '6',
    name: 'Ultimate Soft Bait Kit',
    category: 'Lures & Baits',
    price: 24.99,
    description: 'Realistic soft plastic baits that fish can\'t resist. Perfect for bass, pike, and more.',
    image: 'product-lures',
    specifications: ['50-piece set', 'Assorted sizes', 'Life-like texture', 'Scented formula'],
    inStock: true,
    rating: 4.4,
    reviews: 78
  }
];

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('reeldeal_products');
  if (!stored) {
    localStorage.setItem('reeldeal_products', JSON.stringify(defaultProducts));
    return defaultProducts;
  }
  return JSON.parse(stored);
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter(p => p.category === category);
};

export const getCart = (): CartItem[] => {
  const stored = localStorage.getItem('reeldeal_cart');
  return stored ? JSON.parse(stored) : [];
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('reeldeal_cart', JSON.stringify(cart));
};

export const addToCart = (product: Product, quantity: number = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  saveCart(cart);
};

export const removeFromCart = (productId: string) => {
  const cart = getCart().filter(item => item.product.id !== productId);
  saveCart(cart);
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const item = cart.find(item => item.product.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
};

export const clearCart = () => {
  localStorage.setItem('reeldeal_cart', JSON.stringify([]));
};

export const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem('reeldeal_currentUser');
  return stored ? JSON.parse(stored) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('reeldeal_currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('reeldeal_currentUser');
  }
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem('reeldeal_users');
  return stored ? JSON.parse(stored) : [];
};

export const registerUser = (email: string, password: string, name: string): User => {
  const users = getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    name
  };
  users.push(newUser);
  localStorage.setItem('reeldeal_users', JSON.stringify(users));
  return newUser;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    setCurrentUser(user);
  }
  return user || null;
};

export const updateUser = (updatedUser: User) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem('reeldeal_users', JSON.stringify(users));
    setCurrentUser(updatedUser);
  }
};

export const logoutUser = () => {
  setCurrentUser(null);
};

export const getOrders = (userId?: string): Order[] => {
  const stored = localStorage.getItem('reeldeal_orders');
  const orders = stored ? JSON.parse(stored) : [];
  return userId ? orders.filter((o: Order) => o.userId === userId) : orders;
};

export const createOrder = (order: Omit<Order, 'id' | 'createdAt'>): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  localStorage.setItem('reeldeal_orders', JSON.stringify(orders));
  return newOrder;
};
