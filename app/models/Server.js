import mongoose from "mongoose";

const serverSchema = mongoose.Schema({
    serverName: String,
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

module.exports = mongoose.model("Server", serverSchema);