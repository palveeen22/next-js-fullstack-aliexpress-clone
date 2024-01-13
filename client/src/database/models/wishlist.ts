import { Db, ObjectId, DeleteResult } from 'mongodb';
import { getMongoClientInstance } from '../config';
import {
  GetWishModel,
  ProductWishlist,
  WishModel,
  WishlistInput,
  WishlistNew
} from '@/types';

export type WishlistModelCreateInput = Omit<GetWishModel, '_id'>;

// constant value
const DATABASE_NAME = process.env.MONGODB_DB_NAME || 'test';
const COLLECTION_WISHLIST = 'Wishlist';

// Connect DB
export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export async function getWishlist(id: string) {
  const db = await getDb();

  const result = (await db
    .collection(COLLECTION_WISHLIST)
    .aggregate([
      {
        $match: {
          userId: new ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'Product',
          localField: 'productId',
          foreignField: '_id',
          as: 'Product'
        }
      },
      {
        $unwind: {
          path: '$Product',
          preserveNullAndEmptyArrays: true
        }
      }
    ])
    .toArray()) as GetWishModel[];

  return result;
}

export const createWishlist = async (cart: WishlistNew) => {
  const db = await getDb();

  // Ensure that cart.userId and cart.productId are valid values
  if (!cart.userId || !cart.productId) {
    throw new Error('Invalid userId or productId');
  }

  const data = {
    userId: new ObjectId(cart.userId),
    productId: new ObjectId(cart.productId),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection(COLLECTION_WISHLIST).insertOne(data);

  return result;
};

// export const deleteWishlist = async (input: string, userId: string) => {
//   try {
//     const db = await getDb();
//     const data = {
//       userId: new ObjectId(userId),
//       productId: new ObjectId(input)
//     };
//     const created = await db.collection(COLLECTION_WISHLIST).deleteOne({
//       $and: [{ userId: data.userId }, { productId: data.productId }]
//     });
//     return created;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

export const deleteWishlist = async (cart: string) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_WISHLIST).deleteOne({
    _id: new ObjectId(cart)
  });
  return result;
};
