const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { nextTaskId } = require("./sequenceGenerator");

// GET all tasks
router.get("/", (req, res) => {
  Task.find()
    .then(tasks => res.status(200).json({ message: "Tasks fetched successfully", tasks }))
    .catch(error => res.status(500).json({ message: "An error occurred", error }));
});

// GET a single task by _id
router.get("/:id", (req, res) => {
  const taskId = req.params.id;

  Task.findById(taskId)
    .then(task => {
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.status(200).json({ task });
    })
    .catch(error => res.status(500).json({ message: "An error occurred", error }));
});

// POST a new task
router.post("/", (req, res) => {
  const task = new Task({
    id: nextTaskId(),
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    completed: req.body.completed || false
  });

  task.save()
    .then(createdTask => res.status(201).json({ message: "Task added successfully", task: createdTask }))
    .catch(error => res.status(500).json({ message: "An error occurred", error }));
});

// PUT update a task by _id
router.put("/:id", (req, res) => {
  const taskId = req.params.id;

  Task.findById(taskId)
    .then(task => {
      if (!task) return res.status(404).json({ message: "Task not found" });

      task.title = req.body.title;
      task.description = req.body.description;
      task.dueDate = req.body.dueDate;
      task.completed = req.body.completed;

      Task.updateOne({ _id: taskId }, task)
        .then(() => res.status(200).json({ message: "Task updated successfully" }))
        .catch(error => res.status(500).json({ message: "An error occurred", error }));
    })
    .catch(error => res.status(500).json({ message: "An error occurred", error }));
});

// DELETE a task by _id
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;

  Task.findById(taskId)
    .then(task => {
      if (!task) return res.status(404).json({ message: "Task not found" });

      Task.deleteOne({ _id: taskId })
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch(error => res.status(500).json({ message: "An error occurred", error }));
    })
    .catch(error => res.status(500).json({ message: "An error occurred", error }));
});

module.exports = router;
