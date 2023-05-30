import React from "react";
import style from "./ModalLayout.module.scss";

const ModalLayout = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <div className={style.containerBody}>{children}</div>
    </div>
  );
};

export default ModalLayout;
