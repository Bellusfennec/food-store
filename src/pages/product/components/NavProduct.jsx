import React, { useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import ContainerWrapper from "../../../common/components/ui/wrapper";
import { insertId, sideScroll } from "../../../common/utils/scroller";
import style from "./NavProduct.module.scss";

const NavProduct = (props) => {
  const { onClick } = props;
  const initOptions = props.options ? insertId(props.options) : [];
  const [options, setOptions] = useState(initOptions);
  const [selected, setSelected] = useState("");
  let scrollerRef = useRef(null);
  const [scroll, setScroll] = useState({
    index: 0,
    scrolled: 0,
    gap: 32,
    arrow: "",
    disableScroll: false,
    scrollWidth: 0,
    scrollPos: 1,
    clonesWidth: 0,
  });

  const handlerSelected = (name) => {
    setSelected(name);
    onClick(name);
  };

  const handlerArrow = (direction) => {
    move(direction);
  };

  const move = (direction) => {
    console.log(direction);
    let { index, scrolled, gap } = scroll;
    const element = scrollerRef.current;
    const { clientWidth, scrollWidth, childNodes, scrollLeft } = element;
    console.log(scrollerRef);
    Array.from(childNodes).map((child, i) => {
      console.log(`i${i}`, child.scrollWidth, child.offsetLeft);
    });
    console.log("index", index);
    if (direction === "left" && index !== 0) {
      // .previousSibling
      const widthSW = Array.from(childNodes)[index].scrollWidth;
      const widthOL = Array.from(childNodes)[index].offsetLeft;
      console.log(index, "widthSW", widthSW, "widthOL", widthOL);
      index -= 1;
      scrolled = widthOL;

      sideScroll(element, direction, 1, scrolled, 1);
    } else if (direction === "right") {
      // .nextSibling
      const widthSW = Array.from(childNodes)[index].scrollWidth;
      const widthOL = Array.from(childNodes)[index].offsetLeft;
      console.log(index, "widthSW", widthSW, "widthOL", widthOL);

      index += 1;
      scrolled = widthSW + gap;

      sideScroll(element, direction, 100, scrolled, 1);
    }
    // const nnn = 1 + Math.floor(element.clientWidth / 12.09);
    console.log(
      "index",
      index,
      "scrolled",
      scrolled,
      "scrollerRef.current.scrollLeft",
      scrollerRef.current.scrollLeft
    );
    setScroll({ ...scroll, index, scrolled });

    // sideScroll(element, direction, 10, 200, 10);
  };

  return (
    <ContainerWrapper className={style.container}>
      <div className={style.arrow}>
        <IconButton
          className={style.left}
          type="button"
          onClick={() => handlerArrow("left")}
        >
          <IoChevronBackOutline />
        </IconButton>
        <IconButton
          className={style.right}
          type="button"
          onClick={() => handlerArrow("right")}
        >
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <div ref={scrollerRef} className={style.scroller}>
        {options &&
          options.map(({ name, scrollId }) => (
            <Link
              key={scrollId}
              to={`/product`}
              className={
                style.item + (selected === name ? " " + style.activeItem : "")
              }
              onClick={() => handlerSelected(name)}
            >
              <p>{name}</p>
            </Link>
          ))}
      </div>
    </ContainerWrapper>
  );
};

export default NavProduct;
