import mongoose from "mongoose";
var Schema = mongoose.Schema;

var topicSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});
const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
