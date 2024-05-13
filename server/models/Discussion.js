import mongoose from "mongoose";
var Schema = mongoose.Schema;

var discussionSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  topic: {
    type: String,
  },
  options: {
    type: [String],
  },
  type: {
    type: String,
    enum: ["discussion", "poll"],
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;
