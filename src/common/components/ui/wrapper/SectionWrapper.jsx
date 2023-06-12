import React from "react";
import style from "./SectionWrapper.module.scss";

const SectionWrapper = (props) => {
  const { children } = props;
  const className = props.className ? " " + props.className : "";
  const y = props.y ? " " + style.y : "";
  const x = props.x ? " " + style.x : "";
  const fill = props.fill ? " " + style.fill : "";
  return (
    <section className={style.container + className + y + x + fill}>
      {children}
    </section>
  );
};

export default SectionWrapper;
