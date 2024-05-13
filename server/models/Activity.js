import mongoose from "mongoose";
var Schema = mongoose.Schema;

var activitySchema = new Schema({
  text: {
    type: String,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
