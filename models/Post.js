/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: true,
    },
    createdAtPost: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {};
module.exports = mongoose.model("Post", postSchema);
