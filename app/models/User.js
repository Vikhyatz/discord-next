import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/hello");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    profilePicture: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    joinedServers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server"
    }],
    Requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);