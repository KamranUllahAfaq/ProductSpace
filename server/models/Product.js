import mongoose from "mongoose";
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  tagline: {
    type: String,
  },
  status: {
    type: String,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  topics: [
    {
      type: String,
    },
  ],
  thumbnail: {
    type: String,
  },
  youtubeLink: {
    type: String,
  },
  gallery: [
    {
      type: String,
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  makers: { type: [Schema.Types.ObjectId], ref: "User" },
  role: {
    type: String,
    enum: ["Maker", "Hunter"],
    default: "Maker",
  },
  ambassadorProgram: { type: Boolean, default: false },
  pricing: {
    type: String,
    enum: ["Free", "Paid", "Paid with Free Trial"],
    default: "Free",
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ambassadors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  UpdatedOn: {
    type: Date,
    default: () => Date.now(),
  },
});
const Product = mongoose.model("Product", productSchema);

export default Product;
