import connectDB from "@/app/db/connectDb";
import Server from "@/app/models/Server"
import User from "@/app/models/User"

export async function POST(request){
    connectDB
    const searchParams = request.nextUrl.searchParams;
    const serverId = searchParams.get("serverId")
    const userName = searchParams.get("userName")

    const userData = await User.findOne({name: userName})

    // add the user to the server's member list
    const updatedServer = await Server.findByIdAndUpdate(
        serverId ,
        {$addToSet: {members: userData._id}},
        {new: true},
    )

    // add the server id to the user's joined server
    const serverData = await Server.findById(serverId)
    if(serverData == 0){
        return new Response (JSON.stringify({message: "server not found"}), {status: 404})
    }

    const updatedUserServers = await User.findByIdAndUpdate(
        userData._id,
        {$addToSet : {joinedServers: serverData._id}},
        {new: true},
    )

    return new Response (JSON.stringify({message: "added user to servers members"}), {status: 200})
}