import mongoose from "mongoose";
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  commute: {
    type: String,
  },
  companyName: {
    type: String,
  },

  responsibilities: {
    type: String,
  },

  studying: {
    type: String,
  },
  cv: {
    type: String,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
  status: {
    type: String,
    enum: ["Applied", "Selected", "Rejected"],
    default: "Applied",
  },
  appliedOn: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  appliedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
