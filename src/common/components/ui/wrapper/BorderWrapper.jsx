import React from "react";
import style from "./BorderWrapper.module.scss";

const BorderWrapper = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};

export default BorderWrapper;
