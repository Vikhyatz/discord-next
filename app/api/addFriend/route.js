// "use client"
import connectDB from "@/app/db/connectDb"
import mongoose from "mongoose"
import User from "@/app/models/User"


// route to handle adding friends and sending requests
export async function GET(request){
    await connectDB();

    // to get the friend name query
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')
    const currentUser = searchParams.get("current")
    const currentUserData = await User.findOne({name: currentUser})
    const userCheck = await User.findOne({name: query})

    // if the user tries to send himself the friend request
    if (userCheck._id.toString() == currentUserData._id.toString()){
        console.log('-------------------sending to himself')
        return new Response(JSON.stringify({message: "you cannot send friend request to yourself"}), {
            status: 200,
        })
    }
    // if the user is already a friend of the sender
    const friendsArr = currentUserData.friends
    const checkFriendAlready = friendsArr.filter((friend)=>{ friend == userCheck._id })
    console.log(checkFriendAlready)
    if(checkFriendAlready == []){
        console.log('-------------------already a friend')
        return new Response(JSON.stringify({message: "you guys are already friends"}), {
            status: 200,
        })
    }
    if(userCheck){
        
        const userRequestsUpdate = await User.findByIdAndUpdate(
            userCheck._id,
            {$addToSet: {Requests: currentUserData._id}},
            {new: true},
        );

        console.log("the current user id is here: ", currentUserData._id);
        console.log("the input user is here: ", userCheck._id)

        return new Response(JSON.stringify({
            userRequestsUpdate, sender : currentUserData._id
        }), {
                status: 200,
        })
    }else{
        return new Response(JSON.stringify({message: "wrong username"}), {
            status: 200,
        })
    }
}

