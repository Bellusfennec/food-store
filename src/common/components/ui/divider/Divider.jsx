import React from "react";
import style from "./Divider.module.scss";

const Divider = (props) => {
  const row = props.row ? Number(props.row) : 1;
  const line = props.line ? Number(props.line) : false;

  return (
    <div className={style.container} style={{ height: `${row}rem` }}>
      {line && (
        <div className={style.line} style={{ height: `${line}px` }}></div>
      )}
    </div>
  );
};
// className={style.divider}
export default Divider;
