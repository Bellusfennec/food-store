import React from "react";
import style from "./Footer.module.scss";
import { SlSocialInstagram, SlSocialVkontakte } from "react-icons/sl";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ImageOverlay, BlackoutOverlay, BlurOverlay } from "../ui/overlay";
import ContainerWrapper, { SectionWrapper } from "../ui/wrapper";

const Footer = () => {
  return (
    <footer className={style.container}>
      <ImageOverlay image="/image/page-3.jpg" />
      <BlurOverlay />
      <BlackoutOverlay />
      <ContainerWrapper>
        <SectionWrapper className={style.container}>
          <ImageOverlay image="/image/page-3.jpg" />
          <div className={style.main}>
            <div>Food Market</div>
            <div>
              <Link to="/">Политика конфиденциальности</Link>
            </div>

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
          </div>
        </SectionWrapper>
      </ContainerWrapper>
    </footer>
  );
};

export default Footer;
