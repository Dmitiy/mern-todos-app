import React, { useEffect, useRef, useState } from 'react';
import SelectAllCheckbox from '@/ui/selectAllCheckbox';
import type { ITodo, TodosProps } from './types';
import Button from '@/ui/button';
import styles from './todos.module.css';

function arrayFromCompleted(arr: ITodo[]): boolean[] {
  return Array.from(arr, (x) => x.completed);
}

function Todos({ data }: TodosProps) {
  const [todos, setTodos] = useState<ITodo[]>(data);
  const [totalChecked, setTotalChecked] = useState(
    arrayFromCompleted(todos).filter(Boolean).length
  );
  const [isCheckedAll, setIsCheckedAll] = useState(
    arrayFromCompleted(todos).filter(Boolean).length === todos.length
  );
  const [checkedState, setCheckedState] = useState(arrayFromCompleted(todos));

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
    setCheckedState(arrayFromCompleted(updatedTodos));
    setTotalChecked(arrayFromCompleted(updatedTodos).filter(Boolean).length);
  };

  const onSelectAll = () => {
    setTodos(
      todos.map((todo: ITodo) => ({ ...todo, completed: !isCheckedAll }))
    );
    setCheckedState(new Array(todos.length).fill(!isCheckedAll));
    setTotalChecked(!isCheckedAll ? todos.length : 0);
    updateIndeterminateState();
  };

  const onRemoveTodo = (idx: number, _id: string) => () => {
    const updatedTodos = todos.filter(
      (_: ITodo, index: number) => index !== idx
    );

    setTodos(updatedTodos);
    setCheckedState(arrayFromCompleted(updatedTodos));
    setTotalChecked(arrayFromCompleted(updatedTodos).filter(Boolean).length);
  };

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

  const onAddNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
            <input
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
                  <input
                    type='checkbox'
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
            <SelectAllCheckbox
              ref={indeterminateRef}
              label='Select All'
              onSelectAll={onSelectAll}
            />
          </div>
        )}
      </fieldset>
    </form>
  );
}

export default Todos;
