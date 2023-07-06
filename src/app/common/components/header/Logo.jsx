import React from "react";
import { Link } from "react-router-dom";
import style from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Link to="/">Food Market</Link>
    </div>
  );
};

export default Logo;
