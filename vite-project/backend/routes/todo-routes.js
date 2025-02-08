import express from 'express';

import {
  getTodos,
  getTodoById,
  deleteTodoById,
  updateTodoById,
  createTodo,
} from '../controllers/todo-controller.js';

const router = express.Router();

router.get('/api/v1/todos', getTodos);
router.post('/api/v1/todos', createTodo);
router.get('/api/v1/todos/:id', getTodoById);
router.patch('/api/v1/todos/:id', updateTodoById);
router.delete('/api/v1/todos/:id', deleteTodoById);

export default router;
