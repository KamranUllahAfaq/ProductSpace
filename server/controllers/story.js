import Story from "../models/Story.js";
import cloudinary from "cloudinary";

export const getStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id).populate("createdBy");
    res.status(200).json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyStories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await Story.find({ createdBy: id }).populate("createdBy");
    res.status(200).json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const addStory = async (req, res, next) => {
  try {
    if (req.file) {
      const response1 = cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
      });
      response1
        .then(async (data) => {
          const newStory = new Story({
            content: req.body.content,
            description: req.body.description,
            type: req.body.type,
            thumbnail: data.secure_url,
            createdBy: req.user.id,
            product: req.body.product,
          });
          const savedStory = await newStory.save();

          res.status(200).json({
            message: "Story Added Successfully",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllStories = async (req, res, next) => {
  try {
    const Storys = await Story.find().populate("createdBy");
    res.status(200).json(Storys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const Storys = await Story.findByIdAndDelete(req.params.id);
    res.status(200).json(Storys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
