import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

/**
 * Gets all todos.
 */
export const getTodos: RequestHandler = (req, res, next) => {
  if (TODOS.length) {
    res.status(201).json({ todos: TODOS });
  } else {
    res.status(404).json({ message: "No Todos exist!" });
  }
};

/**
 * Creates a new todo.
 * @param req Should include a text string
 * @param res
 * @param next
 */
export const createTodo: RequestHandler = (req, res, next) => {
  const text: string = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

/**
 * Updates a new todo while retaining its ID.
 * @param req Should include text and an ID as a parameter.
 * @param res
 * @param next
 */
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId: string = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

/**
 *  Deletes a todo.
 * @param req Should include an id as a parameter.
 * @param res
 * @param next
 */
export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId: string = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo Deleted!" });
};
