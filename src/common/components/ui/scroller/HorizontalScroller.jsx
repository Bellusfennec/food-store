import React, { useEffect, useRef, useState } from "react";
import style from "./HorizontalScroller.module.scss";
import {
  insertLastElementsToBeginning,
  sideScroll,
} from "../../../utils/scroller";

const HorizontalScroller = (props) => {
  const { children, direction, className } = props;
  let scrollerRef = useRef(null);
  const [scroll, setScroll] = useState({
    scrolling: 0,
    direction: "",
  });

  useEffect(() => {
    const scrolling = scroll.scrolling ? scroll.scrolling + 1 : 1;
    setScroll({ ...scroll, direction: direction.direction, scrolling });
  }, [direction]);

  const getIndex = () => {
    const element = scrollerRef.current;
    const { firstChild, offsetWidth, scrollWidth } = element;
    let widthLastScreen = scrollWidth - offsetWidth;
    let index = 0;
    const { childNodes } = firstChild;
    const reverseChildNodes = [...Array.from(childNodes)].reverse();
    reverseChildNodes.forEach(({ offsetLeft }, i) => {
      if (widthLastScreen > offsetLeft && !index) index = i;
    });
    // корректировка
    index += 2;
    return index;
  };

  const startPosition = (index) => {
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

  // const handlerArrow = (direction) => {
  //   const scrolling = scroll.scrolling ? scroll.scrolling + 1 : 1;
  //   setScroll({ ...scroll, direction, scrolling });
  // };

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

  const childrenTo = React.Children.toArray(children);
  // const index = getIndex();
  console.log(children);
  const newChildren = insertLastElementsToBeginning(childrenTo, 8);
  const clonedElements = React.Children.map(newChildren, (child, i) => {
    const config = { key: i };
    return React.cloneElement(child, config);
  });

  useEffect(() => {
    const index = getIndex();
    const endIndex = clonedElements.length - index;
    setScroll({ ...scroll, endIndex, index });
    startPosition(index);
  }, []);

  return (
    <div
      ref={scrollerRef}
      className={style.scroller + (className ? " " + className : "")}
    >
      <div className={style.items} onWheel={handlerWheel}>
        {clonedElements}
      </div>
    </div>
  );
};

export default HorizontalScroller;
