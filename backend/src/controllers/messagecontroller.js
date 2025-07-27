import Message from "../models/messagemodel.js";
import User from "../models/user.js";
import { Conversation } from "../models/conversationmodel.js"; // Adjust path if needed
import { getReceiverSocketId,io } from "../../socket/socket.js";

export const sendMessage = async (req, res) => {
  const { content } = req.body;
  const senderId = req.user.userId;
  const receiverId = req.params.id;

  if (!content) {
    return res.status(400).json({ message: "Message content is required" });
  }

  try {
    // ✅ 1. Create the message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message: content,
    });

    // ✅ 2. Check if a conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // ✅ 3. If not, create a new conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      // ✅ 4. Add message to existing conversation
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getMessages = async (req, res) => {
  const currentUserId = req.user.userId; // from auth middleware
  const otherUserId = req.params.id;     // ID of the user you're chatting with

  try {
    // Step 1: Find conversation that includes both users
    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, otherUserId] }
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } } // sort messages by time
    });

    // Step 2: If no conversation exists yet
    if (!conversation) {
      return res.status(200).json([]); // No messages yet
    }

    // Step 3: Return populated messages
    res.status(200).json(conversation.messages);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
