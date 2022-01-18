import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import TextToFormField from "../../../../_components/TextToFormField/TextToFormField";
import ElementsWrap from "../../../../_components/ElementsWrap/ElementsWrap";
import Tooltip from "../../../../_components/Tooltip/Tooltip";

const TodoItem = (props) => {
  const { todo, isEditTodo, setEditTodo, handleUpdateTodo, handleDeleteTodo } =
    props;

  return (
    <ElementsWrap>
      <TextToFormField
        text={<span>{todo.label}</span>}
        formField={<input />}
        isFormField={isEditTodo}
      />

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
                onClick={() => setEditTodo(todo)}>
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
  );
};

export default TodoItem;
