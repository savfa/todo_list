import React, { useCallback, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import TextToFormField from "../../../../_components/TextToFormField/TextToFormField";
import ElementsWrap from "../../../../_components/ElementsWrap/ElementsWrap";
import Tooltip from "../../../../_components/Tooltip/Tooltip";

const TodoItem = (props) => {
  const { todo, handleUpdateTodo, handleDeleteTodo } = props;

  const [isEditTodo, setIsEditTodo] = useState(false);
  const [todoText, setTodoText] = useState(todo.label);

  return (
    <TextToFormField
      text={
        <ElementsWrap isNoWrap>
          <span>{todo.label}</span>
          <ButtonGroup>
            <Tooltip text={todo.done ? `В активные` : `Выполнено`}>
              <Button
                className="button-icon"
                variant="outline-success"
                onClick={(e) => handleUpdateTodo(e, todo, true)}>
                <i className={`fas fa-${todo.done ? `undo` : `check`}`} />
              </Button>
            </Tooltip>
            {!todo.done && (
              <>
                <Tooltip text="Изменить важность">
                  <Button
                    className="button-icon"
                    variant="outline-primary"
                    onClick={(e) => handleUpdateTodo(e, todo, false, true)}>
                    <i className="fas fa-exclamation" />
                  </Button>
                </Tooltip>
                <Tooltip text="Редактировать">
                  <Button
                    className="button-icon"
                    variant="outline-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditTodo(true);
                    }}>
                    <i className="fas fa-pencil-alt" />
                  </Button>
                </Tooltip>
              </>
            )}
            <Tooltip text="Удалить">
              <Button
                className="button-icon"
                variant="outline-danger"
                onClick={(e) => handleDeleteTodo(e, todo.id)}>
                <i className="fas fa-trash-alt" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </ElementsWrap>
      }
      formField={
        <ElementsWrap isNoWrap>
          <input
            type="text"
            className="form-control"
            placeholder="Введите текст"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            variant="success"
            onClick={(e) => {
              e.stopPropagation();
              if (todoText && todo.label !== todoText) {
                handleUpdateTodo(e, todo, false, false, todoText).then(() =>
                  setIsEditTodo(false)
                );
              } else {
                setIsEditTodo(false);
              }
            }}>
            Сохранить
          </Button>
        </ElementsWrap>
      }
      isFormField={isEditTodo}
    />
  );
};

export default TodoItem;
