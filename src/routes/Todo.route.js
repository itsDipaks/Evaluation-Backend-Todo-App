const {Router} = require("express");
const {Authenticate} = require("../middleweare/Authenticate");
const {TodoModel} = require("../models/Todo.model");

const TodoRouter = Router();

TodoRouter.post("/addtodo", Authenticate,async (req, res) => {
  const {taskname, status, tag, user_id} = req.body;
  try {
    const addTodo = new TodoModel({
      taskname,
      status,
      tag,
      user_id,
    });
    await addTodo.save();
    res.send({msg: "Todo Added SucessFully"});
  } catch (err) {
    res.send({msg: "Somenthing Wents Wrong Plase Check Feild", err: err});
  }
});


TodoRouter.get("/todos", Authenticate, async (req, res) => {
  const user_id = req.body;
  const GetAllTodos = await TodoModel.find({user_id});
  if (GetAllTodos) {
    res.send(GetAllTodos);
  } else {
    res.send({msg: "Not Found "});
  }
});

TodoRouter.get("/todos/:todo_id", Authenticate, async (req, res) => {
  const user_id = req.body;
  const todo_id = req.params.todo_id;
  const GetSelectdTodo = await TodoModel.find({user_id, _id: todo_id});
  if (GetSelectdTodo) {
    res.send(GetSelectdTodo);
  } else {
    res.send({msg: "Note Found"});
  }
});

TodoRouter.delete("/delete/:todo_id", Authenticate, async (req, res) => {
  const user_id = req.body;
  const todo_id = req.params.todo_id;
  try {
    const deltedTodo = await TodoModel.findOneAndDelete({user_id, todo_id});
    if (deltedTodo) {
      res.send({msg: "Todo Deleted Sucessfully"});
    } else {
      res.send({msg: "Faild To Delete"});
    }
  } catch (err) {
    res.send({msg: "Something Wents Wrong Plase Try Again"});
  }
});

TodoRouter.patch("/edit/:todo_id", Authenticate, async (req, res) => {
  const todo_id = req.params.todo_id;
  const {user_id, data} = req.body;
  try {
    const EditedTodo = await TodoModel.findOneAndUpdate(
      {_id: todo_id, user_id},
      {data}
    );
    if (EditedTodo) {
      res.send({msg: "Todo Edited Sucessfully"});
    } else {
      res.send({msg: "Soething wents Wrong"});
    }
  } catch (err) {
    res.send({msg: "Soething wents Wrong", err: err});
  }
});

module.exports = {TodoRouter};
