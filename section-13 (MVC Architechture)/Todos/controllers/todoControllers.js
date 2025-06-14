import { ObjectId } from "mongodb";
import Todo from "../models/todoModel.js";

export const addTodo = async (req, res) => {
  const todo = req.body;
  try {
    await Todo.insertOne(todo);
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("index", { todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todos = await Todo.findById(req.params.id);
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  try {
    await Todo.findByIdAndUpdate(id, updatedTodo);
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
