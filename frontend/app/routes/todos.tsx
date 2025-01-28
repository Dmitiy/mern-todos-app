import { useCallback, useEffect, useRef, useState } from 'react';
import type { Route } from './+types/todos';

import todosStyles from '~/assets/styles/todos-page.module.css';
import type { ITodo } from '~/types/todos-page/todos';

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

function arrayFromCompleted(arr: ITodo[]) {
  return Array.from(arr, (x) => x.completed);
}

function Todos({ loaderData }: Route.ComponentProps) {
  const [todos, setTodos] = useState(loaderData);
  const [totalChecked, setTotalChecked] = useState(loaderData.length);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [checkedState, setCheckedState] = useState(
    arrayFromCompleted(loaderData)
  );

  const indeterminateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    indeterminateRef.current!.indeterminate =
      !isCheckedAll && checkedState.some(Boolean);
  }, [isCheckedAll, checkedState.some(Boolean)]);

  useEffect(() => {
    setTotalChecked(arrayFromCompleted(todos).filter(Boolean).length);
  }, [todos.length]);

  const onToggleHandler = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    if (
      todos.length !== updatedCheckedState.filter(Boolean).length ||
      updatedCheckedState.length === 0
    ) {
      setIsCheckedAll(false);
    } else {
      setIsCheckedAll(true);
    }

    setTotalChecked(updatedCheckedState.filter(Boolean).length);
    setCheckedState(updatedCheckedState);
  };

  const onSelectAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(!isCheckedAll);
    setCheckedState(new Array(todos.length).fill(!isCheckedAll));
    setTotalChecked(!isCheckedAll ? todos.length : 0);
  };

  const onRemoveHandler = useCallback(
    (idx: number, _id: string) => () => {
      const updatedTodos = todos.filter(
        (_: ITodo, index: number) => index !== idx
      );
      setCheckedState(updatedTodos);
      setTotalChecked(updatedTodos.length);
    },
    [todos.length]
  );

  return (
    <div className={`${todosStyles.todosPage}`}>
      <form action=''>
        <fieldset>
          <legend>
            Choose your interests {totalChecked}/{todos.length}
          </legend>
          <ul>
            {todos.map(({ _id, title, completed }: any, index: number) => {
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
        </fieldset>
      </form>
    </div>
  );
}

export default Todos;
