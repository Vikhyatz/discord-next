import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User"

export async function GET(request){
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const current = searchParams.get("current")

    const currentUserData = await User.findOne({name: current});
    const friends = await currentUserData.populate("friends")

    return new Response(JSON.stringify({user: friends}), {status: 200,})
}