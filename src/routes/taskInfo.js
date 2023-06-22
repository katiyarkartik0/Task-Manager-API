const express = require('express');
const taskRoutes = express.Router();
const taskData = require('../tasks.json');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

taskRoutes.use(bodyParser.urlencoded({extended:false}));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/",(req,res)=>{
    res.status(200).send(taskData);
})

taskRoutes.post("/",(req,res)=>{
    const newTask = req.body;
    console.log(newTask)
    const oldTaskData = taskData;
    const newTaskData = [...oldTaskData,newTask];
    const writePath = path.join(__dirname,'..','tasks.json');
    console.log(writePath,newTaskData);
    fs.writeFileSync(writePath,JSON.stringify(newTaskData),{encoding:'utf-8',flag:'w'})
    res.status(200).send("course has been added successfully");
})

taskRoutes.get("/:id",(req,res)=>{
    const taskId = req.params.id;
    console.log(taskId);
    const data = taskData.filter((task,idx)=>{
        if(task.id==taskId){
            return true;
        }
        return false;
    })
    res.status(200).send(data);
})

module.exports = taskRoutes;