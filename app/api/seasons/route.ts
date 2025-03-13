import dbConnect from "@/db/mongodb";
import { NextRequest , NextResponse} from "next/server"

export const POST = async (req : NextRequest) => {
    try {

        const db = await dbConnect()
        const collection = db?.collection('seasons')
        const data = await req.json();
        await collection?.insertOne(data)
         return NextResponse.json({ success: true, data: data });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Something went wrong',
        });
    }
}