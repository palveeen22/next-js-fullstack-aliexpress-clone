import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { WishModel, MyResponse, WishlistInput } from '@/types';
import {
  getWishlist,
  createWishlist,
  deleteWishlist
} from '@/database/models/wishlist';

export const GET = async (req: NextRequest) => {
  const loggedInUserId = req.headers.get('x-user-id') as string;
  // console.log(loggedInUserId, "ID <<<<<");
  // GET
  const wishlist = await getWishlist(loggedInUserId);

  // res
  return NextResponse.json<MyResponse<WishModel[]>>(
    {
      statusCode: 200,
      message: 'Success get Wishlists!',
      data: wishlist
    },
    {
      status: 200
    }
  );
};

export  const POST = async(req: NextRequest) => {
  try {
const userId = req.headers.get('x-user-id') as string;
    const { productId } = await req.json() as any

    console.log(userId, productId);

    if (!userId || !productId) {
      throw new Error('Invalid userId or productId');
    }

    const data = {
      userId: userId,
      productId: productId,
       createdAt: new Date (),
  updatedAt: new Date (),
    };

    const cart = await createWishlist({
      userId: userId,
      productId: productId,
       createdAt: new Date (),
  updatedAt: new Date (),
    });

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: 'Succeed create cart',
        data: cart,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
    // You may want to handle errors and return an appropriate response
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 500,
        message: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}


// // POST /api/users
// export const POST = async (req: NextRequest) => {
//   try {
//     const loggedInUserId = req.headers.get('x-user-id') as string;

//     console.log(loggedInUserId, "login info");

//     const data = await req.json();
//     // body
//     const productId = data.productId;


//     const input = {
//       userId: loggedInUserId,
//       productId: productId,
//       createdAt: new Date().toString(),
//       updatedAt: new Date().toString()
//     } as WishlistInput;

//     const wishlist = await createWishlist(input);

//     // res
//     return NextResponse.json<MyResponse<unknown>>(
//       {
//         statusCode: 201,
//         message: 'Success add wishlist.',
//         data: wishlist
//       },
//       {
//         status: 201
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };



export const  DELETE = async (request: NextRequest) => {
    const WishId = await request.json();

    await deleteWishlist(WishId)

    return Response.json(
        {   
            statusCode : 200,
            message: "succeed delete WishList",
        },
        {
            status: 201,
        },
    )

} 