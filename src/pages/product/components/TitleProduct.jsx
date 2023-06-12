import React from "react";
import {
  BlackoutOverlay,
  ImageOverlay,
} from "../../../common/components/ui/overlay";
import ContainerWrapper, {
  BorderWrapper,
  SectionWrapper,
} from "../../../common/components/ui/wrapper";
import style from "./TitleProduct.module.scss";

const TitleProduct = () => {
  return (
    <header className={style.container}>
      <ContainerWrapper>
        <BorderWrapper>
          <SectionWrapper className={style.container} y="0" x="0">
            <BlackoutOverlay />
            <ImageOverlay image="/image/page-2.jpg" />
            <h2 className={style.text}>Меню</h2>
          </SectionWrapper>
        </BorderWrapper>
      </ContainerWrapper>
    </header>
  );
};

export default TitleProduct;
