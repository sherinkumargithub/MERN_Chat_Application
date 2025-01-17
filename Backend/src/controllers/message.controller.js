import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudnary from "../lib/cloudnary.js";


// basically this function helps to show case the existing user profile in our sidebar menu when we loged in 
export const getUserForSidebar = async (req, res) =>{
    try {
        // this below operation was done to display all the user id profile in sidebar except our own, no need of password
        const loggedInUserId = req.user._id;
        // $ne -- this is mongodb operator represend that not equal
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

//this to get message we texted before in a induvidual profile
export const getMessages = async (req,res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id;
        const messages = await Message.find({
        $or: [
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: myId}
           ] 
          })    

          res.status(200).json(messages)
        } catch (error) {
            console.error("Error in getMessages controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
}

//to send image or text message to reciever
export const sendMessage = async (req,res) => {
    // the message could be either text or image
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
        

        let imageUrl;
        if(image) {
            // upload image to cloudingary
            const uploadResponse = await cloudnary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;

        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        // realtime functionallity goes here --> socket.io
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}