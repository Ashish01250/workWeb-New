import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

// Create a new conversation
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

// Update conversation read status
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set:{
           readBySeller: req.isSeller,
           readByBuyer: !req.isSeller,
      },
    },
      { new: true }
    );

    if (!updatedConversation)
      return next(createError(404, "Conversation not found"));

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

// Get a single conversation
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Conversation not found"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

// Get all conversations for a user
export const getConversations = async (req, res, next) => {
  try {
    const query = req.isSeller
      ? { sellerId: req.userId }
      : { buyerId: req.userId };

    console.log("Query:", query); // Debugging
    const conversations = await Conversation.find(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
