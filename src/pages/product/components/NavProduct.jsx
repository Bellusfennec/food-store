import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import HorizontalScroller from "../../../common/components/ui/scroller/HorizontalScroller";
import style from "./NavProduct.module.scss";
import { Loading } from "../../../common/components/ui/loading";

const NavProduct = (props) => {
  const { selected, options } = props;
  const [direction, setDirection] = useState({});

  return (
    <div className={style.container}>
      <div className={style.arrow}>
        <IconButton
          className={style.left}
          type="button"
          onClick={() => setDirection({ arrow: "left" })}
        >
          <IoChevronBackOutline />
        </IconButton>
        <IconButton
          className={style.right}
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
        >
          {options.map(({ name, id }) => (
            <Link key={id} to={`/product`} className={style.item}>
              <p>{name}</p>
            </Link>
          ))}
        </HorizontalScroller>
      )}
      {!options && <Loading />}
      <div className={style.gradient}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default NavProduct;
