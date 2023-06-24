const express = require("express");
const priorityRoutes = express.Router();
const taskData = require("../tasks.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

priorityRoutes.use(bodyParser.urlencoded({ extended: false }));
priorityRoutes.use(bodyParser.json());

priorityRoutes.get("/:level", (req, res) => {
  const priorityLevel = req.params.level;
  const filteredTasks = taskData.filter(
    (task) => task.priority_level == priorityLevel
  );
  res.status(200).send(filteredTasks);
});

priorityRoutes.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const { priority_level } = req.body;
  const updatedTasks = taskData.map((task, idx) => {
    if (task.id == taskId) {
      return { ...task, priority_level };
    }
    return task;
  });
  const writePath = path.join(__dirname, "..", "tasks.json");
  console.log(writePath, updatedTasks);
  fs.writeFileSync(writePath, JSON.stringify(updatedTasks), {
    encoding: "utf-8",
    flag: "w",
  });
  res.status(200).send("priority has been updated successfully");
});

module.exports = priorityRoutes;