import { getProducts } from "@/database/models/product";
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

// Type definitions for the Response to be returned
export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

// GET /api/users
export const GET = async (request: NextRequest) => {
  try {
    const searchQuery = request.nextUrl.searchParams.get("search") || "";
    const parsedPage = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);

    const products = await getProducts(searchQuery, parsedPage);

    return NextResponse.json<MyResponse<typeof products>>(
      {
        statusCode: 200,
        message: "Pong from GET /api/product!",
        data: products,
      },
      // Additional information object (status code, headers, etc.)
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json<MyResponse<undefined>>(
      {
        statusCode: 500,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
