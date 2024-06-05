import express from "express";
import mongoose from "mongoose";
import TodoModel from "./model/todo.js";
import cors from 'cors';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL).then(() =>{console.log("Connected sucessfully")}).catch((err) => {console.log(`Error: ${err}`);});

// CRUD OPERATIONS
// CREATE


app.post("/addTask", (req, res) => {
  const task = req.body.task;
  const date = req.body.date;
  TodoModel.create({ task: task, dueDate: date})
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      console.log(err);
    });
});


// READ
app.get("/allTask", (req, res) => { 
  console.log('called get all tasks'); 
  TodoModel.find().then((task) => {
    // console.log(task)
    res.json(task);
  });
});


// UPDATE
// app.get('/update/:id/:task',(req,res)=>{
//     const {id,task} = req.params;
//     TodoModel.findByIdAndUpdate(id,{task :task})
//     .then((task)=>{
//         res.status(200).send('task updated sucess fully');
//     })
//     .catch((err)=>{
//         res.send(err);
//     })
// })

//DELETE
app.delete('/delete/:id',(req,res)=>{
  console.log('Delete request reached');
    const {id} = req.params;
    TodoModel.findByIdAndDelete(id)
    .then((deletedTask)=>{
        res.send(`Task deleted`);
    })
    .catch((err)=>{
        res.json(err);
    })
});

app.put('/update/:id', (req,res)=>{
  console.log('update req reached');
  const {id} = req.params;
  const {task} = req.body;
  console.log(req.body);
  TodoModel.findByIdAndUpdate(id, {$set: {task: task}})
  .then(res => {console.log(`updated res: ${res}`);})
  .catch(err => {console.log(`updated err: ${err}`);})

});

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});

