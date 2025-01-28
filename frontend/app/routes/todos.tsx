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
    arrayFromCompleted(loaderData).filter(Boolean).length
  );
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [checkedState, setCheckedState] = useState(
    arrayFromCompleted(loaderData)
  );

  const indeterminateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 🧨 DEBUG
    // TypeError: Cannot set properties of null (setting 'indeterminate')
    indeterminateRef.current!.indeterminate =
      todos.length && !isCheckedAll && checkedState.some(Boolean);
  }, [isCheckedAll, checkedState.some(Boolean)]);

  // useEffect(() => {
  //   setTotalChecked(arrayFromCompleted(todos).filter(Boolean).length);
  // }, [todos.length]);

  const onToggleHandler = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setTotalChecked(updatedCheckedState.filter(Boolean).length);

    // 🧨 DEBUG: This is not working as expected.

    // Example: 1.
    // if (checkedState.filter(Boolean).length === 0) {
    //   setIsCheckedAll(false);
    //   indeterminateRef.current!.indeterminate = false;
    // } else if (totalChecked === todos.length) {
    //   setIsCheckedAll(true);
    //   indeterminateRef.current!.indeterminate = false;
    // } else {
    //   setIsCheckedAll(false);
    //   indeterminateRef.current!.indeterminate = false;
    // }

    // Example: 2.
    // if (
    //   todos.length !== updatedCheckedState.filter(Boolean).length ||
    //   updatedCheckedState.length === 0 ||
    //   todos.length === 0
    // ) {
    //   setIsCheckedAll(false);
    // } else {
    //   setIsCheckedAll(true);
    // }

    // Example: 3.
    debugger;
    if (totalChecked === 0) {
      setIsCheckedAll(false);
      indeterminateRef.current!.indeterminate = false;
    } else if (totalChecked === todos.length) {
      setIsCheckedAll(true);
      indeterminateRef.current!.indeterminate = false;
    } else {
      setIsCheckedAll(false);
      indeterminateRef.current!.indeterminate = true;
    }

    // setTotalChecked(updatedCheckedState.filter(Boolean).length);
    setCheckedState(updatedCheckedState);
    setTodos(
      updatedCheckedState.map((completed, index) => ({
        ...todos[index],
        completed,
      }))
    );
  };

  const onSelectAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(!isCheckedAll);
    setCheckedState(new Array(todos.length).fill(!isCheckedAll));
    setTotalChecked(!isCheckedAll ? todos.length : 0);
    setTodos(
      todos.map((todo: ITodo) => ({ ...todo, completed: !isCheckedAll }))
    );
  };

  const onRemoveHandler = (idx: number, _id: string) => () => {
    const updatedTodos = todos.filter(
      (_: ITodo, index: number) => index !== idx
    );
    setCheckedState(arrayFromCompleted(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <div className={todosStyles.todosPage}>
      <form action=''>
        <fieldset>
          <legend>
            Choose your interests {totalChecked}/{todos.length}
          </legend>
          <ul>
            {todos.map(({ _id, title, completed }: ITodo, index: number) => {
              return (
                <li key={_id}>
                  <label>
                    <input
                      type='checkbox'
                      name={_id}
                      value={_id}
                      checked={checkedState[index]}
                      onChange={() => onToggleHandler(index)}
                    />
                    <span>{title}</span>
                  </label>
                  ---
                  {completed.toString()}
                  <span onClick={onRemoveHandler(index, _id)}>&times;</span>
                </li>
              );
            })}
          </ul>
          {todos.length > 0 && (
            <div>
              <label>
                <input
                  ref={indeterminateRef}
                  className='select-all'
                  type='checkbox'
                  name='Select all'
                  value='Select all'
                  checked={isCheckedAll}
                  onChange={(e) => onSelectAllHandler(e)}
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
