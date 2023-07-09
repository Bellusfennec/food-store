import React from "react";
import style from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import Button from "../form/Button";
import { MdCurrencyRuble, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IconButton } from "../form";

const ProductCard = (props) => {
  const { image, title, link } = props;

  return (
    <div className={style.item}>
      <div className={style.image}>
        {/* <img src={process.env.PUBLIC_URL + `/image/${i}.jpg`} alt={title} /> */}
        <img src={process.env.PUBLIC_URL + image} alt={title} />
      </div>
      <div className={style.main}>
        <Link
          // to={`/product/detail/${uuid}`}
          to={link}
          className={style.label}
        >
          <h3>{title}</h3>
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
