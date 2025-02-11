import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User"

export async function GET(request){
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const user = searchParams.get('user')
    const friend = searchParams.get('friend')

    const userData = await User.findOne({name: user})
    const friendData = await User.findOne({name: friend})
    console.log(friendData)

    if(friendData == null){
        return new Response (JSON.stringify({message: "User doesn't exist"}), {status: 404})
    }

    const validFriend = userData.friends.filter((friends) => friends.toString() === friendData._id.toString())
    console.log(validFriend)
    
    if(validFriend == 0){
        return new Response (JSON.stringify({message: "not a valid friend"}), {status: 403})
    }
    
    return new Response (JSON.stringify({message: "they are valid friends"}), {status: 200})
}