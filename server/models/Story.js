import mongoose from "mongoose";
var Schema = mongoose.Schema;

var storySchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  type: {
    type: String,
  },
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
const Story = mongoose.model("Story", storySchema);

export default Story;
