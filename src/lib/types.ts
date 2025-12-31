export type Product = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  sellerId: string;
  createdAt: string;
   link?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: any; // Lucide icon name
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  memberSince: string;
};

export type Review = {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
};

export type Order = {
    id: string;
    productId: string;
    productName: string;
    date: string;
    price: number;
    status: 'Completed' | 'Pending' | 'Failed';
    buyerName?: string;
};
