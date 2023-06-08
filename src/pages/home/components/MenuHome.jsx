import React from "react";
import style from "./MenuHome.module.scss";
import { Button } from "../../../common/components/ui/form";

const MenuHome = () => {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.image}>
          <img src="/image/menu-0.png" alt="" />
        </div>
        <Button className={style.button}>Напитки</Button>
      </div>
      <div className={style.item}>
        <div className={style.image}>
          <img src="/image/menu-1.png" alt="" />
        </div>
        <Button className={style.button}>Десерты</Button>
      </div>
      <div className={style.item}>
        <div className={style.image}>
          <img src="/image/menu-2.png" alt="" />
        </div>
        <Button className={style.button}>Салаты</Button>
      </div>
      <div className={style.item}>
        <div className={style.image}>
          <img src="/image/menu-3.png" alt="" />
        </div>
        <Button className={style.button}>Основное</Button>
      </div>
    </div>
  );
};

export default MenuHome;
