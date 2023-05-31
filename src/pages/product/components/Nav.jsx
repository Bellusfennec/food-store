import React, { useState } from "react";
import style from "./Nav.module.scss";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const { options, onClick } = props;
  const [selected, setSelected] = useState("");

  const handlerSelected = (name) => {
    setSelected(name);
    onClick(name);
  };

  return (
    <nav className={style.nav}>
      {options &&
        options.map(({ name, uuid }) => (
          <Link
            key={uuid}
            to={`/product`}
            className={
              style.itemNav +
              (selected === name ? " " + style.activeItemNav : "")
            }
            onClick={() => handlerSelected(name)}
          >
            <p>{name}</p>
          </Link>
        ))}
    </nav>
  );
};

export default Nav;
