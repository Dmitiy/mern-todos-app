import Button from '@/ui/button';
import Checkbox from '@/ui/checkbox';
import Container from '@/ui/container';
import Input from '@/ui/input';
import SelectAllCheckbox from '@/ui/selectAllCheckbox';
import React, {
  Suspense,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './todos.module.css';
import type { ITodo, TodosProps } from './types';
import { arrayFromProp } from './utils/arrayFromProp';
import { findMatches } from './utils/findMatches';

function Todos({ data }: TodosProps) {
  const [search, setSearch] = useState('');
  const deferredQuery = useDeferredValue(search);
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

  useEffect(() => {
    const filteredTodos = findMatches(data, search);
    const completedList = arrayFromProp(filteredTodos, 'completed');

    setTodos(filteredTodos);
    setCheckedState(completedList.map(Boolean));
    setTotalChecked(completedList.filter(Boolean).length);
    setIsCheckedAll(
      completedList.filter(Boolean).length === filteredTodos.length
    );
  }, [search]);

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

    const completedList = arrayFromProp(updatedTodos, 'completed');

    setTodos(updatedTodos);
    setCheckedState(completedList.map(Boolean));
    setTotalChecked(completedList.filter(Boolean).length);
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

    const completedList = arrayFromProp(updatedTodos, 'completed');

    setTodos(updatedTodos);
    setCheckedState(completedList);
    setTotalChecked(completedList.filter(Boolean).length);
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
    // e.preventDefault();

    // setTodos(
    //   todos.map((todo: ITodo, index: number) =>
    //     index === idx ? { ...todo, title: newTodo } : todo
    //   )
    // );
    // setNewTodo('');
    // setIsEditTodo(false);
  };

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <form action='' className={`${styles.todosContainer}`}>
      <fieldset>
        <legend>
          Choose your interests {totalChecked}/{todos.length}
        </legend>
        <Container className={styles.searchContainer}>
          <label>
            <Input
              type='search'
              name='search'
              value={deferredQuery}
              placeholder='Search todo ...'
              onChange={(e) => onSearchHandler(e)}
            />
          </label>
        </Container>
        <Container className={styles.addTodoContainer}>
          <label>
            <Input
              type='text'
              name='addTodo'
              value={newTodo}
              placeholder='Add new todo ...'
              onChange={(e) => onInputHandler(e)}
            />
          </label>
          <Button primary onClick={(e) => onAddNewTodo(e)}>
            New todo
          </Button>
        </Container>
        <Suspense fallback={<h2>Загрузка...</h2>}>
          <ul className={`${styles.todoList}`}>
            {todos.map((todo: ITodo, index: number) => {
              const regExp = new RegExp(search, 'gi');
              const matchTitle = todo.title.replace(
                regExp,
                `<mark class="${styles.highlight}">${search}</mark>`
              );
              const matchTitleHTML = { __html: matchTitle };
              return (
                <li key={todo._id} className={`${styles.todoItem}`}>
                  <label>
                    <Checkbox
                      name={todo._id}
                      value={todo._id}
                      checked={checkedState[index]}
                      onChange={() => onToggleTodo(index)}
                    />
                    <span dangerouslySetInnerHTML={matchTitleHTML} />
                  </label>
                  <Button
                    onClick={() => {
                      onEditTodo(todo, index);
                    }}>
                    &#9998;
                  </Button>
                  <Button onClick={onRemoveTodo(index, todo._id)}>
                    &times;
                  </Button>
                </li>
              );
            })}
          </ul>
          {todos.length > 0 && (
            <div className={`${styles.selectAll}`}>
              <label onClick={onSelectAll}>
                <SelectAllCheckbox
                  className='selectAllCheckbox'
                  name='Select all'
                  ref={indeterminateRef}
                />
                <span>Select All</span>
              </label>
              {/* <RippleInput
                className='selectAllCheckbox'
                name='Select all'
                label='Select all'
                ref={indeterminateRef}
                type='checkbox'
                id='selectAll'
                onClick={onSelectAll}
              /> */}
            </div>
          )}
        </Suspense>
      </fieldset>
    </form>
  );
}

export default Todos;
