import React from "react";
import style from "./List.module.scss";

const List = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default List;
