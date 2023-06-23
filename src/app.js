const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const taskInfo = require("./routes/taskInfo.js");
const path = require('path');

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3001;

routes.get("/", (req, res) => {
  res.status(200).send("Welcome to airtribe");
});

routes.use("/tasks", taskInfo);

routes.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,'..','/public/error.html'));
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log("Server is successfully started");
  } else {
    console.log(err);
  }
});
