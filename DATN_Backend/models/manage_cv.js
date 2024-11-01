import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const cvSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    job_title: {
      type: String,
    },
    post_id: {
      type: ObjectId,
      ref: "Post",
    },
    cv: {
      type: String,
    },
    isNew: {
      type: Boolean,
    },
    applied_status: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cv", cvSchema);
