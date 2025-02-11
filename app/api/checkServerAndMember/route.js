import connectDB from "@/app/db/connectDb";
import Server from "@/app/models/Server"
import User from '@/app/models/User'


export async function GET(request){
    connectDB
    const searchParams = request.nextUrl.searchParams;
    const server = searchParams.get('serverName')
    const user = searchParams.get("user")

    const serverData = await Server.findOne({serverName: server});

    // check: if the server exists or not
    if(serverData == null){
        return new Response (JSON.stringify({message: "the server doesn't exist"}), {status: 404})
        }

    const userData = await User.findOne({name: user})

    // second check: if the user is a member of the server or not
    const userInServer = serverData.members.filter( (userId) => userId.toString() == userData._id.toString())
    console.log("hello there", userInServer)

    // if there is nothing common in the userID and the members.ID
    if(userInServer == 0){
        return new Response (JSON.stringify({message: "the user is not in the server's member list"}), {status: 403})
    }

    return new Response (JSON.stringify({message: "the server exists"}), {status: 200})



}