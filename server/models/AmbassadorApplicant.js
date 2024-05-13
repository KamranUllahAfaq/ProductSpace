import mongoose from "mongoose";
var Schema = mongoose.Schema;

var applicantSchema = new Schema({
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
  reason: {
    type: String,
  },
  languageLevel: {
    type: String,
  },
  preferredLanguage: {
    type: String,
  },
  websites: {
    type: String,
  },

  isAmbassador: {
    type: String,
  },
  nameOfCommunity: {
    type: String,
  },
  studying: {
    type: String,
  },
  cv: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
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
const AmbassadorApplicant = mongoose.model(
  "AmbassadorApplicant",
  applicantSchema
);

export default AmbassadorApplicant;
