import Button from '@/ui/button';
import Checkbox from '@/ui/checkbox';
import Container from '@/ui/container';
import Input from '@/ui/input';
import SelectAllCheckbox from '@/ui/selectAllCheckbox';
import TotalCounter from '@/ui/totalCounter';
import { arrayFromProp } from '@shared/utils/arrayFromProp';
import { findMatches } from '@shared/utils/findMatches';
import React, { Suspense, useDeferredValue, useEffect, useState } from 'react';
import styles from './todos.module.css';
import type { ITodo, TodosProps } from './types';

function Todos({ data }: TodosProps) {
  const [search, setSearch] = useState('');
  const deferredQuery = useDeferredValue(search);
  const [todos, setTodos] = useState<ITodo[]>(data);

  const [totalChecked, setTotalChecked] = useState(
    arrayFromProp(todos, 'completed').filter(Boolean).length
  );

  const [checkedState, setCheckedState] = useState<boolean[]>(
    arrayFromProp(todos, 'completed').map(Boolean)
  );

  const [newTodo, setNewTodo] = useState('');

  const [editTodo, setEditTodo] = useState({
    completed: false,
    title: '',
    _id: '',
  });
  const [isEditTodo, setIsEditTodo] = useState(false);

  useEffect(() => {
    const filteredTodos = findMatches(data, 'title', search);
    const completedList = arrayFromProp(filteredTodos, 'completed');

    setTodos(filteredTodos);
    setCheckedState(completedList.map(Boolean));
    setTotalChecked(completedList.filter(Boolean).length);
  }, [search]);

  const onToggleTodo = (position: number) => {
    const updatedTodos = todos.map((todo: ITodo, index: number) =>
      index === position ? { ...todo, completed: !todo.completed } : todo
    );

    const completedList = arrayFromProp(updatedTodos, 'completed');

    setTodos(updatedTodos);
    setCheckedState(completedList.map(Boolean));
    setTotalChecked(completedList.filter(Boolean).length);
  };

  const onSelectAll = (isAll: boolean) => {
    setTodos(todos.map((todo: ITodo) => ({ ...todo, completed: isAll })));
    setCheckedState(new Array(todos.length).fill(isAll).map(Boolean));
    setTotalChecked(isAll ? todos.length : 0);
  };

  const onRemoveTodo = (idx: number, _id: string) => () => {
    const updatedTodos = todos.filter(
      (_: ITodo, index: number) => index !== idx
    );

    const completedList = arrayFromProp(updatedTodos, 'completed');

    setTodos(updatedTodos);
    setCheckedState(completedList);
    setTotalChecked(completedList.filter(Boolean).length);
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setNewTodo(value);
  };

  const onAddNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    setTodos(
      todos.concat([
        { completed: false, title: newTodo, _id: window.crypto.randomUUID() },
      ])
    );
    setNewTodo('');
  };

  const onEditTodo = (e: React.MouseEvent<HTMLButtonElement>, todo: ITodo) => {
    setEditTodo(todo);
    setIsEditTodo(true);
  };

  const onEditTodoHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    e.preventDefault();
    const value = e.target.value;
    setTodos(
      todos.map((todo: ITodo, index: number) =>
        index === idx ? { ...todo, title: value } : todo
      )
    );
  };

  const onSaveEditTodo = () => {
    setIsEditTodo(false);
  };

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className={`${styles.todosContainer}`}>
      <TotalCounter
        text={`Choose your interests ${totalChecked}/${todos.length}`}
      />
      <Container className={styles.searchContainer}>
        <Input
          type='search'
          name='search'
          placeholder='Search todo ...'
          value={deferredQuery}
          onChange={(e) => onSearchHandler(e)}
        />
      </Container>
      <Container className={styles.addTodoContainer}>
        <Input
          type='text'
          name='addTodo'
          value={newTodo}
          placeholder='Add new todo ...'
          onChange={(e) => onInputHandler(e)}
        />
        <Button primary onClick={(e) => onAddNewTodo(e)}>
          New todo
        </Button>
      </Container>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <ul className={styles.todoList}>
          {todos.map((todo: ITodo, index: number) => {
            const isEditItemTodo = isEditTodo && editTodo._id === todo._id;
            return isEditItemTodo ? (
              <li
                key={todo._id}
                className={
                  isEditItemTodo ? styles.editTodoItem : styles.todoItem
                }>
                <Checkbox
                  name={todo._id}
                  value={todo._id}
                  checked={checkedState[index]}
                  onChange={() => onToggleTodo(index)}
                />
                <Input
                  type='text'
                  name={todo._id}
                  value={todo.title}
                  placeholder={todo.title}
                  onChange={(e) => {
                    onEditTodoHandler(e, index);
                  }}
                />
                <Button onClick={onSaveEditTodo}>Save todo</Button>
              </li>
            ) : (
              <li key={todo._id} className={styles.todoItem}>
                <Checkbox
                  label={todo.title}
                  name={todo._id}
                  value={todo._id}
                  checked={checkedState[index]}
                  onChange={() => onToggleTodo(index)}
                />
                <Button
                  onClick={(e) => {
                    onEditTodo(e, todo);
                  }}>
                  &#9998;
                </Button>
                <Button onClick={onRemoveTodo(index, todo._id)}>&times;</Button>
              </li>
            );
          })}
        </ul>
        {todos.length > 0 && (
          <div className={`${styles.selectAll}`}>
            <SelectAllCheckbox
              name='Select all'
              label='Select all'
              totalItems={todos.length}
              totalChecked={totalChecked}
              onSelectAll={onSelectAll}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}

export default Todos;
