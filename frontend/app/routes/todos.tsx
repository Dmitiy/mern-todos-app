import { useCallback, useEffect, useRef, useState } from 'react';
import type { Route } from './+types/todos';

import todosStyles from '@styles/todos-page.module.css';
import type { ITodo } from '@Types/todos-page/todos.ts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Todos' },
    { name: 'description', content: 'Welcome to Todos page!' },
  ];
}

export async function clientLoader() {
  const res = await fetch(`/api/v1/todos`);
  const data = await res.json();
  return data;
}

clientLoader.hydrate = true as const;

// list of completed ==> [false,false,true,false,true]
function arrayFromCompleted(arr: ITodo[]): boolean[] {
  return Array.from(arr, (x) => x.completed);
}

function Todos({ loaderData }: Route.ComponentProps) {
  const [todos, setTodos] = useState(loaderData);
  const [totalChecked, setTotalChecked] = useState(
    arrayFromCompleted(todos).filter(Boolean).length
  );
  const [isCheckedAll, setIsCheckedAll] = useState(
    arrayFromCompleted(todos).filter(Boolean).length === todos.length
  );
  const [checkedState, setCheckedState] = useState(arrayFromCompleted(todos));

  const indeterminateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateIndeterminateState();
  }, [totalChecked, todos.length]);

  const updateIndeterminateState = () => {
    // TypeError: Cannot set propertes of null (setting 'indeterminate')
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

  return (
    <div className={todosStyles.todosPage}>
      <form action=''>
        <fieldset>
          <legend>
            Choose your interests {totalChecked}/{todos.length}
          </legend>
          <ul>
            {todos.map(({ _id, title }: ITodo, index: number) => {
              return (
                <li key={_id}>
                  <label>
                    <input
                      type='checkbox'
                      name={_id}
                      value={_id}
                      checked={checkedState[index]}
                      onChange={() => onToggleTodo(index)}
                    />
                    <span>{title}</span>
                  </label>
                  <span onClick={onRemoveTodo(index, _id)}>&times;</span>
                </li>
              );
            })}
          </ul>
          {todos.length > 0 && (
            <div>
              <label onClick={onSelectAll}>
                <input
                  ref={indeterminateRef}
                  className='select-all'
                  type='checkbox'
                  name='Select all'
                />
                <span>Select all</span>
              </label>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default Todos;
