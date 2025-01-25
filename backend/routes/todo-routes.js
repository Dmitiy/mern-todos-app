import express from 'express';
import {
  getTodos,
  getTodoById,
  deleteTodoById,
  updateTodoById,
  createTodo,
} from '../controllers/todo-controller.js';

const router = express.Router();

router.get('/todo', getTodos);
router.post('/todo', createTodo);
router.get('/todo/:id', getTodoById);
router.patch('/todo/:id', updateTodoById);
router.delete('/todo/:id', deleteTodoById);

export default router;
