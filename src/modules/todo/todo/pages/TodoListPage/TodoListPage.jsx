import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";

import TodosHeader from "../../components/todoListPage/TodosHeader/TodosHeader";
import { getTodos } from "../../../../../store/reducers/todos/selectors";
import {
  TodosActionCreator,
  TodosOperation,
} from "../../../../../store/reducers/todos/todos";

import { todos as mockTodos } from "../../../../../assets/services/moks/todos";
import TodosFilterPanel from "../../components/todoListPage/TodosFilterPanel/TodosFilterPanel";
import TodosList from "../../components/todoListPage/TodosList/TodosList";

const TodoListPage = (props) => {
  const { isAuth } = props;

  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  const [outputTodos, setOutputTodos] = useState([]);

  useEffect(() => {
    if (isAuth) {
      dispatch(TodosOperation.fetchTodos());
    } else {
      dispatch(TodosActionCreator.setTodos(mockTodos));
    }
  }, [isAuth, dispatch]);

  const doneCount = useMemo(() => {
    return todos?.filter((elem) => elem.done)?.length;
  }, [todos]);

  return (
    <div className="page">
      <TodosHeader todosCount={todos.length} doneCount={doneCount} />
      <div className="page__body">
        <TodosFilterPanel todos={todos} setOutputTodos={setOutputTodos} />

        <TodosList isAuth={isAuth} outputTodos={outputTodos} todos={todos} />
      </div>
    </div>
  );
};

export default TodoListPage;
