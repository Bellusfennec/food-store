import React from "react";
import style from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import Button from "../form/Button";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IconButton } from "../form";

const ProductCard = (props) => {
  const { image, name, link } = props;

  return (
    <div className={style.item}>
      <div className={style.image}>
        <img src={process.env.REACT_APP_IMAGE_URL + image} alt={name} />
      </div>
      <div className={style.main}>
        <Link to={link} className={style.label}>
          <h3>{name}</h3>
        </Link>
        <div className={style.sale}>Скидка -30%</div>
        <IconButton className={style.favorite}>
          {false ? <MdFavorite /> : <MdFavoriteBorder />}
        </IconButton>
        <div className={style.footer}>
          <div className={style.price}>
            <div className={style.discount}>
              <span>129 ₽</span>
            </div>
            <div className={style.regular}>99 ₽</div>
          </div>
          <Button type="button" className={style.button}>
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
