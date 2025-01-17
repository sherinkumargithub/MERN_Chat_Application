// here we gonna build the db schema for the message we send and recive

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema)

export default Message ;