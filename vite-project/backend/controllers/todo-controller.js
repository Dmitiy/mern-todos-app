import { TodoSchema } from '../models/todo.js';
import { handleError } from '../middleware/handleError.js';

const getTodos = (req, res) => {
  TodoSchema.find()
    .sort({ title: 1 })
    .then((todos) => {
      res.status(200);
      res.json(todos);
    })
    .catch((err) => handleError(res, err));
};

const getTodoById = (req, res) => {
  TodoSchema.findById(req.params.id)
    .then((todo) => {
      res.status(200);
      res.json(todo);
    })
    .catch((err) => handleError(res, err));
};

const deleteTodoById = (req, res) => {
  TodoSchema.findByIdAndDelete(req.params.id)
    .then((todo) => {
      res.status(200);
      res.json(todo);
    })
    .catch((err) => handleError(res, err));
};

const createTodo = (req, res) => {
  const todo = new TodoSchema(req.body);
  todo
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => handleError(res, err));
};

const updateTodoById = (req, res) => {
  TodoSchema.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => handleError(res, err));
};

export { getTodos, getTodoById, deleteTodoById, createTodo, updateTodoById };
