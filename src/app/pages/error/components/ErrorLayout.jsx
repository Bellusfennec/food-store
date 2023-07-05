import React from "react";
import style from "./ErrorLayout.module.scss";

const ErrorLayout = (props) => {
  const { children } = props;
  return <div className={style.container}>{children}</div>;
};

export default ErrorLayout;
