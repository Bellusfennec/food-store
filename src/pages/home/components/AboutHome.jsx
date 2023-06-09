import React from "react";
import style from "./AboutHome.module.scss";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineWifi,
} from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import Divider from "../../../common/components/ui/divider";

const AboutHome = () => {
  return (
    <section className={style.container}>
      <img
        className={style.image}
        src={process.env.PUBLIC_URL + "/image/restaurant-0.jpg"}
        alt=""
      />
      <div className={style.filter}></div>
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
          <h3>Сеть ресторанов Market Food</h3>
          <Divider />
          <p>
            В нашем ресторане вы можете попробовать различные блюда, которые
            включают в себя как классические блюда европейской, так и родной
            татарской кухни. Мы готовим блюда только из самых качествен
            продуктов, которые мы закупаем у проверенных поставщиков. Наш
            шеф-повар профессионально готовит блюда и следит за тем, чтобы они
            соответствовали желаниям наших гостей. Если вы хотите попробовать
            что-то новое из татарской кухни, то мы сможем порекомендовать вам
            лучшие блюда и дать много полезных советов. В нашем ресторане мы
            гарантируем, что каждый гость останется довольным качеством еды и
            обслуживания.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
