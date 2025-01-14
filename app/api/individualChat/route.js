import User from "@/app/models/User"
import connectDB from "@/app/db/connectDb";
import Requests from "@/app/components/Requests";

export async function GET(request){
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const currentUser = searchParams.get("current");
    const friendUser = searchParams.get("friend")

    // get both of their data's
    const currentUserData = await User.findOne({name: currentUser});
    const friendUserData = await User.findOne({name: friendUser});
    
    // get their id's
    const currentUserId = currentUserData._id;
    const friendUserId = friendUserData._id;
    
    // place them in an array
    // sort the array
    const roomNameSortedArray = [currentUserId, friendUserId].sort();

    // use template literals to join both of the users
    const finalRoomName = `${roomNameSortedArray[0]}_${roomNameSortedArray[1]}`;

    // send the final room name
    return new Response(JSON.stringify({roomName: finalRoomName }), {status: 200})
}