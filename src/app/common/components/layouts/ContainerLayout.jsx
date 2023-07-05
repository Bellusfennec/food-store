import React from "react";
import style from "./ContainerLayout.module.scss";

const ContainerLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <div className={style.containerBody}>{children}</div>
    </div>
  );
};

export default ContainerLayout;
