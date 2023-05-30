import React from "react";
import style from "./Button.module.scss";

const Button = (props) => {
  const { onClick, disabled, children, outline } = props;
  const type = props.type ? props.type : "submit";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={style.button + (outline ? " " + style.outline : "")}
    >
      {children}
    </button>
  );
};

export default Button;
