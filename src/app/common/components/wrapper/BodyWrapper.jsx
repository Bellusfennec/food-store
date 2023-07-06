import React from "react";
import style from "./BodyWrapper.module.scss";

const BodyWrapper = (props) => {
  const { children } = props;
  const className = props.className ? " " + props.className : "";
  const y = props.y ? " " + style.y : "";
  const x = props.x ? " " + style.x : "";
  return <div className={style.container + className + y + x}>{children}</div>;
};

export default BodyWrapper;
