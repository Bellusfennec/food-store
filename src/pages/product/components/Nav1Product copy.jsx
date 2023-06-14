import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import ContainerWrapper from "../../../common/components/ui/wrapper";
import { insertId, sideScroll } from "../../../common/utils/scroller";
import style from "./Nav1Product.module.scss";

const Nav1Product = (props) => {
  const { onClick } = props;
  const initOptions = props.options ? insertId(props.options) : [];
  const [options, setOptions] = useState(initOptions);
  const [selected, setSelected] = useState("");
  let scrollerRef = useRef(null);
  const [updScroll, setUpdScroll] = useState(false);
  const [scroll, setScroll] = useState({
    index: 1,
    scrolled: 0,
    gap: 32,
    direction: "",
    disableScroll: false,
    scrollWidth: 0,
    scrollPos: 1,
    clonesWidth: 0,
    updated: false,
  });

  const handlerSelected = (name) => {
    setSelected(name);
    onClick(name);
  };

  useEffect(() => {
    const { direction } = scroll;
    if (direction === "left" || direction === "right") {
      move(direction);
    }
  }, [options]);

  const handlerArrow = (direction) => {
    // move(direction);
    updatedOptions(direction);
  };

  const move = (direction) => {
    let { index, scrolled, gap } = scroll;
    let newScrolled;
    const element = scrollerRef.current;
    const { clientWidth, scrollWidth, scrollLeft } = element;
    const { childNodes } = element.firstChild;
    console.log(scrollerRef);
    Array.from(childNodes).map((child, i) => {
      console.log(`i${i}`, child.scrollWidth, child.offsetLeft, child.text);
    });
    // element.firstChild.style.transform = `translateX(0px)`;
    if (direction === "left") {
      const nextwidthOL = Array.from(childNodes)[index + 1].offsetLeft;
      element.scrollLeft = nextwidthOL;
      // let newScrolled1 = nextwidthOL;
      // newScrolled1 *= -1;
      // element.firstChild.style.transform = `translateX(${newScrolled1}px)`;
      console.log(index + 1, "nextwidt", nextwidthOL);
      // .previousSibling
      // index = index === 0 ? 0 : index - 1;
      const widthSW = Array.from(childNodes)[index].scrollWidth;
      const widthOL = Array.from(childNodes)[index].offsetLeft;
      console.log(index, "widthSW", widthSW, "widthOL", widthOL);
      newScrolled = widthOL;
      newScrolled *= -1;
      sideScroll(element, direction, 1, widthOL, 1);
      // newScrolled = scrolled;
      // element.firstChild.style.transition = `1s`;
      // element.firstChild.style.transform = `translateX(${newScrolled}px)`;
      // element.firstChild.style.transition = `none`;
    } else if (direction === "right") {
      // .nextSibling
      // const lastWidthSW = Array.from(childNodes).at(-1).scrollWidth;
      // const widthSW = Array.from(childNodes)[index].scrollWidth;
      // const widthOL = Array.from(childNodes)[index].offsetLeft;
      // index += 1;
      // console.log(
      //   index,
      //   "widthSW",
      //   widthSW,
      //   "widthOL",
      //   widthOL,
      //   "lastWidthSW",
      //   lastWidthSW
      // );
      // newScrolled = lastWidthSW + widthSW + gap;
      // newScrolled *= -1;
      // newScrolled += scrolled;
      // element.firstChild.style.transform = `translateX(${newScrolled}px)`;
    }
    console.log(
      "index",
      index,
      "scrolled",
      scrolled,
      "newScrolled",
      newScrolled
    );
    scrolled = newScrolled;
    setScroll({ ...scroll, index, scrolled });
  };

  const updatedOptions = (direction) => {
    if (direction === "left") {
      setScroll((prevState) => ({ ...prevState, direction }));
      const array = options;
      const lastElement = array.slice(-1);
      const newArray = array.slice(0, -1);
      setOptions([...lastElement, ...newArray]);
    } else if (direction === "right") {
    }
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
        <div className={style.items}>
          {options &&
            options.map(({ name, scrollId }) => (
              <Link
                key={scrollId}
                to={`/product`}
                className={
                  style.item + (selected === name ? " " + style.active : "")
                }
                onClick={() => handlerSelected(name)}
              >
                <p>{name}</p>
              </Link>
            ))}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Nav1Product;
