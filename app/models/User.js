import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

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