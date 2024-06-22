import { connectToDatabase } from "@/lib/db";
import AdminValues from "@/schema/adminSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await req.json();

    const adminValues = await AdminValues.create(reqBody);

    if (!req.body) {
      throw new Error("Nothing was passed into the form!");
    }

    return NextResponse.json({
      status: 201,
      success: true,
      data: {
        adminValues,
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

    const announcementText: string = reqBody.announcementText;
    const announcementColor: string = reqBody.announcementColor;
    const footerBackgroundColor: string = reqBody.footerBackgroundColor;
    const heroHeading: string = reqBody.heroHeading;
    const heroSubHeading: string = reqBody.heroSubHeading;
    const heroButtonText: string = reqBody.heroButtonText;
    const heroButtonColor: string = reqBody.heroButtonColor;
    const email: string = reqBody.email;
    const address: string = reqBody.address;
    const featuredCollection: string = reqBody.featuredCollection;

    const document = await AdminValues.findOne();

    if (!document) {
      throw new Error("No document found to update");
    }

    const { _id } = document;

    const dashboardValues = await AdminValues.updateOne(
      {
        _id,
      },
      {
        $set: {
          announcementColor: announcementColor,
          announcementText: announcementText,
          heroHeading: heroHeading,
          heroSubHeading: heroSubHeading,
          heroButtonText: heroButtonText,
          heroButtonColor: heroButtonColor,
          footerBackgroundColor: footerBackgroundColor,
          email: email,
          address: address,
          featuredCollection: featuredCollection,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        dashboardValues,
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

export async function GET() {
  try {
    await connectToDatabase();
    const dashboardValues = await AdminValues.find();

    if (!dashboardValues) {
      throw new Error("Document not found");
    }

    return NextResponse.json({
      status: 200,
      success: true,
      dashboardValues,
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
