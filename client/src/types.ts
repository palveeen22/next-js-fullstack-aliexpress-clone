import { ObjectId } from 'mongodb';

// Type definitions untuk Response yang akan dikembalikan
export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type ProductModelProps = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  shop: string;
  createdAt: Date; // Change type to Date
  updatedAt: Date; // Change type to Date
  status: String;
  rate: String;
};

// PRODUCT
export type Product = {
  _id: ObjectId;
  name: string; // val: req
  slug: string; // val: req, unique
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  shop: string;
  rate: number;
};

// PRODUCT
export type ProductWishlist = {
  _id: ObjectId;
  name: string; // val: req
  slug: string; // val: req, unique
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  shop: string;
  rate: number;
};

// WISHLIST
export type WishModel = {
  _id: ObjectId;
  userId: ObjectId; // val: req
  productId: ObjectId; // val: req
  createdAt: string;
  updatedAt: string;
};

export type GetWishModel = {
  _id: ObjectId;
  userId: ObjectId; // val: req
  productId: ObjectId; // val: req
  createdAt: string;
  updatedAt: string;
  Product: Product;
};

export type WishlistOutput = {
  _id: ObjectId;
  userId: ObjectId; // val: req
  productId: ObjectId; // val: req
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type WishlistNew = {
    userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};


export type WishlistInput = Omit<Omit<WishModel, '_id'>, 'userId'>;
