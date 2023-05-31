/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import style from "./Tags.module.scss";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import { IoChevronBackOutline } from "react-icons/io5";

const Tags = (props) => {
  const { options } = props;
  let ref = useRef(null);
  // const [leftArrow, setLeftArrow] = useState(true);
  // const [rightArrow, setRightArrow] = useState(true);

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

  const handlerScrollX = (arrow) => {
    let newValue;
    const widthVisible = ref.current.offsetWidth;
    const currentValue = ref.current.scrollLeft;
    console.log("ref", ref);
    console.log("currentValue", currentValue);
    if (arrow === "left") {
      newValue = currentValue - widthVisible;
      // if (currentValue === currentValue + 25) setRightArrow(false);
    } else if (arrow === "right") {
      newValue = currentValue + widthVisible;
      // if (currentValue === currentValue + 25) setLeftArrow(false);
    }
    console.log("newValue", newValue);
    console.log("currentValue + widthVisible", currentValue + widthVisible);
    ref.current.scrollLeft = newValue;
  };

  return (
    <div
      className={style.scroll}
      ref={ref}
      // onMouseDown={handlerOnMouseDown}
      // onMouseUp={handlerOnMouseUp}
      // onMouseMove={handlerOnMouseMove}
      // onMouseLeave={handlerOnMouseUp}
    >
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      <Link to={`/`} className={style.item}>
        name
      </Link>
      {/* {leftArrow && (
          <IconButton
            className={style.lightArrow}
            type="button"
            onClick={() => handlerScrollX("left")}
          >
            <IoChevronBackOutline />
          </IconButton>
        )}
        {rightArrow && (
          <IconButton
            className={style.rightArrow}
            type="button"
            onClick={() => handlerScrollX("right")}
          >
            <IoChevronBackOutline />
          </IconButton>
        )} */}
      {options &&
        options.map(({ name, uuid }) => (
          <Link key={uuid} to={`/product`} className={style.item}>
            <p>{name}</p>
          </Link>
        ))}
      {options &&
        options.map(({ name, uuid }) => (
          <Link key={uuid} to={`/product`} className={style.item}>
            <p>{name}</p>
          </Link>
        ))}
    </div>
  );
};

export default Tags;
