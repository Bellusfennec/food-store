import React from "react";
import style from "./IconButton.module.scss";

const IconButton = (props) => {
  const { onClick, disabled, children, outline } = props;
  const type = props.type ? props.type : "submit";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={style.icon + (outline ? " " + style.outline : "")}
    >
      {children}
    </button>
  );
};

export default IconButton;
