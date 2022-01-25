import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import cn from "classnames";
import _ from "lodash";

import "./styles.scss";

export const FilterType = {
  ALL: `ALL`,
  ACTIVE: `ACTIVE`,
  DONE: `DONE`,
};

const TodosFilterPanel = (props) => {
  const { todos, setOutputTodos, todoFilterName, setTodoFilterName } = props;

  const [searchText, setSearchText] = useState(``);

  const getButtonVariant = useCallback(
    (filterName) => {
      return cn({
        primary: todoFilterName === filterName,
        "outline-secondary": todoFilterName !== filterName,
      });
    },
    [todoFilterName]
  );

  useEffect(() => {
    if (searchText) {
      setOutputTodos(
        todos.filter((todo) => {
          return (
            todo.label.toLowerCase().includes(searchText.toLowerCase()) &&
            (todoFilterName === FilterType.ACTIVE ? !todo.done : true) &&
            (todoFilterName === FilterType.DONE ? todo.done : true)
          );
        })
      );
    }
  }, [searchText, setOutputTodos, todos, todoFilterName]);

  useEffect(() => {
    if (!searchText) {
      if (todoFilterName === FilterType.ALL) setOutputTodos(todos);
      if (todoFilterName === FilterType.ACTIVE)
        setOutputTodos(todos.filter((todo) => !todo.done));
      if (todoFilterName === FilterType.DONE)
        setOutputTodos(todos.filter((todo) => todo.done));
    }
  }, [searchText, todoFilterName, setOutputTodos, todos]);

  return (
    <Row className="filter-panel">
      <Col>
        <input
          type="text"
          className="form-control"
          placeholder="Найти дело"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Col>
      <Col xs={12} md={6} lg={4} xxl={3}>
        <ButtonGroup aria-label="First group" className="d-flex">
          <Button
            onClick={() => setTodoFilterName(FilterType.ALL)}
            variant={getButtonVariant(FilterType.ALL)}>
            Все
          </Button>
          <Button
            onClick={() => setTodoFilterName(FilterType.ACTIVE)}
            variant={getButtonVariant(FilterType.ACTIVE)}>
            Активные
          </Button>
          <Button
            onClick={() => setTodoFilterName(FilterType.DONE)}
            variant={getButtonVariant(FilterType.DONE)}>
            Выполненные
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  );
};

export default TodosFilterPanel;
