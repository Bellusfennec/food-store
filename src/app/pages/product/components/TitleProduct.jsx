import React from "react";
import {
  BlackoutOverlay,
  ImageOverlay,
} from "../../../common/components/overlay";
import {
  BorderWrapper,
  SectionWrapper,
} from "../../../common/components/wrapper";
import style from "./TitleProduct.module.scss";

const TitleProduct = () => {
  return (
    <header className={style.container}>
      <BorderWrapper>
        <SectionWrapper className={style.container} y="0" x="0">
          <BlackoutOverlay />
          <ImageOverlay image="/image/page-2.jpg" />
          <h2 className={style.text}>Меню</h2>
        </SectionWrapper>
      </BorderWrapper>
    </header>
  );
};

export default TitleProduct;
