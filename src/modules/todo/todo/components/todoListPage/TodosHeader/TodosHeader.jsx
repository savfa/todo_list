import React from "react";

import "./styles.scss";

import { declensionWordFromCount } from "../../../../../../assets/services/utils/common";

const TodosHeader = (props) => {
  const { todosCount, doneCount } = props;

  return (
    <header className="page-header d-flex justify-content-between align-items-end">
      <h1>Список дел</h1>
      <div>
        {`${todosCount || 0} ${declensionWordFromCount(todosCount || 0, [
          `дело`,
          `дела`,
          `дел`,
        ])}, ${doneCount || 0} выполнено`}
      </div>
    </header>
  );
};

export default TodosHeader;
