import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TodosHeader from "../../components/todoListPage/TodosHeader/TodosHeader";

const TodoStatus = {
  ALL: `ALL`,
  ACTIVE: `ACTIVE`,
  DONE: `DONE`,
};

const TodoListPage = () => {
  const [search, setSearch] = useState();
  const [todosStatus, setTodosStatus] = useState(TodoStatus.ALL);
  const [isAddTodo, setIsAddTodo] = useState(false);

  const [rename, setRename] = useState(false);

  const todos = [
    { id: 1, title: `дело 1`, done: 1 },
    { id: 2, title: `дело 2`, done: 0 },
  ];
  const doneCount = todos.filter((elem) => elem.done === 1).length;

  const handleStatus = (status) => setTodosStatus(status);

  return (
    <div className="page">
      <TodosHeader todosCount={todos.length} doneCount={doneCount} />
      <div className="page__body">
        <form className="searchPanel d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Найти дело"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ButtonGroup className="me-2" aria-label="First group">
            <Button
              onClick={() => handleStatus(TodoStatus.ALL)}
              variant={
                todosStatus === TodoStatus.ALL ? `primary` : `outline-secondary`
              }>
              All
            </Button>
            <Button
              onClick={() => handleStatus(TodoStatus.ACTIVE)}
              variant={
                todosStatus === TodoStatus.ACTIVE
                  ? `primary`
                  : `outline-secondary`
              }>
              Active
            </Button>
            <Button
              onClick={() => handleStatus(TodoStatus.DONE)}
              variant={
                todosStatus === TodoStatus.DONE
                  ? `primary`
                  : `outline-secondary`
              }>
              Done
            </Button>
          </ButtonGroup>
        </form>

        <ul className="TodoList list-group">
          <TransitionGroup>
            {todos.map((item) => {
              return (
                <CSSTransition key={item.id} timeout={500} classNames="item">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <>
                      {rename ? (
                        <input />
                      ) : (
                        <span style={{ cursor: `pointer` }}>{item.title}</span>
                      )}
                      <div>
                        <Button
                          variant="outline-success"
                          onClick={() => `onToggleImportant()`}>
                          <i
                            className={`fas fa-exclamation ${
                              // eslint-disable-next-line no-constant-condition
                              `important` ? `i_bg_white` : null
                            }`}
                          />
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => `setRename(!rename)`}>
                          <i className="fas fa-pencil-alt" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => `onDeleted()`}>
                          <i className="fas fa-trash-alt" />
                        </Button>
                      </div>
                    </>
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>

        <div className="d-flex justify-content-end TodoList__btn">
          <Button
            variant="outline-secondary"
            onClick={() => setIsAddTodo(!isAddTodo)}>
            <i className={isAddTodo ? `fas fa-minus` : `fas fa-plus`} />
          </Button>
        </div>

        <CSSTransition in={isAddTodo} timeout={1000} classNames="addForm">
          <>
            {isAddTodo && (
              <div>
                <p>Добавить новое дело</p>
                <div className="d-flex">
                  <input />
                  <Button type="button" variant="outline-success">
                    Ok
                  </Button>
                </div>
              </div>
            )}
          </>
        </CSSTransition>
      </div>
    </div>
  );
};

export default TodoListPage;
