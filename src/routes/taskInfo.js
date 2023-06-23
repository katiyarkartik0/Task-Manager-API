const express = require("express");
const taskRoutes = express.Router();
const taskData = require("../tasks.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const Validator = require("../helper/validator");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  res.status(200).send(taskData);
});

taskRoutes.post("/", (req, res) => {
  const newTask = req.body;
  console.log(newTask);
  const oldTaskData = taskData;
  const validator = new Validator(newTask, taskData);
  const isValid = validator.isIncomingTaskValid();
  if (isValid.status === true) {
    const newTaskData = [...oldTaskData, newTask];
    const writePath = path.join(__dirname, "..", "tasks.json");
    fs.writeFileSync(writePath, JSON.stringify(newTaskData), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send(isValid.message);
  } else {
    res.status(400).send(isValid.message);
  }
});

taskRoutes.get("/:id", (req, res) => {
  const taskId = req.params.id;
  console.log(taskId);
  const data = taskData.filter((task, idx) => {
    if (task.id == taskId) {
      return true;
    }
    return false;
  });
  res.status(200).send(data);
});

taskRoutes.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const revisedTask = req.body;
  const validator = new Validator(newTask, taskData);
  const isValid = validator.isIncomingTaskValid();
  if (isValid.status === true) {
    const updatedTasks = taskData.map((task, index) => {
      if (task.id == taskId) {
        return revisedTask;
      }
      return task;
    });
    const writePath = path.join(__dirname, "..", "tasks.json");
    console.log(writePath, updatedTasks);
    fs.writeFileSync(writePath, JSON.stringify(updatedTasks), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send(isValid.message);
  } else {
    res.status(400).send(isValid.message);
  }
});

taskRoutes.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTask = taskData.filter((task, idx) => task.id != taskId);
  const writePath = path.join(__dirname, "..", "tasks.json");
  console.log(writePath, updatedTask);
  fs.writeFileSync(writePath, JSON.stringify(updatedTask), {
    encoding: "utf-8",
    flag: "w",
  });
  res.status(200).send("course has been added successfully");
});


module.exports = taskRoutes;
