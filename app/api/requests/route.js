import connectDB from "@/app/db/connectDb";
import User from '@/app/models/User'

export async function GET(request){
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const currentUser = searchParams.get('id');
    const currentUserData = await User.findOne({name: currentUser}).populate("Requests")
    console.log(currentUserData)
    return new Response(JSON.stringify({requests: currentUserData.Requests}), {status: 200})
}