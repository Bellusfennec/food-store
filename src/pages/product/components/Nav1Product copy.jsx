/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  const [scroll, setScroll] = useState({
    index: 5,
    endIndex: 0,
    scrolling: 0,
    direction: "",
  });

  const handlerSelected = (name) => {
    setSelected(name);
    onClick(name);
  };

  useEffect(() => {
    let { endIndex, index } = scroll;
    endIndex = options.length - scroll.index;
    setScroll({ ...scroll, endIndex });
    // Начальное положение
    const element = scrollerRef.current;
    const { offsetLeft } = Array.from(element.firstChild.childNodes)[index];
    element.scrollLeft = offsetLeft;
  }, []);

  const handlerArrow = (direction) => {
    let { scrolling } = scroll;
    scrolling = scrolling + 1;
    setScroll({ ...scroll, direction, scrolling });
  };

  useEffect(() => {
    console.log(scroll);
    if (scroll.scrolling > 0) {
      for (let i = 0; i < scroll.scrolling; i++) {
        move();
      }
    }
  }, [scroll]);

  const move = () => {
    let { endIndex, index, scrolling } = scroll;
    const element = scrollerRef.current;
    const childNodes = element.firstChild.childNodes;
    //
    console.log(scrollerRef);
    Array.from(childNodes).map((child, i) => {
      console.log(`i${i}`, child.scrollWidth, child.offsetLeft, child.text);
    });
    //

    if (scroll.direction === "left") {
      index = index === 0 ? endIndex : index - 1;
      const { offsetLeft } = Array.from(childNodes)[index];
      element.scrollLeft = offsetLeft;
      // newScrolled *= -1;
      // sideScroll(element, direction, 1, currentOL, 1);
      // element.firstChild.style.transform = `translateX(0px)`;
    } else if (scroll.direction === "right") {
      index = index === endIndex ? 1 : index + 1;
      const { offsetLeft } = Array.from(childNodes)[index];
      element.scrollLeft = offsetLeft;
    }
    scrolling = scrolling - 1;
    setScroll({ ...scroll, index, scrolling });
  };

  const updatedOptions = (direction) => {
    // if (direction === "left") {
    //   setScroll((prevState) => ({ ...prevState, direction }));
    //   const array = options;
    //   const lastElement = array.slice(-1);
    //   const newArray = array.slice(0, -1);
    //   setOptions([...lastElement, ...newArray]);
    // } else if (direction === "right") {
    // }
  };

  const handlerWheel = ({ deltaY }) => {
    if (scrollerRef.current) {
      let direction = deltaY < 0 ? "left" : deltaY > 0 ? "right" : "";
      let { scrolling } = scroll;
      scrolling = scrolling + 1;
      setScroll({ ...scroll, direction, scrolling });
    }
  };

  useEffect(() => {
    const element = scrollerRef.current;
    if (element) {
      const onWeel = (event) => event.preventDefault();
      element.addEventListener("wheel", onWeel, { passive: false });
      return () => element.removeEventListener("wheel", onWeel);
    }
  }, []);

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
        <div className={style.items} onWheel={handlerWheel}>
          {options &&
            options.map(({ name, id, scrollId }) => (
              <Link
                key={scrollId}
                to={`/product`}
                className={
                  style.item + (selected === name ? " " + style.active : "")
                }
                onClick={() => handlerSelected(name)}
              >
                <p>
                  {name}
                  {id}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Nav1Product;
