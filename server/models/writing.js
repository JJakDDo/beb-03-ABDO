import mongoose from "mongoose";

const writingSchema = mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  writer: mongoose.ObjectId,
  comments: [{ userId: mongoose.ObjectId, comment: String }],
  likes: [mongoose.ObjectId],
});

const Writing = mongoose.model("Writing", writingSchema);

export default Writing;
