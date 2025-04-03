import type { ITodo } from '../types';

export function findMatches(todos: ITodo[], search: string): ITodo[] | [] {
  if (!Array.isArray(todos)) {
    throw new Error('Expected todos to be an array');
  }

  if (typeof search !== 'string') {
    throw new Error('Expected search to be a string');
  }

  if (todos.length === 0) {
    return [];
  }

  if (search.length === 0) {
    return todos;
  }

  return todos.filter((todo: ITodo) => {
    const regExp = new RegExp(search, 'gi');
    return todo.title.match(regExp);
  });
}
