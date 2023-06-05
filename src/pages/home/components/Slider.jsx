/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import style from "./Slider.module.scss";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import { IoChevronBackOutline } from "react-icons/io5";
import { log } from "util";

const init = [
  { id: 1, image: "/image/page-1.jpg" },
  { id: 2, image: "/image/page-2.jpg" },
  { id: 3, image: "/image/page-3.jpg" },
  { id: 4, image: "/image/page-4.jpg" },
  { id: 5, image: "/image/page-5.jpg" },
  { id: 6, image: "/image/page-6.jpg" },
];
const Slider = () => {
  console.log("Slider");
  const [options] = useState(init);
  const [slide, setSlide] = useState(0);
  let ref = useRef(null);

  const handlerScrollX = (arrow) => {
    let index;
    const max = slide === options.length - 1;
    const min = slide === 0;
    const right = arrow === "right";
    const left = arrow === "left";
    if (left) {
      index = !min ? slide - 1 : options.length - 1;
    } else if (right) {
      index = !max ? slide + 1 : 0;
    }
    const element = ref.current;
    const { clientWidth } = element;
    const scrolled = index * clientWidth * -1;
    element.style.transform = `translate(${scrolled}px)`;
    setSlide(index);
  };

  const handlerSelectDot = (index) => {
    const element = ref.current;
    const { clientWidth } = element;
    const scrolled = index * clientWidth * -1;
    element.style.transform = `translate(${scrolled}px)`;
    setSlide(index);
  };

  return (
    <div className={style.container}>
      <div className={style.arrow}>
        <div className={style.leftBackground}>
          <IconButton
            className={style.lightArrow}
            type="button"
            onClick={() => handlerScrollX("left")}
          >
            <IoChevronBackOutline />
          </IconButton>
        </div>
        <div className={style.rightBackground}>
          <IconButton
            className={style.rightArrow}
            type="button"
            onClick={() => handlerScrollX("right")}
          >
            <IoChevronBackOutline />
          </IconButton>
        </div>
      </div>
      <div className={style.scroller}>
        <div className={style.items} ref={ref}>
          {options &&
            options.map(({ image, id }) => (
              <Link key={id} to={`/`} className={style.item} id={`slide-${id}`}>
                <img className={style.image} src={image} alt="" />
              </Link>
            ))}
        </div>
      </div>
      <div className={style.filter}></div>
      <div className={style.dots}>
        {options &&
          options.map(({ id }, index) => (
            <Link
              key={id}
              onClick={() => handlerSelectDot(index)}
              className={
                style.dot + (index === slide ? " " + style.activeDot : "")
              }
            ></Link>
          ))}
      </div>
    </div>
  );
};

export default Slider;
