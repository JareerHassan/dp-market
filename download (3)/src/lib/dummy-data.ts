import type { Category, Product, User, Review, Order } from '@/lib/types';

export const users: User[] = [
  { id: 'u1', name: 'SynthWaveSeller', avatarUrl: 'https://picsum.photos/seed/201/100/100', memberSince: '2022-01-15' },
  { id: 'u2', name: 'GlitchGuru', avatarUrl: 'https://picsum.photos/seed/202/100/100', memberSince: '2021-11-20' },
  { id: 'u3', name: 'QuantumCoder', avatarUrl: 'https://picsum.photos/seed/203/100/100', memberSince: '2023-03-10' },
];

export const categories: Category[] = [
  { id: 'cat1', name: 'Chatbots', slug: 'chatbots', icon: 'Bot' },
  { id: 'cat2', name: 'Prompts', slug: 'prompts', icon: 'Terminal' },
  { id: 'cat3', name: 'Automations', slug: 'automations', icon: 'Zap' },
  { id: 'cat4', name: 'Templates', slug: 'templates', icon: 'ClipboardCopy' },
  { id: 'cat5', name: 'APIs', slug: 'apis', icon: 'Code' },
  { id: 'cat6', name: 'Datasets', slug: 'datasets', icon: 'Database' },
  { id: 'cat7', name: 'Widgets', slug: 'widgets', icon: 'Component' },
  { id: 'cat8', name: 'Niche Tools', slug: 'niche-tools', icon: 'Wrench' },
];

export const products: Product[] = [
  {
    id: 'prod1',
    name: 'NexusBot Pro',
    description: 'An advanced, customizable chatbot framework for seamless customer interaction. NexusBot Pro offers state-of-the-art natural language processing and easy integration with any platform.',
    features: ['NLP Engine', 'Multi-platform support', 'Analytics Dashboard', 'Easy Customization'],
    price: 99.99,
    category: 'Chatbots',
    tags: ['customer support', 'nlp', 'ai chatbot'],
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    gallery: ['https://picsum.photos/seed/301/1200/800', 'https://picsum.photos/seed/302/1200/800'],
    sellerId: 'u1',
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'prod2',
    name: 'QuantumLeap API',
    description: 'A powerful API for quantum-inspired machine learning models. Unlock new possibilities in data analysis and prediction.',
    features: ['Quantum-inspired algorithms', 'High-speed processing', 'Secure and scalable', 'Comprehensive documentation'],
    price: 249.99,
    category: 'APIs',
    tags: ['machine learning', 'quantum computing', 'data analysis'],
    rating: 4.9,
    reviewCount: 98,
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    gallery: ['https://picsum.photos/seed/303/1200/800'],
    sellerId: 'u3',
    createdAt: '2023-11-15T14:30:00Z',
  },
  {
    id: 'prod3',
    name: 'ChronoFlow Automation',
    description: 'Automate your complex workflows with our AI-driven automation suite. From data entry to social media management, ChronoFlow has you covered.',
    features: ['Visual workflow builder', '100+ integrations', 'AI-powered decision making', 'Real-time monitoring'],
    price: 79.99,
    category: 'Automations',
    tags: ['workflow', 'automation', 'productivity'],
    rating: 4.7,
    reviewCount: 210,
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    gallery: [],
    sellerId: 'u2',
    createdAt: '2023-09-01T09:00:00Z',
  },
  {
    id: 'prod4',
    name: 'Artisan Prompts Pack',
    description: 'A curated collection of over 1000 high-quality prompts for generative AI art creation. Perfect for artists and designers.',
    features: ['For Midjourney, DALL-E 3, etc.', 'Categorized by style', 'Includes negative prompts', 'Regular updates'],
    price: 29.99,
    category: 'Prompts',
    tags: ['generative art', 'midjourney', 'prompts'],
    rating: 4.9,
    reviewCount: 532,
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    gallery: [],
    sellerId: 'u1',
    createdAt: '2023-12-01T11:00:00Z',
  },
  {
    id: 'prod5',
    name: 'Synthwave UI Kit',
    description: 'A futuristic UI kit and template for building stunning, retro-themed dashboards and applications.',
    features: ['React components', 'Tailwind CSS', 'Dark mode first', 'Fully responsive'],
    price: 49.99,
    category: 'Templates',
    tags: ['ui kit', 'react', 'tailwind css'],
    rating: 5.0,
    reviewCount: 88,
    imageUrl: 'https://picsum.photos/seed/5/600/400',
    gallery: [],
    sellerId: 'u2',
    createdAt: '2023-11-20T18:00:00Z',
  },
  {
    id: 'prod6',
    name: 'Sentiment Analysis Dataset',
    description: 'A massive, cleaned, and labeled dataset of over 10 million product reviews for sentiment analysis model training.',
    features: ['10M+ records', 'Pre-processed text', 'Multi-lingual', 'CSV and JSON formats'],
    price: 499.99,
    category: 'Datasets',
    tags: ['sentiment analysis', 'dataset', 'nlp'],
    rating: 4.8,
    reviewCount: 45,
    imageUrl: 'https://picsum.photos/seed/6/600/400',
    gallery: [],
    sellerId: 'u3',
    createdAt: '2023-10-05T12:00:00Z',
  },
];

