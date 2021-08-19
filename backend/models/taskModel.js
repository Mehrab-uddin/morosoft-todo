import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    task: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
