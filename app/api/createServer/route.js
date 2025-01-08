import User from '@/app/models/User'
import Server from '@/app/models/Server'
import connectDB from '@/app/db/connectDb'
import { v4 as uuidv4 } from 'uuid';



// MOSTLY DONE BUT NOT DEFINED FOR THE USER, ADD IN THE JOINED SERVERS OF THE USER, TO MAKE IT PRIVATE
export async function POST(request){
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const serverName = searchParams.get("serverName");
    const current = searchParams.get("current");

    const roomName = uuidv4();

    // creating server icon from initials of the server name
    const words = serverName.split(' ');
    // initials
    const serverIcon = words.map(word => word.charAt(0)).join('');

    const currentUserData = await User.findOne({name: current});
    const createServer = await Server.create({
        serverName: serverName,
        serverIcon: serverIcon,
        serverOwner: currentUserData._id, // current user is the owner
        channel: [{
            channelName: 'General',// default channel of the server
            roomName: roomName, // random roomname for connecting through socket.io
        }]
    })
    return new Response(JSON.stringify({ message: `New server named ${serverName} created`}), { status: 200 })
}