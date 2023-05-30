import React from "react";
import style from "./Footer.module.scss";
import { SlSocialInstagram, SlSocialVkontakte } from "react-icons/sl";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.container}>
      <div>
        <Link to="/">Политика конфиденциальности</Link>
      </div>
      <div>Ostore</div>
      <div>
        <div className={style.feedback}>
          <Link to="/">Обратная связь</Link>
        </div>
        <div className={style.social}>
          <Link to="/" title="Vkontakte" className={style.vkontakte}>
            <SlSocialVkontakte />
          </Link>
          <Link to="/" title="Instagram" className={style.instagram}>
            <SlSocialInstagram />
          </Link>
          <Link to="/" title="Telegram">
            <TbBrandTelegram />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
