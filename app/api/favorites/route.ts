import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/mongodb";


export const GET = async () => {
  try {
    const db = await dbConnect();
    const collection = db?.collection("favorites");
    const favorites = await collection?.find({}).toArray();

    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }

    return NextResponse.json({ success: false, message: "An error occurred" });
  }
};

export const POST = async (req: NextRequest) => {
    try {
        const { show} = await req.json();
        const db = await dbConnect();
        const collection = db?.collection("favorites");
        const result = await collection?.insertOne({_id: show.id, ...show});

        return NextResponse.json({ success: true, message: result?.acknowledged ? "Show added to favorites" : "Failed to add show to favorites" });
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message });
        }

        return NextResponse.json({ success: false, message: "An error occurred" });
    }
};

export const DELETE = async (req: NextRequest) => {

    try {
        const { showId } = await req.json();
        console.log(showId , "showId of delete")
        const db = await dbConnect();
        const collection = db?.collection("favorites");
        const result = await collection?.findOneAndDelete({_id: showId});

        return NextResponse.json({ success: true, message: `Show ID ${result?._id} removed from favorites`})
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message });
        }

        return NextResponse.json({ success: false, message: "An error occurred" });
        
    }
};
