import connectDB from "@/app/db/connectDb";
import Server from "@/app/models/Server"

export async function GET(request){
    connectDB;

    const searchParams = request.nextUrl.searchParams;
    const serverName = searchParams.get("serverName")
    const deleteServer = await Server.deleteOne({serverName: serverName})

    return new Response (JSON.stringify({message: `the server named ${serverName} has been deleted`}) , {status: 200})
}