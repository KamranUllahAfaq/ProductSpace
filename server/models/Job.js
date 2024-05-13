import mongoose from "mongoose";
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
  },
  companyTagline: {
    type: String,
  },
  description: {
    type: String,
  },
  requirements: {
    type: String,
  },

  categories: [{ type: String }],

  location: {
    type: String,
  },

  link: {
    type: String,
  },

  logo: {
    type: String,
  },

  contactEmail: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Job = mongoose.model("Job", jobSchema);

export default Job;
