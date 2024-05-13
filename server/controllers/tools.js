import Product from "../models/Product.js";
import Discussion from "../models/Discussion.js";
import Job from "../models/Job.js";
import Comment from "../models/Comment.js";
import Story from "../models/Story.js";
import Event from "../models/Event.js";
import User from "../models/Users.js";

export const getProductStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("upvotes")
      .populate("ambassadors");
    const storiesCount = await Story.find({ product: id }).countDocuments();
    const discussionCount = await Discussion.find({
      product: id,
    }).countDocuments();
    const commentsCount = await Comment.find({ product: id }).countDocuments();
    const eventsCount = await Event.find({ product: id }).countDocuments();

    let result = {
      upvotes: product.upvotes.length,
      comments: commentsCount,
      disscussions: discussionCount,
      events: eventsCount,
      stories: storiesCount,
      followedBy: product.upvotes,
      ambassadors: product.ambassadors,
      product: product,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAmbassadorStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventsCount = await Event.find({ createdBy: id });
    const commentsCount = await Comment.find({ user: id }).countDocuments();
    const discussionCount = await Discussion.find({
      createdBy: id,
    }).countDocuments();
    const storiesCount = await Story.find({
      createdBy: id,
    }).countDocuments();
    const user = await User.findById(id);

    let result = {
      eventsCreated: eventsCount,
      totalComments: commentsCount,
      disscussionsCreated: discussionCount,
      stories: storiesCount,
      totalFollowers: user.followers,
      user: user,
    };
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const fetchEventStats = async (req, res, next) => {
  try {
    // Find the event by its ID
    const event = await Event.findById(req.params.id).populate("going").exec();

    if (!event) {
      throw new Error("Event not found");
    }

    // Count users with different genders
    const count = {
      Male: 0,
      Female: 0,
      Other: 0,
    };

    event.going.forEach((user) => {
      if (user.gender === "Male") {
        count.Male++;
      } else if (user.gender === "Female") {
        count.Female++;
      } else {
        count.Other++;
      }
    });

    // Prepare the user count object in the required format
    const userCount = {
      eventId: event._id,
      eventName: event.title,
      going: count,
      guestList: event.going,
      guestCount: event.going.length,
      interestedCount: event.interested.length,
    };

    res.status(200).json(userCount);
  } catch (error) {
    console.error("Error retrieving user gender count:", error);
    res.status(500).json(error);

    throw error;
  }
};
