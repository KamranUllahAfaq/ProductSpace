import mongoose from "mongoose";
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  discussion: {
    type: Schema.Types.ObjectId,
    ref: "Discussion",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: { type: Number },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  type: {
    type: String,
    enum: ["product", "discussion"],
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
