import React from "react";
import { Link } from "react-router-dom";
import style from "./Logo.module.scss";

const Logo = (props) => {
  const { className } = props;
  return (
    <div className={style.logo + (className ? " " + className : "")}>
      <Link to="/">Food Market</Link>
    </div>
  );
};

export default Logo;
