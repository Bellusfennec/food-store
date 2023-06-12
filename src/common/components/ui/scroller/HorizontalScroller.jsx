import React, { useEffect, useRef, useState } from "react";
import style from "./HorizontalScroller.module.scss";

const HorizontalScroller = (props) => {
  const { children, handlerArrow } = props;
  const [scroll, setScroll] = useState({
    index: 0,
    scrolled: 0,
    arrow: handlerArrow(),
    disableScroll: false,
    scrollWidth: 0,
    scrollPos: 1,
    clonesWidth: 0,
  });
  const [loading, setLoading] = useState(false);
  let scrollerRef = useRef(null);

  useEffect(() => {
    const direction = handlerArrow();
    console.log("scrollerRef", direction, scrollerRef);
  }, [scroll]);

  const handleScroll = (params) => {
    console.log("scrollerRef", scrollerRef);
  };

  // const reCalc = () => {
  //   let scrollPos = scroll.scrollPos;
  //   let scrollWidth = scrollerRef.current.clientWidth;
  //   let clonesWidth = getClonesWidth();

  //   if (scrollPos <= 0) {
  //     scrollPos = 1;
  //   }
  //   setScroll({
  //     scrollPos: scrollPos,
  //     scrollWidth: scrollWidth,
  //     clonesWidth: clonesWidth,
  //   });
  // };

  // const handleScroll = (event) => {
  //   const container = event.currentTarget;
  //   const scrollWidth = container.scrollWidth;
  //   const clonesWidth = getClonesWidth();
  //   let scrollPos = container.scrollLeft;
  //   let scrollPosAdd;
  //   container.clientWidth > clonesWidth
  //     ? (scrollPosAdd = container.clientWidth)
  //     : (scrollPosAdd = clonesWidth);

  //   if (!scroll.disableScroll) {
  //     if (scrollPos + scrollPosAdd >= scrollWidth) {
  //       setScroller(
  //         // The math floor value helps smooth out the scroll jump,
  //         // I don't know why that particular value works, but it does
  //         // Same goes for the other setScroll call below
  //         container,
  //         1 + Math.floor(scrollPosAdd / 12.09)
  //       );
  //       setScroll({
  //         disableScroll: true,
  //       });
  //     } else if (scrollPos <= 0) {
  //       setScroller(
  //         container,
  //         scrollWidth - clonesWidth - Math.floor(scrollPosAdd / 12.09)
  //       );
  //       setScroll({
  //         disableScroll: true,
  //       });
  //     }
  //   }

  //   setScroll({
  //     scrollWidth: container.scrollWidth,
  //     scrollPos: container.scrollLeft,
  //   });
  // };

  // const getClonesWidth = () => {
  //   const clones = document.getElementsByClassName("is-clone");
  //   let clonesWidth = 0;
  //   for (let i = 0; i < clones.length; i++) {
  //     clonesWidth = clonesWidth + clones[i].clientWidth;
  //   }
  //   return clonesWidth;
  // };

  // const setScroller = (element, pos) => {
  //   element.scrollLeft = pos;
  //   setScroll({
  //     scrollPos: element.scrollLeft,
  //   });
  // };

  /* */

  // useEffect(() => {
  //   console.log("upd scroll", scroll);
  // }, [scroll]);

  // const scroller = (arrow) => {
  //   console.log(scrollerRef);
  //   const right = arrow === "right";
  //   const left = arrow === "left";
  //   const element = scrollerRef.current;
  //   const { clientWidth, scrollWidth, firstChild } = element;
  //   const childNodes = firstChild.childNodes;
  //   let { index, scrolled } = scroll;

  //   /* Подсчет ширины последнего экрана */
  //   let sumWidthLastElements = 0;
  //   Array.from(childNodes)
  //     .reverse()
  //     .forEach((child) => {
  //       if (sumWidthLastElements <= clientWidth) {
  //         sumWidthLastElements += child.offsetWidth;
  //       }
  //     });
  //   const widthLastScreen = sumWidthLastElements - scrollWidth;

  //   const max = scroll.scrolled < widthLastScreen;
  //   const min = left && scroll.scrolled === 0;
  //   console.log(index, scrollWidth);
  //   /* Если последний экран, добавить элементов */
  //   if (max) {
  //     setOptions([...options, ...insertId(initOptions)]);
  //   } else if (min) {
  //     setOptions([...insertId(initOptions), ...options]);
  //     index = initOptions.length;
  //     scrolled = scrollWidth * -1;

  //     // element.scrollLeft = scrolled;
  //     // element.firstChild.style.transition = `none`;
  //     // element.firstChild.style.transform = `translate(${scrolled}px)`;
  //   }

  //   if (left && !min) {
  //     const widthPrev = Array.from(childNodes)[index - 1].offsetLeft;
  //     index -= 1;
  //     scrolled = widthPrev * -1;
  //   } else if (right) {
  //     const widthNext = Array.from(childNodes)[index + 1].offsetLeft;
  //     index += 1;
  //     scrolled = widthNext * -1;
  //   }
  //   // element.firstChild.style.transition = `1s`;
  //   element.firstChild.style.transform = `translate(${scrolled}px)`;
  //   setScroll({ index, scrolled });
  // };

  // const handlerScrollX = (arrow) => {
  //   scroller(arrow);
  // };

  const handlerWheel = (event) => {
    if (scrollerRef.current) {
      let arrow;
      if (event.deltaY < 0) {
        arrow = "left";
      } else if (event.deltaY > 0) {
        arrow = "right";
      }
      setScroll(arrow);
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

  const next = async () => {
    try {
      setLoading(true);
      // const newData = await loadMore();

      // setData((prev) =>
      //   direction === "right" ? [...newData, ...prev] : [...prev, ...newData]
      // );
    } finally {
      setLoading(false);
    }
  };

  const clonedElements = React.Children.map(children, (child) => {
    // console.log(child);
    let config = {};
    return React.cloneElement(child, {});
  });

  return (
    <div
      ref={scrollerRef}
      // onScroll={handleScroll}
      onWheel={handlerWheel}
      className={style.scroller}
    >
      {clonedElements}
    </div>
  );
};

export default HorizontalScroller;
