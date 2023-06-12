import React from "react";
import style from "./BlackoutOverlay.module.scss";

const BlackoutOverlay = ({ children }) => {
  return <div className={style.overlay}>{children}</div>;
};

export default BlackoutOverlay;
