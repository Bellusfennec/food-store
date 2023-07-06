import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineWifi,
} from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { IoChevronBackOutline } from "react-icons/io5";
import Divider from "../../../common/components/divider";
import Button from "../../../common/components/form/Button";
import {
  BlackoutOverlay,
  ImageOverlay,
} from "../../../common/components/overlay";
import ContainerWrapper, {
  BorderWrapper,
  SectionWrapper,
} from "../../../common/components/wrapper";
import style from "./AboutHome.module.scss";

const AboutHome = () => {
  return (
    <div className={style.container}>
      <ContainerWrapper>
        <BorderWrapper>
          <SectionWrapper className={style.container}>
            <BlackoutOverlay />
            <ImageOverlay image="/image/restaurant-0.jpg" />
            <div className={style.main}>
              <div className={style.benefits}>
                <div className={style.item}>
                  <AiOutlineUser className={style.icon} />
                  <p>Опытный и профессиональный персонал</p>
                </div>
                <div className={style.item}>
                  <BsGraphUp className={style.icon} />
                  <p>Высокое качество еды</p>
                </div>
                <div className={style.item}>
                  <AiOutlineCalendar className={style.icon} />
                  <p>Разнообразное меню</p>
                </div>
                <div className={style.item}>
                  <AiOutlineWifi className={style.icon} />
                  <p>Приятная и спокойная обстановка</p>
                </div>
              </div>
              <div className={style.about}>
                <h3>Сеть Food Market</h3>
                <Divider row="2" />
                <p>
                  В нашем ресторане вы можете попробовать различные блюда,
                  которые включают в себя как классические блюда европейской,
                  так и родной татарской кухни. Мы готовим блюда только из самых
                  качествен продуктов, которые мы закупаем у проверенных
                  поставщиков. Наш шеф-повар профессионально готовит блюда и
                  следит за тем, чтобы они соответствовали желаниям наших
                  гостей. Если вы хотите попробовать что-то новое из татарской
                  кухни, то мы сможем порекомендовать вам лучшие блюда и дать
                  много полезных советов. В нашем ресторане мы гарантируем, что
                  каждый гость останется довольным качеством еды и обслуживания.
                </p>
                <Divider row="2" />
                <Button className={style.button}>
                  Подробнее{" "}
                  <IoChevronBackOutline className={style.iconButton} />
                </Button>
              </div>
            </div>
          </SectionWrapper>
        </BorderWrapper>
      </ContainerWrapper>
    </div>
  );
};

export default AboutHome;
