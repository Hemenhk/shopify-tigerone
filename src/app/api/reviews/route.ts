import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import ProductReviews from "@/schema/productReviews";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();
    const { productHandle, review, rating, author, title } = reqBody;

    console.log("product handle", productHandle);

    const newReview = new ProductReviews({
      productHandle,
      review,
      rating,
      author,
      title,
    });
    await newReview.save();
    console.log("newReview", newReview);

    return NextResponse.json({
      status: 201,
      success: true,
      data: {
        reviews: newReview,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const { data } = reqBody;
    const { isVerified, id } = data;

    const updatedReview = await ProductReviews.findByIdAndUpdate(
      id,
      { isVerified: isVerified },
      {
        new: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        updatedReview,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const fetchedReviews = await ProductReviews.find();

    const productHandles = [
      ...new Set(fetchedReviews.map((review) => review.productHandle)),
    ];

    const reviewStats = await Promise.all(
      productHandles.map(async (productHandle) => {
        const stats = await ProductReviews.calculateReviewStats(productHandle);
        return {
          productHandle,
          stats,
        };
      })
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        reviews: fetchedReviews,
        reviewStats,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const { id } = await req.json();
    const deletedReview = await ProductReviews.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json({
        status: 404,
        success: false,
        error: "Review not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        message: "Review deleted successfully",
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      success: false,
      error: error.message,
    });
  }
}
