import mongoose from "mongoose";
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    default: "Male",
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  image: {
    type: String,
    default: "",
  },
  username: {
    type: String,
  },
  headline: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
  },
  job: {
    type: String,
    default: "",
  },
  company: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },

  googleId: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  streak: { type: Number },
  lastLogin: {
    type: Date,
  },
  dateJoined: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
