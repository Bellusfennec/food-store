import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/form";
import HorizontalScroller from "../../../common/components/scroller/HorizontalScroller";
import style from "./NavProduct.module.scss";
import { Loading } from "../../../common/components/loading";

const NavProduct = (props) => {
  const { selected, options } = props;
  const [direction, setDirection] = useState({});

  return (
    <div className={style.container}>
      <div className={style.left}>
        <IconButton
          className={style.leftButton}
          type="button"
          onClick={() => setDirection({ arrow: "left" })}
        >
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <div className={style.right}>
        <IconButton
          className={style.rightButton}
          type="button"
          onClick={() => setDirection({ arrow: "right" })}
        >
          <IoChevronBackOutline />
        </IconButton>
      </div>
      {options && (
        <HorizontalScroller
          direction={direction}
          className={style.items}
          selected={selected}
          classSelected={style.active}
        >
          {/* <Link to={`/product`} className={style.item}>
            <p>name</p>
          </Link> */}
          {options.map(({ name, id }) => (
            <Link
              key={id}
              to={`/product`}
              className={
                style.item
                // + (selected === id ? " " + style.active : "")
              }
            >
              <p>{name}</p>
            </Link>
          ))}
        </HorizontalScroller>
      )}
      {!options && <Loading />}
    </div>
  );
};

export default NavProduct;
