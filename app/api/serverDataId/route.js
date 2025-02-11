import connectDB from "@/app/db/connectDb";
import Server from '@/app/models/Server'

export async function GET(request){
    connectDB
    const searchParams = request.nextUrl.searchParams;
    const serverId = searchParams.get('serverId')

    const serverData = await Server.findById(serverId)

    return new Response (JSON.stringify({serverData}))
}