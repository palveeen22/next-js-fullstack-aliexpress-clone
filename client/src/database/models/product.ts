import { Db, ObjectId } from 'mongodb';
import { getMongoClientInstance } from '../config';
import { NextApiRequest, NextApiResponse } from 'next';



export type ProductModel = {
  _id: ObjectId;
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

// Mendefinisikan type dari UserModelCreateInput yang tidak menggunakan _id
export type productModelCreateInput = Omit<ProductModel, '_id'>;

// constant value
const DATABASE_NAME = process.env.MONGODB_DB_NAME || 'test';
const COLLECTION_PRODUCT = 'Product';

// Connect DB
export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

// Function to get products
export const getProducts = async (searchQuery?: string, page: number = 1): Promise<ProductModel[]> => {
  try {
    const db = await getDb(); // Assuming getDb is a function to get your database instance
    const filter: any = {};

    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      filter.$or = [{ name: regex }];
    }

    const products = await db
      .collection(COLLECTION_PRODUCT)
      .find(filter)
      .limit(10 * page)
      .toArray();

    return products as ProductModel[];
  } catch (error) {
    // Handle errors appropriately
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

// Example Next.js API route using the function
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { searchQuery, page } = req.query;
    const products = await getProducts(searchQuery as string, parseInt(page as string, 10));

    // Return the products in the API response
    res.status(200).json({ products });
  } catch (error) {
    // Handle errors appropriately
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getProductById = async (slug: string) => {
  const db = await getDb();

  try {
    const product = await db.collection(COLLECTION_PRODUCT).findOne({
      slug:slug
    });

    if (!product) {
      // Handle the case when the product with the given ID is not found
      throw new Error(`Product with ID ${slug} not found`);
    }

    // Map the product properties to a simplified model if needed
    const data: ProductModel = {
       _id: product._id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      excerpt: product.excerpt,
      price: product.price,
      tags: product.tags,
      thumbnail: product.thumbnail,
      images: product.images,
      shop: product.shop,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      rate: product.rate,
      status: product.status
    };

    return data;
  } catch (error) {
    // Handle any errors that might occur during the database query
    console.error('Error fetching product details:', error);
    throw new Error('Internal Server Error');
  }
};

export const createProduct = async (product: ProductModel) => {
  const inputProduct: productModelCreateInput = {
    ...product
    //disini slugnya
  };
  const db = await getDb();
  const result = await db
    .collection(COLLECTION_PRODUCT)
    .insertOne(inputProduct);
  return result;
};

export const deleteProduct = async (product: ProductModel) => {
  const inputProduct: productModelCreateInput = {
    ...product
    //disini slugnya
  };
  const db = await getDb();
  const result = await db
    .collection(COLLECTION_PRODUCT)
    .insertOne(inputProduct);
  return result;
};
