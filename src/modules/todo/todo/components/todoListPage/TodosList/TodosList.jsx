import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useDispatch } from "react-redux";
import cn from "classnames";
import _ from "lodash";

import "./sryles.scss";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  TodosActionCreator,
  TodosOperation,
} from "../../../../../../store/reducers/todos/todos";
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from "../TodoItem/TodoItem";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TodosList = (props) => {
  const { isAuth, outputTodos, todos, todoFilterName } = props;

  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState(null);

  const [itemsDnd, setItemsDnd] = useState([]);

  useEffect(() => {
    setItemsDnd(outputTodos);
  }, [outputTodos]);

  const getIsEditTodo = useCallback(
    (todo) => {
      return todo.id === editTodo?.id;
    },
    [editTodo]
  );

  const handleUpdateTodo = useCallback(
    (e, todo, isDone, isImportant, label) => {
      e.stopPropagation();
      const updateObj = {
        ...(isDone && { done: !todo.done }),
        ...(isImportant && { important: !todo.important }),
        ...(label && { label }),
      };

      if (isAuth) {
        return dispatch(TodosOperation.updateTodo(todo.id, updateObj));
      }
      if (!isAuth) {
        const oldTodoIndex = todos.findIndex((it) => +it.id === +todo.id);

        if (oldTodoIndex > -1) {
          const updatedTodos = [
            ...todos.slice(0, oldTodoIndex),
            { ...todo, ...updateObj },
            ...todos.slice(oldTodoIndex + 1),
          ];

          return dispatch(TodosActionCreator.setTodos(updatedTodos));
        }
      }
      return null;
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

  const onDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const items = reorder(
        itemsDnd,
        result.source.index,
        result.destination.index
      );

      // sort
      if (isAuth) {
        dispatch(
          TodosOperation.sortTodos(
            items.map((todo, index) => ({ id: todo.id, sort: index }))
          )
        );
      }

      setItemsDnd(items);
      dispatch(TodosActionCreator.setTodos(items));
    },
    [itemsDnd, isAuth, dispatch]
  );

  return (
    <>
      <section>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={todoFilterName}>
            {(provided, snapshot) => (
              <ul
                className="todo-list"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {itemsDnd.map((todo, index) => {
                  const todoItemClassNames = cn({
                    "todo-list__item": true,
                    done: todo.done,
                    important: todo.important,
                  });
                  return (
                    <Draggable
                      key={todo.id}
                      draggableId={String(todo.id)}
                      index={index}>
                      {/* eslint-disable-next-line no-shadow */}
                      {(provided, snapshot) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
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
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </section>

      <AddTodo isAuth={isAuth} todos={todos} />
    </>
  );
};

export default TodosList;
