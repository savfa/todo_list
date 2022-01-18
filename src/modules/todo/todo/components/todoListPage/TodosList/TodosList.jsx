import React, { useCallback, useMemo, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cn from "classnames";

import "./sryles.scss";

import {
  TodosActionCreator,
  TodosOperation,
} from "../../../../../../store/reducers/todos/todos";
import AddTodo from "../AddTodo/AddTodo";
import TextToFormField from "../../../../_components/TextToFormField/TextToFormField";
import TodoItem from "../TodoItem/TodoItem";

const TodosList = (props) => {
  const { isAuth, outputTodos, todos } = props;

  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState(null);

  const getIsEditTodo = useCallback(
    (todo) => {
      return todo.id === editTodo?.id;
    },
    [editTodo]
  );

  const handleUpdateTodo = useCallback(
    (e, todo, isDone, isImportant) => {
      e.stopPropagation();
      const updateObj = {
        ...(isDone && { done: !todo.done }),
        ...(isImportant && { important: !todo.important }),
      };

      if (isAuth) {
        dispatch(TodosOperation.updateTodo(todo.id, updateObj));
      }
      if (!isAuth) {
        const oldTodoIndex = todos.findIndex((it) => +it.id === +todo.id);

        if (oldTodoIndex > -1) {
          const updatedTodos = [
            ...todos.slice(0, oldTodoIndex),
            { ...todo, ...updateObj },
            ...todos.slice(oldTodoIndex + 1),
          ];

          dispatch(TodosActionCreator.setTodos(updatedTodos));
        }
      }
    },
    [isAuth, todos, dispatch]
  );

  const handleDeleteTodo = useCallback(
    (e, todoId) => {
      e.stopPropagation();
      if (isAuth) dispatch(TodosOperation.deleteTodo(todoId));
      if (!isAuth) {
        const oldTodoIndex = todos.findIndex((it) => +it.id === +todoId);

        if (oldTodoIndex > -1) {
          const updatedTodos = [
            ...todos.slice(0, oldTodoIndex),
            ...todos.slice(oldTodoIndex + 1),
          ];

          dispatch(TodosActionCreator.setTodos(updatedTodos));
        }
      }
    },
    [isAuth, todos, dispatch]
  );

  return (
    <>
      <section>
        <ul className="todo-list">
          <TransitionGroup>
            {outputTodos.map((todo) => {
              const todoItemClassNames = cn({
                "todo-list__item": true,
                done: todo.done,
                important: todo.important,
              });

              return (
                <CSSTransition key={todo.id} classNames="item">
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                  <li
                    className={todoItemClassNames}
                    onClick={(e) => handleUpdateTodo(e, todo, true)}>
                    <TodoItem
                      todo={todo}
                      isEditTodo={getIsEditTodo(todo)}
                      setEditTodo={setEditTodo}
                      handleUpdateTodo={handleUpdateTodo}
                      handleDeleteTodo={handleDeleteTodo}
                    />
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
      </section>

      <AddTodo isAuth={isAuth} todos={todos} />
    </>
  );
};

export default TodosList;
