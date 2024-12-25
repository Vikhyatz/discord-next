// "use client"
import connectDB from "@/app/db/connectDb"
import mongoose from "mongoose"
import User from "@/app/models/User"


// the GET route for showing the pending request, totally different from the below one
export async function GET(request){
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
            {$addToSet: {Requests: currentUserData._id}},
            {new: true},
        );

        console.log("the current user id is here: ", currentUser._id);
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


// route for handling the post request which will be for handling the after effects of rejecting or approving an pending request
export async function POST(request){
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const currentUser = searchParams.get('current')
    const requestUser = searchParams.get('reqUser')
    
    if(type == "acception"){

    }
    else if(type == "rejection"){

    }
}