import Topic from "../models/Topic.js";
import data from "../data.js";
export const addTopic = async (req, res, next) => {
  try {
    for (var i = 0; i < data.length; i++) {
      const newTopic = new Topic({
        name: data[i].name,
        description: data[i].description,
        thumbnail: data[i].thumbnail,
      });
      const savedTopic = await newTopic.save();
    }
    res.status(200).json({ message: "Topics Added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllTopics = async (req, res, next) => {
  try {
    const Topics = await Topic.find();
    res.status(200).json(Topics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
