import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/database/models/product";

// GET /api/product/:slug
export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const slug = params.slug;
    const product = await getProductById(slug);

    if (!product) {
      // Produk dengan slug tertentu tidak ditemukan
      return NextResponse.json(
        {
          statusCode: 404,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        statusCode: 200,
        message: "Pong from GET /api/product !",
        data: product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error retrieving product:", error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};
