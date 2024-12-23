import mongoose from "mongoose";

const serverSchema = [{
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
}]

module.exports = mongoose.models.Server || mongoose.model("Server", serverSchema);