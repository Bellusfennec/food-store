import React from "react";
import style from "./MenuHome.module.scss";
import { Button } from "../../../common/components/ui/form";
import ContainerWrapper, {
  SectionWrapper,
} from "../../../common/components/ui/wrapper";

const MenuHome = () => {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <h2 className={style.label}>Категории блюд в меню</h2>
        <div className={style.container}>
          <div className={style.item}>
            <div className={style.image}>
              <img src={process.env.PUBLIC_URL + "/image/menu-0.png"} alt="" />
            </div>
            <Button className={style.button}>Напитки</Button>
          </div>
          <div className={style.item}>
            <div className={style.image}>
              <img src={process.env.PUBLIC_URL + "/image/menu-1.png"} alt="" />
            </div>
            <Button className={style.button}>Десерты</Button>
          </div>
          <div className={style.item}>
            <div className={style.image}>
              <img src={process.env.PUBLIC_URL + "/image/menu-2.png"} alt="" />
            </div>
            <Button className={style.button}>Салаты</Button>
          </div>
          <div className={style.item}>
            <div className={style.image}>
              <img src={process.env.PUBLIC_URL + "/image/menu-3.png"} alt="" />
            </div>
            <Button className={style.button}>Основное</Button>
          </div>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
};

export default MenuHome;
