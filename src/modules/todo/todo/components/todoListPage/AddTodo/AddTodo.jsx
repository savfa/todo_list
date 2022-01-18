import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

import "./styles.scss";

import {
  TodosActionCreator,
  TodosOperation,
} from "../../../../../../store/reducers/todos/todos";
import ElementsWrap from "../../../../_components/ElementsWrap/ElementsWrap";
import Tooltip from "../../../../_components/Tooltip/Tooltip";

const AddTodo = (props) => {
  const { isAuth, todos } = props;

  const dispatch = useDispatch();

  const [isAddTodo, setIsAddTodo] = useState(false);
  const [addTodoText, setAddTodoText] = useState(``);

  const handleAddTodo = useCallback(() => {
    if (!addTodoText) return;
    if (!isAuth)
      dispatch(
        TodosActionCreator.setTodos([
          ...todos,
          {
            id: todos[todos.length - 1].id + 1,
            userId: 1,
            label: addTodoText,
            done: false,
            important: false,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString(),
          },
        ])
      );
    if (isAuth) {
      dispatch(TodosOperation.addTodo(addTodoText));
    }
    setAddTodoText(``);
  }, [addTodoText, isAuth, todos, dispatch]);

  return (
    <>
      <section className="d-flex justify-content-end">
        <Tooltip text={isAddTodo ? `Скрыть` : `Добавить дело`}>
          <Button
            className="button-icon"
            variant="outline-secondary"
            onClick={() => setIsAddTodo(!isAddTodo)}>
            <i className={isAddTodo ? `fas fa-minus` : `fas fa-plus`} />
          </Button>
        </Tooltip>
      </section>
      <section className="add-todo">
        <CSSTransition in={isAddTodo} timeout={1000} classNames="addForm">
          <>
            {isAddTodo && (
              <div>
                <h6>Добавить новое дело</h6>
                <ElementsWrap isNoWrap>
                  <input
                    className="form-control"
                    value={addTodoText}
                    onChange={(e) => setAddTodoText(e.target.value)}
                  />
                  <Button variant="success" onClick={handleAddTodo}>
                    Добавить
                  </Button>
                </ElementsWrap>
              </div>
            )}
          </>
        </CSSTransition>
      </section>
    </>
  );
};

export default AddTodo;
