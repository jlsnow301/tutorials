"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
/**
 * Gets all todos.
 */
const getTodos = (req, res, next) => {
    if (TODOS.length) {
        res.status(201).json({ todos: TODOS });
    }
    else {
        res.status(404).json({ message: "No Todos exist!" });
    }
};
exports.getTodos = getTodos;
/**
 * Creates a new todo.
 * @param req Should include a text string
 * @param res
 * @param next
 */
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};
exports.createTodo = createTodo;
/**
 * Updates a new todo while retaining its ID.
 * @param req Should include text and an ID as a parameter.
 * @param res
 * @param next
 */
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
/**
 *  Deletes a todo.
 * @param req Should include an id as a parameter.
 * @param res
 * @param next
 */
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: "Todo Deleted!" });
};
exports.deleteTodo = deleteTodo;
