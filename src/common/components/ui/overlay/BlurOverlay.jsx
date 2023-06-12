import React from "react";
import style from "./BlurOverlay.module.scss";

const BlurOverlay = ({ children }) => {
  return <div className={style.overlay}>{children}</div>;
};

export default BlurOverlay;
