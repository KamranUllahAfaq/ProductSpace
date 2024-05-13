import Event from "../models/Event.js";
import cloudinary from "cloudinary";
export const getEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("createdBy");
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const addEvent = async (req, res, next) => {
  try {
    if (req.file) {
      const response1 = cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
      });
      response1
        .then(async (data) => {
          const newEvent = new Event({
            title: req.body.title,
            content: req.body.content,
            startDate: req.body.startDate,
            createdBy: req.user.id,
            endDate: req.body.endDate,
            thumbnail: data.secure_url,
            type: req.body.type,
            venue: req.body.venue,
            product: req.body.product,
            guidelines: req.body.guidelines,
          });
          const savedEvent = await newEvent.save();

          res.status(200).json({
            message: "Event Added Successfully",
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

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("createdBy");
    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const goingInEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (event.going.includes(req.body.userId)) {
      var ind = event.going.indexOf(req.body.userId);
      event.going.splice(ind, 1);
    } else {
      event.going.push(req.body.userId);
    }

    const updatedDEvent = await Event.findByIdAndUpdate(id, {
      going: event.going,
    });

    res.status(200).json(updatedDEvent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const interestedInEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (event.interested.includes(req.body.userId)) {
      var ind = event.interested.indexOf(req.body.userId);
      event.interested.splice(ind, 1);
    } else {
      event.interested.push(req.body.userId);
    }

    const updatedDEvent = await Event.findByIdAndUpdate(id, {
      interested: event.interested,
    });

    res.status(200).json(updatedDEvent);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const Storys = await Event.findByIdAndDelete(req.params.id);
    res.status(200).json(Storys);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyEvents = async (req, res, next) => {
  try {
    const { id } = req.params;
    const story = await Event.find({ createdBy: id }).populate("createdBy");
    res.status(200).json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
