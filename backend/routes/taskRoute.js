import express from "express";
import Task from "../models/taskModel.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { task } = req.body;

  let newTask = new Task({ task: task, status: false, user: req.user._id });
  console.log(newTask);
  try {
    const saved = await newTask.save();
    console.log("this is saved", saved);
    if (saved) {
      res.status(200).json({
        task: saved,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) {
      task.status = req.body.status;
    }
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json("server error");
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(400).json("Error");
  }
});

export default router;
