import React from "react";
import style from "./ProductCard.module.scss";
import { Link } from "react-router-dom";
import Button from "../form/Button";
import {
  MdCurrencyRuble,
  MdFavorite,
  MdFavoriteBorder,
  MdStar,
} from "react-icons/md";

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
        <div className={style.info}>
          <div className={style.action}>
            <div className={style.rating}>
              <MdStar /> <span>4.5/5</span>
            </div>
            <div className={style.favorite}>
              {false ? <MdFavorite /> : <MdFavoriteBorder />}{" "}
              <span>Избранное</span>
            </div>
          </div>
          <div className={style.price}>
            <div className={style.discount}>
              <div>Скидка -30%</div>
              <span>
                129 <MdCurrencyRuble />
              </span>
            </div>
            <div className={style.regular}>
              {" "}
              99 <MdCurrencyRuble />
            </div>
          </div>
        </div>
        <div className={style.button}>
          <Button type="button">В корзину</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
