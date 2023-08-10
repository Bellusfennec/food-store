import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getProductsLoadingStatus,
} from "../../../store/product";
import style from "./DetailProduct.module.scss";
import { Loading } from "../../../common/components/loading";

const DetailProduct = () => {
  const { page, productId } = useParams();
  const isLoading = useSelector(getProductsLoadingStatus());
  const product = useSelector(getProductById(productId));

  if (isLoading) return <Loading />;

  const { name, image, category, price, priceSale } = product;
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.image}>
          <img src={process.env.REACT_APP_IMAGE_URL + image} alt={name} />
        </div>
      </div>
      <div className={style.right}>
        <h3>{name}</h3>
        <p>{category}</p>
        <p>{price}</p>
        <p>{priceSale}</p>
      </div>
    </div>
  );
};

export default DetailProduct;
