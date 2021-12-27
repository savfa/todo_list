import React from "react";

const TodosHeader = (props) => {
  const { todosCount, doneCount } = props;

  return (
    <header className="AppHeader d-flex justify-content-between">
      <h1>Список дел</h1>
      <p>
        {todosCount || 0} дел, {doneCount || 0} выполнено
      </p>
    </header>
  );
};

export default TodosHeader;
