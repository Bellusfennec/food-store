/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import style from "./Tags.module.scss";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import { IoChevronBackOutline } from "react-icons/io5";
import { log } from "util";

const Tags = (props) => {
  // const { options } = props;
  const initOptions = props.options ? props.options : [];
  const [options, setOtpions] = useState(initOptions);
  const [scroll, setScroll] = useState(0);

  let ref = useRef(null);
  const [arrow, setArrow] = useState({
    left: true,
    right: true,
  });

  // useEffect(() => {
  //   console.log("ref", ref, ref.current.scrollLeft);
  // }, [ref.current]);
  // const [state, setState] = useState({
  //   isScrolling: false,
  //   clientX: 0,
  //   scrollX: 0,
  // });

  // console.log(state);

  // useEffect(() => {
  //   const element = ref.current;
  //   if (element) {
  //     const onWeel = (event) => {
  //       event.preventDefault();
  //       element.scrollTo({
  //         left: element.scrollLeft + event.deltaY * 4,
  //         behavior: "smooth",
  //       });
  //     };
  //     element.addEventListener("wheel", onWeel);
  //     return () => element.removeEventListener("wheel", onWeel);
  //   }
  // }, []);

  // const handlerOnMouseDown = (event) => {
  //   console.log(ref.current.contains(event.target));
  //   if (ref && ref.current && !ref.current.contains(event.target)) {
  //     return;
  //   }
  //   event.preventDefault();
  //   console.log("handlerOnMouseDown");
  //   setState({ ...state, isScrolling: true, clientX: event.clientX });
  // };

  // const handlerOnMouseUp = (event) => {
  //   if (state.isScrolling) {
  //     event.preventDefault();
  //     console.log("handlerOnMouseUp");
  //     setState({ ...state, isScrolling: false });
  //   }
  // };

  // const handlerOnMouseMove = (event) => {
  //   if (ref && ref.current && !ref.current.contains(event.target)) {
  //     console.log("handlerOnMouseMove return");
  //     return;
  //   }
  //   event.preventDefault();
  //   console.log("handlerOnMouseMove");
  //   const { clientX, scrollX, isScrolling } = state;

  //   if (isScrolling) {
  //     let sX = scrollX + event.clientX - clientX;
  //     let cX = event.clientX;
  //     ref.current.scrollLeft = sX;

  //     console.log("handlerOnMouseMove", "sX:", sX, "cX:", cX);
  //     setState({
  //       ...state,
  //       scrollX: sX,
  //       clientX: cX,
  //     });
  //   }
  // };

  const outNum = (toNumber, elem) => {
    const time = 10000;
    const step = 1;
    let n = 0;
    let t = Math.round(time / (toNumber / step));
    let interval = setInterval(() => {
      n = n + step;
      if (n === toNumber) {
        clearInterval(interval);
      }
      elem = n;
    }, t);
  };

  const handlerScrollX = (arrow) => {
    /* Видимая ширина */
    const clientWidth = ref.current.clientWidth;
    /* Общая ширина */
    const scrollWidth = ref.current.scrollWidth;
    /* */
    const doubleScroll = clientWidth * 2;
    const percentScroll = (clientWidth / 100) * 80;
    /* Ширина скрола */
    let scrollToLeft = scroll + percentScroll;
    let scrollToRight = scroll - percentScroll;
    const lastScroll = (scrollWidth - clientWidth) * -1;
    /* */
    let scrolled;
    if (arrow === "left") {
      const isNearStart = scroll > doubleScroll * -1;
      scrolled = isNearStart ? 0 : scrollToLeft;
      /* Если начало */
      const goEnd = isNearStart && scroll === 0;
      if (goEnd) scrolled = lastScroll;
    } else if (arrow === "right") {
      const isNearEnd = Math.abs(scroll) > scrollWidth - doubleScroll;
      scrolled = isNearEnd ? lastScroll : scrollToRight;
      /* Если конец */
      const goStart = isNearEnd && scroll === lastScroll;
      if (goStart) scrolled = 0;
    }

    ref.current.style.transform = `translate(${scrolled}px)`;
    setScroll(scrolled);
  };

  return (
    <div className={style.container}>
      <div className={style.arrow}>
        <IconButton
          className={style.lightArrow}
          type="button"
          onClick={() => handlerScrollX("left")}
        >
          <IoChevronBackOutline />
        </IconButton>
        <IconButton
          className={style.rightArrow}
          type="button"
          onClick={() => handlerScrollX("right")}
        >
          <IoChevronBackOutline />
        </IconButton>
      </div>
      <div className={style.scrollContainer}>
        <div
          className={style.scroll}
          ref={ref}
          // onScroll={}
          // onScroll={}
          // onMouseDown={handlerOnMouseDown}
          // onMouseUp={handlerOnMouseUp}
          // onMouseMove={handlerOnMouseMove}
          // onMouseLeave={handlerOnMouseUp}
        >
          {options &&
            options.map(({ name, uuid }) => (
              <Link key={uuid} to={`/product`} className={style.item}>
                {name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
