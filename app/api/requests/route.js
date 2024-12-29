import connectDB from "@/app/db/connectDb";
import User from '@/app/models/User'


// the GET route for showing the pending request, totally different from the below one
export async function GET(request){
    connectDB;
    const searchParams = request.nextUrl.searchParams;
    const currentUser = searchParams.get('id');
    const currentUserData = await User.findOne({name: currentUser}).populate("Requests")
    // console.log(currentUserData)
    return new Response(JSON.stringify({requests: currentUserData.Requests}), {status: 200})
}

// route for handling the post request which will be for handling the after effects of rejecting or approving an pending request
export async function POST(request){

    const searchParams = request.nextUrl.searchParams;
    
    const type = searchParams.get('type');
    const currentUser = searchParams.get('current')
    const senderName = searchParams.get('sender')

    const currentUserData = await User.findOne({name: currentUser})
    const senderNameData = await User.findOne({ name: senderName })
    // console.log(currentUserData)
    // console.log(senderNameData)

    if(type == "acception"){
        // console.log("-----------------the request is accepted")

        // now update both friends
        // first update sender's friends
        const updateSendersFriend = await User.findByIdAndUpdate(
            senderNameData._id,
            {$addToSet: {friends: currentUserData._id}},
            {new: true},
        )

        // then update current user's friends
        const updateCurrentFriend = await User.findByIdAndUpdate(
            currentUserData._id,
            {$addToSet: {friends: senderNameData._id}},
            {new: true},
        )

        // now remove the particular request from the current user's requests
        const removeRequest = await User.findByIdAndUpdate(
            currentUserData._id,
            {$pull: {Requests: senderNameData._id}}
        )

        return new Response(JSON.stringify({ message: type }), {status: 200})
        
    }
    else if(type == "rejection"){
        // console.log("---------------the request is rejected, sad :(")
        // as they are not friends, the request is removed
        const removeRequest = await User.findByIdAndUpdate(
            currentUserData._id,
            {$pull: {Requests: senderNameData._id}}
        )

        return new Response(JSON.stringify({ message: type }), {status: 200})
    }
}