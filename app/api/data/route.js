// "use client"
import connectDB from "@/app/db/connectDb"
import mongoose from "mongoose"
import User from "@/app/models/User"


export async function POST(request){
    await connectDB();

    // to get the friend name query
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')
    const currentUser = searchParams.get("current")
    const currentUserData = await User.findOne({name: currentUser})
    const userCheck = await User.findOne({name: query})
    
    if(userCheck){
        const userRequestsUpdate = await User.findByIdAndUpdate(
            userCheck._id,
            {addToSet: {Requests: currentUserData._id}},
            {new: true},
        );

        console.log("the current user id is here: ", currentUser);
        console.log("the input user is here: ", userCheck._id)

        return new Response(JSON.stringify({userRequestsUpdate}), {
                status: 200,
        })
    }else{
        return new Response(JSON.stringify({message: "wrong username"}), {
            status: 200,
        })
    }
}