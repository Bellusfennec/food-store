/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import style from "./Tags.module.scss";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import { IoChevronBackOutline } from "react-icons/io5";

const Tags = (props) => {
  const { options } = props;
  let ref = useRef(null);
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(true);

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

  // useEffect(() => {
  //   document.addEventListener("mousedown", handlerOnMouseDown);
  //   document.addEventListener("mouseup", handlerOnMouseUp);
  //   document.addEventListener("mousemove", handlerOnMouseMove);

  //   return () => {
  //     document.removeEventListener("mousedown", handlerOnMouseDown);
  //     document.removeEventListener("mouseup", handlerOnMouseUp);
  //     document.removeEventListener("mousemove", handlerOnMouseMove);
  //   };
  // });

  const handlerScrollLeft = (event) => {
    console.log("l", ref, ref.current.scrollLeft);
    const current = ref.current.scrollLeft;
    ref.current.scrollLeft -= 25;
    if (current === current - 25) setLeftArrow(true);
    setRightArrow(true);
  };
  const handlerScrollRight = (event) => {
    const current = ref.current.scrollLeft;
    console.log("r", ref, ref.current.scrollLeft, current, current + 25);
    ref.current.scrollLeft += 25;
    if (current === current + 25) setRightArrow(false);
    setLeftArrow(true);
  };

  return (
    <div className={style.container}>
      <div
        className={style.containerCategories}
        ref={ref}
        // onMouseDown={handlerOnMouseDown}
        // onMouseUp={handlerOnMouseUp}
        // onMouseMove={handlerOnMouseMove}
        // onMouseLeave={handlerOnMouseUp}
      >
        {leftArrow && (
          <IconButton
            className={style.lightArrow}
            type="button"
            onClick={handlerScrollLeft}
          >
            <IoChevronBackOutline />
          </IconButton>
        )}
        {rightArrow && (
          <IconButton
            className={style.rightArrow}
            type="button"
            onClick={handlerScrollRight}
          >
            <IoChevronBackOutline />
          </IconButton>
        )}

        {options &&
          options.map(({ name, uuid }) => (
            <Link key={uuid} to={`/product`} className={style.itemCategory}>
              <p>{name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Tags;
