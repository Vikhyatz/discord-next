import connectDB from "@/app/db/connectDb"
import Server from "@/app/models/Server"

export async function GET(request){
    connectDB
    const searchParams = request.nextUrl.searchParams;
    const channelName = searchParams.get("channelName")
    const serverName = searchParams.get("serverName")
    const serverData = await Server.findOne({serverName: serverName});

    const channelData = serverData.channel.filter((channel) => channel.channelName === channelName )

    return new Response (JSON.stringify({channelData}), {status: 200})
}