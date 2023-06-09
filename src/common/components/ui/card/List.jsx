import React from "react";
import style from "./List.module.scss";

const List = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>;
};

export default List;
