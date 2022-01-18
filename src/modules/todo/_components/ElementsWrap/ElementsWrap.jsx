import React from "react";

import "./styles.scss";

const ElementsWrap = (props) => {
  const { children, isNoWrap } = props;

  return (
    <div className="elements-wrap" data-nowrap={isNoWrap || null}>
      {children}
    </div>
  );
};

export default ElementsWrap;
