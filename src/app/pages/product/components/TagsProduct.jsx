/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/form";
import { Loading } from "../../../common/components/loading";
import HorizontalScroller from "../../../common/components/scroller/HorizontalScroller";
import style from "./TagsProduct.module.scss";

const TagsProduct = (props) => {
  const { options } = props;
  const [direction, setDirection] = useState({});

  return (
    <div className={style.container}>
      <div className={style.arrow}>
        <div className={style.leftBackground}>
          <IconButton
            className={style.lightArrow}
            type="button"
            onClick={() => setDirection({ arrow: "left" })}
          >
            <IoChevronBackOutline />
          </IconButton>
        </div>
        <div className={style.rightBackground}>
          <IconButton
            className={style.rightArrow}
            type="button"
            onClick={() => setDirection({ arrow: "right" })}
          >
            <IoChevronBackOutline />
          </IconButton>
        </div>
      </div>
      {options && (
        <HorizontalScroller direction={direction} className={style.items}>
          {options.map(({ name, id }) => (
            <Link key={id} to={`/product`} className={style.item}>
              {name}
            </Link>
          ))}
        </HorizontalScroller>
      )}
      {!options && <Loading />}
    </div>
  );
};

export default TagsProduct;
