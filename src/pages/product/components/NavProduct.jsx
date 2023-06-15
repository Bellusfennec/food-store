/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import ContainerWrapper from "../../../common/components/ui/wrapper";
import {
  insertLastElementsToBeginning,
  insertScrollId,
  sideScroll,
} from "../../../common/utils/scroller";
import style from "./NavProduct.module.scss";

const NavProduct = (props) => {
  const { onClick } = props;
  const initOptions = props.options ? insertScrollId(props.options) : [];
  const [options, setOptions] = useState(initOptions);
  const [selected, setSelected] = useState("");
  let scrollerRef = useRef(null);
  const [scroll, setScroll] = useState({
    scrolling: 0,
    direction: "",
  });

  const handlerSelected = (name) => {
    setSelected(name);
    onClick(name);
  };

  useEffect(() => {
    const element = scrollerRef.current;
    const { firstChild, offsetWidth, scrollWidth } = element;
    const { childNodes } = firstChild;
    let widthLastScreen = scrollWidth - offsetWidth;
    let index = 0;
    const reverseChildNodes = [...Array.from(childNodes)].reverse();
    reverseChildNodes.map(({ offsetLeft }, i) => {
      if (widthLastScreen > offsetLeft && !index) index = i;
    });
    // корректировка
    index += 2;
    // Добавляем кол-во index в начало
    const newOptions = insertLastElementsToBeginning(options, index);
    const updOptions = insertScrollId(newOptions);
    setOptions(updOptions);
    // endIndex, index
    const endIndex = updOptions.length - index;
    setScroll({ ...scroll, endIndex, index });
  }, []);

  useEffect(() => {
    if (initOptions < options) {
      startPosition();
    }
  }, [options]);

  const startPosition = () => {
    const { index } = scroll;
    const element = scrollerRef.current;
    const { childNodes } = element.firstChild;
    const { offsetLeft } = Array.from(childNodes)[index];
    element.scrollLeft = offsetLeft;
  };

  const debag = () => {
    const { childNodes } = scrollerRef.current.firstChild;
    Array.from(childNodes).map(({ scrollWidth, offsetLeft, text }, i) => {
      console.log(`i${i}`, scrollWidth, offsetLeft, text);
    });
  };

  const handlerArrow = (direction) => {
    const scrolling = scroll.scrolling ? scroll.scrolling + 1 : 1;
    setScroll({ ...scroll, direction, scrolling });
  };

  useEffect(() => {
    if (scroll.scrolling > 0) {
      for (let i = 0; i < scroll.scrolling; i++) {
        move();
      }
    }
  }, [scroll]);

  const move = () => {
    let { endIndex, index, scrolling, direction } = scroll;
    const element = scrollerRef.current;
    const { firstChild } = element;
    const { childNodes } = firstChild;
    if (direction === "left") {
      index = index === 0 ? endIndex - 1 : index - 1;
      const { offsetLeft } = Array.from(childNodes)[endIndex];
      if (scroll.index === 0) element.scrollLeft = offsetLeft;
    } else if (direction === "right") {
      index = index === endIndex ? 1 : index + 1;
      if (scroll.index === endIndex) element.scrollLeft = 0;
    }
    const { offsetLeft } = Array.from(childNodes)[index];
    sideScroll(element, element.scrollLeft, offsetLeft);
    scrolling = scrolling - 1;
    setScroll({ ...scroll, index, scrolling });
  };

  const handlerWheel = ({ deltaY }) => {
    if (scrollerRef.current) {
      let direction = deltaY < 0 ? "left" : deltaY > 0 ? "right" : "";
      const scrolling = scroll.scrolling ? scroll.scrolling + 1 : 1;
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
                <p>{name}</p>
              </Link>
            ))}
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default NavProduct;
