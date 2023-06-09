import React from "react";
import style from "./Section.module.scss";

const Section = ({ children }) => {
  return <section className={style.container}>{children}</section>;
};

export default Section;
