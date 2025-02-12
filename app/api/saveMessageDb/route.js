import connectDB from "@/app/db/connectDb";
import Messages from "@/app/models/Messages"

export async function POST(request){
    connectDB
    const searchParams = request.nextUrl.searchParams;
    const roomName = searchParams.get('roomName')
    const sender = searchParams.get('sender')
    const date = searchParams.get("date")
    const time = searchParams.get("time")
    const content = searchParams.get("content")

    const updatedMessage = await Messages.findOneAndUpdate(
        { roomName: roomName },
        {$addToSet : {messages : {senderName: sender, content: content, date: date, time: time}}},
        {new: true, upsert: true}
    )
    console.log(updatedMessage)

    return new Response (JSON.stringify({message: "the message has been saved!!"}), {status: 200})

}