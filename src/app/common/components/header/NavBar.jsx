import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={style.nav}>
      <Link to="/">Главная</Link>
      <Link to="/product">Продукты</Link>
    </nav>
  );
};

export default NavBar;
