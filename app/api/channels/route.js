import Server from "@/app/models/Server"
import connectDB from "@/app/db/connectDb";

export async function GET(request) {
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const server = searchParams.get("server");

    const channels = Server.findMany({serverName: server});
    
    return new Response (JSON.stringify({channels: channels}), {status: 200})
    
}