import React from "react";
import Tippy from "@tippyjs/react";

import "tippy.js/dist/tippy.css";

import "./styles.scss";

const Tooltip = (props) => {
  const { text, position, isClickable, children, ...rest } = props;

  const CustomTooltip = (tooltipProps) => {
    const { isClickableTooltip } = tooltipProps;

    return (
      <div className="tooltip">
        <div className="tooltip__content">{text}</div>
        {isClickableTooltip && <i className="tooltip__close fas fa-times" />}
      </div>
    );
  };

  return (
    <Tippy
      content={<CustomTooltip isClickableTooltip={isClickable} />}
      trigger={isClickable ? `click` : `mouseenter focus`}
      placement={position || `top`}
      appendTo={() => document.body}
      interactive={isClickable} // - возможность навести на тултип и взаимодействовать с содержимым
      hideOnClick={!isClickable} // - закрыть только по клику на триггер
      onShow={(instance) => {
        instance.popper
          .querySelector(`.tooltip__close`)
          ?.addEventListener(`click`, (e) => {
            console.log(e, instance);

            instance.hide();
          });
      }}
      maxWidth="none"
      {...rest}>
      <div className="tooltip-trigger">{children}</div>
    </Tippy>
  );
};

export default Tooltip;
