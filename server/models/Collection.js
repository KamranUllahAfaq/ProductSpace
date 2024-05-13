import mongoose from "mongoose";
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  tagline: {
    type: String,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
