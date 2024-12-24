import connectDB from "@/app/db/connectDb";
import mongoose from "mongoose";
import User from "@/app/models/User"

export async function GET(request){
    await connectDB();

    const all = await User.find();

    return new Response(JSON.stringify({all}), {
            status: 200,
    })
}