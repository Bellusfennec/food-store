/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IconButton } from "../../../common/components/ui/form";
import { BlackoutOverlay } from "../../../common/components/ui/overlay";
import ContainerWrapper, {
  BorderWrapper,
} from "../../../common/components/ui/wrapper";
import style from "./Slider.module.scss";

const init = [
  { id: 2, image: "/image/page-2.jpg" },
  { id: 3, image: "/image/page-3.jpg" },
  { id: 4, image: "/image/page-4.jpg" },
  { id: 5, image: "/image/page-5.jpg" },
  { id: 6, image: "/image/page-6.jpg" },
];
const Slider = () => {
  const [options] = useState(init);
  const [slide, setSlide] = useState(0);
  let frontRef = useRef(null);

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
    scrolled(frontRef, index);
    setSlide(index);
  };

  const scrolled = (ref, index) => {
    const element = ref.current;
    const { clientWidth } = element;
    const scrolled = index * clientWidth * -1;
    element.style.transform = `translate(${scrolled}px)`;
  };

  const handlerSelectDot = (index) => {
    scrolled(frontRef, index);
    setSlide(index);
  };

  return (
    <ContainerWrapper>
      <BorderWrapper>
        <div className={style.container}>
          <BlackoutOverlay />
          <div className={style.scroller}>
            <div className={style.items} ref={frontRef}>
              {options &&
                options.map(({ image, id }) => (
                  <Link key={id} to={`/`} className={style.item}>
                    <img
                      className={style.image}
                      src={process.env.PUBLIC_URL + image}
                      alt=""
                    />
                  </Link>
                ))}
            </div>
          </div>
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
      </BorderWrapper>
    </ContainerWrapper>
  );
};

export default Slider;
