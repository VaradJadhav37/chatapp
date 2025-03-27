const User=require('../models/usermodel.js');
const Message=require('../models/message.js');


const getUsersForSidebar=async (req,res)=>{
    try{
        const loggedInUserId=await req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}.select("-password"));
        res.status(200).json(filteredUsers);
    }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Internal Server Error"});
        }
        
    }
const getMessages=async (req,res)=>{
    try{
        const {id:userToChatId}=req.params
        const senderId=req.user._id;
        const messages=await Message.find({$or:[{senderId:senderId,receiverId:userToChatId},{senderId:userToChatId,receiverId:senderId}]});
        res.status(200).json(messages);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
    }
const sendMessages=async(req, res) => {
    try{
        const{text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({text,image:imageUrl,senderId,receiverId});
        await newMessage.save();
        res.status(201).json(newMessage);

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports = { getUsersForSidebar, getMessages, sendMessages};