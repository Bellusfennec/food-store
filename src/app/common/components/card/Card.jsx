import React from "react";
import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import Button from "../form/Button";
import { IoChevronBackOutline } from "react-icons/io5";
import { FiImage } from "react-icons/fi";

const Card = (props) => {
  const { image, title, link, description } = props;

  return (
    <div className={style.item}>
      <div className={style.body}>
        <div className={style.image}>
          <img src={process.env.PUBLIC_URL + image} alt={title} />
          <div className={style.filter} />
          <FiImage className={style.icon}>
            <div className={style.wave}></div>
            <div className={style.wave}></div>
            <div className={style.wave}></div>
          </FiImage>
        </div>
        <div className={style.main}>
          <div className={style.bodyMain}>
            <Link to={link} className={style.label}>
              <h3>{title}</h3>
            </Link>
            <p className={style.description}>{description}</p>
            <Button type="button" className={style.button}>
              Подробнее <IoChevronBackOutline className={style.iconButton} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