export const reviews: Review[] = [
    { id: 'rev1', productId: 'prod1', userId: 'u2', rating: 5, comment: 'Absolutely phenomenal chatbot framework. The NLP is top-tier.', createdAt: '2023-11-01T10:00:00Z' },
    { id: 'rev2', productId: 'prod1', userId: 'u3', rating: 4, comment: 'Great tool, though the documentation for custom integrations could be clearer.', createdAt: '2023-11-03T15:23:00Z' },
    { id: 'rev3', productId: 'prod2', userId: 'u1', rating: 5, comment: 'This API is mind-blowing. The performance is off the charts. Worth every penny.', createdAt: '2023-11-18T19:45:00Z' },
    { id: 'rev4', productId: 'prod3', userId: 'u3', rating: 4, comment: 'Solid automation tool. Saved me a ton of time. Some more integrations would be nice.', createdAt: '2023-09-10T11:00:00Z' },
];

export const testimonials = [
  {
    quote: "Neural Nexus has revolutionized how I find and deploy AI tools. The quality of products is unmatched.",
    name: "Alexia Volkova",
    title: "Lead AI Engineer, Cybersystems Inc.",
    avatarUrl: 'https://picsum.photos/seed/201/100/100'
  },
  {
    quote: "As a seller, the platform is a dream. Easy to use, great analytics, and a vibrant community of buyers.",
    name: "Kenji Tanaka",
    title: "Indie AI Developer",
    avatarUrl: 'https://picsum.photos/seed/202/100/100'
  },
  {
    quote: "The AI Shopping Assistant found the perfect dataset for my research in minutes. It felt like magic.",
    name: "Dr. Evelyn Reed",
    title: "Data Scientist, Quantum Insights",
    avatarUrl: 'https://picsum.photos/seed/203/100/100'
  }
];

export const purchaseHistory: Order[] = [
  { id: 'ord1', productId: 'prod4', productName: 'Artisan Prompts Pack', date: '2023-12-02', price: 29.99, status: 'Completed' },
  { id: 'ord2', productId: 'prod5', productName: 'Synthwave UI Kit', date: '2023-11-21', price: 49.99, status: 'Completed' },
];

export const savedItems = [products[0], products[2]];

export const sellerProducts = [products[0], products[3]];

export const sellerOrders: Order[] = [
  { id: 'ord3', productId: 'prod1', productName: 'NexusBot Pro', date: '2023-11-05', price: 99.99, status: 'Completed', buyerName: 'GlitchGuru' },
  { id: 'ord4', productId: 'prod3', productName: 'ChronoFlow Automation', date: '2023-09-12', price: 79.99, status: 'Completed', buyerName: 'QuantumCoder' },
];
