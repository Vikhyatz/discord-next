import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User"

export async function POST(request) {
    await connectDB()
    const searchParams = request.nextUrl.searchParams;
    const current = searchParams.get("current")
    const rmFriend = searchParams.get("rmfriend")

    const currentUserData = await User.findOne({ name: current });
    const rmFriendData = await User.findOne({ name: rmFriend });

    const removeFromCurrent = await User.findByIdAndUpdate(
        currentUserData._id,
        { $pull: { friends: rmFriendData._id } }
    )

    const removeFromRmFriend = await User.findByIdAndUpdate(
        rmFriendData._id,
        { $pull: { friends: currentUserData._id } }
    )

    return new Response(JSON.stringify({ message: "removed friend" }), { status: 200 })
}