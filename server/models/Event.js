import mongoose from "mongoose";
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
  },
  guidelines: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  venue: {
    type: String,
  },
  interested: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  going: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const Event = mongoose.model("Event", eventSchema);

export default Event;
