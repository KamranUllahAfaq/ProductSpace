import Discussion from "../models/Discussion.js";
import Comment from "../models/Comment.js";

import cloudinary from "cloudinary";

export const getDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findById(id).populate("createdBy");
    res.status(200).json(discussion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const addDiscussion = async (req, res, next) => {
  try {
    const newDiscussion = new Discussion({
      title: req.body.title,
      description: req.body.description,
      options: req.body.options,
      createdBy: req.user.id,
      topic: req.body.topic,
      type: req.body.type,
    });
    const savedDiscussion = await newDiscussion.save();

    res.status(200).json({
      message: "Discussion Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// File not Updating
export const updateDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newDiscussion = Discussion.findByIdAndUpdate(id, {
      title: req.body.title,
      description: req.body.description,
      options: req.body.options,
      createdBy: req.user.id,
      topic: req.body.topic,
      type: req.body.type,
    });
    res.status(200).json({ message: "Discussion Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllDiscussions = async (req, res, next) => {
  try {
    const discussions = await Discussion.find().populate("createdBy");
    res.status(200).json(discussions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const likeDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findById(id);

    if (discussion.upvotes.includes(req.body.userId)) {
      var ind = discussion.upvotes.indexOf(req.body.userId);
      discussion.upvotes.splice(ind, 1);
    } else {
      discussion.upvotes.push(req.body.userId);
    }

    const updatedDiscussion = await Discussion.findByIdAndUpdate(id, {
      upvotes: discussion.upvotes,
    });

    res.status(200).json(updatedDiscussion);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      product: id,
      parentComment: req.body.parentComment,
      type: "discussion",
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      product: req.params.id,
      type: "discussion",
    }).populate("user");
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
