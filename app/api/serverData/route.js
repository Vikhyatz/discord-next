import Server from "@/app/models/Server"
import User from "@/app/models/User"
import connectDB from "@/app/db/connectDb";
import { v4 as uuidv4 } from "uuid";

export async function GET(request) {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const server = searchParams.get("server");

    // also add another layer to check that the current user is inside the server as a member or not, there might be other servers with the same name
    // or maybe just add a modal or something to show the user and handle creating multiple servers of the same name
    const serverData = await Server.findOne({serverName: server}).populate("serverOwner");
    
    // const serverOwnerId = serverData.serverOwner;
    // const serverOwner = await User.findById({serverOwnerId})
    return new Response (JSON.stringify({serverData}), {status: 200})
}


// post request to create another channel
// this request can only be made by the server owner
export async function POST(request){
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const serverName = searchParams.get("server");
    const channelName = searchParams.get("channelName")

    // new unique room name for the channel
    const roomName = uuidv4();

    const updatedChannels = await Server.findOneAndUpdate(
        { serverName },
        { $addToSet: { channel: { channelName, roomName } } }
    );


    return new Response(JSON.stringify({updatedChannels}))
    
}