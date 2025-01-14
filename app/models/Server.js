import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";

const serverSchema = mongoose.Schema({
    serverName: {type: String, unique: true},
    serverIcon: String,
    serverOwner: String,
    channel: [{
        channelName: String,
        roomName: String,
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.models.Server || mongoose.model("Server", serverSchema);