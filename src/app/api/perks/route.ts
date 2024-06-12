import { NextRequest, NextResponse } from "next/server";
import Perks from "@/schema/perkSchema";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await req.json();

    const { perkImg, perkTitle, perkDescription } = reqBody;
    const newPerk = new Perks({
      perkImg,
      perkTitle,
      perkDescription,
    });
    await newPerk.save();

    if (!req.body) {
      throw new Error("Nothing was passed into the form!");
    }

    console.log("new perk", newPerk);

    return NextResponse.json({
      status: 201,
      success: true,
      data: {
        perks: newPerk,
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

    const { perkImg, perkTitle, perkDescription } = reqBody;

    const { _id } = await Perks.findOne();

    const perkValues = await Perks.updateOne(
      {
        _id,
      },
      {
        $set: {
          perkImg: perkImg,
          perkTitle: perkTitle,
          perkDescription: perkDescription,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        perk: perkValues,
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
    const perkValue = await Perks.find();


    if (!perkValue) {
      throw new Error("Document not found");
    }

    console.log("perkvalue", perkValue);

    return NextResponse.json({
      status: 200,
      success: true,
      perkValue: perkValue,
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
