import connectDB from "@/app/db/connectDb";
import Messages from "@/app/models/Messages"

export async function GET(request){
    connectDB
    const searchParams = request.nextUrl.searchParams;
    const roomName = searchParams.get("roomName")

    const allMessages = await Messages.findOne({roomName: roomName})

    return new Response (JSON.stringify({allMessages}), {status: 200})
}