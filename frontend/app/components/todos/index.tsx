import React, { useEffect, useRef, useState } from 'react';
import SelectAllCheckbox from '@/ui/selectAllCheckbox';
import type { ITodo, TodosProps } from './types';
import Button from '@/ui/button';
import styles from './todos.module.css';
import Checkbox from '@/ui/checkbox';
import Switch from '@/ui/switch';
import { arrayFromProp } from './utils/arrayFromProp';
import Input from '@/ui/input';

function Todos({ data }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>(data);
  const [totalChecked, setTotalChecked] = useState(
    arrayFromProp(todos, 'completed').filter(Boolean).length
  );
  const [isCheckedAll, setIsCheckedAll] = useState(
    arrayFromProp(todos, 'completed').filter(Boolean).length === todos.length
  );
  const [checkedState, setCheckedState] = useState<boolean[]>(
    arrayFromProp(todos, 'completed').map(Boolean)
  );

  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState({});
  const [isEditTodo, setIsEditTodo] = useState(false);

  const indeterminateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateIndeterminateState();
  }, [totalChecked, todos.length]);

  const updateIndeterminateState = () => {
    if (!indeterminateRef.current) {
      return;
    }

    if (totalChecked === 0) {
      indeterminateRef.current!.checked = false;
      indeterminateRef.current!.indeterminate = false;
      setIsCheckedAll(false);
    } else if (totalChecked === todos.length) {
      indeterminateRef.current!.checked = true;
      indeterminateRef.current!.indeterminate = false;
      setIsCheckedAll(true);
    } else {
      indeterminateRef.current!.checked = false;
      indeterminateRef.current!.indeterminate = true;
      setIsCheckedAll(false);
    }
  };

  const onToggleTodo = (position: number) => {
    const updatedTodos = todos.map((todo: ITodo, index: number) =>
      index === position ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    setCheckedState(arrayFromProp(updatedTodos, 'completed').map(Boolean));
    setTotalChecked(
      arrayFromProp(updatedTodos, 'completed').filter(Boolean).length
    );
  };

  const onSelectAll = () => {
    setTodos(
      todos.map((todo: ITodo) => ({ ...todo, completed: !isCheckedAll }))
    );
    setCheckedState(new Array(todos.length).fill(!isCheckedAll).map(Boolean));
    setTotalChecked(!isCheckedAll ? todos.length : 0);
    updateIndeterminateState();
  };

  const onRemoveTodo = (idx: number, _id: string) => () => {
    const updatedTodos = todos.filter(
      (_: ITodo, index: number) => index !== idx
    );

    setTodos(updatedTodos);
    setCheckedState(arrayFromProp(updatedTodos, 'completed'));
    setTotalChecked(
      arrayFromProp(updatedTodos, 'completed').filter(Boolean).length
    );
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.trim();

    setNewTodo(value);
  };

  const onAddNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    setTodos(
      todos.concat([
        { completed: false, title: newTodo, _id: Date.now().toString() },
      ])
    );
    setNewTodo('');
  };

  const onEditTodo = (todo: ITodo, idx: any) => {
    console.log('idx', todo, idx);
  };
  return (
    <form action=''>
      <fieldset>
        <legend>
          Choose your interests {totalChecked}/{todos.length}
        </legend>
        <div>
          <label>
            <Input
              type='text'
              name='addTodo'
              value={newTodo}
              onChange={(e) => onInputHandler(e)}
            />
          </label>
          <Button primary onClick={(e) => onAddNewTodo(e)}>
            New todo
          </Button>
        </div>
        <ul className={`${styles.todoList}`}>
          {todos.map((todo: ITodo, index: number) => {
            return (
              <li key={todo._id} className={`${styles.todoItem}`}>
                <label>
                  <Checkbox
                    name={todo._id}
                    value={todo._id}
                    checked={checkedState[index]}
                    onChange={() => onToggleTodo(index)}
                  />
                  <span>{todo.title}</span>
                </label>
                <Button
                  onClick={() => {
                    onEditTodo(todo, index);
                  }}>
                  ✏️
                </Button>
                <Button onClick={onRemoveTodo(index, todo._id)}>❌</Button>
              </li>
            );
          })}
        </ul>
        {todos.length > 0 && (
          <div className={`${styles.selectAll}`}>
            <label onClick={onSelectAll}>
              <SelectAllCheckbox
                name='Select all'
                ref={indeterminateRef}
                className='selectAllCheckbox'
              />
              <span>Select All</span>
            </label>
          </div>
        )}
      </fieldset>
    </form>
  );
}

export default Todos;
