import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const todoSchema = new Schema({
  _id: ObjectId,
  id: Number,
  userId: Number,
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const TodoSchema = mongoose.model('Todo', todoSchema);
