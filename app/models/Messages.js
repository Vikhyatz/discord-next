import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    roomName: {type: String, unique: true},
    messages: [{
        senderName: String, // name of the sender
        content: String, // the message content
        date: String, // not using Date because this will only contain the date like 00/00/0000
        time: String, // different field because this will only contain 00:00
    }]
})

module.exports = mongoose.models.Messages || mongoose.model("Messages", messageSchema)