import React, { useEffect, useRef, useState } from "react";
import style from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import { IoChevronBackOutline } from "react-icons/io5";

const Nav = (props) => {
  const { options, onClick } = props;
  const [selected, setSelected] = useState("");
  const [scroll, setScroll] = useState(0);
  let ref = useRef(null);

  const handlerSelected = (name) => {
    setSelected(name);
    onClick(name);
  };

  const handlerScrollX = (arrow) => {
    const element = ref.current;
    /* Видимая ширина */
    const clientWidth = element.clientWidth;
    /* Общая ширина */
    const scrollWidth = element.scrollWidth;
    /* */
    const doubleScroll = clientWidth * 2;
    const percentScroll = (clientWidth / 100) * 75;
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

    element.style.transform = `translate(${scrolled}px)`;
    setScroll(scrolled);
  };

  const handlerWheel = (event) => {
    const element = ref.current;
    if (element) {
      /* Видимая ширина */
      const clientWidth = element.clientWidth;
      /* Общая ширина */
      const scrollWidth = element.scrollWidth;
      /* */
      const doubleScroll = clientWidth * 2;
      const percentScroll = (clientWidth / 100) * 75;
      /* Ширина скрола */
      let scrollToLeft = scroll + percentScroll;
      let scrollToRight = scroll - percentScroll;
      const lastScroll = (scrollWidth - clientWidth) * -1;
      /* */
      let scrolled;
      if (event.deltaY < 0) {
        const isNearStart = scroll > doubleScroll * -1;
        scrolled = isNearStart ? 0 : scrollToLeft;
        /* Если начало */
        const goEnd = isNearStart && scroll === 0;
        if (goEnd) scrolled = lastScroll;
      } else if (event.deltaY > 0) {
        const isNearEnd = Math.abs(scroll) > scrollWidth - doubleScroll;
        scrolled = isNearEnd ? lastScroll : scrollToRight;
        /* Если конец */
        const goStart = isNearEnd && scroll === lastScroll;
        if (goStart) scrolled = 0;
      }
      element.style.transform = `translate(${scrolled}px)`;
      setScroll(scrolled);
    }
  };
  useEffect(() => {
    const element = ref.current;
    if (element) {
      const onWeel = (event) => event.preventDefault();
      element.addEventListener("wheel", onWeel, { passive: false });
      return () => element.removeEventListener("wheel", onWeel);
    }
  }, []);

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
      <div className={style.scrollContainer}>
        <nav className={style.scroll} ref={ref} onWheel={handlerWheel}>
          {options &&
            options.map(({ name, uuid }) => (
              <Link
                key={uuid}
                to={`/product`}
                className={
                  style.item + (selected === name ? " " + style.activeItem : "")
                }
                onClick={() => handlerSelected(name)}
              >
                <p>{name}</p>
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Nav;
